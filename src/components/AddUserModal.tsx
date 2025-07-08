
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type Unit = {
  id: string;
  name: string;
};

type WorkArea = {
  id: string;
  name: string;
};

type AddUserModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserAdded: () => void;
};

const AddUserModal = ({ open, onOpenChange, onUserAdded }: AddUserModalProps) => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [workAreas, setWorkAreas] = useState<WorkArea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      full_name: '',
      username: '',
      unit_id: '',
      work_area_id: ''
    }
  });

  useEffect(() => {
    if (open) {
      fetchSelectOptions();
    }
  }, [open]);

  const fetchSelectOptions = async () => {
    try {
      const [unitsResult, workAreasResult] = await Promise.all([
        supabase.from('units').select('id, name'),
        supabase.from('work_areas').select('id, name')
      ]);

      if (unitsResult.error) throw unitsResult.error;
      if (workAreasResult.error) throw workAreasResult.error;

      setUnits(unitsResult.data || []);
      setWorkAreas(workAreasResult.data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch options",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: {
    email: string;
    password: string;
    full_name: string;
    username: string;
    unit_id: string;
    work_area_id: string;
  }) => {
    setIsLoading(true);
    try {
      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.full_name,
            username: data.username,
            unit_id: data.unit_id || null,
            work_area_id: data.work_area_id || null
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Update profile with unit and work area
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            unit_id: data.unit_id || null,
            work_area_id: data.work_area_id || null
          })
          .eq('id', authData.user.id);

        if (profileError) throw profileError;
      }

      toast({
        title: "Success",
        description: "User created successfully",
      });

      form.reset();
      onOpenChange(false);
      onUserAdded();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create user",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              rules={{ 
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format"
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              rules={{ 
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="full_name"
              rules={{ required: "Full name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              rules={{ required: "Username is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unit_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit.id} value={unit.id}>
                          {unit.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="work_area_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Area</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a work area" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {workAreas.map((workArea) => (
                        <SelectItem key={workArea.id} value={workArea.id}>
                          {workArea.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create User'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
