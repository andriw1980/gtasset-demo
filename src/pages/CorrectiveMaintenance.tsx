
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, MapPin, AlertTriangle, Clock, CheckCircle, Plus, FileCheck, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CorrectiveMaintenanceItem {
  id: string;
  assetName: string;
  assetCode: string;
  damageDate: string;
  location: string;
  description: string;
  insuranceCovered: boolean;
  repairStatus: 'Not Repaired' | 'Insurance Claim' | 'Under Repair' | 'Completed';
  damageType: string;
  estimatedCost: number;
}

const CorrectiveMaintenance = () => {
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    assetCode: '',
    damageDate: '',
    description: '',
    damageType: '',
    estimatedCost: '',
    insuranceCovered: false
  });

  // Mock data for assets needing repair
  const correctiveMaintenanceItems: CorrectiveMaintenanceItem[] = [
    {
      id: '1',
      assetName: 'Generator Unit A',
      assetCode: 'GEN-001',
      damageDate: '2024-06-10',
      location: 'Building A - Basement',
      description: 'Engine overheating, requires cooling system repair',
      insuranceCovered: true,
      repairStatus: 'Insurance Claim',
      damageType: 'Mechanical Failure',
      estimatedCost: 15000
    },
    {
      id: '2',
      assetName: 'HVAC System',
      assetCode: 'HVAC-001',
      damageDate: '2024-06-15',
      location: 'Building B - Rooftop',
      description: 'Compressor unit damaged due to electrical surge',
      insuranceCovered: false,
      repairStatus: 'Under Repair',
      damageType: 'Electrical Damage',
      estimatedCost: 8500
    },
    {
      id: '3',
      assetName: 'Elevator Unit 1',
      assetCode: 'ELV-001',
      damageDate: '2024-06-20',
      location: 'Building A - Main',
      description: 'Cable wear detected during inspection',
      insuranceCovered: true,
      repairStatus: 'Not Repaired',
      damageType: 'Wear and Tear',
      estimatedCost: 12000
    },
    {
      id: '4',
      assetName: 'Fire Pump System',
      assetCode: 'FP-001',
      damageDate: '2024-06-05',
      location: 'Building C - Pump Room',
      description: 'Pump motor failure, complete replacement needed',
      insuranceCovered: false,
      repairStatus: 'Completed',
      damageType: 'Motor Failure',
      estimatedCost: 6000
    }
  ];

  // Mock data for assets
  const assets = [
    { code: 'GEN-001', name: 'Generator Unit A', location: 'Building A - Basement' },
    { code: 'HVAC-001', name: 'HVAC System', location: 'Building B - Rooftop' },
    { code: 'ELV-001', name: 'Elevator Unit 1', location: 'Building A - Main' },
    { code: 'FP-001', name: 'Fire Pump System', location: 'Building C - Pump Room' },
    { code: 'GEN-002', name: 'Backup Generator', location: 'Building B - Ground Floor' }
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

    toast({
      title: "Success",
      description: "Corrective maintenance request submitted successfully"
    });

    // Reset form
    setFormData({
      assetCode: '',
      damageDate: '',
      description: '',
      damageType: '',
      estimatedCost: '',
      insuranceCovered: false
    });
    setShowAddForm(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Not Repaired':
        return <AlertTriangle className="h-4 w-4" />;
      case 'Insurance Claim':
        return <FileCheck className="h-4 w-4" />;
      case 'Under Repair':
        return <Clock className="h-4 w-4" />;
      case 'Completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string): "default" | "destructive" | "outline" | "secondary" => {
    switch (status) {
      case 'Not Repaired':
        return 'destructive';
      case 'Insurance Claim':
        return 'outline';
      case 'Under Repair':
        return 'default';
      case 'Completed':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getStatusCounts = () => {
    const counts = correctiveMaintenanceItems.reduce((acc, item) => {
      acc[item.repairStatus] = (acc[item.repairStatus] || 0) + 1;
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
            <h1 className="text-3xl font-bold">Corrective Maintenance</h1>
            <p className="text-gray-600 mt-2">Manage asset repairs and damage reports</p>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="h-4 w-4 mr-2" />
            {showAddForm ? 'Cancel' : 'Report Damage'}
          </Button>
        </div>

        {/* Add New Damage Report Form */}
        {showAddForm && (
          <Card>
            <CardHeader>
              <CardTitle>Report Asset Damage</CardTitle>
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
                    <Label htmlFor="damageDate">Date of Damage</Label>
                    <Input
                      id="damageDate"
                      type="date"
                      value={formData.damageDate}
                      onChange={(e) => setFormData({...formData, damageDate: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="damageType">Damage Type</Label>
                    <Select value={formData.damageType} onValueChange={(value) => setFormData({...formData, damageType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select damage type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mechanical Failure">Mechanical Failure</SelectItem>
                        <SelectItem value="Electrical Damage">Electrical Damage</SelectItem>
                        <SelectItem value="Wear and Tear">Wear and Tear</SelectItem>
                        <SelectItem value="Motor Failure">Motor Failure</SelectItem>
                        <SelectItem value="Structural Damage">Structural Damage</SelectItem>
                        <SelectItem value="Water Damage">Water Damage</SelectItem>
                        <SelectItem value="Fire Damage">Fire Damage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedCost">Estimated Repair Cost</Label>
                    <Input
                      id="estimatedCost"
                      type="number"
                      placeholder="Enter amount"
                      value={formData.estimatedCost}
                      onChange={(e) => setFormData({...formData, estimatedCost: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Damage Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the damage in detail..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    id="insuranceCovered"
                    type="checkbox"
                    checked={formData.insuranceCovered}
                    onChange={(e) => setFormData({...formData, insuranceCovered: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="insuranceCovered">Covered by Insurance</Label>
                </div>

                <div className="flex gap-2">
                  <Button type="submit">Submit Report</Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Status Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Not Repaired</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{statusCounts['Not Repaired'] || 0}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Insurance Claim</CardTitle>
              <FileCheck className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{statusCounts['Insurance Claim'] || 0}</div>
              <p className="text-xs text-muted-foreground">Pending approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Under Repair</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">{statusCounts['Under Repair'] || 0}</div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{statusCounts['Completed'] || 0}</div>
              <p className="text-xs text-muted-foreground">Repair finished</p>
            </CardContent>
          </Card>
        </div>

        {/* Corrective Maintenance Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Assets Requiring Repair
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Damage Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Damage Type</TableHead>
                  <TableHead>Insurance</TableHead>
                  <TableHead>Estimated Cost</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {correctiveMaintenanceItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.assetName}</div>
                        <div className="text-sm text-gray-500">{item.assetCode}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {new Date(item.damageDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        {item.location}
                      </div>
                    </TableCell>
                    <TableCell>{item.damageType}</TableCell>
                    <TableCell>
                      <Badge variant={item.insuranceCovered ? 'default' : 'secondary'}>
                        {item.insuranceCovered ? 'Covered' : 'Not Covered'}
                      </Badge>
                    </TableCell>
                    <TableCell>${item.estimatedCost.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(item.repairStatus)} className="flex items-center gap-1 w-fit">
                        {getStatusIcon(item.repairStatus)}
                        {item.repairStatus}
                      </Badge>
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

export default CorrectiveMaintenance;
