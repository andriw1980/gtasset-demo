
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
import { Search, Plus, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Assets = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    serialNumber: '',
    purchaseDate: '',
    purchasePrice: '',
    vendor: '',
    location: '',
    assignedTo: '',
    description: ''
  });

  // Mock asset data
  const assets = [
    {
      id: 'AST001',
      name: 'Laptop Dell OptiPlex 3090',
      category: 'Peralatan IT',
      location: 'Gedung A - Lantai 2',
      status: 'Aktif',
      assignedTo: 'Budi Santoso',
      purchaseDate: '2023-01-15',
      value: 'Rp 18.000.000'
    },
    {
      id: 'AST002',
      name: 'Kursi Kantor Ergonomis',
      category: 'Furniture',
      location: 'Gedung B - Lantai 1',
      status: 'Aktif',
      assignedTo: 'Sri Wahyuni',
      purchaseDate: '2023-02-20',
      value: 'Rp 5.250.000'
    },
    {
      id: 'AST003',
      name: 'Printer HP LaserJet Pro',
      category: 'Peralatan IT',
      location: 'Gedung A - Lantai 1',
      status: 'Maintenance',
      assignedTo: 'Departemen IT',
      purchaseDate: '2022-11-10',
      value: 'Rp 12.000.000'
    },
    {
      id: 'AST004',
      name: 'Meja Rapat',
      category: 'Furniture',
      location: 'Ruang Rapat Lt. 3',
      status: 'Aktif',
      assignedTo: 'Fasilitas Umum',
      purchaseDate: '2022-08-15',
      value: 'Rp 22.500.000'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically save to backend
    toast({
      title: "Berhasil",
      description: "Aset berhasil ditambahkan"
    });

    // Reset form
    setFormData({
      name: '',
      category: '',
      serialNumber: '',
      purchaseDate: '',
      purchasePrice: '',
      vendor: '',
      location: '',
      assignedTo: '',
      description: ''
    });
    setShowAddForm(false);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      'Aktif': 'default',
      'Maintenance': 'secondary',
      'Pensiun': 'destructive'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manajemen Aset</h1>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="h-4 w-4 mr-2" />
            {showAddForm ? 'Batal' : 'Tambah Aset Baru'}
          </Button>
        </div>

        {/* Add New Asset Form */}
        {showAddForm && (
          <Card>
            <CardHeader>
              <CardTitle>Tambah Aset Baru</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Aset *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Peralatan IT">Peralatan IT</SelectItem>
                        <SelectItem value="Furniture">Furniture</SelectItem>
                        <SelectItem value="Mesin">Mesin</SelectItem>
                        <SelectItem value="Kendaraan">Kendaraan</SelectItem>
                        <SelectItem value="Bangunan">Bangunan</SelectItem>
                        <SelectItem value="Lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serialNumber">Nomor Seri</Label>
                    <Input
                      id="serialNumber"
                      value={formData.serialNumber}
                      onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purchaseDate">Tanggal Pembelian *</Label>
                    <Input
                      id="purchaseDate"
                      type="date"
                      value={formData.purchaseDate}
                      onChange={(e) => setFormData({...formData, purchaseDate: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purchasePrice">Harga Pembelian *</Label>
                    <Input
                      id="purchasePrice"
                      type="number"
                      value={formData.purchasePrice}
                      onChange={(e) => setFormData({...formData, purchasePrice: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vendor">Vendor</Label>
                    <Input
                      id="vendor"
                      value={formData.vendor}
                      onChange={(e) => setFormData({...formData, vendor: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Lokasi *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assignedTo">Penanggung Jawab</Label>
                    <Input
                      id="assignedTo"
                      value={formData.assignedTo}
                      onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    placeholder="Masukkan deskripsi aset..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit">Tambah Aset</Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Batal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Inventarisasi Aset</CardTitle>
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
                  <TableHead>Nama</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Penanggung Jawab</TableHead>
                  <TableHead>Nilai</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.id}</TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.category}</TableCell>
                    <TableCell>{asset.location}</TableCell>
                    <TableCell>{getStatusBadge(asset.status)}</TableCell>
                    <TableCell>{asset.assignedTo}</TableCell>
                    <TableCell>{asset.value}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Link to={`/assets/${asset.id}`}>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
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

export default Assets;
