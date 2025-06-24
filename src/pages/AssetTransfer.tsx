
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeftRight, Package, User, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AssetTransfer = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    assetCode: '',
    fromPIC: '',
    toPIC: '',
    fromDepartment: '',
    toDepartment: '',
    fromLocation: '',
    toLocation: '',
    transferReason: '',
    transferDate: '',
    notes: ''
  });

  // Mock data
  const assets = [
    { code: 'GEN-001', name: 'Generator Unit A', currentPIC: 'John Doe', currentDepartment: 'Facilities', currentLocation: 'Building A - Basement' },
    { code: 'HVAC-001', name: 'HVAC System', currentPIC: 'Jane Smith', currentDepartment: 'Maintenance', currentLocation: 'Building B - Rooftop' },
    { code: 'ELV-001', name: 'Elevator Unit 1', currentPIC: 'Mike Johnson', currentDepartment: 'Operations', currentLocation: 'Building A - Main' },
    { code: 'FP-001', name: 'Fire Pump System', currentPIC: 'Sarah Wilson', currentDepartment: 'Safety', currentLocation: 'Building C - Pump Room' }
  ];

  const employees = [
    { id: '1', name: 'John Doe', department: 'Facilities' },
    { id: '2', name: 'Jane Smith', department: 'Maintenance' },
    { id: '3', name: 'Mike Johnson', department: 'Operations' },
    { id: '4', name: 'Sarah Wilson', department: 'Safety' },
    { id: '5', name: 'David Brown', department: 'IT' },
    { id: '6', name: 'Lisa Garcia', department: 'HR' }
  ];

  const departments = [
    'Facilities', 'Maintenance', 'Operations', 'Safety', 'IT', 'HR', 'Finance', 'Administration'
  ];

  const locations = [
    'Building A - Basement', 'Building A - Ground Floor', 'Building A - 2nd Floor',
    'Building B - Ground Floor', 'Building B - Rooftop', 'Building B - Parking',
    'Building C - Pump Room', 'Building C - Storage', 'Building C - Office'
  ];

  const selectedAsset = assets.find(asset => asset.code === formData.assetCode);

  const handleAssetSelect = (assetCode: string) => {
    const asset = assets.find(a => a.code === assetCode);
    if (asset) {
      setFormData({
        ...formData,
        assetCode,
        fromPIC: asset.currentPIC,
        fromDepartment: asset.currentDepartment,
        fromLocation: asset.currentLocation
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.assetCode || !formData.toPIC || !formData.toDepartment || !formData.toLocation) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Asset transfer request submitted successfully. Awaiting approval."
    });

    // Reset form
    setFormData({
      assetCode: '',
      fromPIC: '',
      toPIC: '',
      fromDepartment: '',
      toDepartment: '',
      fromLocation: '',
      toLocation: '',
      transferReason: '',
      transferDate: '',
      notes: ''
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Asset Transfer/Mutation</h1>
          <p className="text-gray-600 mt-2">Transfer assets between PICs, departments, or locations</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowLeftRight className="h-5 w-5" />
              Transfer Asset
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
                        <SelectValue placeholder="Choose an asset to transfer" />
                      </SelectTrigger>
                      <SelectContent>
                        {assets.map((asset) => (
                          <SelectItem key={asset.code} value={asset.code}>
                            {asset.name} ({asset.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transferDate">Transfer Date *</Label>
                    <Input
                      id="transferDate"
                      type="date"
                      value={formData.transferDate}
                      onChange={(e) => setFormData({...formData, transferDate: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              {selectedAsset && (
                <>
                  {/* Current Information */}
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <Label className="text-lg font-semibold">Current Assignment</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Current PIC</Label>
                        <div className="flex items-center gap-2 p-2 bg-white rounded border">
                          <User className="h-4 w-4 text-gray-400" />
                          <span>{selectedAsset.currentPIC}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Current Department</Label>
                        <div className="flex items-center gap-2 p-2 bg-white rounded border">
                          <Package className="h-4 w-4 text-gray-400" />
                          <span>{selectedAsset.currentDepartment}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Current Location</Label>
                        <div className="flex items-center gap-2 p-2 bg-white rounded border">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{selectedAsset.currentLocation}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* New Assignment */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">New Assignment</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="toPIC">New PIC *</Label>
                        <Select value={formData.toPIC} onValueChange={(value) => setFormData({...formData, toPIC: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select new PIC" />
                          </SelectTrigger>
                          <SelectContent>
                            {employees.map((employee) => (
                              <SelectItem key={employee.id} value={employee.name}>
                                {employee.name} ({employee.department})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="toDepartment">New Department *</Label>
                        <Select value={formData.toDepartment} onValueChange={(value) => setFormData({...formData, toDepartment: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select new department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="toLocation">New Location *</Label>
                        <Select value={formData.toLocation} onValueChange={(value) => setFormData({...formData, toLocation: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select new location" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map((location) => (
                              <SelectItem key={location} value={location}>
                                {location}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Transfer Details */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Transfer Details</Label>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="transferReason">Reason for Transfer *</Label>
                        <Select value={formData.transferReason} onValueChange={(value) => setFormData({...formData, transferReason: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select transfer reason" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Departmental Restructuring">Departmental Restructuring</SelectItem>
                            <SelectItem value="Employee Transfer">Employee Transfer</SelectItem>
                            <SelectItem value="Operational Requirements">Operational Requirements</SelectItem>
                            <SelectItem value="Space Optimization">Space Optimization</SelectItem>
                            <SelectItem value="Maintenance Requirements">Maintenance Requirements</SelectItem>
                            <SelectItem value="Cost Optimization">Cost Optimization</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          placeholder="Enter any additional notes or special instructions..."
                          value={formData.notes}
                          onChange={(e) => setFormData({...formData, notes: e.target.value})}
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit">Submit Transfer Request</Button>
                    <Button type="button" variant="outline" onClick={() => setFormData({
                      assetCode: '',
                      fromPIC: '',
                      toPIC: '',
                      fromDepartment: '',
                      toDepartment: '',
                      fromLocation: '',
                      toLocation: '',
                      transferReason: '',
                      transferDate: '',
                      notes: ''
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

export default AssetTransfer;
