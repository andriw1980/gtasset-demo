import React, { useState } from 'react';
import Layout from '../components/Layout';
import { AddUserDialog } from '../components/AddUserDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search, Plus, Edit, Trash2, UserPlus } from 'lucide-react';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const itemsPerPage = 10;

  // Mock user data - 50 items
  const users = [
    { id: '1', username: 'admin', fullName: 'Budi Santoso', email: 'admin@gamatechno.co.id', role: 'admin', position: 'Manajer IT', unit: 'Departemen IT', workArea: 'Kantor Pusat', status: 'Aktif' },
    { id: '2', username: 'staff', fullName: 'Sri Wahyuni', email: 'staff@gamatechno.co.id', role: 'staff', position: 'Koordinator Aset', unit: 'Operasional', workArea: 'Gedung A', status: 'Aktif' },
    { id: '3', username: 'auditor', fullName: 'Agus Prasetyo', email: 'auditor@gamatechno.co.id', role: 'auditor', position: 'Auditor Internal', unit: 'Departemen Audit', workArea: 'Kantor Pusat', status: 'Aktif' },
    { id: '4', username: 'staff2', fullName: 'Dewi Sartika', email: 'dewi@gamatechno.co.id', role: 'staff', position: 'Manajer Operasional', unit: 'Operasional', workArea: 'Gedung B', status: 'Tidak Aktif' },
    { id: '5', username: 'supervisor', fullName: 'Andi Pratama', email: 'andi@gamatechno.co.id', role: 'supervisor', position: 'Supervisor Lapangan', unit: 'Produksi', workArea: 'Pabrik Jakarta', status: 'Aktif' },
    { id: '6', username: 'siti.n', fullName: 'Siti Nurhaliza', email: 'siti.n@gamatechno.co.id', role: 'staff', position: 'Quality Control', unit: 'QC', workArea: 'Lab QC', status: 'Aktif' },
    { id: '7', username: 'hendra.w', fullName: 'Hendra Wijaya', email: 'hendra.w@gamatechno.co.id', role: 'staff', position: 'Teknisi Listrik', unit: 'Maintenance', workArea: 'Workshop', status: 'Aktif' },
    { id: '8', username: 'ratna.s', fullName: 'Ratna Sari', email: 'ratna.s@gamatechno.co.id', role: 'staff', position: 'Admin Gudang', unit: 'Logistik', workArea: 'Gudang Utama', status: 'Aktif' },
    { id: '9', username: 'indra.k', fullName: 'Indra Kusuma', email: 'indra.k@gamatechno.co.id', role: 'supervisor', position: 'Supervisor Gudang', unit: 'Logistik', workArea: 'Gudang A', status: 'Aktif' },
    { id: '10', username: 'maya.p', fullName: 'Maya Putri', email: 'maya.p@gamatechno.co.id', role: 'staff', position: 'Admin Keuangan', unit: 'Keuangan', workArea: 'Gedung B Lt.2', status: 'Aktif' },
    { id: '11', username: 'rudi.h', fullName: 'Rudi Hermawan', email: 'rudi.h@gamatechno.co.id', role: 'staff', position: 'Driver', unit: 'Transport', workArea: 'Pool Kendaraan', status: 'Aktif' },
    { id: '12', username: 'wati.s', fullName: 'Wati Suryani', email: 'wati.s@gamatechno.co.id', role: 'staff', position: 'Cleaning Service', unit: 'Housekeeping', workArea: 'Gedung A', status: 'Aktif' },
    { id: '13', username: 'ahmad.f', fullName: 'Ahmad Fauzi', email: 'ahmad.f@gamatechno.co.id', role: 'staff', position: 'Tukang Bangunan', unit: 'Maintenance', workArea: 'Workshop', status: 'Aktif' },
    { id: '14', username: 'rina.m', fullName: 'Rina Marlina', email: 'rina.m@gamatechno.co.id', role: 'admin', position: 'IT Support', unit: 'Departemen IT', workArea: 'Server Room', status: 'Aktif' },
    { id: '15', username: 'dedi.s', fullName: 'Dedi Supardi', email: 'dedi.s@gamatechno.co.id', role: 'staff', position: 'Teknisi Elektronik', unit: 'Maintenance', workArea: 'Lab Elektronik', status: 'Tidak Aktif' },
    { id: '16', username: 'bambang.s', fullName: 'Bambang Setyo', email: 'bambang.s@gamatechno.co.id', role: 'supervisor', position: 'Security Chief', unit: 'Security', workArea: 'Pos Keamanan', status: 'Aktif' },
    { id: '17', username: 'sari.d', fullName: 'Dr. Sari Dewi', email: 'sari.d@gamatechno.co.id', role: 'staff', position: 'Dokter Perusahaan', unit: 'Medical', workArea: 'Klinik', status: 'Aktif' },
    { id: '18', username: 'lastri', fullName: 'Ibu Lastri', email: 'lastri@gamatechno.co.id', role: 'staff', position: 'Kepala Dapur', unit: 'Catering', workArea: 'Dapur Utama', status: 'Aktif' },
    { id: '19', username: 'eko.p', fullName: 'Eko Prasetyo', email: 'eko.p@gamatechno.co.id', role: 'staff', position: 'Instruktur Olahraga', unit: 'HR', workArea: 'Gym', status: 'Aktif' },
    { id: '20', username: 'fitri.h', fullName: 'Fitri Handayani', email: 'fitri.h@gamatechno.co.id', role: 'staff', position: 'Designer Grafis', unit: 'Marketing', workArea: 'Studio Design', status: 'Aktif' },
    { id: '21', username: 'haris.g', fullName: 'Haris Gunawan', email: 'haris.g@gamatechno.co.id', role: 'supervisor', position: 'Koordinator Logistik', unit: 'Logistik', workArea: 'Pusat Distribusi', status: 'Aktif' },
    { id: '22', username: 'suci.r', fullName: 'Ir. Suci Rahayu', email: 'suci.r@gamatechno.co.id', role: 'staff', position: 'Ahli Kimia', unit: 'R&D', workArea: 'Lab Kimia', status: 'Aktif' },
    { id: '23', username: 'anton.w', fullName: 'Anton Wijaya', email: 'anton.w@gamatechno.co.id', role: 'staff', position: 'Safety Officer', unit: 'K3', workArea: 'Seluruh Area', status: 'Aktif' },
    { id: '24', username: 'lina.r', fullName: 'Lina Rosita', email: 'lina.r@gamatechno.co.id', role: 'staff', position: 'Operator Mesin Cetak', unit: 'Produksi', workArea: 'Ruang Cetak', status: 'Aktif' },
    { id: '25', username: 'denny.k', fullName: 'Denny Kurniawan', email: 'denny.k@gamatechno.co.id', role: 'staff', position: 'Teknisi Mekanik', unit: 'Maintenance', workArea: 'Workshop Mekanik', status: 'Tidak Aktif' },
    { id: '26', username: 'evi.s', fullName: 'Evi Susanti', email: 'evi.s@gamatechno.co.id', role: 'staff', position: 'Spesialis Kemasan', unit: 'Produksi', workArea: 'Divisi Kemasan', status: 'Aktif' },
    { id: '27', username: 'amir', fullName: 'Prof. Amir', email: 'amir@gamatechno.co.id', role: 'staff', position: 'Pustakawan', unit: 'HR', workArea: 'Perpustakaan', status: 'Aktif' },
    { id: '28', username: 'yudi.p', fullName: 'Yudi Pratama', email: 'yudi.p@gamatechno.co.id', role: 'staff', position: 'Teknisi AC', unit: 'Maintenance', workArea: 'Seluruh Gedung', status: 'Aktif' },
    { id: '29', username: 'sinta.d', fullName: 'Sinta Dewi', email: 'sinta.d@gamatechno.co.id', role: 'staff', position: 'Interior Designer', unit: 'Fasilitas', workArea: 'Studio Interior', status: 'Aktif' },
    { id: '30', username: 'rizki.a', fullName: 'Rizki Ananda', email: 'rizki.a@gamatechno.co.id', role: 'staff', position: 'Operator Genset', unit: 'Utility', workArea: 'Ruang Genset', status: 'Aktif' },
    { id: '31', username: 'toni.s', fullName: 'Toni Setiawan', email: 'toni.s@gamatechno.co.id', role: 'staff', position: 'Koordinator K3', unit: 'K3', workArea: 'Office K3', status: 'Aktif' },
    { id: '32', username: 'nina.k', fullName: 'Dr. Nina Kartika', email: 'nina.k@gamatechno.co.id', role: 'staff', position: 'Lab Analyst', unit: 'QC', workArea: 'Lab Utama', status: 'Aktif' },
    { id: '33', username: 'reza.f', fullName: 'Reza Fadillah', email: 'reza.f@gamatechno.co.id', role: 'staff', position: 'Event Coordinator', unit: 'Marketing', workArea: 'Event Hall', status: 'Aktif' },
    { id: '34', username: 'agung.n', fullName: 'Agung Nugroho', email: 'agung.n@gamatechno.co.id', role: 'staff', position: 'Audio Visual Tech', unit: 'IT Support', workArea: 'AV Room', status: 'Aktif' },
    { id: '35', username: 'dewi.a', fullName: 'Dewi Anggraini', email: 'dewi.a@gamatechno.co.id', role: 'staff', position: 'Lighting Technician', unit: 'Maintenance', workArea: 'Electrical Room', status: 'Tidak Aktif' },
    { id: '36', username: 'bayu.f', fullName: 'Bayu Firmansyah', email: 'bayu.f@gamatechno.co.id', role: 'supervisor', position: 'Fire Safety Officer', unit: 'K3', workArea: 'Safety Center', status: 'Aktif' },
    { id: '37', username: 'andi.g', fullName: 'Andi Gunawan', email: 'andi.g@gamatechno.co.id', role: 'staff', position: 'Mekanik Motor', unit: 'Transport', workArea: 'Workshop Motor', status: 'Aktif' },
    { id: '38', username: 'sari.k', fullName: 'Sari Kusumawati', email: 'sari.k@gamatechno.co.id', role: 'staff', position: 'Waste Manager', unit: 'Environment', workArea: 'TPS', status: 'Aktif' },
    { id: '39', username: 'rudi.hart', fullName: 'Rudi Hartono', email: 'rudi.hart@gamatechno.co.id', role: 'staff', position: 'Quality Inspector', unit: 'QC', workArea: 'Inspection Area', status: 'Aktif' },
    { id: '40', username: 'mega.s', fullName: 'Mega Sari', email: 'mega.s@gamatechno.co.id', role: 'staff', position: 'Print Operator', unit: 'Produksi', workArea: 'Digital Print', status: 'Aktif' },
    { id: '41', username: 'putri.m', fullName: 'Putri Maharani', email: 'putri.m@gamatechno.co.id', role: 'staff', position: 'Uniform Coordinator', unit: 'HR', workArea: 'Uniform Store', status: 'Aktif' },
    { id: '42', username: 'joko.s', fullName: 'Joko Susilo', email: 'joko.s@gamatechno.co.id', role: 'staff', position: 'Welder', unit: 'Maintenance', workArea: 'Welding Shop', status: 'Aktif' },
    { id: '43', username: 'lia.s', fullName: 'Lia Safitri', email: 'lia.s@gamatechno.co.id', role: 'staff', position: 'Glass Installer', unit: 'Maintenance', workArea: 'Glass Workshop', status: 'Aktif' },
    { id: '44', username: 'budi.r', fullName: 'Budi Raharjo', email: 'budi.r@gamatechno.co.id', role: 'staff', position: 'Tile Installer', unit: 'Maintenance', workArea: 'Construction Area', status: 'Tidak Aktif' },
    { id: '45', username: 'hari.s', fullName: 'Hari Setiawan', email: 'hari.s@gamatechno.co.id', role: 'staff', position: 'Plumber', unit: 'Maintenance', workArea: 'Plumbing Shop', status: 'Aktif' },
    { id: '46', username: 'nita.s', fullName: 'Nita Sari', email: 'nita.s@gamatechno.co.id', role: 'staff', position: 'Painter', unit: 'Maintenance', workArea: 'Paint Shop', status: 'Aktif' },
    { id: '47', username: 'fajar.n', fullName: 'Fajar Nugraha', email: 'fajar.n@gamatechno.co.id', role: 'staff', position: 'Electronics Tech', unit: 'R&D', workArea: 'Electronics Lab', status: 'Aktif' },
    { id: '48', username: 'agus.w', fullName: 'Agus Wibowo', email: 'agus.w@gamatechno.co.id', role: 'staff', position: 'Welding Supervisor', unit: 'Maintenance', workArea: 'Welding Department', status: 'Aktif' },
    { id: '49', username: 'rina.s', fullName: 'Rina Seftiani', email: 'rina.s@gamatechno.co.id', role: 'staff', position: 'Motor Tech', unit: 'Maintenance', workArea: 'Motor Workshop', status: 'Aktif' },
    { id: '50', username: 'dodi.h', fullName: 'Dodi Hermawan', email: 'dodi.h@gamatechno.co.id', role: 'auditor', position: 'QC Auditor', unit: 'QC', workArea: 'Audit Room', status: 'Aktif' }
  ];

  const getRoleBadge = (role: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      'admin': 'destructive',
      'staff': 'default',
      'auditor': 'secondary',
      'supervisor': 'secondary'
    };
    return <Badge variant={variants[role] || 'default'}>{role.toUpperCase()}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    return <Badge variant={status === 'Aktif' ? 'default' : 'secondary'}>{status}</Badge>;
  };

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUserAdded = () => {
    // Refresh the users list - in a real app, this would refetch from the database
    console.log('User added successfully');
  };

  return (
    <Layout>
      <div className="space-y-4 lg:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl lg:text-3xl font-bold">User Management</h1>
          <Button 
            className="w-full sm:w-auto"
            onClick={() => setIsAddUserDialogOpen(true)}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add New User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">System Users</CardTitle>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 lg:p-6">
            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4 p-4">
              {currentUsers.map((user) => (
                <Card key={user.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-sm">{user.fullName}</h3>
                          <p className="text-xs text-gray-600">@{user.username}</p>
                        </div>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline" className="p-1 h-8 w-8">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="p-1 h-8 w-8">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600">
                        <p>{user.email}</p>
                        <p className="mt-1">{user.position} • {user.unit}</p>
                        <p>{user.workArea}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          {getRoleBadge(user.role)}
                          {getStatusBadge(user.status)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">Full Name</TableHead>
                    <TableHead className="min-w-[120px]">Username</TableHead>
                    <TableHead className="min-w-[200px]">Email</TableHead>
                    <TableHead className="min-w-[100px]">Role</TableHead>
                    <TableHead className="min-w-[150px]">Position</TableHead>
                    <TableHead className="min-w-[120px]">Unit</TableHead>
                    <TableHead className="min-w-[150px]">Work Area</TableHead>
                    <TableHead className="min-w-[100px]">Status</TableHead>
                    <TableHead className="min-w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.fullName}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{user.position}</TableCell>
                      <TableCell>{user.unit}</TableCell>
                      <TableCell>{user.workArea}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
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
            </div>
            
            {/* Responsive Pagination */}
            <div className="mt-4 px-4 lg:px-0">
              <Pagination>
                <PaginationContent className="flex-wrap justify-center gap-1">
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} text-xs lg:text-sm`}
                    />
                  </PaginationItem>
                  
                  {/* Show fewer page numbers on mobile */}
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const page = i + Math.max(1, currentPage - 2);
                    if (page > totalPages) return null;
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer text-xs lg:text-sm min-w-8 lg:min-w-10"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} text-xs lg:text-sm`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>

        <AddUserDialog
          open={isAddUserDialogOpen}
          onOpenChange={setIsAddUserDialogOpen}
          onUserAdded={handleUserAdded}
        />
      </div>
    </Layout>
  );
};

export default Users;
