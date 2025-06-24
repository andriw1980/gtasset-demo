
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Gavel, Package, Calendar, DollarSign, AlertTriangle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AssetAuction = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    assetCode: '',
    auctionDate: '',
    auctionEndDate: '',
    startingBid: '',
    reservePrice: '',
    auctionType: '',
    auctionReason: '',
    description: '',
    termsAndConditions: '',
    approvalLevel: ''
  });

  // Mock data
  const assets = [
    { 
      code: 'VEH-001', 
      name: 'Company Vehicle', 
      currentValue: 25000, 
      acquisitionDate: '2017-06-10',
      condition: 'Good',
      category: 'Vehicle'
    },
    { 
      code: 'MACH-001', 
      name: 'Industrial Machine', 
      currentValue: 45000, 
      acquisitionDate: '2015-03-15',
      condition: 'Fair',
      category: 'Machinery'
    },
    { 
      code: 'FUR-001', 
      name: 'Office Furniture Set', 
      currentValue: 1200, 
      acquisitionDate: '2016-09-05',
      condition: 'Good',
      category: 'Furniture'
    },
    { 
      code: 'COMP-001', 
      name: 'Computer Equipment', 
      currentValue: 800, 
      acquisitionDate: '2019-01-20',
      condition: 'Fair',
      category: 'IT Equipment'
    }
  ];

  const auctionTypes = [
    'Public Auction',
    'Sealed Bid',
    'Online Auction',
    'Private Sale',
    'Tender Process'
  ];

  const auctionReasons = [
    'Asset Replacement',
    'End of Useful Life',
    'Surplus Equipment',
    'Space Optimization',
    'Technology Upgrade',
    'Cost Reduction',
    'Regulatory Compliance',
    'Other'
  ];

  const approvalLevels = [
    { value: 'manager', label: 'Manager Approval', maxValue: 10000 },
    { value: 'director', label: 'Director Approval', maxValue: 50000 },
    { value: 'board', label: 'Board Approval', maxValue: Infinity }
  ];

  const selectedAsset = assets.find(asset => asset.code === formData.assetCode);

  const getRequiredApprovalLevel = (value: number) => {
    return approvalLevels.find(level => value <= level.maxValue) || approvalLevels[approvalLevels.length - 1];
  };

  const handleAssetSelect = (assetCode: string) => {
    const asset = assets.find(a => a.code === assetCode);
    if (asset) {
      const suggestedStartingBid = Math.floor(asset.currentValue * 0.6); // 60% of current value
      const suggestedReservePrice = Math.floor(asset.currentValue * 0.4); // 40% of current value
      const requiredApproval = getRequiredApprovalLevel(asset.currentValue);
      
      setFormData({
        ...formData,
        assetCode,
        startingBid: suggestedStartingBid.toString(),
        reservePrice: suggestedReservePrice.toString(),
        approvalLevel: requiredApproval.value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.assetCode || !formData.auctionDate || !formData.auctionType || !formData.auctionReason) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (new Date(formData.auctionDate) <= new Date()) {
      toast({
        title: "Error",
        description: "Auction start date must be in the future",
        variant: "destructive"
      });
      return;
    }

    if (formData.auctionEndDate && new Date(formData.auctionEndDate) <= new Date(formData.auctionDate)) {
      toast({
        title: "Error",
        description: "Auction end date must be after start date",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Asset auction request submitted successfully. Awaiting approval."
    });

    // Reset form
    setFormData({
      assetCode: '',
      auctionDate: '',
      auctionEndDate: '',
      startingBid: '',
      reservePrice: '',
      auctionType: '',
      auctionReason: '',
      description: '',
      termsAndConditions: '',
      approvalLevel: ''
    });
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Excellent':
        return 'default';
      case 'Good':
        return 'secondary';
      case 'Fair':
        return 'outline';
      case 'Poor':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Asset Auction</h1>
          <p className="text-gray-600 mt-2">Schedule assets for auction or sale</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gavel className="h-5 w-5" />
              Schedule Asset Auction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Asset Selection */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Asset Information</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="asset">Select Asset *</Label>
                    <Select value={formData.assetCode} onValueChange={handleAssetSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an asset for auction" />
                      </SelectTrigger>
                      <SelectContent>
                        {assets.map((asset) => (
                          <SelectItem key={asset.code} value={asset.code}>
                            {asset.name} ({asset.code}) - ${asset.currentValue.toLocaleString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="auctionReason">Auction Reason *</Label>
                    <Select value={formData.auctionReason} onValueChange={(value) => setFormData({...formData, auctionReason: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason for auction" />
                      </SelectTrigger>
                      <SelectContent>
                        {auctionReasons.map((reason) => (
                          <SelectItem key={reason} value={reason}>
                            {reason}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {selectedAsset && (
                <>
                  {/* Asset Details */}
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <Label className="text-lg font-semibold">Asset Details</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label>Current Book Value</Label>
                        <div className="flex items-center gap-2 p-2 bg-white rounded border">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="font-semibold">${selectedAsset.currentValue.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Category</Label>
                        <div className="flex items-center gap-2 p-2 bg-white rounded border">
                          <Package className="h-4 w-4 text-gray-400" />
                          <span>{selectedAsset.category}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Condition</Label>
                        <div className="p-2 bg-white rounded border">
                          <Badge variant={getConditionColor(selectedAsset.condition)}>
                            {selectedAsset.condition}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Acquisition Date</Label>
                        <div className="flex items-center gap-2 p-2 bg-white rounded border">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{new Date(selectedAsset.acquisitionDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Auction Setup */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Auction Setup</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="auctionType">Auction Type *</Label>
                        <Select value={formData.auctionType} onValueChange={(value) => setFormData({...formData, auctionType: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select auction type" />
                          </SelectTrigger>
                          <SelectContent>
                            {auctionTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="auctionDate">Auction Start Date *</Label>
                        <Input
                          id="auctionDate"
                          type="datetime-local"
                          value={formData.auctionDate}
                          onChange={(e) => setFormData({...formData, auctionDate: e.target.value})}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="auctionEndDate">Auction End Date</Label>
                        <Input
                          id="auctionEndDate"
                          type="datetime-local"
                          value={formData.auctionEndDate}
                          onChange={(e) => setFormData({...formData, auctionEndDate: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="startingBid">Starting Bid Amount *</Label>
                        <Input
                          id="startingBid"
                          type="number"
                          value={formData.startingBid}
                          onChange={(e) => setFormData({...formData, startingBid: e.target.value})}
                          required
                          min="0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reservePrice">Reserve Price</Label>
                        <Input
                          id="reservePrice"
                          type="number"
                          value={formData.reservePrice}
                          onChange={(e) => setFormData({...formData, reservePrice: e.target.value})}
                          min="0"
                        />
                        <p className="text-xs text-gray-500">
                          Minimum acceptable bid amount
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Asset Description for Auction</Label>
                      <Textarea
                        id="description"
                        placeholder="Provide detailed description for potential bidders..."
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="termsAndConditions">Terms and Conditions</Label>
                      <Textarea
                        id="termsAndConditions"
                        placeholder="Specify auction terms, payment conditions, pickup requirements, etc..."
                        value={formData.termsAndConditions}
                        onChange={(e) => setFormData({...formData, termsAndConditions: e.target.value})}
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Approval Information */}
                  {formData.startingBid && (
                    <div className="space-y-4 p-4 border-l-4 border-blue-500 bg-blue-50 rounded">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-blue-500" />
                        <Label className="text-lg font-semibold text-blue-700">Approval Required</Label>
                      </div>
                      <div className="space-y-2">
                        <Label>Required Approval Level</Label>
                        <div className="p-2 bg-white rounded border">
                          <Badge variant="outline" className="text-blue-700 border-blue-500">
                            {getRequiredApprovalLevel(selectedAsset.currentValue).label}
                          </Badge>
                        </div>
                        <p className="text-sm text-blue-600">
                          This auction request will be routed to the appropriate approver based on the asset value.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    <Button type="submit">Submit Auction Request</Button>
                    <Button type="button" variant="outline" onClick={() => setFormData({
                      assetCode: '',
                      auctionDate: '',
                      auctionEndDate: '',
                      startingBid: '',
                      reservePrice: '',
                      auctionType: '',
                      auctionReason: '',
                      description: '',
                      termsAndConditions: '',
                      approvalLevel: ''
                    })}>
                      Reset Form
                    </Button>
                  </div>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AssetAuction;
