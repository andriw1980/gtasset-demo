
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, MapPin, Wrench, AlertCircle, Clock, CheckCircle, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    assetCode: '',
    scheduledDate: '',
    maintenanceType: '',
    description: ''
  });

  // Mock data for assets
  const assets = [
    { code: 'GEN-001', name: 'Generator Unit A', location: 'Building A - Basement' },
    { code: 'HVAC-001', name: 'HVAC System', location: 'Building B - Rooftop' },
    { code: 'ELV-001', name: 'Elevator Unit 1', location: 'Building A - Main' },
    { code: 'FP-001', name: 'Fire Pump System', location: 'Building C - Pump Room' },
    { code: 'GEN-002', name: 'Backup Generator', location: 'Building B - Ground Floor' }
  ];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedAsset = assets.find(asset => asset.code === formData.assetCode);
    
    if (!selectedAsset) {
      toast({
        title: "Error",
        description: "Please select an asset",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically save to backend
    toast({
      title: "Success",
      description: "Maintenance task scheduled successfully"
    });

    // Reset form
    setFormData({
      assetCode: '',
      scheduledDate: '',
      maintenanceType: '',
      description: ''
    });
    setShowAddForm(false);
  };

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
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="h-4 w-4 mr-2" />
            {showAddForm ? 'Cancel' : 'Schedule New Maintenance'}
          </Button>
        </div>

        {/* Add New Maintenance Form */}
        {showAddForm && (
          <Card>
            <CardHeader>
              <CardTitle>Schedule New Maintenance Task</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="asset">Select Asset</Label>
                    <Select value={formData.assetCode} onValueChange={(value) => setFormData({...formData, assetCode: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an asset" />
                      </SelectTrigger>
                      <SelectContent>
                        {assets.map((asset) => (
                          <SelectItem key={asset.code} value={asset.code}>
                            {asset.name} ({asset.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scheduledDate">Scheduled Date</Label>
                    <Input
                      id="scheduledDate"
                      type="date"
                      value={formData.scheduledDate}
                      onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maintenanceType">Maintenance Type</Label>
                    <Select value={formData.maintenanceType} onValueChange={(value) => setFormData({...formData, maintenanceType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select maintenance type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Monthly Inspection">Monthly Inspection</SelectItem>
                        <SelectItem value="Filter Replacement">Filter Replacement</SelectItem>
                        <SelectItem value="Safety Inspection">Safety Inspection</SelectItem>
                        <SelectItem value="Performance Test">Performance Test</SelectItem>
                        <SelectItem value="Preventive Service">Preventive Service</SelectItem>
                        <SelectItem value="Oil Change">Oil Change</SelectItem>
                        <SelectItem value="Cleaning">Cleaning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the maintenance task..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit">Schedule Maintenance</Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

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
