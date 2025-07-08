import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

type SettingItem = {
  id: string;
  name: string;
  description: string | null;
};

type TableName = 'asset_categories' | 'units' | 'work_areas';

const Settings = () => {
  const [assetCategories, setAssetCategories] = useState<SettingItem[]>([]);
  const [units, setUnits] = useState<SettingItem[]>([]);
  const [workAreas, setWorkAreas] = useState<SettingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      const [categoriesResult, unitsResult, workAreasResult] = await Promise.all([
        supabase.from('asset_categories').select('*'),
        supabase.from('units').select('*'),
        supabase.from('work_areas').select('*')
      ]);

      if (categoriesResult.error) throw categoriesResult.error;
      if (unitsResult.error) throw unitsResult.error;
      if (workAreasResult.error) throw workAreasResult.error;

      setAssetCategories(categoriesResult.data || []);
      setUnits(unitsResult.data || []);
      setWorkAreas(workAreasResult.data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch settings data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (tableName: TableName, data: { name: string; description: string }) => {
    try {
      const { error } = await supabase
        .from(tableName)
        .insert([data]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item added successfully",
      });
      
      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item",
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async (tableName: TableName, id: string, data: { name: string; description: string }) => {
    try {
      const { error } = await supabase
        .from(tableName)
        .update(data)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item updated successfully",
      });
      
      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update item",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (tableName: TableName, id: string) => {
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item deleted successfully",
      });
      
      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    }
  };

  const SettingsSection = ({ 
    title, 
    items, 
    tableName 
  }: { 
    title: string; 
    items: SettingItem[]; 
    tableName: TableName;
  }) => {
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{title}</CardTitle>
            <ItemDialog tableName={tableName} onSave={handleAdd} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.description || '-'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <ItemDialog 
                        tableName={tableName} 
                        item={item}
                        onSave={handleUpdate}
                        trigger={
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        }
                      />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the item.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(tableName, item.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };

  const ItemDialog = ({ 
    tableName, 
    item, 
    onSave, 
    trigger 
  }: { 
    tableName: TableName; 
    item?: SettingItem; 
    onSave: (tableName: TableName, id: string, data: { name: string; description: string }) => void | ((tableName: TableName, data: { name: string; description: string }) => void);
    trigger?: React.ReactNode;
  }) => {
    const [open, setOpen] = useState(false);
    const form = useForm({
      defaultValues: {
        name: item?.name || '',
        description: item?.description || ''
      }
    });

    const onSubmit = (data: { name: string; description: string }) => {
      if (item) {
        (onSave as (tableName: TableName, id: string, data: { name: string; description: string }) => void)(tableName, item.id, data);
      } else {
        (onSave as (tableName: TableName, data: { name: string; description: string }) => void)(tableName, data);
      }
      setOpen(false);
      form.reset();
    };

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger || (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{item ? 'Edit' : 'Add New'} Item</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {item ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        
        <Tabs defaultValue="asset-categories" className="space-y-4">
          <TabsList>
            <TabsTrigger value="asset-categories">Asset Categories</TabsTrigger>
            <TabsTrigger value="units">Units</TabsTrigger>
            <TabsTrigger value="work-areas">Work Areas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="asset-categories">
            <SettingsSection 
              title="Asset Categories" 
              items={assetCategories} 
              tableName="asset_categories"
            />
          </TabsContent>
          
          <TabsContent value="units">
            <SettingsSection 
              title="Units" 
              items={units} 
              tableName="units"
            />
          </TabsContent>
          
          <TabsContent value="work-areas">
            <SettingsSection 
              title="Work Areas" 
              items={workAreas} 
              tableName="work_areas"
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
