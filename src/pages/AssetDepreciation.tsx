
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const AssetDepreciation = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock asset data with depreciation info
  const assets = [
    {
      id: 'AST001',
      name: 'Dell Laptop OptiPlex 3090',
      category: 'IT Equipment',
      purchaseDate: '2023-01-15',
      originalValue: 1200,
      currentValue: 950,
      depreciationMethod: 'Straight Line',
      usefulLife: 5,
      status: 'Active'
    },
    {
      id: 'AST002',
      name: 'Office Chair Ergonomic',
      category: 'Furniture',
      purchaseDate: '2023-02-20',
      originalValue: 350,
      currentValue: 315,
      depreciationMethod: 'Straight Line',
      usefulLife: 7,
      status: 'Active'
    },
    {
      id: 'AST003',
      name: 'HP Printer LaserJet Pro',
      category: 'IT Equipment',
      purchaseDate: '2022-11-10',
      originalValue: 800,
      currentValue: 640,
      depreciationMethod: 'Declining Balance',
      usefulLife: 4,
      status: 'Active'
    },
    {
      id: 'AST004',
      name: 'Conference Table',
      category: 'Furniture',
      purchaseDate: '2022-08-15',
      originalValue: 1500,
      currentValue: 1200,
      depreciationMethod: 'Straight Line',
      usefulLife: 10,
      status: 'Active'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      'Active': 'default',
      'Retired': 'destructive',
      'Disposed': 'secondary'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Asset Depreciation</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingDown className="h-5 w-5 mr-2" />
              Asset Depreciation Overview
            </CardTitle>
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
                  <TableHead>Asset Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Purchase Date</TableHead>
                  <TableHead>Original Value</TableHead>
                  <TableHead>Current Value</TableHead>
                  <TableHead>Depreciation Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.id}</TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.category}</TableCell>
                    <TableCell>{asset.purchaseDate}</TableCell>
                    <TableCell>${asset.originalValue.toLocaleString()}</TableCell>
                    <TableCell>${asset.currentValue.toLocaleString()}</TableCell>
                    <TableCell>{asset.depreciationMethod}</TableCell>
                    <TableCell>{getStatusBadge(asset.status)}</TableCell>
                    <TableCell>
                      <Link to={`/asset-depreciation/${asset.id}`}>
                        <Button size="sm" variant="outline">
                          <TrendingDown className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
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

export default AssetDepreciation;
