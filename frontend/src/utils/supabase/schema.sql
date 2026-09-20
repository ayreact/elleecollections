-- Create the Categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) <= 100),
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create the Products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.categories(id) ON DELETE RESTRICT,
  title TEXT NOT NULL,
  description TEXT,
  base_price NUMERIC NOT NULL,
  image_url TEXT,
  is_in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Categories RLS Policies
-- Allow anyone to read categories
CREATE POLICY "Allow public read access on categories" 
ON public.categories FOR SELECT 
USING (true);

-- Allow authenticated users (Admin) to insert, update, delete
CREATE POLICY "Allow authenticated full access on categories" 
ON public.categories FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Products RLS Policies
-- Allow anyone to read products
CREATE POLICY "Allow public read access on products" 
ON public.products FOR SELECT 
USING (true);

-- Allow authenticated users (Admin) to insert, update, delete
CREATE POLICY "Allow authenticated full access on products" 
ON public.products FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
