
import React, { useState } from 'react';
import Layout from '../components/Layout';
import ExportButton from '../components/ExportButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search, Filter, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const AssetDepreciation = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock asset data with depreciation info - 50 items
  const assets = [
    { id: 'AST001', name: 'Laptop Dell OptiPlex 3090', category: 'Peralatan IT', purchaseDate: '2023-01-15', originalValue: 18000000, currentValue: 14250000, depreciationMethod: 'Garis Lurus', usefulLife: 5, status: 'Aktif' },
    { id: 'AST002', name: 'Kursi Kantor Ergonomis Premium', category: 'Furniture', purchaseDate: '2023-02-20', originalValue: 5250000, currentValue: 4725000, depreciationMethod: 'Garis Lurus', usefulLife: 7, status: 'Aktif' },
    { id: 'AST003', name: 'Printer HP LaserJet Pro M404n', category: 'Peralatan IT', purchaseDate: '2022-11-10', originalValue: 12000000, currentValue: 9600000, depreciationMethod: 'Saldo Menurun', usefulLife: 4, status: 'Aktif' },
    { id: 'AST004', name: 'Meja Rapat Kayu Jati 8 Orang', category: 'Furniture', purchaseDate: '2022-08-15', originalValue: 22500000, currentValue: 18000000, depreciationMethod: 'Garis Lurus', usefulLife: 10, status: 'Aktif' },
    { id: 'AST005', name: 'Server IBM x3650 M5', category: 'Peralatan IT', purchaseDate: '2021-03-10', originalValue: 75000000, currentValue: 45000000, depreciationMethod: 'Garis Lurus', usefulLife: 5, status: 'Aktif' },
    { id: 'AST006', name: 'AC Split 2 PK Daikin', category: 'Elektronik', purchaseDate: '2023-03-05', originalValue: 8500000, currentValue: 7650000, depreciationMethod: 'Garis Lurus', usefulLife: 8, status: 'Aktif' },
    { id: 'AST007', name: 'Mobil Pickup Toyota Hilux', category: 'Kendaraan', purchaseDate: '2022-01-20', originalValue: 350000000, currentValue: 280000000, depreciationMethod: 'Saldo Menurun', usefulLife: 8, status: 'Aktif' },
    { id: 'AST008', name: 'Mesin Fotokopi Canon iR2525', category: 'Peralatan IT', purchaseDate: '2022-12-01', originalValue: 25000000, currentValue: 20000000, depreciationMethod: 'Garis Lurus', usefulLife: 6, status: 'Aktif' },
    { id: 'AST009', name: 'Lemari Arsip 4 Pintu Besi', category: 'Furniture', purchaseDate: '2021-09-15', originalValue: 4500000, currentValue: 3150000, depreciationMethod: 'Garis Lurus', usefulLife: 10, status: 'Aktif' },
    { id: 'AST010', name: 'Generator Caterpillar 100 KVA', category: 'Mesin Industri', purchaseDate: '2020-05-20', originalValue: 450000000, currentValue: 270000000, depreciationMethod: 'Garis Lurus', usefulLife: 15, status: 'Aktif' },
    { id: 'AST011', name: 'Laptop Lenovo ThinkPad X1', category: 'Peralatan IT', purchaseDate: '2023-06-10', originalValue: 22000000, currentValue: 19800000, depreciationMethod: 'Garis Lurus', usefulLife: 4, status: 'Aktif' },
    { id: 'AST012', name: 'Meja Kerja Executive L-Shape', category: 'Furniture', purchaseDate: '2022-07-25', originalValue: 15000000, currentValue: 12750000, depreciationMethod: 'Garis Lurus', usefulLife: 8, status: 'Aktif' },
    { id: 'AST013', name: 'Proyektor Epson EB-X41', category: 'Audio Visual', purchaseDate: '2023-01-30', originalValue: 9500000, currentValue: 8550000, depreciationMethod: 'Garis Lurus', usefulLife: 5, status: 'Aktif' },
    { id: 'AST014', name: 'Kamera CCTV Hikvision 16 Channel', category: 'Keamanan', purchaseDate: '2022-10-12', originalValue: 35000000, currentValue: 28000000, depreciationMethod: 'Garis Lurus', usefulLife: 7, status: 'Aktif' },
    { id: 'AST015', name: 'Forklift Electric 2 Ton', category: 'Mesin Industri', purchaseDate: '2021-11-08', originalValue: 280000000, currentValue: 196000000, depreciationMethod: 'Garis Lurus', usefulLife: 10, status: 'Aktif' },
    { id: 'AST016', name: 'Microwave Panasonic 32L', category: 'Elektronik', purchaseDate: '2023-04-15', originalValue: 3500000, currentValue: 3150000, depreciationMethod: 'Garis Lurus', usefulLife: 6, status: 'Aktif' },
    { id: 'AST017', name: 'Sepeda Motor Honda Beat', category: 'Kendaraan', purchaseDate: '2022-03-20', originalValue: 18000000, currentValue: 13500000, depreciationMethod: 'Saldo Menurun', usefulLife: 5, status: 'Aktif' },
    { id: 'AST018', name: 'Komputer Desktop HP EliteDesk', category: 'Peralatan IT', purchaseDate: '2023-02-10', originalValue: 14000000, currentValue: 12600000, depreciationMethod: 'Garis Lurus', usefulLife: 5, status: 'Aktif' },
    { id: 'AST019', name: 'Sofa Kantor 3 Dudukan', category: 'Furniture', purchaseDate: '2022-06-05', originalValue: 8500000, currentValue: 7225000, depreciationMethod: 'Garis Lurus', usefulLife: 8, status: 'Aktif' },
    { id: 'AST020', name: 'Mesin Cuci Samsung 10 kg', category: 'Elektronik', purchaseDate: '2021-12-20', originalValue: 12000000, currentValue: 8400000, depreciationMethod: 'Garis Lurus', usefulLife: 8, status: 'Aktif' },
    { id: 'AST021', name: 'UPS APC Smart 3000VA', category: 'Elektronik', purchaseDate: '2023-05-08', originalValue: 15000000, currentValue: 13500000, depreciationMethod: 'Garis Lurus', usefulLife: 6, status: 'Aktif' },
    { id: 'AST022', name: 'Rak Server 42U', category: 'Peralatan IT', purchaseDate: '2022-04-12', originalValue: 18000000, currentValue: 14400000, depreciationMethod: 'Garis Lurus', usefulLife: 10, status: 'Aktif' },
    { id: 'AST023', name: 'Kulkas 2 Pintu LG 506L', category: 'Elektronik', purchaseDate: '2022-09-18', originalValue: 8000000, currentValue: 6800000, depreciationMethod: 'Garis Lurus', usefulLife: 8, status: 'Aktif' },
    { id: 'AST024', name: 'Mobil Avanza 1.3 MT', category: 'Kendaraan', purchaseDate: '2021-06-25', originalValue: 210000000, currentValue: 147000000, depreciationMethod: 'Saldo Menurun', usefulLife: 8, status: 'Aktif' },
    { id: 'AST025', name: 'Mixer Audio Yamaha MG16XU', category: 'Audio Visual', purchaseDate: '2023-03-22', originalValue: 12500000, currentValue: 11250000, depreciationMethod: 'Garis Lurus', usefulLife: 6, status: 'Aktif' },
    { id: 'AST026', name: 'Telepon IP Cisco 8851', category: 'Komunikasi', purchaseDate: '2022-11-30', originalValue: 4500000, currentValue: 3600000, depreciationMethod: 'Garis Lurus', usefulLife: 5, status: 'Aktif' },
    { id: 'AST027', name: 'Dispenser Miyako Hot & Cold', category: 'Elektronik', purchaseDate: '2023-01-12', originalValue: 2500000, currentValue: 2250000, depreciationMethod: 'Garis Lurus', usefulLife: 5, status: 'Aktif' },
    { id: 'AST028', name: 'Kompressor Angin 100L', category: 'Mesin Industri', purchaseDate: '2021-08-15', originalValue: 18000000, currentValue: 12600000, depreciationMethod: 'Garis Lurus', usefulLife: 10, status: 'Aktif' },
    { id: 'AST029', name: 'Scanner Fujitsu fi-7160', category: 'Peralatan IT', purchaseDate: '2022-12-08', originalValue: 9500000, currentValue: 7600000, depreciationMethod: 'Garis Lurus', usefulLife: 5, status: 'Aktif' },
    { id: 'AST030', name: 'Water Heater Ariston 30L', category: 'Elektronik', purchaseDate: '2023-04-05', originalValue: 3800000, currentValue: 3420000, depreciationMethod: 'Garis Lurus', usefulLife: 7, status: 'Aktif' },
    { id: 'AST031', name: 'Excavator Mini Kubota U-15', category: 'Alat Berat', purchaseDate: '2020-10-10', originalValue: 650000000, currentValue: 390000000, depreciationMethod: 'Garis Lurus', usefulLife: 12, status: 'Aktif' },
    { id: 'AST032', name: 'Switch Cisco 48 Port', category: 'Peralatan IT', purchaseDate: '2022-05-18', originalValue: 25000000, currentValue: 20000000, depreciationMethod: 'Garis Lurus', usefulLife: 7, status: 'Aktif' },
    { id: 'AST033', name: 'Filing Cabinet 5 Laci', category: 'Furniture', purchaseDate: '2023-02-28', originalValue: 6500000, currentValue: 5850000, depreciationMethod: 'Garis Lurus', usefulLife: 10, status: 'Aktif' },
    { id: 'AST034', name: 'Pompa Air Grundfos 5 HP', category: 'Mesin Industri', purchaseDate: '2021-07-12', originalValue: 22000000, currentValue: 15400000, depreciationMethod: 'Garis Lurus', usefulLife: 10, status: 'Aktif' },
    { id: 'AST035', name: 'Televisor Samsung 55" 4K', category: 'Audio Visual', purchaseDate: '2022-08-25', originalValue: 12000000, currentValue: 9600000, depreciationMethod: 'Garis Lurus', usefulLife: 6, status: 'Aktif' },
    { id: 'AST036', name: 'Mesin Las Inverter 400A', category: 'Peralatan Workshop', purchaseDate: '2021-04-30', originalValue: 15000000, currentValue: 10500000, depreciationMethod: 'Garis Lurus', usefulLife: 10, status: 'Aktif' },
    { id: 'AST037', name: 'Tablet Samsung Galaxy Tab S8', category: 'Peralatan IT', purchaseDate: '2023-07-15', originalValue: 8500000, currentValue: 7650000, depreciationMethod: 'Garis Lurus', usefulLife: 4, status: 'Aktif' },
    { id: 'AST038', name: 'Lampu LED Panel 60x60', category: 'Penerangan', purchaseDate: '2022-10-05', originalValue: 1500000, currentValue: 1200000, depreciationMethod: 'Garis Lurus', usefulLife: 8, status: 'Aktif' },
    { id: 'AST039', name: 'Mesin Gerinda Bosch GWS 2000', category: 'Peralatan Workshop', purchaseDate: '2023-01-18', originalValue: 3500000, currentValue: 3150000, depreciationMethod: 'Garis Lurus', usefulLife: 6, status: 'Aktif' },
    { id: 'AST040', name: 'Karpet Kantor 3x4 meter', category: 'Furniture', purchaseDate: '2022-06-20', originalValue: 4500000, currentValue: 3825000, depreciationMethod: 'Garis Lurus', usefulLife: 8, status: 'Aktif' },
    { id: 'AST041', name: 'APAR CO2 6.8 kg', category: 'Keamanan', purchaseDate: '2023-03-10', originalValue: 2800000, currentValue: 2520000, depreciationMethod: 'Garis Lurus', usefulLife: 10, status: 'Aktif' },
    { id: 'AST042', name: 'Tangga Aluminium 6 meter', category: 'Peralatan Workshop', purchaseDate: '2022-07-08', originalValue: 2500000, currentValue: 2125000, depreciationMethod: 'Garis Lurus', usefulLife: 8, status: 'Aktif' },
    { id: 'AST043', name: 'Vacuum Cleaner Krisbow 20L', category: 'Peralatan Kebersihan', purchaseDate: '2023-05-22', originalValue: 3200000, currentValue: 2880000, depreciationMethod: 'Garis Lurus', usefulLife: 5, status: 'Aktif' },
    { id: 'AST044', name: 'Helm Safety MSA V-Gard', category: 'APD', purchaseDate: '2022-09-12', originalValue: 850000, currentValue: 680000, depreciationMethod: 'Garis Lurus', usefulLife: 5, status: 'Aktif' },
    { id: 'AST045', name: 'Sepatu Safety Cheetah 7012H', category: 'APD', purchaseDate: '2023-04-28', originalValue: 1200000, currentValue: 1080000, depreciationMethod: 'Garis Lurus', usefulLife: 3, status: 'Aktif' },
    { id: 'AST046', name: 'Jam Dinding Digital LED', category: 'Elektronik', purchaseDate: '2022-11-15', originalValue: 1800000, currentValue: 1440000, depreciationMethod: 'Garis Lurus', usefulLife: 6, status: 'Aktif' },
    { id: 'AST047', name: 'Kipas Angin Ceiling Panasonic', category: 'Elektronik', purchaseDate: '2021-05-18', originalValue: 2200000, currentValue: 1540000, depreciationMethod: 'Garis Lurus', usefulLife: 8, status: 'Aktif' },
    { id: 'AST048', name: 'Multimeter Digital Fluke 87V', category: 'Alat Ukur', purchaseDate: '2023-06-30', originalValue: 6500000, currentValue: 5850000, depreciationMethod: 'Garis Lurus', usefulLife: 8, status: 'Aktif' },
    { id: 'AST049', name: 'Trolley Barang Kapasitas 300kg', category: 'Peralatan Logistik', purchaseDate: '2022-04-08', originalValue: 1800000, currentValue: 1440000, depreciationMethod: 'Garis Lurus', usefulLife: 6, status: 'Aktif' },
    { id: 'AST050', name: 'Radio HT Motorola GP328', category: 'Komunikasi', purchaseDate: '2021-12-05', originalValue: 4500000, currentValue: 3150000, depreciationMethod: 'Garis Lurus', usefulLife: 8, status: 'Aktif' }
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

  // Pagination logic
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAssets = filteredAssets.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Asset Depreciation</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingDown className="h-5 w-5 mr-2" />
              Asset Depreciation Summary
            </CardTitle>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search assets..."
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
                filename="asset-depreciation"
                onExport={(format) => {
                  toast({
                    title: "Export Berhasil",
                    description: `Data depresiasi aset berhasil diexport dalam format ${format.toUpperCase()}`
                  });
                }}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset ID</TableHead>
                  <TableHead>Asset Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Purchase Date</TableHead>
                  <TableHead>Original Value</TableHead>
                  <TableHead>Current Value</TableHead>
                  <TableHead>Depreciation Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentAssets.map((asset) => (
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
                          View Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {/* Pagination */}
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AssetDepreciation;
