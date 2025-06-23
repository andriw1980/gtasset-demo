
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, TrendingDown, Calendar, DollarSign, Calculator } from 'lucide-react';

const DepreciationDetail = () => {
  const { id } = useParams();

  // Mock depreciation data - in real app this would come from API
  const getAssetDepreciationData = (assetId: string) => {
    const mockData: Record<string, any> = {
      'AST001': {
        id: 'AST001',
        name: 'Dell Laptop OptiPlex 3090',
        category: 'IT Equipment',
        purchaseDate: '2023-01-15',
        originalValue: 1200,
        salvageValue: 100,
        usefulLife: 5,
        depreciationMethod: 'Straight Line',
        monthsUsed: 11,
        currentBookValue: 950,
        monthlyDepreciation: 18.33,
        yearlyDepreciation: 220,
        accumulatedDepreciation: 250,
        remainingLife: 4.08
      },
      'AST002': {
        id: 'AST002',
        name: 'Office Chair Ergonomic',
        category: 'Furniture',
        purchaseDate: '2023-02-20',
        originalValue: 350,
        salvageValue: 50,
        usefulLife: 7,
        depreciationMethod: 'Straight Line',
        monthsUsed: 10,
        currentBookValue: 315,
        monthlyDepreciation: 3.57,
        yearlyDepreciation: 42.86,
        accumulatedDepreciation: 35,
        remainingLife: 6.17
      },
      'AST003': {
        id: 'AST003',
        name: 'HP Printer LaserJet Pro',
        category: 'IT Equipment',
        purchaseDate: '2022-11-10',
        originalValue: 800,
        salvageValue: 80,
        usefulLife: 4,
        depreciationMethod: 'Declining Balance',
        monthsUsed: 13,
        currentBookValue: 640,
        monthlyDepreciation: 12.31,
        yearlyDepreciation: 160,
        accumulatedDepreciation: 160,
        remainingLife: 2.92
      }
    };
    return mockData[assetId];
  };

  const asset = getAssetDepreciationData(id || '');

  if (!asset) {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Link to="/asset-depreciation">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Assets
              </Button>
            </Link>
          </div>
          <Card>
            <CardContent className="p-6">
              <p>Asset not found.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/asset-depreciation">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Assets
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Depreciation Details</h1>
          </div>
        </div>

        {/* Asset Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingDown className="h-5 w-5 mr-2" />
              Asset Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Asset ID</label>
                <p className="text-lg font-semibold">{asset.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Asset Name</label>
                <p className="text-lg font-semibold">{asset.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Category</label>
                <p className="text-lg">{asset.category}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Purchase Date</label>
                <p className="text-lg">{asset.purchaseDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Depreciation Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Depreciation Method & Values
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Depreciation Method</label>
                  <p className="text-lg font-semibold">{asset.depreciationMethod}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Useful Life</label>
                  <p className="text-lg">{asset.usefulLife} years</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Original Value</label>
                  <p className="text-lg font-semibold text-green-600">${asset.originalValue.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Salvage Value</label>
                  <p className="text-lg">${asset.salvageValue.toLocaleString()}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Current Book Value</label>
                <p className="text-2xl font-bold text-blue-600">${asset.currentBookValue.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Depreciation Calculations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Monthly Depreciation</label>
                  <p className="text-lg font-semibold text-orange-600">${asset.monthlyDepreciation.toFixed(2)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Yearly Depreciation</label>
                  <p className="text-lg font-semibold text-orange-600">${asset.yearlyDepreciation.toLocaleString()}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <label className="text-sm font-medium text-gray-500">Accumulated Depreciation</label>
                <p className="text-xl font-bold text-red-600">${asset.accumulatedDepreciation.toLocaleString()}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Remaining Life</label>
                <p className="text-lg font-semibold">{asset.remainingLife.toFixed(1)} years</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Depreciation Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-sm font-medium text-gray-500">Months in Service</div>
                <div className="text-2xl font-bold text-green-600">{asset.monthsUsed}</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-gray-500">Total Useful Life</div>
                <div className="text-2xl font-bold text-blue-600">{asset.usefulLife * 12} months</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-sm font-medium text-gray-500">Remaining Months</div>
                <div className="text-2xl font-bold text-orange-600">{Math.round(asset.remainingLife * 12)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DepreciationDetail;
