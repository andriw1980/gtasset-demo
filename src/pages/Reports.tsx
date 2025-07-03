
import React, { useState } from 'react';
import Layout from '../components/Layout';
import ExportButton from '../components/ExportButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, Download, FileText, BarChart3, PieChart, Plus, Filter, Settings } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const Reports = () => {
  const { toast } = useToast();
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedReport, setSelectedReport] = useState('');
  const [customReportName, setCustomReportName] = useState('');
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  // Mock data for default reports
  const assetListData = [
    { id: 'AST001', name: 'Laptop Dell OptiPlex 3090', category: 'Peralatan IT', location: 'Gedung A - Lantai 2', status: 'Aktif', value: 'Rp 18.000.000' },
    { id: 'AST002', name: 'Kursi Kantor Ergonomis', category: 'Furniture', location: 'Gedung B - Lantai 1', status: 'Aktif', value: 'Rp 5.250.000' },
    { id: 'AST003', name: 'Printer HP LaserJet Pro', category: 'Peralatan IT', location: 'Gedung A - Lantai 1', status: 'Maintenance', value: 'Rp 12.000.000' },
  ];

  const insuranceData = [
    { assetId: 'AST001', assetName: 'Laptop Dell OptiPlex 3090', insuranceProvider: 'PT Asuransi ABC', policyNumber: 'POL001', premium: 'Rp 500.000', expiryDate: '2024-12-31' },
    { assetId: 'AST002', assetName: 'Kursi Kantor Ergonomis', insuranceProvider: 'PT Asuransi XYZ', policyNumber: 'POL002', premium: 'Rp 300.000', expiryDate: '2024-11-30' },
  ];

  const categoryData = [
    { category: 'Peralatan IT', count: 15, totalValue: 'Rp 250.000.000' },
    { category: 'Furniture', count: 8, totalValue: 'Rp 120.000.000' },
    { category: 'Kendaraan', count: 3, totalValue: 'Rp 450.000.000' },
  ];

  const maintenanceData = [
    { assetId: 'AST001', assetName: 'Laptop Dell OptiPlex 3090', maintenanceType: 'Preventive', scheduledDate: '2024-01-15', status: 'Completed', cost: 'Rp 500.000' },
    { assetId: 'AST003', assetName: 'Printer HP LaserJet Pro', maintenanceType: 'Corrective', scheduledDate: '2024-01-20', status: 'In Progress', cost: 'Rp 750.000' },
  ];

  const defaultReports = [
    {
      id: 'list-of-assets',
      title: 'List of Assets',
      description: 'Complete list of all assets with their details',
      icon: FileText,
      data: assetListData
    },
    {
      id: 'insurance-report',
      title: 'Insurance Report',
      description: 'Insurance coverage details for all assets',
      icon: BarChart3,
      data: insuranceData
    },
    {
      id: 'assets-per-category',
      title: 'Assets per Category',
      description: 'Asset distribution by category with totals',
      icon: PieChart,
      data: categoryData
    },
    {
      id: 'maintenance-report',
      title: 'Maintenance Report',
      description: 'Maintenance activities and schedules',
      icon: FileText,
      data: maintenanceData
    }
  ];

  const availableFields = [
    'Asset ID', 'Asset Name', 'Category', 'Location', 'Status', 'Value',
    'Purchase Date', 'Vendor', 'Assigned To', 'Insurance Provider', 'Maintenance Type'
  ];

  const handleGenerateReport = (reportId: string) => {
    const report = defaultReports.find(r => r.id === reportId);
    if (report) {
      toast({
        title: "Report Generated",
        description: `${report.title} has been generated successfully`
      });
    }
  };

  const handleCreateCustomReport = () => {
    if (!customReportName || selectedFields.length === 0) {
      toast({
        title: "Error",
        description: "Please provide report name and select at least one field"
      });
      return;
    }

    toast({
      title: "Custom Report Created",
      description: `${customReportName} has been created successfully`
    });

    // Reset form
    setCustomReportName('');
    setSelectedFields([]);
  };

  const handleFieldToggle = (field: string) => {
    setSelectedFields(prev => 
      prev.includes(field) 
        ? prev.filter(f => f !== field)
        : [...prev, field]
    );
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      'Aktif': 'default',
      'Maintenance': 'secondary',
      'Completed': 'default',
      'In Progress': 'secondary'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        </div>

        <Tabs defaultValue="default" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="default">Default Reports</TabsTrigger>
            <TabsTrigger value="custom">Customizable Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="default" className="space-y-6">
            {/* Report Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Report Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Report Period</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current-month">Current Month</SelectItem>
                        <SelectItem value="last-month">Last Month</SelectItem>
                        <SelectItem value="current-quarter">Current Quarter</SelectItem>
                        <SelectItem value="current-year">Current Year</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>From Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateFrom ? format(dateFrom, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>To Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateTo ? format(dateTo, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="building-a">Building A</SelectItem>
                        <SelectItem value="building-b">Building B</SelectItem>
                        <SelectItem value="warehouse-c">Warehouse C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Default Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {defaultReports.map((report) => {
                const IconComponent = report.icon;
                return (
                  <Card key={report.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <IconComponent className="h-6 w-6 text-primary" />
                          <CardTitle className="text-lg">{report.title}</CardTitle>
                        </div>
                        <ExportButton 
                          data={report.data}
                          filename={report.id}
                          onExport={(format) => {
                            toast({
                              title: "Export Successful",
                              description: `${report.title} exported in ${format.toUpperCase()} format`
                            });
                          }}
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{report.description}</p>
                      
                      {/* Show sample data */}
                      <div className="border rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              {Object.keys(report.data[0] || {}).map((key) => (
                                <TableHead key={key} className="text-xs">
                                  {key.charAt(0).toUpperCase() + key.slice(1)}
                                </TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {report.data.slice(0, 2).map((row, index) => (
                              <TableRow key={index}>
                                {Object.values(row).map((value, cellIndex) => (
                                  <TableCell key={cellIndex} className="text-xs">
                                    {typeof value === 'string' && (value === 'Aktif' || value === 'Maintenance' || value === 'Completed' || value === 'In Progress') 
                                      ? getStatusBadge(value)
                                      : String(value)
                                    }
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <Button 
                          size="sm" 
                          onClick={() => handleGenerateReport(report.id)}
                          className="flex-1"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Generate Full Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Custom Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reportName">Report Name</Label>
                    <Input
                      id="reportName"
                      placeholder="Enter report name"
                      value={customReportName}
                      onChange={(e) => setCustomReportName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Report Type</Label>
                    <Select value={selectedReport} onValueChange={setSelectedReport}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asset-summary">Asset Summary</SelectItem>
                        <SelectItem value="financial-report">Financial Report</SelectItem>
                        <SelectItem value="operational-report">Operational Report</SelectItem>
                        <SelectItem value="compliance-report">Compliance Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Select Fields to Include</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4 border rounded-lg">
                    {availableFields.map((field) => (
                      <div key={field} className="flex items-center space-x-2">
                        <Checkbox
                          id={field}
                          checked={selectedFields.includes(field)}
                          onCheckedChange={() => handleFieldToggle(field)}
                        />
                        <Label htmlFor={field} className="text-sm">{field}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Group By</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grouping" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="category">Category</SelectItem>
                        <SelectItem value="location">Location</SelectItem>
                        <SelectItem value="status">Status</SelectItem>
                        <SelectItem value="vendor">Vendor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Sort By</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sorting" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Asset Name</SelectItem>
                        <SelectItem value="value">Value</SelectItem>
                        <SelectItem value="date">Purchase Date</SelectItem>
                        <SelectItem value="category">Category</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Output Format</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="table">Table View</SelectItem>
                        <SelectItem value="chart">Chart View</SelectItem>
                        <SelectItem value="summary">Summary View</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={handleCreateCustomReport}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Report
                  </Button>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Saved Custom Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Saved Custom Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Monthly Asset Utilization</h4>
                      <p className="text-sm text-muted-foreground">Created on 2024-01-15</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Run
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Vendor Performance Analysis</h4>
                      <p className="text-sm text-muted-foreground">Created on 2024-01-10</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Run
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Reports;
