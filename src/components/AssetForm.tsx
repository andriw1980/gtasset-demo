import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Save, X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface WorkArea {
  id: string;
  name: string;
}

interface Asset {
  id: string;
  asset_code: string;
  name: string;
  category_id: string | null;
  serial_number: string | null;
  purchase_date: string;
  purchase_price: number;
  vendor: string | null;
  location_id: string | null;
  assigned_to: string | null;
  description: string | null;
  status: string | null;
}

interface AssetFormData {
  name: string;
  category_id: string;
  serial_number: string;
  purchase_date: string;
  purchase_price: number;
  vendor: string;
  location_id: string;
  assigned_to: string;
  description: string;
  status: string;
}

interface AssetFormProps {
  asset?: Asset | null;
  categories: Category[];
  workAreas: WorkArea[];
  onSave: (data: AssetFormData) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

export const AssetForm: React.FC<AssetFormProps> = ({
  asset,
  categories,
  workAreas,
  onSave,
  onCancel,
  isLoading
}) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm<AssetFormData>({
    defaultValues: {
      name: asset?.name || '',
      category_id: asset?.category_id || '',
      serial_number: asset?.serial_number || '',
      purchase_date: asset?.purchase_date || '',
      purchase_price: asset?.purchase_price || 0,
      vendor: asset?.vendor || '',
      location_id: asset?.location_id || '',
      assigned_to: asset?.assigned_to || '',
      description: asset?.description || '',
      status: asset?.status || 'Aktif'
    }
  });

  React.useEffect(() => {
    if (asset) {
      setValue('name', asset.name);
      setValue('category_id', asset.category_id || '');
      setValue('serial_number', asset.serial_number || '');
      setValue('purchase_date', asset.purchase_date);
      setValue('purchase_price', asset.purchase_price);
      setValue('vendor', asset.vendor || '');
      setValue('location_id', asset.location_id || '');
      setValue('assigned_to', asset.assigned_to || '');
      setValue('description', asset.description || '');
      setValue('status', asset.status || 'Aktif');
    }
  }, [asset, setValue]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {asset ? 'Edit Asset' : 'Add New Asset'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="name">Asset Name *</Label>
              <Input
                id="name"
                {...register('name', { required: true })}
                placeholder="Enter asset name"
              />
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => setValue('category_id', value)} value={watch('category_id')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="serial_number">Serial Number</Label>
              <Input
                id="serial_number"
                {...register('serial_number')}
                placeholder="Enter serial number"
              />
            </div>

            <div>
              <Label htmlFor="purchase_date">Purchase Date *</Label>
              <Input
                id="purchase_date"
                type="date"
                {...register('purchase_date', { required: true })}
              />
            </div>

            <div>
              <Label htmlFor="purchase_price">Purchase Price *</Label>
              <Input
                id="purchase_price"
                type="number"
                {...register('purchase_price', { required: true, valueAsNumber: true })}
                placeholder="Enter purchase price"
              />
            </div>

            <div>
              <Label htmlFor="vendor">Vendor</Label>
              <Input
                id="vendor"
                {...register('vendor')}
                placeholder="Enter vendor name"
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Select onValueChange={(value) => setValue('location_id', value)} value={watch('location_id')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {workAreas.map((area) => (
                    <SelectItem key={area.id} value={area.id}>
                      {area.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="assigned_to">Assigned To</Label>
              <Input
                id="assigned_to"
                {...register('assigned_to')}
                placeholder="Enter assignee name"
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select onValueChange={(value) => setValue('status', value)} value={watch('status')} defaultValue="Aktif">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aktif">Aktif</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Pensiun">Pensiun</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Enter asset description"
              rows={3}
            />
          </div>

          <div className="flex space-x-2">
            <Button type="submit" disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {asset ? 'Update' : 'Create'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};