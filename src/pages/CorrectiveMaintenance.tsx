
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, AlertTriangle, Calendar, Shield, ShieldCheck } from 'lucide-react';

const CorrectiveMaintenance = () => {
  const [searchTerm, setSearchTerm] = useState('');

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

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'Belum Diperbaiki': 'destructive',
      'Sedang Diperbaiki': 'outline',
      'Klaim Asuransi': 'secondary',
      'Selesai': 'default'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      'Tinggi': 'destructive',
      'Sedang': 'outline',
      'Rendah': 'secondary'
    };
    return <Badge variant={variants[priority] || 'default'}>{priority}</Badge>;
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
          <h1 className="text-3xl font-bold">Pemeliharaan Korektif</h1>
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
