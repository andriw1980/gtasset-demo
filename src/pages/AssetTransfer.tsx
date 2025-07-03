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
import { Search, Plus, ArrowRight, Calendar, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AssetTransfer = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [formData, setFormData] = useState({
    assetId: '',
    fromPIC: '',
    fromDepartment: '',
    fromLocation: '',
    toPIC: '',
    toDepartment: '',
    toLocation: '',
    transferReason: '',
    transferDate: '',
    notes: ''
  });

  // Mock transfer history data
  const transferHistory = [
    {
      id: 'TRF001',
      assetId: 'AST001',
      assetName: 'Laptop Dell OptiPlex 3090',
      fromPIC: 'Budi Santoso',
      fromDepartment: 'IT',
      fromLocation: 'Gedung A - Lt. 2',
      toPIC: 'Sri Wahyuni',
      toDepartment: 'Keuangan',
      toLocation: 'Gedung B - Lt. 1',
      transferDate: '2024-06-15',
      status: 'Selesai',
      reason: 'Perpindahan karyawan'
    },
    {
      id: 'TRF002',
      assetId: 'AST005',
      assetName: 'Printer Canon MF3010',
      fromPIC: 'Agus Prasetyo',
      fromDepartment: 'HRD',
      fromLocation: 'Gedung A - Lt. 1',
      toPIC: 'Dewi Sartika',
      toDepartment: 'Marketing',
      toLocation: 'Gedung C - Lt. 2',
      transferDate: '2024-06-20',
      status: 'Menunggu Persetujuan',
      reason: 'Kebutuhan operasional'
    },
    {
      id: 'TRF003',
      assetId: 'AST012',
      assetName: 'Meja Kerja Executive',
      fromPIC: 'Andi Pratama',
      fromDepartment: 'Produksi',
      fromLocation: 'Pabrik - Area A',
      toPIC: 'Siti Nurhaliza',
      toDepartment: 'QC',
      toLocation: 'Pabrik - Lab QC',
      transferDate: '2024-06-22',
      status: 'Dalam Proses',
      reason: 'Reorganisasi ruang kerja'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Berhasil",
      description: "Permintaan transfer aset berhasil diajukan"
    });

    // Reset form
    setFormData({
      assetId: '',
      fromPIC: '',
      fromDepartment: '',
      fromLocation: '',
      toPIC: '',
      toDepartment: '',
      toLocation: '',
      transferReason: '',
      transferDate: '',
      notes: ''
    });
    setShowTransferForm(false);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'Selesai': 'default',
      'Menunggu Persetujuan': 'outline',
      'Dalam Proses': 'secondary',
      'Ditolak': 'destructive'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const filteredTransfers = transferHistory.filter(transfer =>
    transfer.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transfer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transfer.fromPIC.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transfer.toPIC.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Transfer/Mutasi Aset</h1>
          <Dialog open={showTransferForm} onOpenChange={setShowTransferForm}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Transfer Aset
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Form Transfer Aset</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="assetId">ID Aset *</Label>
                    <Select value={formData.assetId} onValueChange={(value) => setFormData({...formData, assetId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih aset" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AST001">AST001 - Laptop Dell OptiPlex 3090</SelectItem>
                        <SelectItem value="AST002">AST002 - Kursi Kantor Ergonomis</SelectItem>
                        <SelectItem value="AST003">AST003 - Printer HP LaserJet Pro</SelectItem>
                        <SelectItem value="AST004">AST004 - Meja Rapat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transferDate">Tanggal Transfer *</Label>
                    <Input
                      id="transferDate"
                      type="date"
                      value={formData.transferDate}
                      onChange={(e) => setFormData({...formData, transferDate: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fromPIC">Dari PIC *</Label>
                    <Input
                      id="fromPIC"
                      value={formData.fromPIC}
                      onChange={(e) => setFormData({...formData, fromPIC: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="toPIC">Ke PIC *</Label>
                    <Input
                      id="toPIC"
                      value={formData.toPIC}
                      onChange={(e) => setFormData({...formData, toPIC: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fromDepartment">Dari Departemen *</Label>
                    <Select value={formData.fromDepartment} onValueChange={(value) => setFormData({...formData, fromDepartment: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih departemen asal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="HRD">HRD</SelectItem>
                        <SelectItem value="Keuangan">Keuangan</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Produksi">Produksi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="toDepartment">Ke Departemen *</Label>
                    <Select value={formData.toDepartment} onValueChange={(value) => setFormData({...formData, toDepartment: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih departemen tujuan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="HRD">HRD</SelectItem>
                        <SelectItem value="Keuangan">Keuangan</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Produksi">Produksi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fromLocation">Dari Lokasi *</Label>
                    <Input
                      id="fromLocation"
                      value={formData.fromLocation}
                      onChange={(e) => setFormData({...formData, fromLocation: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="toLocation">Ke Lokasi *</Label>
                    <Input
                      id="toLocation"
                      value={formData.toLocation}
                      onChange={(e) => setFormData({...formData, toLocation: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transferReason">Alasan Transfer *</Label>
                  <Select value={formData.transferReason} onValueChange={(value) => setFormData({...formData, transferReason: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih alasan transfer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Perpindahan karyawan">Perpindahan karyawan</SelectItem>
                      <SelectItem value="Kebutuhan operasional">Kebutuhan operasional</SelectItem>
                      <SelectItem value="Reorganisasi">Reorganisasi</SelectItem>
                      <SelectItem value="Penggantian aset">Penggantian aset</SelectItem>
                      <SelectItem value="Lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Catatan Tambahan</Label>
                  <Textarea
                    id="notes"
                    placeholder="Masukkan catatan tambahan..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit">Ajukan Transfer</Button>
                  <Button type="button" variant="outline" onClick={() => setShowTransferForm(false)}>
                    Batal
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Riwayat Transfer Aset</CardTitle>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari transfer aset..."
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
                  <TableHead>ID Transfer</TableHead>
                  <TableHead>Aset</TableHead>
                  <TableHead>Dari</TableHead>
                  <TableHead>Ke</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Alasan</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransfers.map((transfer) => (
                  <TableRow key={transfer.id}>
                    <TableCell className="font-medium">{transfer.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{transfer.assetName}</p>
                        <p className="text-sm text-gray-500">{transfer.assetId}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <div>
                          <p className="font-medium">{transfer.fromPIC}</p>
                          <p className="text-sm text-gray-500">{transfer.fromDepartment}</p>
                          <p className="text-xs text-gray-400">{transfer.fromLocation}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <div>
                          <p className="font-medium">{transfer.toPIC}</p>
                          <p className="text-sm text-gray-500">{transfer.toDepartment}</p>
                          <p className="text-xs text-gray-400">{transfer.toLocation}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{transfer.transferDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>{transfer.reason}</TableCell>
                    <TableCell>{getStatusBadge(transfer.status)}</TableCell>
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

export default AssetTransfer;
