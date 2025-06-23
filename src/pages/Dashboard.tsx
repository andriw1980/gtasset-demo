
import React from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Package,
  Users,
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  FileText
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data for dashboard
  const stats = {
    totalAssets: 1247,
    activeAssets: 1156,
    underMaintenance: 23,
    lostAssets: 8,
    pendingRequests: 12,
    expiringInsurance: 5,
    totalValue: 2450000,
    monthlyDepreciation: 18500
  };

  const recentActivities = [
    { id: 1, type: 'asset_added', description: 'New laptop added to inventory', time: '2 hours ago' },
    { id: 2, type: 'request_approved', description: 'Asset request #AR-001 approved', time: '4 hours ago' },
    { id: 3, type: 'loss_reported', description: 'Equipment loss reported - Building A', time: '1 day ago' },
    { id: 4, type: 'insurance_renewed', description: 'Insurance policy renewed for Fleet vehicles', time: '2 days ago' }
  ];

  const pendingApprovals = [
    { id: 'AR-001', type: 'Asset Request', requester: 'John Doe', item: 'Desktop Computer', date: '2024-01-15' },
    { id: 'LR-002', type: 'Loss Report', requester: 'Jane Smith', item: 'Tablet Device', date: '2024-01-14' },
    { id: 'AR-003', type: 'Asset Request', requester: 'Mike Johnson', item: 'Printer', date: '2024-01-13' }
  ];

  return (
    <Layout>
      <div className="px-4 sm:px-0">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.fullName}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAssets.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Assets</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeAssets.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {((stats.activeAssets / stats.totalAssets) * 100).toFixed(1)}% operational
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Under Maintenance</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.underMaintenance}</div>
              <p className="text-xs text-muted-foreground">
                Scheduled repairs in progress
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lost/Damaged</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.lostAssets}</div>
              <p className="text-xs text-muted-foreground">
                Requires investigation
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Financial Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Financial Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Asset Value</p>
                  <p className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Depreciation</p>
                  <p className="text-lg font-semibold text-red-600">-${stats.monthlyDepreciation.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Insurance Expiring Soon</p>
                  <p className="text-lg font-semibold text-yellow-600">{stats.expiringInsurance} policies</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used functions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {(user?.role === 'admin' || user?.role === 'staff') && (
                  <Button asChild variant="outline" className="h-20 flex-col">
                    <Link to="/assets/new">
                      <Package className="h-6 w-6 mb-2" />
                      Add Asset
                    </Link>
                  </Button>
                )}
                <Button asChild variant="outline" className="h-20 flex-col">
                  <Link to="/asset-request">
                    <FileText className="h-6 w-6 mb-2" />
                    Request Asset
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20 flex-col">
                  <Link to="/loss-report">
                    <AlertTriangle className="h-6 w-6 mb-2" />
                    Report Loss
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20 flex-col">
                  <Link to="/reports">
                    <FileText className="h-6 w-6 mb-2" />
                    View Reports
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {activity.type === 'asset_added' && <Package className="h-4 w-4 text-green-500" />}
                      {activity.type === 'request_approved' && <CheckCircle className="h-4 w-4 text-blue-500" />}
                      {activity.type === 'loss_reported' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      {activity.type === 'insurance_renewed' && <FileText className="h-4 w-4 text-purple-500" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Approvals */}
          {(user?.role === 'admin' || user?.role === 'staff') && (
            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>Items requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{item.id} - {item.type}</p>
                        <p className="text-sm text-muted-foreground">{item.requester} - {item.item}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
