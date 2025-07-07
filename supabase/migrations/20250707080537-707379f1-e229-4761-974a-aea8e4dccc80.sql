
-- Create Asset Categories table
CREATE TABLE public.asset_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Units table
CREATE TABLE public.units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Work Areas table
CREATE TABLE public.work_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.asset_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_areas ENABLE ROW LEVEL SECURITY;

-- Create policies - allow all authenticated users to view, but only admins to modify
CREATE POLICY "Anyone can view asset categories" ON public.asset_categories
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage asset categories" ON public.asset_categories
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view units" ON public.units
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage units" ON public.units
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view work areas" ON public.work_areas
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage work areas" ON public.work_areas
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Add foreign key constraints to profiles table to link with these new tables
ALTER TABLE public.profiles 
ADD COLUMN unit_id UUID REFERENCES public.units(id),
ADD COLUMN work_area_id UUID REFERENCES public.work_areas(id);

-- Insert some default data
INSERT INTO public.units (name, description) VALUES 
  ('IT Department', 'Information Technology Department'),
  ('Finance', 'Finance Department'),
  ('HR', 'Human Resources Department'),
  ('Operations', 'Operations Department');

INSERT INTO public.work_areas (name, description) VALUES 
  ('Office Building A', 'Main office building'),
  ('Office Building B', 'Secondary office building'),
  ('Warehouse', 'Storage and logistics area'),
  ('Manufacturing Floor', 'Production area');

INSERT INTO public.asset_categories (name, description) VALUES 
  ('IT Equipment', 'Computers, servers, network equipment'),
  ('Office Furniture', 'Desks, chairs, cabinets'),
  ('Vehicles', 'Company cars, trucks, motorcycles'),
  ('Machinery', 'Manufacturing and production equipment');
