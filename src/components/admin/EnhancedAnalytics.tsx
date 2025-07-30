import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  BarChart3, 
  PieChart,
  Activity,
  Target,
  Building2,
  Globe,
  Award,
  Zap
} from 'lucide-react';
import { analyticsService, AssessmentAnalytics } from '@/services/analyticsService';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { DataVisualization } from './DataVisualization';
import { OrganizationDashboard } from './OrganizationDashboard';

interface EnhancedAnalyticsProps {
  submissions: any[];
}

export const EnhancedAnalytics: React.FC<EnhancedAnalyticsProps> = ({ submissions }) => {
  const [analytics, setAnalytics] = useState<AssessmentAnalytics | null>(null);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const [analyticsResult, orgsResult] = await Promise.all([
          analyticsService.getAnalytics(),
          supabase.from('organizations').select(`
            *,
            assessment_submissions(count)
          `)
        ]);

        if (analyticsResult.success && analyticsResult.data) {
          setAnalytics(analyticsResult.data);
        } else {
          toast({
            title: "Error",
            description: analyticsResult.error || "Failed to fetch analytics",
            variant: "destructive",
          });
        }

        if (orgsResult.data) {
          setOrganizations(orgsResult.data);
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
        toast({
          title: "Error",
          description: "Failed to fetch analytics data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [submissions.length]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">No analytics data available</p>
        </CardContent>
      </Card>
    );
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const activeOrganizations = organizations.filter(org => 
    org.assessment_submissions && org.assessment_submissions.length > 0
  ).length;

  const enterpriseClients = organizations.filter(org => 
    org.size_category === 'enterprise'
  ).length;

  return (
    <div className="space-y-6">
      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{analytics.total_submissions}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              Assessment responses collected
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{analytics.completion_rate}%</div>
            <Progress value={analytics.completion_rate} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{formatTime(analytics.average_time_spent)}</div>
            <p className="text-xs text-muted-foreground">
              Per assessment
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{activeOrganizations}</div>
            <p className="text-xs text-muted-foreground">
              Active companies
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enterprise</CardTitle>
            <Award className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{enterpriseClients}</div>
            <p className="text-xs text-muted-foreground">
              Enterprise clients
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Highlights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Performance Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">High Completion Rate</span>
                    </div>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      {analytics.completion_rate}%
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="font-medium">Active Sections</span>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {Object.keys(analytics.section_completion_rates).length}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="font-medium">Avg. Engagement</span>
                    </div>
                    <Badge variant="outline" className="bg-purple-100 text-purple-800">
                      {formatTime(analytics.average_time_spent)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  Quick Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{analytics.total_submissions}</div>
                    <p className="text-sm text-muted-foreground">Total Responses</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{organizations.length}</div>
                    <p className="text-sm text-muted-foreground">Organizations</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round(Object.values(analytics.section_completion_rates).reduce((a, b) => a + b, 0) / Object.keys(analytics.section_completion_rates).length) || 0}%
                    </div>
                    <p className="text-sm text-muted-foreground">Avg. Section Rate</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{analytics.drop_off_points.length}</div>
                    <p className="text-sm text-muted-foreground">Improvement Areas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <DataVisualization submissions={submissions} />
        </TabsContent>

        <TabsContent value="organizations" className="space-y-6">
          <OrganizationDashboard submissions={submissions} />
        </TabsContent>

        <TabsContent value="sections" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Section Completion Rates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Section Completion Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(analytics.section_completion_rates).map(([sectionId, rate]) => (
                    <div key={sectionId} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {sectionId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <Badge variant={rate > 80 ? 'default' : rate > 60 ? 'secondary' : 'destructive'}>
                          {Math.round(rate)}%
                        </Badge>
                      </div>
                      <Progress value={rate} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Drop-off Points */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.drop_off_points.map((point, index) => (
                    <div key={point.section_id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{point.section_name}</p>
                        <p className="text-sm text-muted-foreground">
                          High drop-off rate
                        </p>
                      </div>
                      <Badge variant="destructive">
                        {Math.round(point.drop_off_rate)}% drop-off
                      </Badge>
                    </div>
                  ))}
                  {analytics.drop_off_points.length === 0 && (
                    <div className="text-center py-8">
                      <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Great! No significant drop-off points detected.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Response Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(analytics.popular_answers).slice(0, 6).map(([questionKey, answers]) => {
                  const [sectionId, questionId] = questionKey.split('.');
                  const totalResponses = Object.values(answers).reduce((sum, count) => sum + count, 0);
                  const topAnswer = Object.entries(answers).sort(([,a], [,b]) => b - a)[0];
                  
                  return (
                    <Card key={questionKey} className="p-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium truncate">
                          {sectionId.replace('-', ' ')} - Q{questionId}
                        </p>
                        <div className="text-2xl font-bold">{totalResponses}</div>
                        <p className="text-xs text-muted-foreground">
                          Top: "{topAnswer?.[0] || 'N/A'}" ({topAnswer?.[1] || 0} responses)
                        </p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};