
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, MapPin, Wrench, AlertCircle, Clock, CheckCircle } from 'lucide-react';

interface MaintenanceSchedule {
  id: string;
  assetName: string;
  assetCode: string;
  scheduledDate: string;
  location: string;
  maintenanceType: string;
  status: 'Overdue' | 'Soon Due' | 'Planned';
  description: string;
}

const PreventiveMaintenance = () => {
  // Mock data for scheduled maintenance
  const scheduledMaintenance: MaintenanceSchedule[] = [
    {
      id: '1',
      assetName: 'Generator Unit A',
      assetCode: 'GEN-001',
      scheduledDate: '2024-06-15',
      location: 'Building A - Basement',
      maintenanceType: 'Monthly Inspection',
      status: 'Overdue',
      description: 'Routine monthly inspection and oil change'
    },
    {
      id: '2',
      assetName: 'HVAC System',
      assetCode: 'HVAC-001',
      scheduledDate: '2024-06-28',
      location: 'Building B - Rooftop',
      maintenanceType: 'Filter Replacement',
      status: 'Soon Due',
      description: 'Replace air filters and check refrigerant levels'
    },
    {
      id: '3',
      assetName: 'Elevator Unit 1',
      assetCode: 'ELV-001',
      scheduledDate: '2024-07-10',
      location: 'Building A - Main',
      maintenanceType: 'Safety Inspection',
      status: 'Planned',
      description: 'Annual safety inspection and cable check'
    },
    {
      id: '4',
      assetName: 'Fire Pump System',
      assetCode: 'FP-001',
      scheduledDate: '2024-06-30',
      location: 'Building C - Pump Room',
      maintenanceType: 'Performance Test',
      status: 'Soon Due',
      description: 'Monthly performance test and pressure check'
    },
    {
      id: '5',
      assetName: 'Backup Generator',
      assetCode: 'GEN-002',
      scheduledDate: '2024-07-15',
      location: 'Building B - Ground Floor',
      maintenanceType: 'Preventive Service',
      status: 'Planned',
      description: 'Quarterly service and load bank test'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Overdue':
        return <AlertCircle className="h-4 w-4" />;
      case 'Soon Due':
        return <Clock className="h-4 w-4" />;
      case 'Planned':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string): "default" | "destructive" | "outline" | "secondary" => {
    switch (status) {
      case 'Overdue':
        return 'destructive';
      case 'Soon Due':
        return 'outline';
      case 'Planned':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getStatusCounts = () => {
    const counts = scheduledMaintenance.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Preventive Maintenance</h1>
            <p className="text-gray-600 mt-2">Manage scheduled maintenance for all assets</p>
          </div>
        </div>

        {/* Status Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{statusCounts['Overdue'] || 0}</div>
              <p className="text-xs text-muted-foreground">Require immediate attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Soon Due</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">{statusCounts['Soon Due'] || 0}</div>
              <p className="text-xs text-muted-foreground">Due within 7 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Planned</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{statusCounts['Planned'] || 0}</div>
              <p className="text-xs text-muted-foreground">Scheduled for future</p>
            </CardContent>
          </Card>
        </div>

        {/* Maintenance Schedule Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Scheduled Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Scheduled Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduledMaintenance.map((maintenance) => (
                  <TableRow key={maintenance.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{maintenance.assetName}</div>
                        <div className="text-sm text-gray-500">{maintenance.assetCode}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {new Date(maintenance.scheduledDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        {maintenance.location}
                      </div>
                    </TableCell>
                    <TableCell>{maintenance.maintenanceType}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(maintenance.status)} className="flex items-center gap-1 w-fit">
                        {getStatusIcon(maintenance.status)}
                        {maintenance.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link to={`/asset-maintenance/${maintenance.assetCode}`}>
                        <Button variant="outline" size="sm">
                          <Wrench className="h-4 w-4 mr-1" />
                          Manage
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PreventiveMaintenance;
