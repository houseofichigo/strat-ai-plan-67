import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Users, BarChart3, Settings, RefreshCw, FileText, Download, TrendingUp, Clock, AlertTriangle, TestTube } from 'lucide-react';
import { assessmentService, AssessmentSubmission } from '@/services/assessmentService';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { analyticsService, AssessmentAnalytics } from '@/services/analyticsService';

export default function Admin() {
  const [submissions, setSubmissions] = useState<AssessmentSubmission[]>([]);
  const [analytics, setAnalytics] = useState<AssessmentAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const { toast } = useToast();

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const result = await assessmentService.getSubmissions();
      if (result.success && result.data) {
        setSubmissions(result.data);
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to fetch submissions',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch submissions',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const result = await analyticsService.getAnalytics();
      if (result.success && result.data) {
        setAnalytics(result.data);
      } else {
        toast({
          title: 'Analytics Error',
          description: result.error || 'Failed to fetch analytics',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Analytics Error',
        description: 'Failed to fetch analytics data',
        variant: 'destructive',
      });
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const handleTestSubmission = async () => {
    try {
      const result = await assessmentService.testSubmission();
      if (result.success) {
        toast({
          title: 'Test Submission Successful',
          description: `Test data submitted successfully. ID: ${result.submissionId}`,
        });
        // Refresh data after test submission
        fetchSubmissions();
        fetchAnalytics();
      } else {
        toast({
          title: 'Test Submission Failed',
          description: result.error || 'Failed to submit test data',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Test Submission Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    }
  };

  const exportAnalytics = () => {
    try {
      const data = analyticsService.exportAnalyticsData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `assessment-analytics-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Export Successful',
        description: 'Analytics data has been downloaded',
      });
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'Failed to export analytics data',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchSubmissions();
    fetchAnalytics();

    // Set up real-time subscription for new submissions
    const channel = supabase
      .channel('admin-submissions')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'assessment_submissions'
        },
        () => {
          // Refresh submissions and analytics when new ones are added
          fetchSubmissions();
          fetchAnalytics();
          toast({
            title: 'New Submission',
            description: 'A new assessment submission has been received',
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Crown className="w-8 h-8 text-primary" />
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">Manage your AI assessment platform</p>
          </div>
          <Button
            onClick={handleTestSubmission}
            variant="outline"
            className="flex items-center gap-2"
          >
            <TestTube className="w-4 h-4" />
            Test Submission
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Submissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.total_submissions || submissions.length}</div>
              <p className="text-xs text-muted-foreground">Total assessments</p>
            </CardContent>
          </Card>

          {/* Completion Rate */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Completion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.completion_rate.toFixed(1) || '0'}%</div>
              <p className="text-xs text-muted-foreground">Assessment completion</p>
            </CardContent>
          </Card>

          {/* Average Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Avg. Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round((analytics?.average_time_spent || 1200) / 60)}</div>
              <p className="text-xs text-muted-foreground">Minutes to complete</p>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Active</div>
              <p className="text-xs text-muted-foreground">Platform operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Section Completion Rates */}
          <Card>
            <CardHeader>
              <CardTitle>Section Completion Rates</CardTitle>
              <p className="text-sm text-muted-foreground">How often each section is completed</p>
            </CardHeader>
            <CardContent>
              {analyticsLoading ? (
                <p className="text-muted-foreground">Loading analytics...</p>
              ) : analytics?.section_completion_rates ? (
                <div className="space-y-3">
                  {Object.entries(analytics.section_completion_rates).map(([sectionId, rate]) => (
                    <div key={sectionId} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{sectionId.replace('-', ' ')}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${rate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-12">{rate.toFixed(1)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No completion data available</p>
              )}
            </CardContent>
          </Card>

          {/* Drop-off Points */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Drop-off Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">Sections where users most often leave</p>
              </div>
              <Button onClick={exportAnalytics} size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              {analyticsLoading ? (
                <p className="text-muted-foreground">Loading analytics...</p>
              ) : analytics?.drop_off_points && analytics.drop_off_points.length > 0 ? (
                <div className="space-y-3">
                  {analytics.drop_off_points.slice(0, 5).map((dropOff, index) => (
                    <div key={dropOff.section_id} className="flex items-center gap-3">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{dropOff.section_name}</p>
                        <p className="text-xs text-muted-foreground">{dropOff.drop_off_rate.toFixed(1)}% drop-off rate</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No drop-off data available</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Assessment Submissions */}
        <Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Assessment Submissions</CardTitle>
              <p className="text-muted-foreground text-sm">Recent assessment submissions from users</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => { fetchSubmissions(); fetchAnalytics(); }} disabled={loading || analyticsLoading} size="sm" variant="outline">
                <RefreshCw className={`w-4 h-4 mr-2 ${(loading || analyticsLoading) ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button onClick={exportAnalytics} size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Loading submissions...</p>
            ) : submissions.length === 0 ? (
              <p className="text-muted-foreground">No submissions yet</p>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">
                        {submission.user_name || 'Anonymous User'} 
                        {submission.user_email && (
                          <span className="text-muted-foreground ml-2">({submission.user_email})</span>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Submitted: {new Date(submission.created_at || '').toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">ID: {submission.id}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={submission.status === 'submitted' ? 'default' : 'secondary'}>
                        {submission.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}