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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Filter, AlertTriangle, Calendar, Shield, ShieldCheck, Upload, Send, Eye, FileText } from 'lucide-react';

const CorrectiveMaintenance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLossReportOpen, setIsLossReportOpen] = useState(false);
  const [formData, setFormData] = useState({
    assetId: '',
    incidentType: '',
    incidentDate: '',
    location: '',
    description: '',
    estimatedValue: '',
    reportedBy: ''
  });

  // Mock data for damaged assets
  const damagedAssets = [
    {
      id: 'AST001',
      name: 'Sistem AC Sentral',
      location: 'Gedung A - Lantai 3',
      damageDate: '2024-06-15',
      damageType: 'Kompresor Rusak',
      reportedBy: 'Budi Santoso',
      insuranceCovered: true,
      repairStatus: 'Belum Diperbaiki',
      estimatedCost: 'Rp 15.000.000',
      priority: 'Tinggi'
    },
    {
      id: 'AST002',
      name: 'Printer HP LaserJet Pro',
      location: 'Departemen Keuangan',
      damageDate: '2024-06-18',
      damageType: 'Paper Jam & Toner Habis',
      reportedBy: 'Sri Wahyuni',
      insuranceCovered: false,
      repairStatus: 'Sedang Diperbaiki',
      estimatedCost: 'Rp 2.500.000',
      priority: 'Sedang'
    },
    {
      id: 'AST003',
      name: 'Lift Unit 2',
      location: 'Gedung B',
      damageDate: '2024-06-20',
      damageType: 'Motor Penggerak Bermasalah',
      reportedBy: 'Agus Prasetyo',
      insuranceCovered: true,
      repairStatus: 'Klaim Asuransi',
      estimatedCost: 'Rp 45.000.000',
      priority: 'Tinggi'
    },
    {
      id: 'AST004',
      name: 'Generator Cadangan',
      location: 'Ruang Teknik',
      damageDate: '2024-06-22',
      damageType: 'Kebocoran Oli',
      reportedBy: 'Andi Pratama',
      insuranceCovered: false,
      repairStatus: 'Belum Diperbaiki',
      estimatedCost: 'Rp 8.000.000',
      priority: 'Sedang'
    },
    {
      id: 'AST005',
      name: 'Sistem CCTV Lantai 2',
      location: 'Gedung A - Lantai 2',
      damageDate: '2024-06-25',
      damageType: 'Kamera Mati 3 Unit',
      reportedBy: 'Dewi Sartika',
      insuranceCovered: true,
      repairStatus: 'Sedang Diperbaiki',
      estimatedCost: 'Rp 12.000.000',
      priority: 'Rendah'
    }
  ];

  // Mock loss report history
  const lossHistory = [
    {
      id: 'LOSS001',
      assetId: 'AST001',
      assetName: 'Dell Laptop OptiPlex 3090',
      incidentType: 'Theft',
      incidentDate: '2024-01-12',
      location: 'Gedung A - Lantai 2',
      status: 'Under Investigation',
      estimatedValue: 'Rp 18.000.000'
    },
    {
      id: 'LOSS002',
      assetId: 'AST015',
      assetName: 'Monitor 27 Inch',
      incidentType: 'Damage',
      incidentDate: '2024-01-08',
      location: 'Gedung B - Lantai 1',
      status: 'Resolved',
      estimatedValue: 'Rp 4.500.000'
    },
    {
      id: 'LOSS003',
      assetId: 'AST025',
      assetName: 'Kursi Kantor Ergonomis',
      incidentType: 'Lost',
      incidentDate: '2024-01-05',
      location: 'Gedung A - Ruang Rapat',
      status: 'Pending Review',
      estimatedValue: 'Rp 5.250.000'
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
      'Belum Diperbaiki': 'destructive',
      'Sedang Diperbaiki': 'secondary',
      'Klaim Asuransi': 'secondary',
      'Selesai': 'default',
      'Under Investigation': 'secondary',
      'Resolved': 'default',
      'Pending Review': 'destructive'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      'Tinggi': 'destructive',
      'Sedang': 'secondary',
      'Rendah': 'secondary'
    };
    return <Badge variant={variants[priority] || 'default'}>{priority}</Badge>;
  };

  const getIncidentBadge = (type: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      'Theft': 'destructive',
      'Damage': 'secondary',
      'Lost': 'default'
    };
    return <Badge variant={variants[type] || 'default'}>{type}</Badge>;
  };

  const filteredAssets = damagedAssets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Corrective Maintenance</h1>
          <Dialog open={isLossReportOpen} onOpenChange={setIsLossReportOpen}>
            <DialogTrigger asChild>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Loss & Incident Reporting
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                  <span>Loss & Incident Reporting</span>
                </DialogTitle>
              </DialogHeader>
              
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
                            <SelectItem value="building-a-f1">Gedung A - Lantai 1</SelectItem>
                            <SelectItem value="building-a-f2">Gedung A - Lantai 2</SelectItem>
                            <SelectItem value="building-b-f1">Gedung B - Lantai 1</SelectItem>
                            <SelectItem value="building-b-f2">Gedung B - Lantai 2</SelectItem>
                            <SelectItem value="warehouse">Gudang</SelectItem>
                            <SelectItem value="parking">Area Parkir</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="estimatedValue">Estimated Value (Rp)</Label>
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
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Kerusakan</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                Aset yang memerlukan perbaikan
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tertanggung Asuransi</CardTitle>
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Dari total kerusakan
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sedang Diperbaiki</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                Dalam proses perbaikan
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estimasi Biaya</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp 82,5M</div>
              <p className="text-xs text-muted-foreground">
                Total estimasi perbaikan
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Daftar Aset yang Memerlukan Perbaikan
            </CardTitle>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari aset yang rusak..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Aset</TableHead>
                  <TableHead>Nama Aset</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead>Tanggal Kerusakan</TableHead>
                  <TableHead>Jenis Kerusakan</TableHead>
                  <TableHead>Dilaporkan Oleh</TableHead>
                  <TableHead>Asuransi</TableHead>
                  <TableHead>Status Perbaikan</TableHead>
                  <TableHead>Estimasi Biaya</TableHead>
                  <TableHead>Prioritas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.id}</TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.location}</TableCell>
                    <TableCell>{asset.damageDate}</TableCell>
                    <TableCell>{asset.damageType}</TableCell>
                    <TableCell>{asset.reportedBy}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {asset.insuranceCovered ? (
                          <Shield className="h-4 w-4 text-green-600 mr-1" />
                        ) : (
                          <Shield className="h-4 w-4 text-red-600 mr-1" />
                        )}
                        {asset.insuranceCovered ? 'Ya' : 'Tidak'}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(asset.repairStatus)}</TableCell>
                    <TableCell>{asset.estimatedCost}</TableCell>
                    <TableCell>{getPriorityBadge(asset.priority)}</TableCell>
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
