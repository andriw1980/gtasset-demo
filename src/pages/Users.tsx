
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Edit, Trash2, UserPlus } from 'lucide-react';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock user data
  const users = [
    {
      id: '1',
      username: 'admin',
      fullName: 'Budi Santoso',
      email: 'admin@gamatechno.co.id',
      role: 'admin',
      position: 'Manajer IT',
      unit: 'Departemen IT',
      workArea: 'Kantor Pusat',
      status: 'Aktif'
    },
    {
      id: '2',
      username: 'staff',
      fullName: 'Sri Wahyuni',
      email: 'staff@gamatechno.co.id',
      role: 'staff',
      position: 'Koordinator Aset',
      unit: 'Operasional',
      workArea: 'Gedung A',
      status: 'Aktif'
    },
    {
      id: '3',
      username: 'auditor',
      fullName: 'Agus Prasetyo',
      email: 'auditor@gamatechno.co.id',
      role: 'auditor',
      position: 'Auditor Internal',
      unit: 'Departemen Audit',
      workArea: 'Kantor Pusat',
      status: 'Aktif'
    },
    {
      id: '4',
      username: 'staff2',
      fullName: 'Dewi Sartika',
      email: 'dewi@gamatechno.co.id',
      role: 'staff',
      position: 'Manajer Operasional',
      unit: 'Operasional',
      workArea: 'Gedung B',
      status: 'Tidak Aktif'
    },
    {
      id: '5',
      username: 'supervisor',
      fullName: 'Andi Pratama',
      email: 'andi@gamatechno.co.id',
      role: 'supervisor',
      position: 'Supervisor Lapangan',
      unit: 'Produksi',
      workArea: 'Pabrik Jakarta',
      status: 'Aktif'
    }
  ];

  const getRoleBadge = (role: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      'admin': 'destructive',
      'staff': 'default',
      'auditor': 'secondary',
      'supervisor': 'outline'
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

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manajemen Pengguna</h1>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Tambah Pengguna Baru
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pengguna Sistem</CardTitle>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari pengguna..."
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
                  <TableHead>Nama Lengkap</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Jabatan</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Area Kerja</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
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
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Users;
