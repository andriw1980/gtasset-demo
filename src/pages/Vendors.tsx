
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Edit, Trash2, Building } from 'lucide-react';

const Vendors = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock vendor data
  const vendors = [
    {
      id: 'VEN001',
      name: 'PT Teknologi Nusantara',
      contactPerson: 'Agus Setiawan',
      email: 'agus@teknusantara.co.id',
      phone: '+62-21-123-4567',
      address: 'Jl. Sudirman No. 123, Jakarta Selatan',
      category: 'Peralatan IT',
      status: 'Aktif',
      contractValue: 'Rp 225.000.000'
    },
    {
      id: 'VEN002',
      name: 'CV Mandiri Furniture',
      contactPerson: 'Siti Aminah',
      email: 'siti@mandirifurniture.co.id',
      phone: '+62-21-987-6543',
      address: 'Jl. Raya Bogor No. 456, Depok',
      category: 'Furniture',
      status: 'Aktif',
      contractValue: 'Rp 180.000.000'
    },
    {
      id: 'VEN003',
      name: 'PT Bintang Konstruksi',
      contactPerson: 'Joko Widodo',
      email: 'joko@bintangkonstruksi.co.id',
      phone: '+62-21-555-1234',
      address: 'Jl. Gatot Subroto No. 789, Jakarta Pusat',
      category: 'Konstruksi',
      status: 'Aktif',
      contractValue: 'Rp 500.000.000'
    },
    {
      id: 'VEN004',
      name: 'Toko Alat Tulis Jaya',
      contactPerson: 'Lisa Andriani',
      email: 'lisa@alattulisjaya.co.id',
      phone: '+62-21-555-9876',
      address: 'Jl. Pahlawan No. 321, Bandung',
      category: 'Perlengkapan Kantor',
      status: 'Tidak Aktif',
      contractValue: 'Rp 37.500.000'
    }
  ];

  const getStatusBadge = (status: string) => {
    return <Badge variant={status === 'Aktif' ? 'default' : 'secondary'}>{status}</Badge>;
  };

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manajemen Vendor</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Vendor Baru
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Vendor Terdaftar</CardTitle>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari vendor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Vendor</TableHead>
                  <TableHead>Nama Perusahaan</TableHead>
                  <TableHead>Kontak Person</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telepon</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Nilai Kontrak</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell className="font-medium">{vendor.id}</TableCell>
                    <TableCell>{vendor.name}</TableCell>
                    <TableCell>{vendor.contactPerson}</TableCell>
                    <TableCell>{vendor.email}</TableCell>
                    <TableCell>{vendor.phone}</TableCell>
                    <TableCell>{vendor.category}</TableCell>
                    <TableCell>{vendor.contractValue}</TableCell>
                    <TableCell>{getStatusBadge(vendor.status)}</TableCell>
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

export default Vendors;
