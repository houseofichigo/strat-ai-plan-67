import React, { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Users, FileText, Calendar, Mail, Eye, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { assessmentService } from '@/services/assessmentService';
import { SubmissionDetails } from '@/components/admin/SubmissionDetails';
import { AdvancedFilters } from '@/components/admin/AdvancedFilters';
import { EnhancedAnalytics } from '@/components/admin/EnhancedAnalytics';
import { BulkActions } from '@/components/admin/BulkActions';
import { PremiumAdminDashboard } from '@/components/admin/PremiumAdminDashboard';

interface FilterState {
  search: string;
  status: string;
  dateRange: {
    from?: Date;
    to?: Date;
  };
  organization: string;
}

const Admin = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: '',
    dateRange: {},
    organization: '',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      // Use the assessment service to get properly formatted data
      const [submissionsResult, answersResult, organizationsResult] = await Promise.all([
        assessmentService.getSubmissions(),
        assessmentService.getDetailedAnswers(),
        supabase.from('organizations').select('*').order('created_at', { ascending: false })
      ]);

      if (submissionsResult.success && submissionsResult.data) {
        setSubmissions(submissionsResult.data);
      } else {
        console.error('Error fetching submissions:', submissionsResult.error);
        setSubmissions([]);
      }

      if (answersResult.success && answersResult.data) {
        setAnswers(answersResult.data);
      } else {
        console.error('Error fetching answers:', answersResult.error);
        setAnswers([]);
      }

      if (organizationsResult.data) {
        setOrganizations(organizationsResult.data);
      } else if (organizationsResult.error) {
        console.error('Error fetching organizations:', organizationsResult.error);
        setOrganizations([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      });
      setSubmissions([]);
      setAnswers([]);
    } finally {
      setLoading(false);
    }
  };

  // Filtered submissions based on current filters
  const filteredSubmissions = useMemo(() => {
    return submissions.filter(submission => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          submission.user_email?.toLowerCase().includes(searchLower) ||
          submission.user_name?.toLowerCase().includes(searchLower) ||
          submission.id.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status && filters.status !== 'all' && submission.status !== filters.status) {
        return false;
      }

      // Organization filter
      if (filters.organization && submission.submission_data?.['metadata-respondent-info']?.['company-name']) {
        const orgName = submission.submission_data['metadata-respondent-info']['company-name'];
        if (!orgName?.toLowerCase().includes(filters.organization.toLowerCase())) {
          return false;
        }
      }

      // Date range filter
      if (filters.dateRange.from || filters.dateRange.to) {
        const submissionDate = new Date(submission.created_at);
        if (filters.dateRange.from && submissionDate < filters.dateRange.from) {
          return false;
        }
        if (filters.dateRange.to && submissionDate > filters.dateRange.to) {
          return false;
        }
      }

      return true;
    });
  }, [submissions, filters]);

  useEffect(() => {
    fetchData();
    
    // Set up real-time subscription
    const submissionsChannel = supabase
      .channel('assessment-submissions-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'assessment_submissions'
        },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(submissionsChannel);
    };
  }, []);

  const exportToCSV = (submissionsToExport = filteredSubmissions) => {
    const csvContent = submissionsToExport.map(submission => ({
      id: submission.id,
      email: submission.user_email || '',
      name: submission.user_name || '',
      status: submission.status,
      created_at: new Date(submission.created_at).toLocaleDateString(),
      updated_at: new Date(submission.updated_at).toLocaleDateString(),
    }));

    const csv = [
      'ID,Email,Name,Status,Created At,Updated At',
      ...csvContent.map(row => 
        Object.values(row).map(value => `"${value}"`).join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'assessment-submissions.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export successful",
      description: "CSV file has been downloaded",
    });
  };

  const handleBulkDelete = async (ids: string[]) => {
    try {
      // Delete from Supabase using a direct query since we don't have a service method for this
      const { error } = await supabase
        .from('assessment_submissions')
        .delete()
        .in('id', ids);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: `Deleted ${ids.length} submission(s)`,
      });

      // Refresh data
      fetchData();
    } catch (error) {
      console.error('Error deleting submissions:', error);
      toast({
        title: "Error",
        description: "Failed to delete submissions",
        variant: "destructive",
      });
    }
  };

  const handleExportSelected = (ids: string[]) => {
    const selectedSubmissions = submissions.filter(s => ids.includes(s.id));
    exportToCSV(selectedSubmissions);
  };

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedIds(prev => 
      prev.length === filteredSubmissions.length 
        ? [] 
        : filteredSubmissions.map(s => s.id)
    );
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      status: '',
      dateRange: {},
      organization: '',
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Button onClick={() => {
            assessmentService.testSubmission().then(result => {
              if (result.success) {
                toast({
                  title: "Test Submission Created",
                  description: `Created test submission with ID: ${result.submissionId}`,
                });
                fetchData(); // Refresh the data
              } else {
                toast({
                  title: "Test Failed",
                  description: result.error || "Failed to create test submission",
                  variant: "destructive",
                });
              }
            });
          }} variant="outline">
            Add Test Data
          </Button>
          <Button onClick={() => exportToCSV()} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Executive Dashboard</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <PremiumAdminDashboard 
            submissions={submissions} 
            organizations={organizations}
            analytics={{
              completion_rate: Math.round((submissions.filter(s => s.status === 'submitted').length / Math.max(submissions.length, 1)) * 100)
            }}
          />
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{submissions.length}</div>
                <p className="text-xs text-muted-foreground">
                  +{submissions.filter(s => 
                    new Date(s.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  ).length} this week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Assessments</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {submissions.filter(s => s.status === 'submitted').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((submissions.filter(s => s.status === 'submitted').length / submissions.length) * 100) || 0}% completion rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {submissions.filter(s => 
                    new Date(s.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)
                  ).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  submissions today
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unique Domains</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {organizations.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  organizations represented
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-6">
          {/* Filters */}
          <AdvancedFilters
            filters={filters}
            onFiltersChange={setFilters}
            onReset={resetFilters}
          />

          {/* Bulk Actions */}
          <BulkActions
            selectedIds={selectedIds}
            onClearSelection={() => setSelectedIds([])}
            onBulkDelete={handleBulkDelete}
            onExportSelected={handleExportSelected}
            submissions={submissions}
          />

          {/* Submissions Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Assessment Submissions ({filteredSubmissions.length})</CardTitle>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedIds.length === filteredSubmissions.length && filteredSubmissions.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
                <span className="text-sm text-muted-foreground">Select All</span>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No submissions found
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredSubmissions.map((submission) => (
                    <div key={submission.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <Checkbox
                        checked={selectedIds.includes(submission.id)}
                        onCheckedChange={() => toggleSelection(submission.id)}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
                        <div>
                          <strong>Email:</strong> {submission.user_email || 'N/A'}
                        </div>
                        <div>
                          <strong>Name:</strong> {submission.user_name || 'N/A'}
                        </div>
                        <div>
                          <strong>Status:</strong>{' '}
                          <Badge variant={submission.status === 'submitted' ? 'default' : 'secondary'}>
                            {submission.status}
                          </Badge>
                        </div>
                        <div>
                          <strong>Submitted:</strong> {new Date(submission.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedSubmission(submission)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <EnhancedAnalytics submissions={submissions} />
        </TabsContent>
      </Tabs>

      {/* Submission Details Modal */}
      <SubmissionDetails
        submission={selectedSubmission}
        isOpen={!!selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
      />
    </div>
  );
};

export default Admin;