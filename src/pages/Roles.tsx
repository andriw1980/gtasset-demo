
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Shield, Plus, Edit, Trash, Save, X } from 'lucide-react';

interface Permission {
  module: string;
  read: boolean;
  write: boolean;
  delete: boolean;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}

const defaultPermissions: Permission[] = [
  { module: 'Dashboard', read: true, write: false, delete: false },
  { module: 'Assets', read: true, write: false, delete: false },
  { module: 'Asset Request', read: true, write: false, delete: false },
  { module: 'Asset Transfer', read: true, write: false, delete: false },
  { module: 'Asset Write Off', read: true, write: false, delete: false },
  { module: 'Asset Auction', read: true, write: false, delete: false },
  { module: 'Preventive Maintenance', read: true, write: false, delete: false },
  { module: 'Corrective Maintenance', read: true, write: false, delete: false },
  { module: 'Vendors', read: true, write: false, delete: false },
  { module: 'Buildings', read: true, write: false, delete: false },
  { module: 'Insurance', read: true, write: false, delete: false },
  { module: 'Asset Depreciation', read: true, write: false, delete: false },
  { module: 'Users', read: false, write: false, delete: false },
  { module: 'Roles', read: false, write: false, delete: false },
];

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Administrator',
    description: 'Full system access',
    permissions: defaultPermissions.map(p => ({ ...p, read: true, write: true, delete: true })),
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Asset Manager',
    description: 'Asset management and maintenance',
    permissions: defaultPermissions.map(p => ({
      ...p,
      read: true,
      write: !['Users', 'Roles'].includes(p.module),
      delete: !['Users', 'Roles'].includes(p.module)
    })),
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02'
  },
  {
    id: '3',
    name: 'Auditor',
    description: 'View-only access for auditing',
    permissions: defaultPermissions.map(p => ({ ...p, read: true, write: false, delete: false })),
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03'
  }
];

const Roles = () => {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [permissions, setPermissions] = useState<Permission[]>(defaultPermissions);

  const form = useForm({
    defaultValues: {
      name: '',
      description: ''
    }
  });

  const handleAddRole = () => {
    setEditingRole(null);
    setPermissions(defaultPermissions);
    form.reset();
    setIsDialogOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setPermissions(role.permissions);
    form.setValue('name', role.name);
    form.setValue('description', role.description);
    setIsDialogOpen(true);
  };

  const handleDeleteRole = (roleId: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(r => r.id !== roleId));
    }
  };

  const handlePermissionChange = (moduleIndex: number, permissionType: keyof Omit<Permission, 'module'>) => {
    const newPermissions = [...permissions];
    newPermissions[moduleIndex] = {
      ...newPermissions[moduleIndex],
      [permissionType]: !newPermissions[moduleIndex][permissionType]
    };
    setPermissions(newPermissions);
  };

  const handleSaveRole = (data: { name: string; description: string }) => {
    const now = new Date().toISOString().split('T')[0];
    
    if (editingRole) {
      // Update existing role
      setRoles(roles.map(r => 
        r.id === editingRole.id 
          ? { ...r, ...data, permissions, updatedAt: now }
          : r
      ));
    } else {
      // Add new role
      const newRole: Role = {
        id: Date.now().toString(),
        ...data,
        permissions,
        createdAt: now,
        updatedAt: now
      };
      setRoles([...roles, newRole]);
    }
    
    setIsDialogOpen(false);
    form.reset();
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-[#096284]" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Roles Management</h1>
              <p className="text-gray-600">Manage user roles and permissions</p>
            </div>
          </div>
          <Button onClick={handleAddRole} className="bg-[#096284] hover:bg-[#096284]/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Role
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>System Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>{role.createdAt}</TableCell>
                    <TableCell>{role.updatedAt}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditRole(role)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteRole(role.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingRole ? 'Edit Role' : 'Add New Role'}
              </DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSaveRole)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: 'Role name is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter role name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    rules={{ required: 'Description is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter role description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Permissions</h3>
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Module</TableHead>
                          <TableHead className="text-center">Read</TableHead>
                          <TableHead className="text-center">Write</TableHead>
                          <TableHead className="text-center">Delete</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {permissions.map((permission, index) => (
                          <TableRow key={permission.module}>
                            <TableCell className="font-medium">{permission.module}</TableCell>
                            <TableCell className="text-center">
                              <input
                                type="checkbox"
                                checked={permission.read}
                                onChange={() => handlePermissionChange(index, 'read')}
                                className="h-4 w-4"
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <input
                                type="checkbox"
                                checked={permission.write}
                                onChange={() => handlePermissionChange(index, 'write')}
                                className="h-4 w-4"
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <input
                                type="checkbox"
                                checked={permission.delete}
                                onChange={() => handlePermissionChange(index, 'delete')}
                                className="h-4 w-4"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#096284] hover:bg-[#096284]/90">
                    <Save className="h-4 w-4 mr-2" />
                    Save Role
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Roles;
