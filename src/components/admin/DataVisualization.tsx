import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface DataVisualizationProps {
  submissions: any[];
}

export const DataVisualization: React.FC<DataVisualizationProps> = ({ submissions }) => {
  // Prepare data for completion trends
  const completionTrends = React.useMemo(() => {
    const trends = submissions.reduce((acc, submission) => {
      const date = new Date(submission.created_at).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(trends)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date as string).getTime() - new Date(b.date as string).getTime())
      .slice(-7); // Last 7 days
  }, [submissions]);

  // Status distribution
  const statusDistribution = React.useMemo(() => {
    const distribution = submissions.reduce((acc, submission) => {
      acc[submission.status] = (acc[submission.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(distribution).map(([status, count]) => ({
      status: status.charAt(0).toUpperCase() + status.slice(1),
      count,
    }));
  }, [submissions]);

  // Domain analysis
  const domainAnalysis = React.useMemo(() => {
    const domains = submissions
      .filter(s => s.user_email)
      .reduce((acc, submission) => {
        const domain = submission.user_email.split('@')[1];
        acc[domain] = (acc[domain] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(domains)
      .map(([domain, count]) => ({ domain, count }))
      .sort((a, b) => (b.count as number) - (a.count as number))
      .slice(0, 10); // Top 10 domains
  }, [submissions]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Completion Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Completion Trends (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={completionTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ status, count }) => `${status}: ${count}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Domains */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Top Email Domains</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={domainAnalysis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="domain" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};