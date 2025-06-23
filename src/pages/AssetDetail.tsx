
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Edit, Trash2, Download } from 'lucide-react';

const AssetDetail = () => {
  const { id } = useParams();

  // Mock asset detail data
  const asset = {
    id: id || 'AST001',
    name: 'Dell Laptop OptiPlex 3090',
    category: 'IT Equipment',
    subcategory: 'Laptop',
    brand: 'Dell',
    model: 'OptiPlex 3090',
    serialNumber: 'DL2023001',
    location: 'Building A - Floor 2 - Desk 15',
    status: 'Active',
    assignedTo: 'John Doe',
    assignedDate: '2023-01-20',
    purchaseDate: '2023-01-15',
    purchasePrice: '$1,200',
    vendor: 'Dell Technologies',
    warranty: '3 Years',
    warrantyExpiry: '2026-01-15',
    description: 'High-performance laptop for software development work',
    specifications: {
      'Processor': 'Intel Core i7-11th Gen',
      'RAM': '16GB DDR4',
      'Storage': '512GB SSD',
      'Display': '15.6" Full HD',
      'OS': 'Windows 11 Pro'
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/assets">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Assets
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">{asset.name}</h1>
            <Badge variant="default">{asset.status}</Badge>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Asset ID</label>
                  <p className="font-medium">{asset.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Category</label>
                  <p className="font-medium">{asset.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Brand</label>
                  <p className="font-medium">{asset.brand}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Model</label>
                  <p className="font-medium">{asset.model}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">Serial Number</label>
                  <p className="font-medium">{asset.serialNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assignment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Assigned To</label>
                <p className="font-medium">{asset.assignedTo}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Assignment Date</label>
                <p className="font-medium">{asset.assignedDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Location</label>
                <p className="font-medium">{asset.location}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Purchase Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Purchase Date</label>
                  <p className="font-medium">{asset.purchaseDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Purchase Price</label>
                  <p className="font-medium">{asset.purchasePrice}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">Vendor</label>
                  <p className="font-medium">{asset.vendor}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Warranty Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Warranty Period</label>
                <p className="font-medium">{asset.warranty}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Warranty Expiry</label>
                <p className="font-medium">{asset.warrantyExpiry}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(asset.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="font-medium text-muted-foreground">{key}:</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AssetDetail;
