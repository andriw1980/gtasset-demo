
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';

const Vendors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock vendor data - 50 items
  const vendors = [
    { id: 'VEN001', name: 'PT Teknologi Nusantara', contactPerson: 'Agus Setiawan', email: 'agus@teknusantara.co.id', phone: '+62-21-123-4567', address: 'Jl. Sudirman No. 123, Jakarta Selatan', category: 'Peralatan IT', status: 'Aktif', contractValue: 'Rp 225.000.000' },
    { id: 'VEN002', name: 'CV Mandiri Furniture', contactPerson: 'Siti Aminah', email: 'siti@mandirifurniture.co.id', phone: '+62-21-987-6543', address: 'Jl. Raya Bogor No. 456, Depok', category: 'Furniture', status: 'Aktif', contractValue: 'Rp 180.000.000' },
    { id: 'VEN003', name: 'PT Bintang Konstruksi', contactPerson: 'Joko Widodo', email: 'joko@bintangkonstruksi.co.id', phone: '+62-21-555-1234', address: 'Jl. Gatot Subroto No. 789, Jakarta Pusat', category: 'Konstruksi', status: 'Aktif', contractValue: 'Rp 500.000.000' },
    { id: 'VEN004', name: 'Toko Alat Tulis Jaya', contactPerson: 'Lisa Andriani', email: 'lisa@alattulisjaya.co.id', phone: '+62-21-555-9876', address: 'Jl. Pahlawan No. 321, Bandung', category: 'Perlengkapan Kantor', status: 'Tidak Aktif', contractValue: 'Rp 37.500.000' },
    { id: 'VEN005', name: 'PT Indotech Solutions', contactPerson: 'Budi Santoso', email: 'budi@indotech.co.id', phone: '+62-21-444-5555', address: 'Jl. Thamrin No. 88, Jakarta Pusat', category: 'Peralatan IT', status: 'Aktif', contractValue: 'Rp 150.000.000' },
    { id: 'VEN006', name: 'CV Mebel Berkah', contactPerson: 'Ratna Sari', email: 'ratna@mebelbekah.co.id', phone: '+62-21-333-4444', address: 'Jl. Veteran No. 99, Surabaya', category: 'Furniture', status: 'Aktif', contractValue: 'Rp 120.000.000' },
    { id: 'VEN007', name: 'PT Elektro Mandiri', contactPerson: 'Hendra Wijaya', email: 'hendra@elektromandiri.co.id', phone: '+62-21-222-3333', address: 'Jl. Diponegoro No. 45, Semarang', category: 'Elektronik', status: 'Aktif', contractValue: 'Rp 300.000.000' },
    { id: 'VEN008', name: 'Toko Mesin Jaya', contactPerson: 'Indra Kusuma', email: 'indra@mesinjaya.co.id', phone: '+62-21-111-2222', address: 'Jl. Asia Afrika No. 67, Bandung', category: 'Mesin Industri', status: 'Aktif', contractValue: 'Rp 450.000.000' },
    { id: 'VEN009', name: 'PT Office Supplies Pro', contactPerson: 'Maya Putri', email: 'maya@officesupplies.co.id', phone: '+62-21-999-8888', address: 'Jl. Hayam Wuruk No. 123, Jakarta Barat', category: 'Perlengkapan Kantor', status: 'Aktif', contractValue: 'Rp 85.000.000' },
    { id: 'VEN010', name: 'CV Kendaraan Utama', contactPerson: 'Rudi Hermawan', email: 'rudi@kendaraanutama.co.id', phone: '+62-21-777-6666', address: 'Jl. Gajah Mada No. 234, Jakarta Pusat', category: 'Kendaraan', status: 'Aktif', contractValue: 'Rp 800.000.000' },
    { id: 'VEN011', name: 'PT Cleaning Service Plus', contactPerson: 'Wati Suryani', email: 'wati@cleaningplus.co.id', phone: '+62-21-555-4444', address: 'Jl. Mangga Besar No. 56, Jakarta Utara', category: 'Jasa Pembersihan', status: 'Aktif', contractValue: 'Rp 95.000.000' },
    { id: 'VEN012', name: 'CV Renovasi Prima', contactPerson: 'Ahmad Fauzi', email: 'ahmad@renovasiprima.co.id', phone: '+62-21-333-2222', address: 'Jl. Cikini Raya No. 78, Jakarta Pusat', category: 'Konstruksi', status: 'Aktif', contractValue: 'Rp 250.000.000' },
    { id: 'VEN013', name: 'PT Teknologi Digital', contactPerson: 'Rina Marlina', email: 'rina@teknodigital.co.id', phone: '+62-21-888-7777', address: 'Jl. Kebon Sirih No. 90, Jakarta Pusat', category: 'Peralatan IT', status: 'Aktif', contractValue: 'Rp 175.000.000' },
    { id: 'VEN014', name: 'Toko Elektronik Murah', contactPerson: 'Dedi Supardi', email: 'dedi@elektronikmurah.co.id', phone: '+62-21-666-5555', address: 'Jl. Pasar Baru No. 112, Jakarta Pusat', category: 'Elektronik', status: 'Tidak Aktif', contractValue: 'Rp 65.000.000' },
    { id: 'VEN015', name: 'PT Security Total', contactPerson: 'Bambang Setyo', email: 'bambang@securitytotal.co.id', phone: '+62-21-444-3333', address: 'Jl. Menteng Raya No. 134, Jakarta Pusat', category: 'Keamanan', status: 'Aktif', contractValue: 'Rp 120.000.000' },
    { id: 'VEN016', name: 'CV Peralatan Medis', contactPerson: 'Dr. Sari Dewi', email: 'sari@peralatanmedis.co.id', phone: '+62-21-222-1111', address: 'Jl. Kramat Raya No. 156, Jakarta Pusat', category: 'Alat Kesehatan', status: 'Aktif', contractValue: 'Rp 400.000.000' },
    { id: 'VEN017', name: 'PT Catering Sehat', contactPerson: 'Ibu Lastri', email: 'lastri@cateringsehat.co.id', phone: '+62-21-999-0000', address: 'Jl. Salemba Raya No. 178, Jakarta Pusat', category: 'Katering', status: 'Aktif', contractValue: 'Rp 145.000.000' },
    { id: 'VEN018', name: 'Toko Alat Olahraga', contactPerson: 'Eko Prasetyo', email: 'eko@alatolahraga.co.id', phone: '+62-21-777-8888', address: 'Jl. Cempaka Putih No. 190, Jakarta Pusat', category: 'Peralatan Olahraga', status: 'Aktif', contractValue: 'Rp 78.000.000' },
    { id: 'VEN019', name: 'PT Textile Modern', contactPerson: 'Fitri Handayani', email: 'fitri@textilemodern.co.id', phone: '+62-21-555-9999', address: 'Jl. Tanah Abang No. 212, Jakarta Pusat', category: 'Tekstil', status: 'Aktif', contractValue: 'Rp 160.000.000' },
    { id: 'VEN020', name: 'CV Logistik Express', contactPerson: 'Haris Gunawan', email: 'haris@logistikexpress.co.id', phone: '+62-21-333-0000', address: 'Jl. Kemayoran No. 234, Jakarta Pusat', category: 'Logistik', status: 'Aktif', contractValue: 'Rp 280.000.000' },
    { id: 'VEN021', name: 'PT Bahan Kimia Aman', contactPerson: 'Ir. Suci Rahayu', email: 'suci@bahankimia.co.id', phone: '+62-21-111-0000', address: 'Jl. Rawa Belong No. 256, Jakarta Barat', category: 'Kimia', status: 'Aktif', contractValue: 'Rp 350.000.000' },
    { id: 'VEN022', name: 'Toko Sepatu Safety', contactPerson: 'Anton Wijaya', email: 'anton@sepatusafety.co.id', phone: '+62-21-888-9999', address: 'Jl. Jelambar No. 278, Jakarta Barat', category: 'APD', status: 'Aktif', contractValue: 'Rp 55.000.000' },
    { id: 'VEN023', name: 'PT Percetakan Digital', contactPerson: 'Lina Rosita', email: 'lina@percetakandigital.co.id', phone: '+62-21-666-7777', address: 'Jl. Palmerah No. 290, Jakarta Barat', category: 'Percetakan', status: 'Aktif', contractValue: 'Rp 125.000.000' },
    { id: 'VEN024', name: 'CV Tools Professional', contactPerson: 'Denny Kurniawan', email: 'denny@toolspro.co.id', phone: '+62-21-444-5555', address: 'Jl. Kebon Jeruk No. 312, Jakarta Barat', category: 'Perkakas', status: 'Tidak Aktif', contractValue: 'Rp 89.000.000' },
    { id: 'VEN025', name: 'PT Packaging Solutions', contactPerson: 'Evi Susanti', email: 'evi@packaging.co.id', phone: '+62-21-222-3333', address: 'Jl. Tanjung Duren No. 334, Jakarta Barat', category: 'Kemasan', status: 'Aktif', contractValue: 'Rp 190.000.000' },
    { id: 'VEN026', name: 'Toko Buku Lengkap', contactPerson: 'Prof. Amir', email: 'amir@bukulengkap.co.id', phone: '+62-21-999-1111', address: 'Jl. Senen Raya No. 356, Jakarta Pusat', category: 'Buku & ATK', status: 'Aktif', contractValue: 'Rp 67.000.000' },
    { id: 'VEN027', name: 'PT Air Conditioning Pro', contactPerson: 'Yudi Pratama', email: 'yudi@acpro.co.id', phone: '+62-21-777-2222', address: 'Jl. Cawang No. 378, Jakarta Timur', category: 'AC & Pendingin', status: 'Aktif', contractValue: 'Rp 245.000.000' },
    { id: 'VEN028', name: 'CV Dekorasi Indah', contactPerson: 'Sinta Dewi', email: 'sinta@dekorasiindah.co.id', phone: '+62-21-555-3333', address: 'Jl. Matraman No. 390, Jakarta Timur', category: 'Dekorasi', status: 'Aktif', contractValue: 'Rp 135.000.000' },
    { id: 'VEN029', name: 'PT Generator Power', contactPerson: 'Rizki Ananda', email: 'rizki@generatorpower.co.id', phone: '+62-21-333-4444', address: 'Jl. Kampung Melayu No. 412, Jakarta Timur', category: 'Genset', status: 'Aktif', contractValue: 'Rp 580.000.000' },
    { id: 'VEN030', name: 'Toko Helm Safety', contactPerson: 'Toni Setiawan', email: 'toni@helmsafety.co.id', phone: '+62-21-111-2222', address: 'Jl. Pasar Rebo No. 434, Jakarta Timur', category: 'APD', status: 'Aktif', contractValue: 'Rp 45.000.000' },
    { id: 'VEN031', name: 'PT Laboratory Equipment', contactPerson: 'Dr. Nina Kartika', email: 'nina@labequipment.co.id', phone: '+62-21-888-3333', address: 'Jl. Cipinang No. 456, Jakarta Timur', category: 'Laboratorium', status: 'Aktif', contractValue: 'Rp 465.000.000' },
    { id: 'VEN032', name: 'CV Event Organizer', contactPerson: 'Reza Fadillah', email: 'reza@eventorganizer.co.id', phone: '+62-21-666-4444', address: 'Jl. Kelapa Gading No. 478, Jakarta Utara', category: 'Event', status: 'Aktif', contractValue: 'Rp 185.000.000' },
    { id: 'VEN033', name: 'PT Sound System Pro', contactPerson: 'Agung Nugroho', email: 'agung@soundpro.co.id', phone: '+62-21-444-5555', address: 'Jl. Sunter No. 490, Jakarta Utara', category: 'Audio Visual', status: 'Aktif', contractValue: 'Rp 220.000.000' },
    { id: 'VEN034', name: 'Toko Lampu LED', contactPerson: 'Dewi Anggraini', email: 'dewi@lampuled.co.id', phone: '+62-21-222-6666', address: 'Jl. Ancol No. 512, Jakarta Utara', category: 'Penerangan', status: 'Tidak Aktif', contractValue: 'Rp 78.000.000' },
    { id: 'VEN035', name: 'PT Fire Safety System', contactPerson: 'Bayu Firmansyah', email: 'bayu@firesafety.co.id', phone: '+62-21-999-7777', address: 'Jl. Pademangan No. 534, Jakarta Utara', category: 'APAR', status: 'Aktif', contractValue: 'Rp 320.000.000' },
    { id: 'VEN036', name: 'CV Spare Parts Motor', contactPerson: 'Andi Gunawan', email: 'andi@sparepartsmotor.co.id', phone: '+62-21-777-8888', address: 'Jl. Pluit No. 556, Jakarta Utara', category: 'Spare Parts', status: 'Aktif', contractValue: 'Rp 95.000.000' },
    { id: 'VEN037', name: 'PT Waste Management', contactPerson: 'Sari Kusumawati', email: 'sari@wastemanagement.co.id', phone: '+62-21-555-9999', address: 'Jl. Cengkareng No. 578, Jakarta Barat', category: 'Limbah', status: 'Aktif', contractValue: 'Rp 155.000.000' },
    { id: 'VEN038', name: 'Toko Gelas Plastik', contactPerson: 'Rudi Hartono', email: 'rudi@gelasplastik.co.id', phone: '+62-21-333-0000', address: 'Jl. Daan Mogot No. 590, Jakarta Barat', category: 'Plastik', status: 'Aktif', contractValue: 'Rp 42.000.000' },
    { id: 'VEN039', name: 'PT Digital Printing', contactPerson: 'Mega Sari', email: 'mega@digitalprinting.co.id', phone: '+62-21-111-1111', address: 'Jl. Kalideres No. 612, Jakarta Barat', category: 'Percetakan', status: 'Aktif', contractValue: 'Rp 165.000.000' },
    { id: 'VEN040', name: 'CV Uniform Kantor', contactPerson: 'Putri Maharani', email: 'putri@uniformkantor.co.id', phone: '+62-21-888-2222', address: 'Jl. Grogol No. 634, Jakarta Barat', category: 'Seragam', status: 'Aktif', contractValue: 'Rp 115.000.000' },
    { id: 'VEN041', name: 'PT Steel Construction', contactPerson: 'Joko Susilo', email: 'joko@steelconstruction.co.id', phone: '+62-21-666-3333', address: 'Jl. Cilincing No. 656, Jakarta Utara', category: 'Baja', status: 'Aktif', contractValue: 'Rp 750.000.000' },
    { id: 'VEN042', name: 'Toko Kaca Tempered', contactPerson: 'Lia Safitri', email: 'lia@kacatempered.co.id', phone: '+62-21-444-4444', address: 'Jl. Tanjung Priok No. 678, Jakarta Utara', category: 'Kaca', status: 'Aktif', contractValue: 'Rp 195.000.000' },
    { id: 'VEN043', name: 'PT Ceramic Tiles', contactPerson: 'Budi Raharjo', email: 'budi@ceramictiles.co.id', phone: '+62-21-222-5555', address: 'Jl. Koja No. 690, Jakarta Utara', category: 'Keramik', status: 'Tidak Aktif', contractValue: 'Rp 125.000.000' },
    { id: 'VEN044', name: 'CV Pipe System', contactPerson: 'Hari Setiawan', email: 'hari@pipesystem.co.id', phone: '+62-21-999-6666', address: 'Jl. Marunda No. 712, Jakarta Utara', category: 'Pipa', status: 'Aktif', contractValue: 'Rp 210.000.000' },
    { id: 'VEN045', name: 'PT Paint Professional', contactPerson: 'Nita Sari', email: 'nita@paintpro.co.id', phone: '+62-21-777-7777', address: 'Jl. Rorotan No. 734, Jakarta Utara', category: 'Cat', status: 'Aktif', contractValue: 'Rp 88.000.000' },
    { id: 'VEN046', name: 'Toko Sensor Elektronik', contactPerson: 'Fajar Nugraha', email: 'fajar@sensorelektronik.co.id', phone: '+62-21-555-8888', address: 'Jl. Kalibaru No. 756, Jakarta Utara', category: 'Sensor', status: 'Aktif', contractValue: 'Rp 145.000.000' },
    { id: 'VEN047', name: 'PT Welding Equipment', contactPerson: 'Agus Wibowo', email: 'agus@weldingequipment.co.id', phone: '+62-21-333-9999', address: 'Jl. Semper No. 778, Jakarta Utara', category: 'Las', status: 'Aktif', contractValue: 'Rp 265.000.000' },
    { id: 'VEN048', name: 'CV Motor Listrik', contactPerson: 'Rina Seftiani', email: 'rina@motorlistrik.co.id', phone: '+62-21-111-3333', address: 'Jl. Lagoa No. 790, Jakarta Utara', category: 'Motor Listrik', status: 'Aktif', contractValue: 'Rp 385.000.000' },
    { id: 'VEN049', name: 'PT Quality Control', contactPerson: 'Dodi Hermawan', email: 'dodi@qualitycontrol.co.id', phone: '+62-21-888-4444', address: 'Jl. Warakas No. 812, Jakarta Utara', category: 'QC Equipment', status: 'Aktif', contractValue: 'Rp 295.000.000' },
    { id: 'VEN050', name: 'Toko Plastik Kemasan', contactPerson: 'Sinta Purnama', email: 'sinta@plastikkemasan.co.id', phone: '+62-21-666-5555', address: 'Jl. Muara Baru No. 834, Jakarta Utara', category: 'Kemasan Plastik', status: 'Aktif', contractValue: 'Rp 72.000.000' }
  ];

  const getStatusBadge = (status: string) => {
    return <Badge variant={status === 'Aktif' ? 'default' : 'secondary'}>{status}</Badge>;
  };

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVendors = filteredVendors.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Vendor Management</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Vendor
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registered Vendors</CardTitle>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search vendors..."
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
                  <TableHead>Vendor ID</TableHead>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Contract Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentVendors.map((vendor) => (
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

export default Vendors;
