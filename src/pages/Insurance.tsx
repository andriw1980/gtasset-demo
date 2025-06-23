import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Plus, Edit, Trash2, AlertTriangle, Calendar } from 'lucide-react';

const Insurance = () => {
  const [formData, setFormData] = useState({
    provider: '',
    policyNumber: '',
    coverageType: '',
    coverageAmount: '',
    premium: '',
    startDate: '',
    expiryDate: ''
  });

  // Mock insurance policies
  const insurancePolicies = [
    {
      id: 'INS001',
      provider: 'ABC Insurance Co.',
      policyNumber: 'POL-2024-001',
      coverageType: 'General Asset Coverage',
      coverageAmount: '$2,000,000',
      premium: '$12,000',
      startDate: '2024-01-01',
      expiryDate: '2024-12-31',
      status: 'Active',
      daysUntilExpiry: 285
    },
    {
      id: 'INS002',
      provider: 'XYZ Insurance Group',
      policyNumber: 'POL-2024-002',
      coverageType: 'IT Equipment Specific',
      coverageAmount: '$500,000',
      premium: '$4,500',
      startDate: '2024-02-01',
      expiryDate: '2025-01-31',
      status: 'Active',
      daysUntilExpiry: 316
    },
    {
      id: 'INS003',
      provider: 'SecureAsset Insurance',
      policyNumber: 'POL-2023-003',
      coverageType: 'Vehicle Insurance',
      coverageAmount: '$100,000',
      premium: '$2,400',
      startDate: '2023-06-01',
      expiryDate: '2024-05-31',
      status: 'Expiring Soon',
      daysUntilExpiry: 45
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Insurance policy added:', formData);
    // Handle form submission
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      'Active': 'default',
      'Expiring Soon': 'destructive',
      'Expired': 'secondary'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const getExpiryAlert = (daysUntilExpiry: number) => {
    if (daysUntilExpiry <= 30) {
      return 'destructive';
    } else if (daysUntilExpiry <= 90) {
      return 'default';
    }
    return null;
  };

  const upcomingExpirations = insurancePolicies.filter(policy => policy.daysUntilExpiry <= 90);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Insurance Management</h1>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Policy
          </Button>
        </div>

        {upcomingExpirations.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {upcomingExpirations.length} insurance {upcomingExpirations.length === 1 ? 'policy' : 'policies'} 
              {upcomingExpirations.length === 1 ? ' is' : ' are'} expiring within 90 days. Please review and renew.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Insurance Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="provider">Insurance Provider *</Label>
                  <Input
                    id="provider"
                    value={formData.provider}
                    onChange={(e) => handleInputChange('provider', e.target.value)}
                    placeholder="Enter insurance provider"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="policyNumber">Policy Number *</Label>
                  <Input
                    id="policyNumber"
                    value={formData.policyNumber}
                    onChange={(e) => handleInputChange('policyNumber', e.target.value)}
                    placeholder="Enter policy number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverageType">Coverage Type *</Label>
                  <Select value={formData.coverageType} onValueChange={(value) => handleInputChange('coverageType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select coverage type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Asset Coverage</SelectItem>
                      <SelectItem value="it-specific">IT Equipment Specific</SelectItem>
                      <SelectItem value="vehicle">Vehicle Insurance</SelectItem>
                      <SelectItem value="property">Property Insurance</SelectItem>
                      <SelectItem value="liability">Liability Insurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="coverageAmount">Coverage Amount ($)</Label>
                    <Input
                      id="coverageAmount"
                      type="number"
                      value={formData.coverageAmount}
                      onChange={(e) => handleInputChange('coverageAmount', e.target.value)}
                      placeholder="Coverage amount"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="premium">Annual Premium ($)</Label>
                    <Input
                      id="premium"
                      type="number"
                      value={formData.premium}
                      onChange={(e) => handleInputChange('premium', e.target.value)}
                      placeholder="Annual premium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Policy Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Policy Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Add Policy
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Policy Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{insurancePolicies.filter(p => p.status === 'Active').length}</p>
                  <p className="text-sm text-green-600">Active Policies</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">{upcomingExpirations.length}</p>
                  <p className="text-sm text-red-600">Expiring Soon</p>
                </div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  ${insurancePolicies.reduce((sum, policy) => sum + parseInt(policy.coverageAmount.replace(/[$,]/g, '')), 0).toLocaleString()}
                </p>
                <p className="text-sm text-blue-600">Total Coverage Amount</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Insurance Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Policy ID</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Coverage Type</TableHead>
                  <TableHead>Coverage Amount</TableHead>
                  <TableHead>Annual Premium</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {insurancePolicies.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell className="font-medium">{policy.id}</TableCell>
                    <TableCell>{policy.provider}</TableCell>
                    <TableCell>{policy.coverageType}</TableCell>
                    <TableCell>{policy.coverageAmount}</TableCell>
                    <TableCell>{policy.premium}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span>{policy.expiryDate}</span>
                        {policy.daysUntilExpiry <= 90 && (
                          <Calendar className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(policy.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
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

export default Insurance;
