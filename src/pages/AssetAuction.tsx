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
import { Search, Plus, Gavel, Calendar, User, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AssetAuction = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAuctionForm, setShowAuctionForm] = useState(false);
  const [formData, setFormData] = useState({
    assetId: '',
    startingPrice: '',
    reservePrice: '',
    auctionStartDate: '',
    auctionEndDate: '',
    approver1: '',
    approver2: '',
    approver3: '',
    description: '',
    terms: ''
  });

  // Mock auction data
  const auctionHistory = [
    {
      id: 'AUC001',
      assetId: 'AST020',
      assetName: 'Kendaraan Operasional Innova 2018',
      startingPrice: 'Rp 180.000.000',
      reservePrice: 'Rp 200.000.000',
      currentBid: 'Rp 215.000.000',
      bidderCount: 8,
      auctionStart: '2024-07-01',
      auctionEnd: '2024-07-15',
      requestedBy: 'Andi Pratama',
      approver1: 'Agus Prasetyo',
      approver1Status: 'Disetujui',
      approver2: 'Sri Wahyuni',
      approver2Status: 'Disetujui',
      approver3: 'Direktur Keuangan',
      approver3Status: 'Disetujui',
      status: 'Sedang Berlangsung',
      finalStatus: 'Aktif'
    },
    {
      id: 'AUC002',
      assetId: 'AST025',
      assetName: 'Mesin Produksi Lama Model A',
      startingPrice: 'Rp 50.000.000',
      reservePrice: 'Rp 75.000.000',
      currentBid: 'Rp 95.000.000',
      bidderCount: 12,
      auctionStart: '2024-06-15',
      auctionEnd: '2024-06-30',
      requestedBy: 'Siti Nurhaliza',
      approver1: 'Dewi Sartika',
      approver1Status: 'Disetujui',
      approver2: 'Joko Santoso',
      approver2Status: 'Disetujui',
      approver3: 'Direktur Operasional',
      approver3Status: 'Disetujui',
      status: 'Terjual',
      finalStatus: 'Selesai'
    },
    {
      id: 'AUC003',
      assetId: 'AST030',
      assetName: 'Furniture Set Kantor Lama',
      startingPrice: 'Rp 15.000.000',
      reservePrice: 'Rp 25.000.000',
      currentBid: 'Rp 18.000.000',
      bidderCount: 3,
      auctionStart: '2024-06-20',
      auctionEnd: '2024-07-05',
      requestedBy: 'Budi Santoso',
      approver1: 'Agus Prasetyo',
      approver1Status: 'Disetujui',
      approver2: 'Sri Wahyuni',
      approver2Status: 'Menunggu',
      approver3: 'Direktur Keuangan',
      approver3Status: 'Belum Review',
      status: 'Menunggu Persetujuan',
      finalStatus: 'Pending'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Berhasil",
      description: "Permintaan lelang aset berhasil diajukan"
    });

    // Reset form
    setFormData({
      assetId: '',
      startingPrice: '',
      reservePrice: '',
      auctionStartDate: '',
      auctionEndDate: '',
      approver1: '',
      approver2: '',
      approver3: '',
      description: '',
      terms: ''
    });
    setShowAuctionForm(false);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'Aktif': 'default',
      'Selesai': 'secondary',
      'Pending': 'outline',
      'Dibatalkan': 'destructive'
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

  const filteredAuctions = auctionHistory.filter(auction =>
    auction.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    auction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    auction.requestedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Lelang Aset</h1>
          <Dialog open={showAuctionForm} onOpenChange={setShowAuctionForm}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajukan Lelang
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Form Lelang Aset</DialogTitle>
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
                    <Label htmlFor="startingPrice">Harga Awal *</Label>
                    <Input
                      id="startingPrice"
                      type="number"
                      value={formData.startingPrice}
                      onChange={(e) => setFormData({...formData, startingPrice: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reservePrice">Harga Minimum *</Label>
                    <Input
                      id="reservePrice"
                      type="number"
                      value={formData.reservePrice}
                      onChange={(e) => setFormData({...formData, reservePrice: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="auctionStartDate">Tanggal Mulai Lelang *</Label>
                    <Input
                      id="auctionStartDate"
                      type="date"
                      value={formData.auctionStartDate}
                      onChange={(e) => setFormData({...formData, auctionStartDate: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="auctionEndDate">Tanggal Berakhir Lelang *</Label>
                    <Input
                      id="auctionEndDate"
                      type="date"
                      value={formData.auctionEndDate}
                      onChange={(e) => setFormData({...formData, auctionEndDate: e.target.value})}
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi Aset *</Label>
                  <Textarea
                    id="description"
                    placeholder="Masukkan deskripsi lengkap aset yang akan dilelang..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="terms">Syarat dan Ketentuan</Label>
                  <Textarea
                    id="terms"
                    placeholder="Masukkan syarat dan ketentuan lelang..."
                    value={formData.terms}
                    onChange={(e) => setFormData({...formData, terms: e.target.value})}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit">Ajukan Lelang</Button>
                  <Button type="button" variant="outline" onClick={() => setShowAuctionForm(false)}>
                    Batal
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Riwayat Lelang Aset</CardTitle>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari lelang aset..."
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
                  <TableHead>ID Lelang</TableHead>
                  <TableHead>Aset</TableHead>
                  <TableHead>Harga Awal</TableHead>
                  <TableHead>Harga Minimum</TableHead>
                  <TableHead>Bid Tertinggi</TableHead>
                  <TableHead>Jumlah Penawar</TableHead>
                  <TableHead>Periode Lelang</TableHead>
                  <TableHead>Persetujuan</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAuctions.map((auction) => (
                  <TableRow key={auction.id}>
                    <TableCell className="font-medium">{auction.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{auction.assetName}</p>
                        <p className="text-sm text-gray-500">{auction.assetId}</p>
                      </div>
                    </TableCell>
                    <TableCell>{auction.startingPrice}</TableCell>
                    <TableCell>{auction.reservePrice}</TableCell>
                    <TableCell className="font-medium text-green-600">{auction.currentBid}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Gavel className="h-4 w-4" />
                        <span>{auction.bidderCount} penawar</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{auction.auctionStart}</span>
                        </div>
                        <div className="text-sm text-gray-500">s/d {auction.auctionEnd}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          {getApprovalIcon(auction.approver1Status)}
                          <span className="text-sm">{auction.approver1}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getApprovalIcon(auction.approver2Status)}
                          <span className="text-sm">{auction.approver2}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getApprovalIcon(auction.approver3Status)}
                          <span className="text-sm">{auction.approver3}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(auction.finalStatus)}</TableCell>
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

export default AssetAuction;
