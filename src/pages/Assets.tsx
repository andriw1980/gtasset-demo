
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ExportButton from '../components/ExportButton';
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
import { supabase } from '@/integrations/supabase/client';

interface Asset {
  id: string;
  asset_code: string;
  name: string;
  category_id: string;
  category?: { name: string };
  serial_number?: string;
  purchase_date: string;
  purchase_price: number;
  vendor?: string;
  location_id: string;
  location?: { name: string };
  assigned_to?: string;
  description?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: string;
  name: string;
}

interface WorkArea {
  id: string;
  name: string;
}

const Assets = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [workAreas, setWorkAreas] = useState<WorkArea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    serial_number: '',
    purchase_date: '',
    purchase_price: '',
    vendor: '',
    location_id: '',
    assigned_to: '',
    description: '',
    status: 'Aktif'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // For now, we'll show a message that the assets table needs to be created
      // This is because the SQL migration hasn't been run yet
      
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('asset_categories')
        .select('id, name')
        .order('name');

      if (categoriesError) throw categoriesError;

      // Fetch work areas
      const { data: workAreasData, error: workAreasError } = await supabase
        .from('work_areas')
        .select('id, name')
        .order('name');

      if (workAreasError) throw workAreasError;

      setCategories(categoriesData || []);
      setWorkAreas(workAreasData || []);
      
      // Mock assets data for demonstration
      setAssets([]);
      
      toast({
        title: "Info",
        description: "Assets table not found. Please run the SQL migration to create the assets table.",
        variant: "default"
      });
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Info",
      description: "Assets table not available. Please run the SQL migration first.",
      variant: "default"
    });
  };

  const handleEdit = (asset: Asset) => {
    setEditingAsset(asset);
    setFormData({
      name: asset.name,
      category_id: asset.category_id,
      serial_number: asset.serial_number || '',
      purchase_date: asset.purchase_date,
      purchase_price: asset.purchase_price.toString(),
      vendor: asset.vendor || '',
      location_id: asset.location_id,
      assigned_to: asset.assigned_to || '',
      description: asset.description || '',
      status: asset.status
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus aset ini?')) return;

    toast({
      title: "Info",
      description: "Assets table not available. Please run the SQL migration first.",
      variant: "default"
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category_id: '',
      serial_number: '',
      purchase_date: '',
      purchase_price: '',
      vendor: '',
      location_id: '',
      assigned_to: '',
      description: '',
      status: 'Aktif'
    });
    setEditingAsset(null);
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.asset_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manajemen Aset</h1>
          <Button onClick={() => setShowAddForm(!showAddForm)} disabled={isLoading}>
            <Plus className="h-4 w-4 mr-2" />
            {showAddForm ? 'Batal' : 'Tambah Aset Baru'}
          </Button>
        </div>

        {/* Database Status Alert */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <div className="text-yellow-800">
                <h3 className="font-semibold">Database Setup Required</h3>
                <p className="text-sm">
                  The assets table has not been created yet. Please run the SQL migration to create the assets table and enable full CRUD functionality.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add/Edit Asset Form */}
        {showAddForm && (
          <Card>
            <CardHeader>
              <CardTitle>{editingAsset ? 'Edit Aset' : 'Tambah Aset Baru'}</CardTitle>
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
                    <Label htmlFor="category_id">Kategori *</Label>
                    <Select value={formData.category_id} onValueChange={(value) => setFormData({...formData, category_id: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serial_number">Nomor Seri</Label>
                    <Input
                      id="serial_number"
                      value={formData.serial_number}
                      onChange={(e) => setFormData({...formData, serial_number: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purchase_date">Tanggal Pembelian *</Label>
                    <Input
                      id="purchase_date"
                      type="date"
                      value={formData.purchase_date}
                      onChange={(e) => setFormData({...formData, purchase_date: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purchase_price">Harga Pembelian *</Label>
                    <Input
                      id="purchase_price"
                      type="number"
                      value={formData.purchase_price}
                      onChange={(e) => setFormData({...formData, purchase_price: e.target.value})}
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
                    <Label htmlFor="location_id">Lokasi *</Label>
                    <Select value={formData.location_id} onValueChange={(value) => setFormData({...formData, location_id: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih lokasi" />
                      </SelectTrigger>
                      <SelectContent>
                        {workAreas.map((workArea) => (
                          <SelectItem key={workArea.id} value={workArea.id}>
                            {workArea.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assigned_to">Penanggung Jawab</Label>
                    <Input
                      id="assigned_to"
                      value={formData.assigned_to}
                      onChange={(e) => setFormData({...formData, assigned_to: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aktif">Aktif</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                        <SelectItem value="Pensiun">Pensiun</SelectItem>
                      </SelectContent>
                    </Select>
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
                  <Button type="submit" disabled={isLoading}>
                    {editingAsset ? 'Update Aset' : 'Tambah Aset'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
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
              <ExportButton 
                data={filteredAssets}
                filename="assets"
                onExport={(format) => {
                  toast({
                    title: "Export Berhasil",
                    description: `Data aset berhasil diexport dalam format ${format.toUpperCase()}`
                  });
                }}
              />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kode Aset</TableHead>
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
                  {filteredAssets.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        Belum ada data aset. Silakan buat tabel assets terlebih dahulu dengan menjalankan SQL migration.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Assets;
