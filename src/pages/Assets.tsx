
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Assets = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock asset data
  const assets = [
    {
      id: 'AST001',
      name: 'Dell Laptop OptiPlex 3090',
      category: 'IT Equipment',
      location: 'Building A - Floor 2',
      status: 'Active',
      assignedTo: 'John Doe',
      purchaseDate: '2023-01-15',
      value: '$1,200'
    },
    {
      id: 'AST002',
      name: 'Office Chair Ergonomic',
      category: 'Furniture',
      location: 'Building B - Floor 1',
      status: 'Active',
      assignedTo: 'Jane Smith',
      purchaseDate: '2023-02-20',
      value: '$350'
    },
    {
      id: 'AST003',
      name: 'HP Printer LaserJet Pro',
      category: 'IT Equipment',
      location: 'Building A - Floor 1',
      status: 'Maintenance',
      assignedTo: 'IT Department',
      purchaseDate: '2022-11-10',
      value: '$800'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      'Active': 'default',
      'Maintenance': 'secondary',
      'Retired': 'destructive'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Asset Management</h1>
          <Link to="/assets/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Asset
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Asset Inventory</CardTitle>
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
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.id}</TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.category}</TableCell>
                    <TableCell>{asset.location}</TableCell>
                    <TableCell>{getStatusBadge(asset.status)}</TableCell>
                    <TableCell>{asset.assignedTo}</TableCell>
                    <TableCell>{asset.value}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Link to={`/assets/${asset.id}`}>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
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

export default Assets;
