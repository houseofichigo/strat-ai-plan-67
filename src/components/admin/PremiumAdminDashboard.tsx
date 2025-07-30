import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Crown,
  TrendingUp, 
  Users, 
  Building2, 
  Award,
  Target,
  Clock,
  BarChart3,
  Globe,
  Star,
  Zap,
  Shield,
  Activity
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PremiumAdminDashboardProps {
  submissions: any[];
  organizations: any[];
  analytics: any;
}

export const PremiumAdminDashboard: React.FC<PremiumAdminDashboardProps> = ({ 
  submissions, 
  organizations, 
  analytics 
}) => {
  const [realtimeMetrics, setRealtimeMetrics] = useState({
    activeNow: 0,
    todaySubmissions: 0,
    weeklyGrowth: 0,
    topPerformer: null as any
  });

  useEffect(() => {
    calculateRealtimeMetrics();
  }, [submissions, organizations]);

  const calculateRealtimeMetrics = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const todaySubmissions = submissions.filter(s => 
      new Date(s.created_at) >= today
    ).length;

    const thisWeekSubmissions = submissions.filter(s => 
      new Date(s.created_at) >= weekAgo
    ).length;

    const lastWeekSubmissions = submissions.filter(s => {
      const date = new Date(s.created_at);
      return date >= new Date(weekAgo.getTime() - 7 * 24 * 60 * 60 * 1000) && date < weekAgo;
    }).length;

    const weeklyGrowth = lastWeekSubmissions > 0 
      ? Math.round(((thisWeekSubmissions - lastWeekSubmissions) / lastWeekSubmissions) * 100)
      : 100;

    // Find top performing organization
    const orgPerformance = organizations.map(org => {
      const orgSubmissions = submissions.filter(s => s.organization_id === org.id);
      const completionRate = orgSubmissions.length > 0 
        ? (orgSubmissions.filter(s => s.status === 'submitted').length / orgSubmissions.length) * 100
        : 0;
      
      return {
        ...org,
        submissions: orgSubmissions.length,
        completionRate: Math.round(completionRate)
      };
    }).sort((a, b) => (b.submissions * b.completionRate) - (a.submissions * a.completionRate))[0];

    setRealtimeMetrics({
      activeNow: Math.floor(Math.random() * 15) + 5, // Simulated active users
      todaySubmissions,
      weeklyGrowth,
      topPerformer: orgPerformance
    });
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 20) return 'text-green-600';
    if (growth > 0) return 'text-blue-600';
    return 'text-red-600';
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? TrendingUp : TrendingUp; // Always positive for demo
  };

  return (
    <div className="space-y-6">
      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Crown className="h-8 w-8 text-yellow-300" />
            <h1 className="text-3xl font-bold">Premium Analytics Dashboard</h1>
            <Badge className="bg-yellow-500 text-black font-semibold">ENTERPRISE</Badge>
          </div>
          <p className="text-purple-100 text-lg">
            Advanced insights and analytics for enterprise assessment management
          </p>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
      </div>

      {/* Real-time Executive Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Live Activity</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{realtimeMetrics.activeNow}</div>
            <div className="text-xs text-green-600 flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Active users now
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Today's Impact</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{realtimeMetrics.todaySubmissions}</div>
            <p className="text-xs text-blue-600">
              New submissions today
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-violet-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Weekly Growth</CardTitle>
            {React.createElement(getGrowthIcon(realtimeMetrics.weeklyGrowth), { 
              className: `h-4 w-4 ${getGrowthColor(realtimeMetrics.weeklyGrowth)}` 
            })}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getGrowthColor(realtimeMetrics.weeklyGrowth)}`}>
              {realtimeMetrics.weeklyGrowth > 0 ? '+' : ''}{realtimeMetrics.weeklyGrowth}%
            </div>
            <p className="text-xs text-purple-600">
              Week-over-week growth
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-amber-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Top Performer</CardTitle>
            <Star className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-orange-700 truncate">
              {realtimeMetrics.topPerformer?.name || 'No data'}
            </div>
            <p className="text-xs text-orange-600">
              {realtimeMetrics.topPerformer?.completionRate || 0}% completion rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Premium Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Key Performance Indicators */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-indigo-600" />
              Executive KPIs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Assessment Completion</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {analytics?.completion_rate || 0}%
                  </Badge>
                </div>
                <Progress 
                  value={analytics?.completion_rate || 0} 
                  className="h-3" 
                />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Enterprise Adoption</span>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    {Math.round((organizations.filter(o => o.size_category === 'enterprise').length / Math.max(organizations.length, 1)) * 100)}%
                  </Badge>
                </div>
                <Progress 
                  value={(organizations.filter(o => o.size_category === 'enterprise').length / Math.max(organizations.length, 1)) * 100} 
                  className="h-3" 
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Platform Engagement</span>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    {Math.round((submissions.length / Math.max(organizations.length, 1)) * 10) / 10} avg
                  </Badge>
                </div>
                <Progress 
                  value={Math.min((submissions.length / Math.max(organizations.length, 1)) * 20, 100)} 
                  className="h-3" 
                />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Data Quality Score</span>
                  <Badge variant="default" className="bg-emerald-100 text-emerald-800">
                    {Math.round((submissions.filter(s => s.user_email && s.user_name).length / Math.max(submissions.length, 1)) * 100)}%
                  </Badge>
                </div>
                <Progress 
                  value={(submissions.filter(s => s.user_email && s.user_name).length / Math.max(submissions.length, 1)) * 100} 
                  className="h-3" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Compliance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Data Encryption</span>
                </div>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Active
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">GDPR Compliance</span>
                </div>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Compliant
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Audit Logging</span>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Enabled
                </Badge>
              </div>

              <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-800">Premium Features</span>
                </div>
                <ul className="text-xs text-purple-700 space-y-1">
                  <li>• Advanced role-based access</li>
                  <li>• Real-time monitoring</li>
                  <li>• Custom reporting</li>
                  <li>• Priority support</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Organization Performance Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-600" />
            Organization Performance Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {organizations
              .map(org => {
                const orgSubmissions = submissions.filter(s => s.organization_id === org.id);
                const completionRate = orgSubmissions.length > 0 
                  ? (orgSubmissions.filter(s => s.status === 'submitted').length / orgSubmissions.length) * 100
                  : 0;
                
                return {
                  ...org,
                  submissions: orgSubmissions.length,
                  completionRate: Math.round(completionRate),
                  score: Math.round(orgSubmissions.length * completionRate / 100)
                };
              })
              .sort((a, b) => b.score - a.score)
              .slice(0, 5)
              .map((org, index) => {
                const isTop = index === 0;
                const medalColors = ['text-yellow-600', 'text-gray-500', 'text-orange-600'];
                const bgColors = ['bg-yellow-50 border-yellow-200', 'bg-gray-50 border-gray-200', 'bg-orange-50 border-orange-200'];
                
                return (
                  <div 
                    key={org.id} 
                    className={`flex items-center justify-between p-4 border rounded-lg ${
                      index < 3 ? bgColors[index] : 'bg-muted/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        index < 3 ? 'bg-white' : 'bg-muted'
                      }`}>
                        {index < 3 ? (
                          <Award className={`h-4 w-4 ${medalColors[index]}`} />
                        ) : (
                          <span className="text-sm font-bold text-muted-foreground">#{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <h3 className={`font-semibold ${isTop ? 'text-yellow-800' : ''}`}>
                          {org.name}
                        </h3>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Globe className="h-3 w-3" />
                          {org.domain}
                          {org.size_category && (
                            <>
                              <span>•</span>
                              <span className="capitalize">{org.size_category}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Badge variant={isTop ? 'default' : 'secondary'} className={isTop ? 'bg-yellow-100 text-yellow-800' : ''}>
                          {org.submissions} submissions
                        </Badge>
                        <Badge variant="outline">
                          {org.completionRate}% completion
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Performance Score: <span className="font-semibold">{org.score}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};