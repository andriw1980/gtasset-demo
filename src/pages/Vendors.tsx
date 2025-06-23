
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Edit, Trash2, Building } from 'lucide-react';

const Vendors = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock vendor data
  const vendors = [
    {
      id: 'VEN001',
      name: 'Dell Technologies',
      contactPerson: 'Robert Dell',
      email: 'contact@dell.com',
      phone: '+1-800-123-4567',
      address: '1 Dell Way, Round Rock, TX 78682',
      category: 'IT Equipment',
      status: 'Active',
      contractValue: '$150,000'
    },
    {
      id: 'VEN002',
      name: 'HP Inc.',
      contactPerson: 'Sarah HP',
      email: 'sales@hp.com',
      phone: '+1-800-987-6543',
      address: '1501 Page Mill Road, Palo Alto, CA 94304',
      category: 'IT Equipment',
      status: 'Active',
      contractValue: '$120,000'
    },
    {
      id: 'VEN003',
      name: 'Office Furniture Plus',
      contactPerson: 'Mike Johnson',
      email: 'mike@officefurniture.com',
      phone: '+1-555-123-4567',
      address: '123 Furniture St, Chicago, IL 60601',
      category: 'Furniture',
      status: 'Active',
      contractValue: '$75,000'
    },
    {
      id: 'VEN004',
      name: 'TechSupply Corp',
      contactPerson: 'Lisa Chen',
      email: 'lisa@techsupply.com',
      phone: '+1-555-987-6543',
      address: '456 Tech Ave, Seattle, WA 98101',
      category: 'Office Supplies',
      status: 'Inactive',
      contractValue: '$25,000'
    }
  ];

  const getStatusBadge = (status: string) => {
    return <Badge variant={status === 'Active' ? 'default' : 'secondary'}>{status}</Badge>;
  };

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                {filteredVendors.map((vendor) => (
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
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Vendors;
