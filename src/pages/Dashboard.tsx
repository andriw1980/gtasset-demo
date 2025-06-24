
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Package, AlertTriangle, Wrench, TrendingUp, TrendingDown, DollarSign, MapPin, Calendar } from 'lucide-react';

// Mock data for charts
const assetsByCategory = [
  { name: 'Equipment', value: 145, color: '#8884d8' },
  { name: 'Vehicles', value: 32, color: '#82ca9d' },
  { name: 'Furniture', value: 89, color: '#ffc658' },
  { name: 'IT Assets', value: 67, color: '#ff7300' },
  { name: 'Buildings', value: 12, color: '#00ff88' }
];

const maintenanceTrend = [
  { month: 'Jan', preventive: 45, corrective: 23, total: 68 },
  { month: 'Feb', preventive: 52, corrective: 19, total: 71 },
  { month: 'Mar', preventive: 48, corrective: 31, total: 79 },
  { month: 'Apr', preventive: 61, corrective: 15, total: 76 },
  { month: 'May', preventive: 55, corrective: 28, total: 83 },
  { month: 'Jun', preventive: 67, corrective: 22, total: 89 }
];

const assetValue = [
  { month: 'Jan', value: 2450000 },
  { month: 'Feb', value: 2425000 },
  { month: 'Mar', value: 2480000 },
  { month: 'Apr', value: 2510000 },
  { month: 'May', value: 2485000 },
  { month: 'Jun', value: 2520000 }
];

const recentActivities = [
  { id: 1, type: 'Asset Request', description: 'New laptop requested by IT Department', time: '2 hours ago', status: 'pending' },
  { id: 2, type: 'Maintenance', description: 'Generator Unit A - Monthly inspection completed', time: '4 hours ago', status: 'completed' },
  { id: 3, type: 'Transfer', description: 'Printer moved from HR to Finance', time: '6 hours ago', status: 'completed' },
  { id: 4, type: 'Damage Report', description: 'HVAC system reported damaged', time: '1 day ago', status: 'urgent' },
  { id: 5, type: 'Depreciation', description: 'Monthly depreciation calculated for 45 assets', time: '2 days ago', status: 'completed' }
];

const upcomingMaintenance = [
  { asset: 'Fire Pump System', code: 'FP-001', date: '2024-06-30', type: 'Performance Test', priority: 'high' },
  { asset: 'HVAC System', code: 'HVAC-001', date: '2024-07-02', type: 'Filter Replacement', priority: 'medium' },
  { asset: 'Elevator Unit 1', code: 'ELV-001', date: '2024-07-10', type: 'Safety Inspection', priority: 'high' },
  { asset: 'Backup Generator', code: 'GEN-002', date: '2024-07-15', type: 'Preventive Service', priority: 'medium' }
];

const Dashboard = () => {
  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'secondary';
      case 'pending': return 'outline';
      case 'urgent': return 'destructive';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'outline';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to gtAsset Management System</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">345</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Asset Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2.52M</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2.5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Maintenance</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-orange-600">3 overdue</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                Require immediate attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Asset Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Asset Distribution by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={assetsByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {assetsByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Maintenance Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Activities Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={maintenanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="preventive" stackId="a" fill="#8884d8" name="Preventive" />
                  <Bar dataKey="corrective" stackId="a" fill="#82ca9d" name="Corrective" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Asset Value Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Total Asset Value Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={assetValue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Asset Value']} />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.type}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                    <Badge variant={getActivityStatusColor(activity.status)}>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Maintenance */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingMaintenance.map((maintenance, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{maintenance.asset}</p>
                      <p className="text-xs text-gray-500">{maintenance.code}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Calendar className="h-3 w-3" />
                          {new Date(maintenance.date).toLocaleDateString()}
                        </div>
                        <p className="text-xs text-gray-600">{maintenance.type}</p>
                      </div>
                    </div>
                    <Badge variant={getPriorityColor(maintenance.priority)}>
                      {maintenance.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
