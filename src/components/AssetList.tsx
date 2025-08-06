import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';

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
  created_at: string;
  updated_at: string;
  category: { name: string } | null;
  location: { name: string } | null;
}

interface AssetListProps {
  assets: Asset[];
  isAdmin: boolean;
  isLoading: boolean;
  onEdit: (asset: Asset) => void;
  onDelete: (id: string) => void;
}

export const AssetList: React.FC<AssetListProps> = ({
  assets,
  isAdmin,
  isLoading,
  onEdit,
  onDelete
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assets List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assets.map((asset) => (
            <div key={asset.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-lg">{asset.name}</h3>
                    <Badge variant="outline">{asset.asset_code}</Badge>
                    <Badge variant={asset.status === 'Aktif' ? 'default' : asset.status === 'Maintenance' ? 'destructive' : 'secondary'}>
                      {asset.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Category:</span> {asset.category?.name || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">Serial:</span> {asset.serial_number || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">Purchase Date:</span> {new Date(asset.purchase_date).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Price:</span> {formatPrice(asset.purchase_price)}
                    </div>
                    <div>
                      <span className="font-medium">Vendor:</span> {asset.vendor || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span> {asset.location?.name || 'N/A'}
                    </div>
                    {asset.assigned_to && (
                      <div>
                        <span className="font-medium">Assigned To:</span> {asset.assigned_to}
                      </div>
                    )}
                  </div>
                  
                  {asset.description && (
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Description:</span> {asset.description}
                    </div>
                  )}
                </div>
                
                {isAdmin && (
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(asset)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(asset.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {assets.length === 0 && !isLoading && (
            <div className="text-center py-8 text-muted-foreground">
              No assets found. {isAdmin && 'Click "Add Asset" to create your first asset.'}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};