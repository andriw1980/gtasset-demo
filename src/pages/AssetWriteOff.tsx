
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileX, Package, Calendar, DollarSign, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AssetWriteOff = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    assetCode: '',
    writeOffDate: '',
    writeOffReason: '',
    writeOffValue: '',
    justification: '',
    supportingDocuments: '',
    approvalLevel: ''
  });

  // Mock data
  const assets = [
    { 
      code: 'GEN-001', 
      name: 'Generator Unit A', 
      currentValue: 50000, 
      acquisitionDate: '2018-01-15',
      condition: 'Poor',
      lastMaintenance: '2024-01-15'
    },
    { 
      code: 'COMP-001', 
      name: 'Desktop Computer', 
      currentValue: 1200, 
      acquisitionDate: '2019-03-20',
      condition: 'Obsolete',
      lastMaintenance: '2023-12-10'
    },
    { 
      code: 'VEH-001', 
      name: 'Company Vehicle', 
      currentValue: 25000, 
      acquisitionDate: '2017-06-10',
      condition: 'Damaged',
      lastMaintenance: '2024-02-20'
    },
    { 
      code: 'FUR-001', 
      name: 'Office Furniture Set', 
      currentValue: 800, 
      acquisitionDate: '2016-09-05',
      condition: 'Worn Out',
      lastMaintenance: 'N/A'
    }
  ];

  const writeOffReasons = [
    'End of Useful Life',
    'Irreparable Damage',
    'Technological Obsolescence',
    'Lost or Stolen',
    'Not Cost-Effective to Repair',
    'Safety Concerns',
    'Regulatory Non-Compliance',
    'Other'
  ];

  const approvalLevels = [
    { value: 'supervisor', label: 'Supervisor Approval', maxValue: 5000 },
    { value: 'manager', label: 'Manager Approval', maxValue: 25000 },
    { value: 'director', label: 'Director Approval', maxValue: 100000 },
    { value: 'board', label: 'Board Approval', maxValue: Infinity }
  ];

  const selectedAsset = assets.find(asset => asset.code === formData.assetCode);

  const getRequiredApprovalLevel = (value: number) => {
    return approvalLevels.find(level => value <= level.maxValue) || approvalLevels[approvalLevels.length - 1];
  };

  const handleAssetSelect = (assetCode: string) => {
    const asset = assets.find(a => a.code === assetCode);
    if (asset) {
      const requiredApproval = getRequiredApprovalLevel(asset.currentValue);
      setFormData({
        ...formData,
        assetCode,
        writeOffValue: asset.currentValue.toString(),
        approvalLevel: requiredApproval.value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.assetCode || !formData.writeOffDate || !formData.writeOffReason || !formData.justification) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Asset write-off request submitted successfully. Awaiting approval."
    });

    // Reset form
    setFormData({
      assetCode: '',
      writeOffDate: '',
      writeOffReason: '',
      writeOffValue: '',
      justification: '',
      supportingDocuments: '',
      approvalLevel: ''
    });
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Poor':
        return 'destructive';
      case 'Obsolete':
        return 'outline';
      case 'Damaged':
        return 'destructive';
      case 'Worn Out':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Asset Write Off</h1>
          <p className="text-gray-600 mt-2">Submit requests to write off assets that are no longer useful</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileX className="h-5 w-5" />
              Write Off Asset
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
                        <SelectValue placeholder="Choose an asset to write off" />
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
                    <Label htmlFor="writeOffDate">Write Off Date *</Label>
                    <Input
                      id="writeOffDate"
                      type="date"
                      value={formData.writeOffDate}
                      onChange={(e) => setFormData({...formData, writeOffDate: e.target.value})}
                      required
                    />
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
                        <Label>Acquisition Date</Label>
                        <div className="flex items-center gap-2 p-2 bg-white rounded border">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{new Date(selectedAsset.acquisitionDate).toLocaleDateString()}</span>
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
                        <Label>Last Maintenance</Label>
                        <div className="flex items-center gap-2 p-2 bg-white rounded border">
                          <Package className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{selectedAsset.lastMaintenance}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Write Off Details */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Write Off Details</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="writeOffReason">Write Off Reason *</Label>
                        <Select value={formData.writeOffReason} onValueChange={(value) => setFormData({...formData, writeOffReason: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select reason for write off" />
                          </SelectTrigger>
                          <SelectContent>
                            {writeOffReasons.map((reason) => (
                              <SelectItem key={reason} value={reason}>
                                {reason}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="writeOffValue">Write Off Value *</Label>
                        <Input
                          id="writeOffValue"
                          type="number"
                          value={formData.writeOffValue}
                          onChange={(e) => setFormData({...formData, writeOffValue: e.target.value})}
                          required
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="justification">Justification *</Label>
                      <Textarea
                        id="justification"
                        placeholder="Provide detailed justification for the write off..."
                        value={formData.justification}
                        onChange={(e) => setFormData({...formData, justification: e.target.value})}
                        required
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="supportingDocuments">Supporting Documents</Label>
                      <Input
                        id="supportingDocuments"
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => setFormData({...formData, supportingDocuments: e.target.value})}
                      />
                      <p className="text-xs text-gray-500">
                        Upload photos, reports, or other supporting documentation
                      </p>
                    </div>
                  </div>

                  {/* Approval Information */}
                  {formData.writeOffValue && (
                    <div className="space-y-4 p-4 border-l-4 border-orange-500 bg-orange-50 rounded">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        <Label className="text-lg font-semibold text-orange-700">Approval Required</Label>
                      </div>
                      <div className="space-y-2">
                        <Label>Required Approval Level</Label>
                        <div className="p-2 bg-white rounded border">
                          <Badge variant="outline" className="text-orange-700 border-orange-500">
                            {getRequiredApprovalLevel(Number(formData.writeOffValue)).label}
                          </Badge>
                        </div>
                        <p className="text-sm text-orange-600">
                          This write off request will be routed to the appropriate approver based on the asset value.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    <Button type="submit">Submit Write Off Request</Button>
                    <Button type="button" variant="outline" onClick={() => setFormData({
                      assetCode: '',
                      writeOffDate: '',
                      writeOffReason: '',
                      writeOffValue: '',
                      justification: '',
                      supportingDocuments: '',
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

export default AssetWriteOff;
