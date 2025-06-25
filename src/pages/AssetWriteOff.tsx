
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
import { Search, Plus, FileX, Calendar, User, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AssetWriteOff = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showWriteOffForm, setShowWriteOffForm] = useState(false);
  const [formData, setFormData] = useState({
    assetId: '',
    reason: '',
    writeOffDate: '',
    bookValue: '',
    approver1: '',
    approver2: '',
    approver3: '',
    notes: '',
    documents: ''
  });

  // Mock write-off data
  const writeOffHistory = [
    {
      id: 'WO001',
      assetId: 'AST015',
      assetName: 'Laptop Toshiba Satellite L840',
      reason: 'Kerusakan Tidak Ekonomis',
      requestDate: '2024-06-10',
      requestedBy: 'Budi Santoso',
      bookValue: 'Rp 3.500.000',
      approver1: 'Agus Prasetyo',
      approver1Status: 'Disetujui',
      approver2: 'Sri Wahyuni',
      approver2Status: 'Disetujui',
      approver3: 'Direktur Operasional',
      approver3Status: 'Menunggu',
      status: 'Menunggu Persetujuan Akhir',
      finalStatus: 'Dalam Proses'
    },
    {
      id: 'WO002',
      assetId: 'AST022',
      assetName: 'Mesin Fotocopy Canon iR2520',
      reason: 'Usia Pakai Habis',
      requestDate: '2024-06-05',
      requestedBy: 'Dewi Sartika',
      bookValue: 'Rp 8.000.000',
      approver1: 'Andi Pratama',
      approver1Status: 'Disetujui',
      approver2: 'Siti Nurhaliza',
      approver2Status: 'Disetujui',
      approver3: 'Direktur Keuangan',
      approver3Status: 'Disetujui',
      status: 'Disetujui Semua',
      finalStatus: 'Selesai'
    },
    {
      id: 'WO003',
      assetId: 'AST018',
      assetName: 'Kendaraan Operasional Avanza',
      reason: 'Kecelakaan Total Loss',
      requestDate: '2024-06-12',
      requestedBy: 'Joko Santoso',
      bookValue: 'Rp 125.000.000',
      approver1: 'Agus Prasetyo',
      approver1Status: 'Disetujui',
      approver2: 'Sri Wahyuni',
      approver2Status: 'Ditolak',
      approver3: 'Direktur Operasional',
      approver3Status: 'Belum Review',
      status: 'Ditolak Tingkat 2',
      finalStatus: 'Ditolak'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Berhasil",
      description: "Permintaan penghapusan aset berhasil diajukan"
    });

    // Reset form
    setFormData({
      assetId: '',
      reason: '',
      writeOffDate: '',
      bookValue: '',
      approver1: '',
      approver2: '',
      approver3: '',
      notes: '',
      documents: ''
    });
    setShowWriteOffForm(false);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'Selesai': 'default',
      'Dalam Proses': 'outline',
      'Ditolak': 'destructive',
      'Menunggu': 'secondary'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const getApprovalIcon = (status: string) => {
    switch (status) {
      case 'Disetujui':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Ditolak':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'Menunggu':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const filteredWriteOffs = writeOffHistory.filter(writeOff =>
    writeOff.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    writeOff.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    writeOff.requestedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Penghapusan Aset</h1>
          <Button onClick={() => setShowWriteOffForm(!showWriteOffForm)}>
            <Plus className="h-4 w-4 mr-2" />
            {showWriteOffForm ? 'Batal' : 'Ajukan Penghapusan'}
          </Button>
        </div>

        {/* Write-off Form */}
        {showWriteOffForm && (
          <Card>
            <CardHeader>
              <CardTitle>Form Penghapusan Aset</CardTitle>
            </CardHeader>
            <CardContent>
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
                    <Label htmlFor="writeOffDate">Tanggal Penghapusan *</Label>
                    <Input
                      id="writeOffDate"
                      type="date"
                      value={formData.writeOffDate}
                      onChange={(e) => setFormData({...formData, writeOffDate: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Alasan Penghapusan *</Label>
                    <Select value={formData.reason} onValueChange={(value) => setFormData({...formData, reason: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih alasan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kerusakan Tidak Ekonomis">Kerusakan Tidak Ekonomis</SelectItem>
                        <SelectItem value="Usia Pakai Habis">Usia Pakai Habis</SelectItem>
                        <SelectItem value="Kehilangan">Kehilangan</SelectItem>
                        <SelectItem value="Kecelakaan">Kecelakaan</SelectItem>
                        <SelectItem value="Tidak Digunakan">Tidak Digunakan</SelectItem>
                        <SelectItem value="Lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bookValue">Nilai Buku Saat Ini *</Label>
                    <Input
                      id="bookValue"
                      type="number"
                      value={formData.bookValue}
                      onChange={(e) => setFormData({...formData, bookValue: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="approver1">Penyetuju Tingkat 1 *</Label>
                    <Select value={formData.approver1} onValueChange={(value) => setFormData({...formData, approver1: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih penyetuju tingkat 1" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Agus Prasetyo">Agus Prasetyo - Supervisor</SelectItem>
                        <SelectItem value="Andi Pratama">Andi Pratama - Supervisor</SelectItem>
                        <SelectItem value="Dewi Sartika">Dewi Sartika - Koordinator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="approver2">Penyetuju Tingkat 2 *</Label>
                    <Select value={formData.approver2} onValueChange={(value) => setFormData({...formData, approver2: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih penyetuju tingkat 2" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sri Wahyuni">Sri Wahyuni - Manajer</SelectItem>
                        <SelectItem value="Siti Nurhaliza">Siti Nurhaliza - Manajer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="approver3">Penyetuju Tingkat 3 *</Label>
                    <Select value={formData.approver3} onValueChange={(value) => setFormData({...formData, approver3: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih penyetuju tingkat 3" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Direktur Operasional">Direktur Operasional</SelectItem>
                        <SelectItem value="Direktur Keuangan">Direktur Keuangan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="documents">Dokumen Pendukung</Label>
                    <Input
                      id="documents"
                      type="file"
                      multiple
                      onChange={(e) => setFormData({...formData, documents: e.target.value})}
                    />
                  </div>
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
                  <Button type="submit">Ajukan Penghapusan</Button>
                  <Button type="button" variant="outline" onClick={() => setShowWriteOffForm(false)}>
                    Batal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Riwayat Penghapusan Aset</CardTitle>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari penghapusan aset..."
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
                  <TableHead>ID</TableHead>
                  <TableHead>Aset</TableHead>
                  <TableHead>Alasan</TableHead>
                  <TableHead>Tanggal Pengajuan</TableHead>
                  <TableHead>Diajukan Oleh</TableHead>
                  <TableHead>Nilai Buku</TableHead>
                  <TableHead>Persetujuan</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWriteOffs.map((writeOff) => (
                  <TableRow key={writeOff.id}>
                    <TableCell className="font-medium">{writeOff.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{writeOff.assetName}</p>
                        <p className="text-sm text-gray-500">{writeOff.assetId}</p>
                      </div>
                    </TableCell>
                    <TableCell>{writeOff.reason}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{writeOff.requestDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{writeOff.requestedBy}</span>
                      </div>
                    </TableCell>
                    <TableCell>{writeOff.bookValue}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          {getApprovalIcon(writeOff.approver1Status)}
                          <span className="text-sm">{writeOff.approver1}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getApprovalIcon(writeOff.approver2Status)}
                          <span className="text-sm">{writeOff.approver2}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getApprovalIcon(writeOff.approver3Status)}
                          <span className="text-sm">{writeOff.approver3}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(writeOff.finalStatus)}</TableCell>
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

export default AssetWriteOff;
