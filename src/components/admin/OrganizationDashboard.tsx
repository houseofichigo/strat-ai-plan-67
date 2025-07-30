import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Search, 
  Globe,
  BarChart3,
  Target,
  Clock,
  Filter
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Organization {
  id: string;
  name: string;
  domain: string;
  industry?: string;
  size_category?: string;
  country?: string;
  submission_count?: number;
  completion_rate?: number;
  last_activity?: string;
  created_at: string;
}

interface OrganizationDashboardProps {
  submissions: any[];
}

export const OrganizationDashboard: React.FC<OrganizationDashboardProps> = ({ submissions }) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sizeFilter, setSizeFilter] = useState('all');

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    setLoading(true);
    try {
      // Fetch organizations with submission counts
      const { data: orgsData, error: orgsError } = await supabase
        .from('organizations')
        .select(`
          *,
          assessment_submissions(count)
        `);

      if (orgsError) throw orgsError;

      // Calculate metrics for each organization
      const organizationsWithMetrics = await Promise.all(
        orgsData.map(async (org) => {
          // Get detailed submission data for this organization
          const { data: orgSubmissions, error: submissionError } = await supabase
            .from('assessment_submissions')
            .select('*')
            .eq('organization_id', org.id);

          if (submissionError) {
            console.error('Error fetching org submissions:', submissionError);
          }

          const submissionCount = orgSubmissions?.length || 0;
          const completedSubmissions = orgSubmissions?.filter(s => s.status === 'submitted').length || 0;
          const completionRate = submissionCount > 0 ? (completedSubmissions / submissionCount) * 100 : 0;
          
          // Get most recent activity
          const lastActivity = orgSubmissions?.length > 0 
            ? Math.max(...orgSubmissions.map(s => new Date(s.created_at).getTime()))
            : null;

          return {
            ...org,
            submission_count: submissionCount,
            completion_rate: Math.round(completionRate),
            last_activity: lastActivity ? new Date(lastActivity).toISOString() : null
          };
        })
      );

      setOrganizations(organizationsWithMetrics);
    } catch (error) {
      console.error('Error fetching organizations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch organization data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSize = sizeFilter === 'all' || org.size_category === sizeFilter;
    return matchesSearch && matchesSize;
  });

  const totalOrganizations = organizations.length;
  const activeOrganizations = organizations.filter(org => org.submission_count && org.submission_count > 0).length;
  const totalSubmissions = organizations.reduce((sum, org) => sum + (org.submission_count || 0), 0);
  const avgCompletionRate = organizations.length > 0 
    ? Math.round(organizations.reduce((sum, org) => sum + (org.completion_rate || 0), 0) / organizations.length)
    : 0;

  const getSizeBadgeVariant = (size?: string) => {
    switch (size) {
      case 'startup': return 'secondary';
      case 'small': return 'outline';
      case 'medium': return 'default';
      case 'large': return 'default';
      case 'enterprise': return 'destructive';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading organizations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrganizations}</div>
            <p className="text-xs text-muted-foreground">
              {activeOrganizations} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">
              Across all organizations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgCompletionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Organization average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enterprise Clients</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {organizations.filter(org => org.size_category === 'enterprise').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Enterprise organizations
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Top Organizations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Top Performing Organizations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {organizations
                  .filter(org => org.submission_count && org.submission_count > 0)
                  .sort((a, b) => (b.submission_count || 0) - (a.submission_count || 0))
                  .slice(0, 5)
                  .map((org) => (
                    <div key={org.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{org.name}</h3>
                          <p className="text-sm text-muted-foreground">{org.domain}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <Badge variant="default">{org.submission_count} submissions</Badge>
                          <Badge variant="secondary">{org.completion_rate}% completion</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organizations" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search organizations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <select
                  value={sizeFilter}
                  onChange={(e) => setSizeFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Sizes</option>
                  <option value="startup">Startup</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Organizations List */}
          <Card>
            <CardHeader>
              <CardTitle>Organizations ({filteredOrganizations.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredOrganizations.map((org) => (
                  <div key={org.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{org.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Globe className="h-3 w-3" />
                          {org.domain}
                          {org.country && (
                            <>
                              <span>•</span>
                              <span>{org.country}</span>
                            </>
                          )}
                        </div>
                        {org.industry && (
                          <p className="text-sm text-muted-foreground mt-1">{org.industry}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {org.size_category && (
                        <Badge variant={getSizeBadgeVariant(org.size_category)}>
                          {org.size_category}
                        </Badge>
                      )}
                      <Badge variant="outline">
                        {org.submission_count || 0} submissions
                      </Badge>
                      {(org.completion_rate || 0) > 0 && (
                        <Badge variant="secondary">
                          {org.completion_rate}% completion
                        </Badge>
                      )}
                      {org.last_activity && (
                        <div className="text-xs text-muted-foreground">
                          Last: {new Date(org.last_activity).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {filteredOrganizations.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No organizations found matching your criteria
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          {/* Organization Size Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization Size Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['startup', 'small', 'medium', 'large', 'enterprise'].map((size) => {
                    const count = organizations.filter(org => org.size_category === size).length;
                    const percentage = totalOrganizations > 0 ? (count / totalOrganizations) * 100 : 0;
                    
                    return (
                      <div key={size} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="capitalize font-medium">{size}</span>
                          <span className="text-sm text-muted-foreground">{count} orgs</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Industry Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {organizations
                    .filter(org => org.industry)
                    .reduce((acc, org) => {
                      const industry = org.industry!;
                      if (!acc[industry]) acc[industry] = 0;
                      acc[industry]++;
                      return acc;
                    }, {} as Record<string, number>)
                    && Object.entries(
                      organizations
                        .filter(org => org.industry)
                        .reduce((acc, org) => {
                          const industry = org.industry!;
                          if (!acc[industry]) acc[industry] = 0;
                          acc[industry]++;
                          return acc;
                        }, {} as Record<string, number>)
                    )
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 5)
                    .map(([industry, count]) => (
                      <div key={industry} className="flex justify-between items-center">
                        <span className="font-medium">{industry}</span>
                        <Badge variant="outline">{count} organizations</Badge>
                      </div>
                    ))}
                  {organizations.filter(org => org.industry).length === 0 && (
                    <p className="text-sm text-muted-foreground">No industry data available</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};