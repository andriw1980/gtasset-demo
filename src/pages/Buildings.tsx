import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Edit, Trash2, Building2 } from 'lucide-react';

const Buildings = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock building data
  const buildings = [
    {
      id: 'BLD001',
      name: 'Head Office Building A',
      address: '123 Corporate Blvd, Downtown, City 12345',
      floors: 5,
      totalRooms: 120,
      occupiedRooms: 98,
      manager: 'John Smith',
      phone: '+1-555-001-0001',
      status: 'Active'
    },
    {
      id: 'BLD002',
      name: 'Office Building B',
      address: '456 Business Ave, Uptown, City 12346',
      floors: 3,
      totalRooms: 75,
      occupiedRooms: 65,
      manager: 'Sarah Johnson',
      phone: '+1-555-001-0002',
      status: 'Active'
    },
    {
      id: 'BLD003',
      name: 'Warehouse Complex C',
      address: '789 Industrial Dr, Warehouse District, City 12347',
      floors: 2,
      totalRooms: 25,
      occupiedRooms: 20,
      manager: 'Mike Wilson',
      phone: '+1-555-001-0003',
      status: 'Active'
    },
    {
      id: 'BLD004',
      name: 'Storage Facility D',
      address: '321 Storage St, Industrial Zone, City 12348',
      floors: 1,
      totalRooms: 10,
      occupiedRooms: 5,
      manager: 'Lisa Brown',
      phone: '+1-555-001-0004',
      status: 'Maintenance'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      'Active': 'default',
      'Maintenance': 'secondary',
      'Closed': 'destructive'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
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
                {filteredBuildings.map((building) => (
                  <TableRow key={building.id}>
                    <TableCell className="font-medium">{building.id}</TableCell>
                    <TableCell>{building.name}</TableCell>
                    <TableCell>{building.address}</TableCell>
                    <TableCell>{building.floors}</TableCell>
                    <TableCell>{building.occupiedRooms}/{building.totalRooms}</TableCell>
                    <TableCell>{getOccupancyRate(building.occupiedRooms, building.totalRooms)}</TableCell>
                    <TableCell>{building.manager}</TableCell>
                    <TableCell>{getStatusBadge(building.status)}</TableCell>
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

export default Buildings;
