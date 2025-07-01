
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
      assetType: 'Laptop Komputer',
      category: 'Peralatan IT',
      requestDate: '2024-01-15',
      status: 'Approved',
      urgency: 'Medium',
      estimatedCost: 'Rp 18.000.000'
    },
    {
      id: 'REQ002',
      assetType: 'Kursi Kantor',
      category: 'Furniture',
      requestDate: '2024-01-10',
      status: 'Pending',
      urgency: 'Low',
      estimatedCost: 'Rp 5.250.000'
    },
    {
      id: 'REQ003',
      assetType: 'Printer',
      category: 'Peralatan IT',
      requestDate: '2024-01-05',
      status: 'Rejected',
      urgency: 'High',
      estimatedCost: 'Rp 12.000.000'
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
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      'Approved': 'default',
      'Pending': 'secondary',
      'Rejected': 'destructive'
    };
    return <Badge variant={variants[status] || 'default'} className="bg-primary text-white">{status}</Badge>;
  };

  const getUrgencyBadge = (urgency: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      'High': 'destructive',
      'Medium': 'secondary',
      'Low': 'default'
    };
    return <Badge variant={variants[urgency] || 'default'}>{urgency}</Badge>;
  };

  return (
    <Layout>
      <div className="space-y-4 lg:space-y-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary">Asset Request</h1>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="bg-primary/10 rounded-t-lg">
              <CardTitle className="text-primary text-lg lg:text-xl">New Asset Request</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 lg:pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="assetType" className="text-primary font-medium text-sm">Asset Type *</Label>
                    <Input
                      id="assetType"
                      value={formData.assetType}
                      onChange={(e) => handleInputChange('assetType', e.target.value)}
                      placeholder="Enter asset type"
                      className="border-primary/20 focus:border-primary text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-primary font-medium text-sm">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className="border-primary/20 focus:border-primary text-sm">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="it-equipment">IT Equipment</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="vehicle">Vehicle</SelectItem>
                        <SelectItem value="machinery">Machinery</SelectItem>
                        <SelectItem value="office-supplies">Office Supplies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="urgency" className="text-primary font-medium text-sm">Urgency Level *</Label>
                    <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                      <SelectTrigger className="border-primary/20 focus:border-primary text-sm">
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedCost" className="text-primary font-medium text-sm">Estimated Cost</Label>
                    <Input
                      id="estimatedCost"
                      type="number"
                      value={formData.estimatedCost}
                      onChange={(e) => handleInputChange('estimatedCost', e.target.value)}
                      placeholder="Enter estimated cost"
                      className="border-primary/20 focus:border-primary text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredVendor" className="text-primary font-medium text-sm">Preferred Vendor</Label>
                  <Select value={formData.preferredVendor} onValueChange={(value) => handleInputChange('preferredVendor', value)}>
                    <SelectTrigger className="border-primary/20 focus:border-primary text-sm">
                      <SelectValue placeholder="Select vendor (optional)" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="dell">PT Teknologi Nusantara</SelectItem>
                      <SelectItem value="hp">CV Mandiri Furniture</SelectItem>
                      <SelectItem value="office-plus">PT Bintang Konstruksi</SelectItem>
                      <SelectItem value="tech-supply">Toko Alat Tulis Jaya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="justification" className="text-primary font-medium text-sm">Business Justification *</Label>
                  <Textarea
                    id="justification"
                    value={formData.justification}
                    onChange={(e) => handleInputChange('justification', e.target.value)}
                    placeholder="Explain why this asset is needed"
                    rows={4}
                    className="border-primary/20 focus:border-primary text-sm resize-none"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="bg-accent/10 rounded-t-lg">
              <CardTitle className="text-primary text-lg lg:text-xl">Request History</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 lg:pt-6">
              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {requestHistory.map((request) => (
                  <Card key={request.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-sm text-primary">{request.id}</h3>
                            <p className="text-xs text-gray-600">{request.assetType}</p>
                          </div>
                          <Button size="sm" variant="outline" className="border-primary/20 text-primary hover:bg-primary/10 p-1 h-8 w-8">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-xs text-gray-600">
                          <p>{request.category}</p>
                          <p className="mt-1">{request.requestDate}</p>
                          <p>{request.estimatedCost}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            {getStatusBadge(request.status)}
                            {getUrgencyBadge(request.urgency)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-primary/20">
                      <TableHead className="text-primary font-semibold min-w-[100px]">Request ID</TableHead>
                      <TableHead className="text-primary font-semibold min-w-[150px]">Asset Type</TableHead>
                      <TableHead className="text-primary font-semibold min-w-[100px]">Status</TableHead>
                      <TableHead className="text-primary font-semibold min-w-[100px]">Urgency</TableHead>
                      <TableHead className="text-primary font-semibold min-w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requestHistory.map((request) => (
                      <TableRow key={request.id} className="border-primary/10 hover:bg-primary/5">
                        <TableCell className="font-medium text-primary">{request.id}</TableCell>
                        <TableCell>{request.assetType}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>{getUrgencyBadge(request.urgency)}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AssetRequest;
