import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Save, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useForm } from 'react-hook-form';
import MigrationTool from '../components/MigrationTool';

interface SettingsItem {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

interface FormData {
  name: string;
  description: string;
}

type TableName = 'asset_categories' | 'units' | 'work_areas';

const Settings = () => {
  const { user } = useAuth();
  const [assetCategories, setAssetCategories] = useState<SettingsItem[]>([]);
  const [units, setUnits] = useState<SettingsItem[]>([]);
  const [workAreas, setWorkAreas] = useState<SettingsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editingItem, setEditingItem] = useState<SettingsItem | null>(null);
  const [activeTab, setActiveTab] = useState('categories');

  const { register, handleSubmit, reset, setValue } = useForm<FormData>();

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [categoriesRes, unitsRes, workAreasRes] = await Promise.all([
        supabase.from('asset_categories').select('*').order('name'),
        supabase.from('units').select('*').order('name'),
        supabase.from('work_areas').select('*').order('name')
      ]);

      if (categoriesRes.data) setAssetCategories(categoriesRes.data);
      if (unitsRes.data) setUnits(unitsRes.data);
      if (workAreasRes.data) setWorkAreas(workAreasRes.data);
    } catch (error) {
      setMessage('Error fetching data');
    }
    setIsLoading(false);
  };

  const handleSave = async (data: FormData, table: TableName) => {
    if (!isAdmin) {
      setMessage('Only admins can modify settings');
      return;
    }

    setIsLoading(true);
    try {
      if (editingItem) {
        const { error } = await supabase
          .from(table)
          .update({
            name: data.name,
            description: data.description,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingItem.id);

        if (error) throw error;
        setMessage('Item updated successfully');
      } else {
        const { error } = await supabase
          .from(table)
          .insert({
            name: data.name,
            description: data.description
          });

        if (error) throw error;
        setMessage('Item created successfully');
      }

      reset();
      setEditingItem(null);
      fetchAllData();
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string, table: TableName) => {
    if (!isAdmin) {
      setMessage('Only admins can delete settings');
      return;
    }

    if (!confirm('Are you sure you want to delete this item?')) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMessage('Item deleted successfully');
      fetchAllData();
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
    setIsLoading(false);
  };

  const startEdit = (item: SettingsItem) => {
    setEditingItem(item);
    setValue('name', item.name);
    setValue('description', item.description || '');
  };

  const cancelEdit = () => {
    setEditingItem(null);
    reset();
  };

  const SettingsTable = ({ items, table }: { items: SettingsItem[]; table: TableName }) => (
    <div className="space-y-4">
      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingItem ? 'Edit' : 'Add New'} {table.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit((data) => handleSave(data, table))} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    {...register('name', { required: true })}
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    {...register('description')}
                    placeholder="Enter description (optional)"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button type="submit" disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {editingItem ? 'Update' : 'Add'}
                </Button>
                {editingItem && (
                  <Button type="button" variant="outline" onClick={cancelEdit}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Current {table.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">{item.name}</span>
                    {item.description && (
                      <Badge variant="outline">{item.description}</Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Created: {new Date(item.created_at).toLocaleDateString()}
                  </div>
                </div>
                {isAdmin && (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item.id, table)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
            {items.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No items found. {isAdmin && 'Add some items to get started.'}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (!user) return null;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Settings</h1>
          {!isAdmin && (
            <Badge variant="secondary">View Only - Admin Access Required</Badge>
          )}
        </div>

        {message && (
          <Alert variant={message.includes('Error') ? 'destructive' : 'default'}>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="categories">Asset Categories</TabsTrigger>
            <TabsTrigger value="units">Units</TabsTrigger>
            <TabsTrigger value="work-areas">Work Areas</TabsTrigger>
            <TabsTrigger value="migration">Migration Tool</TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="space-y-4">
            <SettingsTable items={assetCategories} table="asset_categories" />
          </TabsContent>

          <TabsContent value="units" className="space-y-4">
            <SettingsTable items={units} table="units" />
          </TabsContent>

          <TabsContent value="work-areas" className="space-y-4">
            <SettingsTable items={workAreas} table="work_areas" />
          </TabsContent>

          <TabsContent value="migration" className="space-y-4">
            <MigrationTool />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
