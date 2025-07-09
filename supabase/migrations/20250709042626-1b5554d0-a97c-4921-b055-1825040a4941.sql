
-- Create assets table
CREATE TABLE public.assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  asset_code VARCHAR(50) UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category_id UUID REFERENCES public.asset_categories(id),
  serial_number VARCHAR(100),
  purchase_date DATE NOT NULL,
  purchase_price DECIMAL(15,2) NOT NULL,
  vendor TEXT,
  location_id UUID REFERENCES public.work_areas(id),
  assigned_to TEXT,
  description TEXT,
  status VARCHAR(20) DEFAULT 'Aktif' CHECK (status IN ('Aktif', 'Maintenance', 'Pensiun')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;

-- Create policies for assets
CREATE POLICY "Authenticated users can view assets" 
  ON public.assets 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins and staff can insert assets" 
  ON public.assets 
  FOR INSERT 
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins and staff can update assets" 
  ON public.assets 
  FOR UPDATE 
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can delete assets" 
  ON public.assets 
  FOR DELETE 
  USING (has_role(auth.uid(), 'admin'));

-- Create function to generate asset code
CREATE OR REPLACE FUNCTION generate_asset_code()
RETURNS TEXT AS $$
DECLARE
  next_num INTEGER;
  asset_code TEXT;
BEGIN
  -- Get the next number in sequence
  SELECT COALESCE(MAX(CAST(SUBSTRING(asset_code FROM 4) AS INTEGER)), 0) + 1
  INTO next_num
  FROM public.assets
  WHERE asset_code ~ '^AST[0-9]+$';
  
  -- Format as AST001, AST002, etc.
  asset_code := 'AST' || LPAD(next_num::TEXT, 3, '0');
  
  RETURN asset_code;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate asset code
CREATE OR REPLACE FUNCTION set_asset_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.asset_code IS NULL OR NEW.asset_code = '' THEN
    NEW.asset_code := generate_asset_code();
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER assets_set_code_trigger
  BEFORE INSERT OR UPDATE ON public.assets
  FOR EACH ROW
  EXECUTE FUNCTION set_asset_code();
