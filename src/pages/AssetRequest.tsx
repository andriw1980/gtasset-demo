
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Send, Plus, Eye } from 'lucide-react';

const AssetRequest = () => {
  const [formData, setFormData] = useState({
    assetType: '',
    category: '',
    justification: '',
    urgency: '',
    estimatedCost: '',
    preferredVendor: ''
  });

  // Mock request history
  const requestHistory = [
    {
      id: 'REQ001',
      assetType: 'Laptop Computer',
      category: 'IT Equipment',
      requestDate: '2024-01-15',
      status: 'Approved',
      urgency: 'Medium',
      estimatedCost: '$1,200'
    },
    {
      id: 'REQ002',
      assetType: 'Office Chair',
      category: 'Furniture',
      requestDate: '2024-01-10',
      status: 'Pending',
      urgency: 'Low',
      estimatedCost: '$350'
    },
    {
      id: 'REQ003',
      assetType: 'Printer',
      category: 'IT Equipment',
      requestDate: '2024-01-05',
      status: 'Rejected',
      urgency: 'High',
      estimatedCost: '$800'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Asset request submitted:', formData);
    // Handle form submission
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Approved': 'default',
      'Pending': 'secondary',
      'Rejected': 'destructive'
    };
    return <Badge variant={variants[status as keyof typeof variants] || 'default'}>{status}</Badge>;
  };

  const getUrgencyBadge = (urgency: string) => {
    const variants = {
      'High': 'destructive',
      'Medium': 'secondary',
      'Low': 'default'
    };
    return <Badge variant={variants[urgency as keyof typeof variants] || 'default'}>{urgency}</Badge>;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Asset Request</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>New Asset Request</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="assetType">Asset Type *</Label>
                  <Input
                    id="assetType"
                    value={formData.assetType}
                    onChange={(e) => handleInputChange('assetType', e.target.value)}
                    placeholder="Enter asset type"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it-equipment">IT Equipment</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="vehicle">Vehicle</SelectItem>
                      <SelectItem value="machinery">Machinery</SelectItem>
                      <SelectItem value="office-supplies">Office Supplies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level *</Label>
                  <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedCost">Estimated Cost</Label>
                  <Input
                    id="estimatedCost"
                    type="number"
                    value={formData.estimatedCost}
                    onChange={(e) => handleInputChange('estimatedCost', e.target.value)}
                    placeholder="Enter estimated cost"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredVendor">Preferred Vendor</Label>
                  <Select value={formData.preferredVendor} onValueChange={(value) => handleInputChange('preferredVendor', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dell">Dell Technologies</SelectItem>
                      <SelectItem value="hp">HP Inc.</SelectItem>
                      <SelectItem value="office-plus">Office Furniture Plus</SelectItem>
                      <SelectItem value="tech-supply">TechSupply Corp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="justification">Business Justification *</Label>
                  <Textarea
                    id="justification"
                    value={formData.justification}
                    onChange={(e) => handleInputChange('justification', e.target.value)}
                    placeholder="Explain why this asset is needed"
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Request History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Asset Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requestHistory.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.assetType}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>{getUrgencyBadge(request.urgency)}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AssetRequest;
