import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { AssetForm } from '../components/AssetForm';
import { AssetList } from '../components/AssetList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

interface Category {
  id: string;
  name: string;
}

interface WorkArea {
  id: string;
  name: string;
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

const Assets = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [workAreas, setWorkAreas] = useState<WorkArea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [showForm, setShowForm] = useState(false);

  const isAdmin = user?.role === 'admin' || user?.role === 'staff';

  useEffect(() => {
    fetchAssets();
    fetchCategories();
    fetchWorkAreas();
  }, []);

  const fetchAssets = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('assets')
        .select(`
          id,
          asset_code,
          name,
          category_id,
          serial_number,
          purchase_date,
          purchase_price,
          vendor,
          location_id,
          assigned_to,
          description,
          status,
          created_at,
          updated_at,
          category:asset_categories!assets_category_id_fkey(name),
          location:work_areas!assets_location_id_fkey(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAssets(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Error fetching assets: ${error.message}`,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('asset_categories')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchWorkAreas = async () => {
    try {
      const { data, error } = await supabase
        .from('work_areas')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setWorkAreas(data || []);
    } catch (error: any) {
      console.error('Error fetching work areas:', error);
    }
  };

  const handleSave = async (data: AssetFormData) => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only admins and staff can modify assets",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const assetData = {
        name: data.name,
        category_id: data.category_id || null,
        serial_number: data.serial_number || null,
        purchase_date: data.purchase_date,
        purchase_price: Number(data.purchase_price),
        vendor: data.vendor || null,
        location_id: data.location_id || null,
        assigned_to: data.assigned_to || null,
        description: data.description || null,
        status: data.status || 'Aktif'
      };

      if (editingAsset) {
        const { error } = await supabase
          .from('assets')
          .update({
            ...assetData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingAsset.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Asset updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('assets')
          .insert(assetData);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Asset created successfully",
        });
      }

      setEditingAsset(null);
      setShowForm(false);
      fetchAssets();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only admins can delete assets",
        variant: "destructive",
      });
      return;
    }

    if (!confirm('Are you sure you want to delete this asset?')) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('assets')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Asset deleted successfully",
      });
      fetchAssets();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const startEdit = (asset: Asset) => {
    setEditingAsset(asset);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingAsset(null);
    setShowForm(false);
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Assets</h1>
          {isAdmin && (
            <Button onClick={() => setShowForm(true)} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Asset</span>
            </Button>
          )}
        </div>

        {/* Asset Form */}
        {showForm && (
          <AssetForm
            asset={editingAsset}
            categories={categories}
            workAreas={workAreas}
            onSave={handleSave}
            onCancel={cancelEdit}
            isLoading={isLoading}
          />
        )}

        {/* Assets List */}
        <AssetList
          assets={assets}
          isAdmin={isAdmin}
          isLoading={isLoading}
          onEdit={startEdit}
          onDelete={handleDelete}
        />

        {isLoading && (
          <div className="text-center py-4">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Assets;
