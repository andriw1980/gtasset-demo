import React, { useState } from 'react';
import Layout from '../components/Layout';
import AddUserModal from '../components/AddUserModal';
import UserCard from '../components/UserCard';
import UserTable from '../components/UserTable';
import UserSearch from '../components/UserSearch';
import UserPagination from '../components/UserPagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';
import { getRoleBadge, getStatusBadge } from '@/utils/userUtils';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
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
    console.log('User added, refreshing list...');
  };

  return (
    <Layout>
      <div className="space-y-4 lg:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl lg:text-3xl font-bold">User Management</h1>
          <Button 
            className="w-full sm:w-auto"
            onClick={() => setShowAddModal(true)}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add New User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">System Users</CardTitle>
            <div className="flex space-x-2">
              <UserSearch 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0 lg:p-6">
            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4 p-4">
              {currentUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  getRoleBadge={getRoleBadge}
                  getStatusBadge={getStatusBadge}
                />
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block">
              <UserTable
                users={currentUsers}
                getRoleBadge={getRoleBadge}
                getStatusBadge={getStatusBadge}
              />
            </div>
            
            <UserPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </CardContent>
        </Card>

        <AddUserModal
          open={showAddModal}
          onOpenChange={setShowAddModal}
          onUserAdded={handleUserAdded}
        />
      </div>
    </Layout>
  );
};

export default Users;
