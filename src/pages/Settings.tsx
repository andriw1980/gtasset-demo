import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { SettingsModal } from '@/components/SettingsModal';
import { useToast } from "@/hooks/use-toast"
import { Database, Tables } from '@/integrations/supabase/types';
import { supabase } from '@/integrations/supabase/client';

type TableName = "units" | "work_areas" | "asset_categories";
type SettingsItem = Tables<TableName>;

const Settings = () => {
  const [units, setUnits] = useState<SettingsItem[]>([]);
  const [workAreas, setWorkAreas] = useState<SettingsItem[]>([]);
  const [assetCategories, setAssetCategories] = useState<SettingsItem[]>([]);
  const { toast } = useToast()

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [unitsResult, workAreasResult, assetCategoriesResult] = await Promise.all([
        supabase.from('units').select('*'),
        supabase.from('work_areas').select('*'),
        supabase.from('asset_categories').select('*')
      ]);

      if (unitsResult.error) throw unitsResult.error;
      if (workAreasResult.error) throw workAreasResult.error;
      if (assetCategoriesResult.error) throw assetCategoriesResult.error;

      setUnits(unitsResult.data || []);
      setWorkAreas(workAreasResult.data || []);
      setAssetCategories(assetCategoriesResult.data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleAdd = async (tableName: TableName, data: { name: string; description: string }) => {
    try {
      const { error } = await supabase
        .from(tableName)
        .insert([data]);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${tableName.replace('_', ' ')} added successfully`,
      });

      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = async (tableName: TableName, id: string, data: { name: string; description: string }) => {
    try {
      const { error } = await supabase
        .from(tableName)
        .update(data)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${tableName.replace('_', ' ')} updated successfully`,
      });

      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
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
        description: `${tableName.replace('_', ' ')} deleted successfully`,
      });

      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const renderSettingsTable = (
    title: string,
    data: SettingsItem[],
    tableName: TableName
  ) => {
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{title}</CardTitle>
            <SettingsModal
              title={`Add New ${title.slice(0, -1)}`}
              onSubmit={(data) => handleAdd(tableName, data)}
              trigger={
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              }
            />
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
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.description || '-'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <SettingsModal
                        title={`Edit ${title.slice(0, -1)}`}
                        onSubmit={(data) => handleEdit(tableName, item.id, data)}
                        initialData={item}
                        trigger={
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        }
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(tableName, item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="grid md:grid-cols-2 gap-4">
          {renderSettingsTable("Units", units, "units")}
          {renderSettingsTable("Work Areas", workAreas, "work_areas")}
          {renderSettingsTable("Asset Categories", assetCategories, "asset_categories")}
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
