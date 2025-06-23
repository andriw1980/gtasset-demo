
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
      fullName: 'John Administrator',
      email: 'admin@company.com',
      role: 'admin',
      position: 'IT Manager',
      unit: 'IT Department',
      workArea: 'Head Office',
      status: 'Active'
    },
    {
      id: '2',
      username: 'staff',
      fullName: 'Jane Staff',
      email: 'staff@company.com',
      role: 'staff',
      position: 'Asset Coordinator',
      unit: 'Operations',
      workArea: 'Building A',
      status: 'Active'
    },
    {
      id: '3',
      username: 'auditor',
      fullName: 'Mike Auditor',
      email: 'auditor@company.com',
      role: 'auditor',
      position: 'Internal Auditor',
      unit: 'Audit Department',
      workArea: 'Head Office',
      status: 'Active'
    },
    {
      id: '4',
      username: 'staff2',
      fullName: 'Sarah Wilson',
      email: 'sarah@company.com',
      role: 'staff',
      position: 'Operations Manager',
      unit: 'Operations',
      workArea: 'Building B',
      status: 'Inactive'
    }
  ];

  const getRoleBadge = (role: string) => {
    const variants = {
      'admin': 'destructive',
      'staff': 'default',
      'auditor': 'secondary'
    };
    return <Badge variant={variants[role as keyof typeof variants] || 'default'}>{role.toUpperCase()}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    return <Badge variant={status === 'Active' ? 'default' : 'secondary'}>{status}</Badge>;
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
          <h1 className="text-3xl font-bold">User Management</h1>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add New User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>System Users</CardTitle>
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
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Work Area</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
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
