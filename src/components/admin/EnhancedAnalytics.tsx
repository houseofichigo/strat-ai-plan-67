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
  Target
} from 'lucide-react';
import { analyticsService, AssessmentAnalytics } from '@/services/analyticsService';
import { toast } from '@/hooks/use-toast';
import { DataVisualization } from './DataVisualization';

interface EnhancedAnalyticsProps {
  submissions: any[];
}

export const EnhancedAnalytics: React.FC<EnhancedAnalyticsProps> = ({ submissions }) => {
  const [analytics, setAnalytics] = useState<AssessmentAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const result = await analyticsService.getAnalytics();
        if (result.success && result.data) {
          setAnalytics(result.data);
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to fetch analytics",
            variant: "destructive",
          });
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

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.total_submissions}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1" />
              Assessment responses collected
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.completion_rate}%</div>
            <Progress value={analytics.completion_rate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatTime(analytics.average_time_spent)}</div>
            <p className="text-xs text-muted-foreground">
              Per assessment completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Engagement</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.keys(analytics.section_completion_rates).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Sections with responses
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sections">Section Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <DataVisualization submissions={submissions} />
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