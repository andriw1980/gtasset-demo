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
import { AlertTriangle, Upload, Send, Eye } from 'lucide-react';

const LossReport = () => {
  const [formData, setFormData] = useState({
    assetId: '',
    incidentType: '',
    incidentDate: '',
    location: '',
    description: '',
    estimatedValue: '',
    reportedBy: ''
  });

  // Mock loss report history
  const lossHistory = [
    {
      id: 'LOSS001',
      assetId: 'AST001',
      assetName: 'Dell Laptop OptiPlex 3090',
      incidentType: 'Theft',
      incidentDate: '2024-01-12',
      location: 'Building A - Floor 2',
      status: 'Under Investigation',
      estimatedValue: '$1,200'
    },
    {
      id: 'LOSS002',
      assetId: 'AST015',
      assetName: '27" Monitor',
      incidentType: 'Damage',
      incidentDate: '2024-01-08',
      location: 'Building B - Floor 1',
      status: 'Resolved',
      estimatedValue: '$300'
    },
    {
      id: 'LOSS003',
      assetId: 'AST025',
      assetName: 'Office Chair',
      incidentType: 'Lost',
      incidentDate: '2024-01-05',
      location: 'Building A - Conference Room',
      status: 'Pending Review',
      estimatedValue: '$350'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Loss report submitted:', formData);
    // Handle form submission
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      'Under Investigation': 'secondary',
      'Resolved': 'default',
      'Pending Review': 'destructive'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const getIncidentBadge = (type: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      'Theft': 'destructive',
      'Damage': 'secondary',
      'Lost': 'default'
    };
    return <Badge variant={variants[type] || 'default'}>{type}</Badge>;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <h1 className="text-3xl font-bold">Loss & Incident Reporting</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Report New Incident</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="assetId">Asset ID *</Label>
                  <Input
                    id="assetId"
                    value={formData.assetId}
                    onChange={(e) => handleInputChange('assetId', e.target.value)}
                    placeholder="Enter asset ID"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incidentType">Incident Type *</Label>
                  <Select value={formData.incidentType} onValueChange={(value) => handleInputChange('incidentType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select incident type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="theft">Theft</SelectItem>
                      <SelectItem value="damage">Damage</SelectItem>
                      <SelectItem value="lost">Lost</SelectItem>
                      <SelectItem value="vandalism">Vandalism</SelectItem>
                      <SelectItem value="fire">Fire Damage</SelectItem>
                      <SelectItem value="water">Water Damage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incidentDate">Incident Date *</Label>
                  <Input
                    id="incidentDate"
                    type="date"
                    value={formData.incidentDate}
                    onChange={(e) => handleInputChange('incidentDate', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="building-a-f1">Building A - Floor 1</SelectItem>
                      <SelectItem value="building-a-f2">Building A - Floor 2</SelectItem>
                      <SelectItem value="building-b-f1">Building B - Floor 1</SelectItem>
                      <SelectItem value="building-b-f2">Building B - Floor 2</SelectItem>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                      <SelectItem value="parking">Parking Area</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedValue">Estimated Value ($)</Label>
                  <Input
                    id="estimatedValue"
                    type="number"
                    value={formData.estimatedValue}
                    onChange={(e) => handleInputChange('estimatedValue', e.target.value)}
                    placeholder="Enter estimated value"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Incident Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe the incident in detail"
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Supporting Documents</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload photos or documents</p>
                    <Button variant="outline" size="sm">
                      Choose Files
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Report
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Loss Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lossHistory.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{report.assetId}</p>
                          <p className="text-sm text-muted-foreground">{report.assetName}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getIncidentBadge(report.incidentType)}</TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
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

export default LossReport;
