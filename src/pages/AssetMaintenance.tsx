
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Calendar, MapPin, Wrench, Plus, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface MaintenanceRecord {
  id: string;
  date: string;
  type: string;
  description: string;
  technician: string;
  status: 'Completed' | 'In Progress' | 'Scheduled';
  cost: number;
  notes: string;
}

const AssetMaintenance = () => {
  const { assetCode } = useParams<{ assetCode: string }>();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMaintenance, setNewMaintenance] = useState({
    type: '',
    description: '',
    scheduledDate: '',
    technician: '',
    estimatedCost: '',
    notes: ''
  });

  // Mock asset data
  const asset = {
    name: 'Generator Unit A',
    code: assetCode || 'GEN-001',
    location: 'Building A - Basement',
    model: 'Caterpillar C32',
    serialNumber: 'CAT123456789',
    installDate: '2020-03-15',
    lastMaintenance: '2024-05-15'
  };

  // Mock maintenance records
  const maintenanceRecords: MaintenanceRecord[] = [
    {
      id: '1',
      date: '2024-05-15',
      type: 'Monthly Inspection',
      description: 'Routine monthly inspection and oil change',
      technician: 'John Smith',
      status: 'Completed',
      cost: 350,
      notes: 'All systems functioning normally. Oil level was low, replaced with new oil.'
    },
    {
      id: '2',
      date: '2024-04-12',
      type: 'Filter Replacement',
      description: 'Air and fuel filter replacement',
      technician: 'Mike Johnson',
      status: 'Completed',
      cost: 120,
      notes: 'Filters were dirty and needed replacement. Performance improved after replacement.'
    },
    {
      id: '3',
      date: '2024-03-20',
      type: 'Battery Check',
      description: 'Battery voltage and connection check',
      technician: 'Sarah Davis',
      status: 'Completed',
      cost: 75,
      notes: 'Battery connections were loose. Tightened and cleaned terminals.'
    },
    {
      id: '4',
      date: '2024-06-28',
      type: 'Quarterly Service',
      description: 'Comprehensive quarterly maintenance service',
      technician: 'John Smith',
      status: 'Scheduled',
      cost: 800,
      notes: 'Scheduled for quarterly comprehensive service including load test.'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'In Progress':
        return <Clock className="h-4 w-4" />;
      case 'Scheduled':
        return <Calendar className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string): "default" | "destructive" | "outline" | "secondary" => {
    switch (status) {
      case 'Completed':
        return 'secondary';
      case 'In Progress':
        return 'default';
      case 'Scheduled':
        return 'outline';
      default:
        return 'destructive';
    }
  };

  const handleAddMaintenance = () => {
    // In a real app, this would submit to an API
    console.log('Adding new maintenance:', newMaintenance);
    setNewMaintenance({
      type: '',
      description: '',
      scheduledDate: '',
      technician: '',
      estimatedCost: '',
      notes: ''
    });
    setIsAddDialogOpen(false);
  };

  const totalMaintenanceCost = maintenanceRecords
    .filter(record => record.status === 'Completed')
    .reduce((sum, record) => sum + record.cost, 0);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/preventive-maintenance">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Maintenance Schedule
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">{asset.name} Maintenance</h1>
              <p className="text-gray-600 mt-1">Asset Code: {asset.code}</p>
            </div>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Maintenance Task
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Maintenance Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="type">Maintenance Type</Label>
                  <Input
                    id="type"
                    value={newMaintenance.type}
                    onChange={(e) => setNewMaintenance({...newMaintenance, type: e.target.value})}
                    placeholder="e.g., Monthly Inspection"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newMaintenance.description}
                    onChange={(e) => setNewMaintenance({...newMaintenance, description: e.target.value})}
                    placeholder="Detailed description of maintenance task"
                  />
                </div>
                <div>
                  <Label htmlFor="scheduledDate">Scheduled Date</Label>
                  <Input
                    id="scheduledDate"
                    type="date"
                    value={newMaintenance.scheduledDate}
                    onChange={(e) => setNewMaintenance({...newMaintenance, scheduledDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="technician">Assigned Technician</Label>
                  <Input
                    id="technician"
                    value={newMaintenance.technician}
                    onChange={(e) => setNewMaintenance({...newMaintenance, technician: e.target.value})}
                    placeholder="Technician name"
                  />
                </div>
                <div>
                  <Label htmlFor="estimatedCost">Estimated Cost ($)</Label>
                  <Input
                    id="estimatedCost"
                    type="number"
                    value={newMaintenance.estimatedCost}
                    onChange={(e) => setNewMaintenance({...newMaintenance, estimatedCost: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newMaintenance.notes}
                    onChange={(e) => setNewMaintenance({...newMaintenance, notes: e.target.value})}
                    placeholder="Additional notes or instructions"
                  />
                </div>
                <Button onClick={handleAddMaintenance} className="w-full">
                  Add Maintenance Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Asset Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Asset Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Location</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{asset.location}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Model</Label>
                  <p className="mt-1">{asset.model}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Serial Number</Label>
                  <p className="mt-1">{asset.serialNumber}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Install Date</Label>
                  <p className="mt-1">{new Date(asset.installDate).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Maintenance Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Last Maintenance</Label>
                <p className="mt-1">{new Date(asset.lastMaintenance).toLocaleDateString()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Total Records</Label>
                <p className="mt-1">{maintenanceRecords.length}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Total Cost (YTD)</Label>
                <p className="mt-1 text-lg font-semibold">${totalMaintenanceCost.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Maintenance Records */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Maintenance History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Technician</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenanceRecords
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {new Date(record.date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{record.type}</div>
                        <div className="text-sm text-gray-500">{record.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>{record.technician}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(record.status)} className="flex items-center gap-1 w-fit">
                        {getStatusIcon(record.status)}
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>${record.cost.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={record.notes}>
                        {record.notes}
                      </div>
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

export default AssetMaintenance;
