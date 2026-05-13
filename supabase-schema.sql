-- Run this script in the Supabase SQL Editor to set up the database for Phase 1.

-- 1. Create the contacts table
CREATE TABLE public.contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    city TEXT,
    project_type TEXT,
    budget TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'archived'))
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- 3. Create policies
-- Allow anonymous users to insert new contact submissions (for the frontend forms)
CREATE POLICY "Allow anonymous inserts" ON public.contacts
    FOR INSERT 
    TO anon
    WITH CHECK (true);

-- Allow authenticated admins to view all contacts
CREATE POLICY "Allow authenticated read" ON public.contacts
    FOR SELECT
    TO authenticated
    USING (true);

-- Allow authenticated admins to update contacts (e.g. mark as contacted)
CREATE POLICY "Allow authenticated update" ON public.contacts
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Allow authenticated admins to delete contacts
CREATE POLICY "Allow authenticated delete" ON public.contacts
    FOR DELETE
    TO authenticated
    USING (true);
