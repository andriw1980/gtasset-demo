
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

type UserTableProps = {
  users: Array<{
    id: string;
    username: string;
    fullName: string;
    email: string;
    role: string;
    position: string;
    unit: string;
    workArea: string;
    status: string;
  }>;
  getRoleBadge: (role: string) => React.ReactNode;
  getStatusBadge: (status: string) => React.ReactNode;
};

const UserTable = ({ users, getRoleBadge, getStatusBadge }: UserTableProps) => {
  return (
    <div className="overflow-x-auto">
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
          {users.map((user) => (
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
  );
};

export default UserTable;
