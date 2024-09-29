-- Update posts table
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  content TEXT NOT NULL,
  author TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS posts_user_id_idx ON public.posts (user_id);
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON public.posts (created_at DESC);

-- Ensure RLS policies are in place
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Allow read access for all authenticated users
CREATE POLICY "Allow read access for all authenticated users"
ON public.posts FOR SELECT
TO authenticated
USING (true);

-- Allow insert access for authenticated users
CREATE POLICY "Allow insert access for authenticated users"
ON public.posts FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow update and delete access for post owners
CREATE POLICY "Allow update and delete for post owners"
ON public.posts FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);