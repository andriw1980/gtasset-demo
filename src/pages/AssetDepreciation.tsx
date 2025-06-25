
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const AssetDepreciation = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock asset data with depreciation info
  const assets = [
    {
      id: 'AST001',
      name: 'Laptop Dell OptiPlex 3090',
      category: 'Peralatan IT',
      purchaseDate: '2023-01-15',
      originalValue: 18000000,
      currentValue: 14250000,
      depreciationMethod: 'Garis Lurus',
      usefulLife: 5,
      status: 'Aktif'
    },
    {
      id: 'AST002',
      name: 'Kursi Kantor Ergonomis',
      category: 'Furniture',
      purchaseDate: '2023-02-20',
      originalValue: 5250000,
      currentValue: 4725000,
      depreciationMethod: 'Garis Lurus',
      usefulLife: 7,
      status: 'Aktif'
    },
    {
      id: 'AST003',
      name: 'Printer HP LaserJet Pro',
      category: 'Peralatan IT',
      purchaseDate: '2022-11-10',
      originalValue: 12000000,
      currentValue: 9600000,
      depreciationMethod: 'Saldo Menurun',
      usefulLife: 4,
      status: 'Aktif'
    },
    {
      id: 'AST004',
      name: 'Meja Rapat',
      category: 'Furniture',
      purchaseDate: '2022-08-15',
      originalValue: 22500000,
      currentValue: 18000000,
      depreciationMethod: 'Garis Lurus',
      usefulLife: 10,
      status: 'Aktif'
    },
    {
      id: 'AST005',
      name: 'Server IBM x3650',
      category: 'Peralatan IT',
      purchaseDate: '2021-03-10',
      originalValue: 75000000,
      currentValue: 45000000,
      depreciationMethod: 'Garis Lurus',
      usefulLife: 5,
      status: 'Aktif'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      'Aktif': 'default',
      'Pensiun': 'destructive',
      'Dibuang': 'secondary'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Depresiasi Aset</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingDown className="h-5 w-5 mr-2" />
              Ringkasan Depresiasi Aset
            </CardTitle>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari aset..."
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
                  <TableHead>Kategori</TableHead>
                  <TableHead>Tanggal Beli</TableHead>
                  <TableHead>Nilai Awal</TableHead>
                  <TableHead>Nilai Saat Ini</TableHead>
                  <TableHead>Metode Depresiasi</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.id}</TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.category}</TableCell>
                    <TableCell>{asset.purchaseDate}</TableCell>
                    <TableCell>Rp {asset.originalValue.toLocaleString()}</TableCell>
                    <TableCell>Rp {asset.currentValue.toLocaleString()}</TableCell>
                    <TableCell>{asset.depreciationMethod}</TableCell>
                    <TableCell>{getStatusBadge(asset.status)}</TableCell>
                    <TableCell>
                      <Link to={`/asset-depreciation/${asset.id}`}>
                        <Button size="sm" variant="outline">
                          <TrendingDown className="h-4 w-4 mr-2" />
                          Lihat Detail
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

export default AssetDepreciation;
