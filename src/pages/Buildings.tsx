
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';

const Buildings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock building data - 50 items
  const buildings = [
    { id: 'BLD001', name: 'Gedung Kantor Pusat A', address: 'Jl. Sudirman No. 123, Jakarta Selatan', floors: 5, totalRooms: 120, occupiedRooms: 98, manager: 'Budi Santoso', phone: '+62-21-123-4567', status: 'Active' },
    { id: 'BLD002', name: 'Gedung Kantor B', address: 'Jl. Thamrin No. 456, Jakarta Pusat', floors: 3, totalRooms: 75, occupiedRooms: 65, manager: 'Sri Wahyuni', phone: '+62-21-987-6543', status: 'Active' },
    { id: 'BLD003', name: 'Kompleks Gudang C', address: 'Jl. Industri No. 789, Bekasi', floors: 2, totalRooms: 25, occupiedRooms: 20, manager: 'Agus Prasetyo', phone: '+62-21-555-1234', status: 'Active' },
    { id: 'BLD004', name: 'Fasilitas Penyimpanan D', address: 'Jl. Pergudangan No. 321, Tangerang', floors: 1, totalRooms: 10, occupiedRooms: 5, manager: 'Dewi Sartika', phone: '+62-21-555-9876', status: 'Maintenance' },
    { id: 'BLD005', name: 'Gedung Operasional E', address: 'Jl. Gatot Subroto No. 234, Jakarta Selatan', floors: 4, totalRooms: 85, occupiedRooms: 70, manager: 'Andi Pratama', phone: '+62-21-444-5555', status: 'Active' },
    { id: 'BLD006', name: 'Pusat Distribusi F', address: 'Jl. Raya Bogor No. 567, Depok', floors: 2, totalRooms: 35, occupiedRooms: 30, manager: 'Siti Nurhaliza', phone: '+62-21-333-4444', status: 'Active' },
    { id: 'BLD007', name: 'Gedung Administrasi G', address: 'Jl. Asia Afrika No. 890, Bandung', floors: 3, totalRooms: 60, occupiedRooms: 55, manager: 'Hendra Wijaya', phone: '+62-21-222-3333', status: 'Active' },
    { id: 'BLD008', name: 'Fasilitas Produksi H', address: 'Jl. Veteran No. 123, Surabaya', floors: 1, totalRooms: 15, occupiedRooms: 12, manager: 'Ratna Sari', phone: '+62-21-111-2222', status: 'Active' },
    { id: 'BLD009', name: 'Gedung Penelitian I', address: 'Jl. Diponegoro No. 456, Semarang', floors: 5, totalRooms: 95, occupiedRooms: 80, manager: 'Indra Kusuma', phone: '+62-21-999-8888', status: 'Active' },
    { id: 'BLD010', name: 'Pusat Logistik J', address: 'Jl. Hayam Wuruk No. 789, Jakarta Barat', floors: 2, totalRooms: 40, occupiedRooms: 35, manager: 'Maya Putri', phone: '+62-21-777-6666', status: 'Active' },
    { id: 'BLD011', name: 'Gedung Training K', address: 'Jl. Gajah Mada No. 234, Jakarta Pusat', floors: 3, totalRooms: 50, occupiedRooms: 45, manager: 'Rudi Hermawan', phone: '+62-21-555-4444', status: 'Active' },
    { id: 'BLD012', name: 'Fasilitas Maintenance L', address: 'Jl. Mangga Besar No. 567, Jakarta Utara', floors: 1, totalRooms: 8, occupiedRooms: 7, manager: 'Wati Suryani', phone: '+62-21-333-2222', status: 'Active' },
    { id: 'BLD013', name: 'Gedung IT Center M', address: 'Jl. Cikini Raya No. 890, Jakarta Pusat', floors: 4, totalRooms: 65, occupiedRooms: 60, manager: 'Ahmad Fauzi', phone: '+62-21-888-7777', status: 'Active' },
    { id: 'BLD014', name: 'Pusat R&D N', address: 'Jl. Kebon Sirih No. 123, Jakarta Pusat', floors: 6, totalRooms: 110, occupiedRooms: 95, manager: 'Rina Marlina', phone: '+62-21-666-5555', status: 'Active' },
    { id: 'BLD015', name: 'Gedung Keuangan O', address: 'Jl. Pasar Baru No. 456, Jakarta Pusat', floors: 2, totalRooms: 30, occupiedRooms: 25, manager: 'Dedi Supardi', phone: '+62-21-444-3333', status: 'Maintenance' },
    { id: 'BLD016', name: 'Fasilitas Keamanan P', address: 'Jl. Menteng Raya No. 789, Jakarta Pusat', floors: 1, totalRooms: 5, occupiedRooms: 5, manager: 'Bambang Setyo', phone: '+62-21-222-1111', status: 'Active' },
    { id: 'BLD017', name: 'Gedung Medis Q', address: 'Jl. Kramat Raya No. 234, Jakarta Pusat', floors: 4, totalRooms: 80, occupiedRooms: 70, manager: 'Dr. Sari Dewi', phone: '+62-21-999-0000', status: 'Active' },
    { id: 'BLD018', name: 'Pusat Katering R', address: 'Jl. Salemba Raya No. 567, Jakarta Pusat', floors: 2, totalRooms: 20, occupiedRooms: 18, manager: 'Ibu Lastri', phone: '+62-21-777-8888', status: 'Active' },
    { id: 'BLD019', name: 'Gedung Olahraga S', address: 'Jl. Cempaka Putih No. 890, Jakarta Pusat', floors: 2, totalRooms: 12, occupiedRooms: 10, manager: 'Eko Prasetyo', phone: '+62-21-555-9999', status: 'Active' },
    { id: 'BLD020', name: 'Fasilitas Tekstil T', address: 'Jl. Tanah Abang No. 123, Jakarta Pusat', floors: 3, totalRooms: 45, occupiedRooms: 40, manager: 'Fitri Handayani', phone: '+62-21-333-0000', status: 'Active' },
    { id: 'BLD021', name: 'Gedung Logistik U', address: 'Jl. Kemayoran No. 456, Jakarta Pusat', floors: 2, totalRooms: 38, occupiedRooms: 32, manager: 'Haris Gunawan', phone: '+62-21-111-0000', status: 'Active' },
    { id: 'BLD022', name: 'Laboratorium Kimia V', address: 'Jl. Rawa Belong No. 789, Jakarta Barat', floors: 3, totalRooms: 25, occupiedRooms: 22, manager: 'Ir. Suci Rahayu', phone: '+62-21-888-9999', status: 'Active' },
    { id: 'BLD023', name: 'Gedung APD W', address: 'Jl. Jelambar No. 234, Jakarta Barat', floors: 2, totalRooms: 15, occupiedRooms: 12, manager: 'Anton Wijaya', phone: '+62-21-666-7777', status: 'Active' },
    { id: 'BLD024', name: 'Pusat Percetakan X', address: 'Jl. Palmerah No. 567, Jakarta Barat', floors: 1, totalRooms: 8, occupiedRooms: 7, manager: 'Lina Rosita', phone: '+62-21-444-5555', status: 'Active' },
    { id: 'BLD025', name: 'Gedung Perkakas Y', address: 'Jl. Kebon Jeruk No. 890, Jakarta Barat', floors: 2, totalRooms: 18, occupiedRooms: 15, manager: 'Denny Kurniawan', phone: '+62-21-222-3333', status: 'Closed' },
    { id: 'BLD026', name: 'Fasilitas Kemasan Z', address: 'Jl. Tanjung Duren No. 123, Jakarta Barat', floors: 2, totalRooms: 22, occupiedRooms: 20, manager: 'Evi Susanti', phone: '+62-21-999-1111', status: 'Active' },
    { id: 'BLD027', name: 'Gedung Buku AA', address: 'Jl. Senen Raya No. 456, Jakarta Pusat', floors: 3, totalRooms: 35, occupiedRooms: 30, manager: 'Prof. Amir', phone: '+62-21-777-2222', status: 'Active' },
    { id: 'BLD028', name: 'Pusat AC BB', address: 'Jl. Cawang No. 789, Jakarta Timur', floors: 2, totalRooms: 28, occupiedRooms: 25, manager: 'Yudi Pratama', phone: '+62-21-555-3333', status: 'Active' },
    { id: 'BLD029', name: 'Gedung Dekorasi CC', address: 'Jl. Matraman No. 234, Jakarta Timur', floors: 1, totalRooms: 12, occupiedRooms: 10, manager: 'Sinta Dewi', phone: '+62-21-333-4444', status: 'Active' },
    { id: 'BLD030', name: 'Fasilitas Genset DD', address: 'Jl. Kampung Melayu No. 567, Jakarta Timur', floors: 1, totalRooms: 6, occupiedRooms: 6, manager: 'Rizki Ananda', phone: '+62-21-111-2222', status: 'Active' },
    { id: 'BLD031', name: 'Gedung Helm EE', address: 'Jl. Pasar Rebo No. 890, Jakarta Timur', floors: 2, totalRooms: 16, occupiedRooms: 14, manager: 'Toni Setiawan', phone: '+62-21-888-3333', status: 'Active' },
    { id: 'BLD032', name: 'Laboratorium FF', address: 'Jl. Cipinang No. 123, Jakarta Timur', floors: 4, totalRooms: 50, occupiedRooms: 45, manager: 'Dr. Nina Kartika', phone: '+62-21-666-4444', status: 'Active' },
    { id: 'BLD033', name: 'Pusat Event GG', address: 'Jl. Kelapa Gading No. 456, Jakarta Utara', floors: 3, totalRooms: 25, occupiedRooms: 20, manager: 'Reza Fadillah', phone: '+62-21-444-5555', status: 'Active' },
    { id: 'BLD034', name: 'Gedung Audio HH', address: 'Jl. Sunter No. 789, Jakarta Utara', floors: 2, totalRooms: 18, occupiedRooms: 16, manager: 'Agung Nugroho', phone: '+62-21-222-6666', status: 'Active' },
    { id: 'BLD035', name: 'Fasilitas Lampu II', address: 'Jl. Ancol No. 234, Jakarta Utara', floors: 1, totalRooms: 8, occupiedRooms: 6, manager: 'Dewi Anggraini', phone: '+62-21-999-7777', status: 'Maintenance' },
    { id: 'BLD036', name: 'Gedung APAR JJ', address: 'Jl. Pademangan No. 567, Jakarta Utara', floors: 2, totalRooms: 20, occupiedRooms: 18, manager: 'Bayu Firmansyah', phone: '+62-21-777-8888', status: 'Active' },
    { id: 'BLD037', name: 'Pusat Spare Parts KK', address: 'Jl. Pluit No. 890, Jakarta Utara', floors: 1, totalRooms: 10, occupiedRooms: 8, manager: 'Andi Gunawan', phone: '+62-21-555-9999', status: 'Active' },
    { id: 'BLD038', name: 'Gedung Limbah LL', address: 'Jl. Cengkareng No. 123, Jakarta Barat', floors: 2, totalRooms: 15, occupiedRooms: 12, manager: 'Sari Kusumawati', phone: '+62-21-333-0000', status: 'Active' },
    { id: 'BLD039', name: 'Fasilitas Plastik MM', address: 'Jl. Daan Mogot No. 456, Jakarta Barat', floors: 1, totalRooms: 5, occupiedRooms: 4, manager: 'Rudi Hartono', phone: '+62-21-111-1111', status: 'Active' },
    { id: 'BLD040', name: 'Gedung Printing NN', address: 'Jl. Kalideres No. 789, Jakarta Barat', floors: 2, totalRooms: 12, occupiedRooms: 10, manager: 'Mega Sari', phone: '+62-21-888-2222', status: 'Active' },
    { id: 'BLD041', name: 'Pusat Seragam OO', address: 'Jl. Grogol No. 234, Jakarta Barat', floors: 2, totalRooms: 18, occupiedRooms: 15, manager: 'Putri Maharani', phone: '+62-21-666-3333', status: 'Active' },
    { id: 'BLD042', name: 'Gedung Baja PP', address: 'Jl. Cilincing No. 567, Jakarta Utara', floors: 1, totalRooms: 8, occupiedRooms: 7, manager: 'Joko Susilo', phone: '+62-21-444-4444', status: 'Active' },
    { id: 'BLD043', name: 'Fasilitas Kaca QQ', address: 'Jl. Tanjung Priok No. 890, Jakarta Utara', floors: 2, totalRooms: 14, occupiedRooms: 12, manager: 'Lia Safitri', phone: '+62-21-222-5555', status: 'Active' },
    { id: 'BLD044', name: 'Gedung Keramik RR', address: 'Jl. Koja No. 123, Jakarta Utara', floors: 1, totalRooms: 6, occupiedRooms: 4, manager: 'Budi Raharjo', phone: '+62-21-999-6666', status: 'Closed' },
    { id: 'BLD045', name: 'Pusat Pipa SS', address: 'Jl. Marunda No. 456, Jakarta Utara', floors: 2, totalRooms: 16, occupiedRooms: 14, manager: 'Hari Setiawan', phone: '+62-21-777-7777', status: 'Active' },
    { id: 'BLD046', name: 'Gedung Cat TT', address: 'Jl. Rorotan No. 789, Jakarta Utara', floors: 1, totalRooms: 8, occupiedRooms: 7, manager: 'Nita Sari', phone: '+62-21-555-8888', status: 'Active' },
    { id: 'BLD047', name: 'Fasilitas Sensor UU', address: 'Jl. Kalibaru No. 234, Jakarta Utara', floors: 2, totalRooms: 12, occupiedRooms: 10, manager: 'Fajar Nugraha', phone: '+62-21-333-9999', status: 'Active' },
    { id: 'BLD048', name: 'Gedung Las VV', address: 'Jl. Semper No. 567, Jakarta Utara', floors: 1, totalRooms: 6, occupiedRooms: 5, manager: 'Agus Wibowo', phone: '+62-21-111-3333', status: 'Active' },
    { id: 'BLD049', name: 'Pusat Motor WW', address: 'Jl. Lagoa No. 890, Jakarta Utara', floors: 2, totalRooms: 14, occupiedRooms: 12, manager: 'Rina Seftiani', phone: '+62-21-888-4444', status: 'Active' },
    { id: 'BLD050', name: 'Gedung QC XX', address: 'Jl. Warakas No. 123, Jakarta Utara', floors: 3, totalRooms: 24, occupiedRooms: 20, manager: 'Dodi Hermawan', phone: '+62-21-666-5555', status: 'Active' }
  ];

  const getStatusBadge = (status: string): "default" | "secondary" | "destructive" => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      'Active': 'default',
      'Maintenance': 'secondary',
      'Closed': 'destructive'
    };
    return variants[status] || 'default';
  };

  const getOccupancyRate = (occupied: number, total: number) => {
    const rate = (occupied / total) * 100;
    return `${rate.toFixed(1)}%`;
  };

  const filteredBuildings = buildings.filter(building =>
    building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    building.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    building.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredBuildings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBuildings = filteredBuildings.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Building Management</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Building
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Company Buildings</CardTitle>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search buildings..."
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
                  <TableHead>Building ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Floors</TableHead>
                  <TableHead>Rooms (Occupied/Total)</TableHead>
                  <TableHead>Occupancy Rate</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentBuildings.map((building) => (
                  <TableRow key={building.id}>
                    <TableCell className="font-medium">{building.id}</TableCell>
                    <TableCell>{building.name}</TableCell>
                    <TableCell>{building.address}</TableCell>
                    <TableCell>{building.floors}</TableCell>
                    <TableCell>{building.occupiedRooms}/{building.totalRooms}</TableCell>
                    <TableCell>{getOccupancyRate(building.occupiedRooms, building.totalRooms)}</TableCell>
                    <TableCell>{building.manager}</TableCell>
                    <TableCell><Badge variant={getStatusBadge(building.status)}>{building.status}</Badge></TableCell>
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

export default Buildings;
