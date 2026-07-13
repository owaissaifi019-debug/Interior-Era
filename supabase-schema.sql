-- Run this script in the Supabase SQL Editor to set up the database for Interior Era

-- =========================================================================
-- 1. Contacts Table (CRM Enquiries)
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.contacts (
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
    status TEXT DEFAULT 'new'
);

-- Safely update check constraint for status
ALTER TABLE public.contacts DROP CONSTRAINT IF EXISTS contacts_status_check;
ALTER TABLE public.contacts ADD CONSTRAINT contacts_status_check CHECK (status IN ('new', 'contacted', 'closed', 'archived'));

-- =========================================================================
-- 2. Newsletter Subscribers
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed'))
);

-- =========================================================================
-- 3. Site Settings (Global Contacts & Coordinates)
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    phone TEXT DEFAULT '+91 9876543210',
    whatsapp TEXT DEFAULT '9910620810',
    email TEXT DEFAULT 'Shahid@gmail.com',
    address TEXT DEFAULT '123 Luxury Avenue, Design District',
    instagram TEXT DEFAULT 'https://www.instagram.com/inte.riorera?igsh=MXY3NXVueXk3MjFlMw==',
    linkedin TEXT DEFAULT 'https://www.linkedin.com/in/mohd-shahid-0ab082193?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    twitter TEXT DEFAULT '#',
    stats JSONB DEFAULT '[
      {"value": 100, "suffix": "+", "label": "Successful Projects"},
      {"value": 5, "suffix": "+", "label": "Years Experience"},
      {"value": 50, "suffix": "+", "label": "Happy Clients"},
      {"value": 100, "suffix": "%", "label": "Creative Designs"}
    ]'::jsonb,
    features JSONB DEFAULT '[
      "EXTREME CUSTOMIZATION",
      "WHITE-GLOVE SERVICE",
      "FULL TRANSPARENCY",
      "NO QUESTIONS ASKED AFTER HANDOVER SERVICE"
    ]'::jsonb,
    featured_subheader TEXT DEFAULT 'Selected Portfolio',
    featured_title TEXT DEFAULT 'Featured Works',
    featured_description TEXT DEFAULT 'Hover to explore our finest residential, commercial, and bespoke design projects.'
);

-- Seed initial settings if table is empty
INSERT INTO public.site_settings (phone, whatsapp, email, address, instagram, linkedin, twitter)
SELECT '+91 9876543210', '9910620810', 'Shahid@gmail.com', '123 Luxury Avenue, Design District', 'https://www.instagram.com/inte.riorera?igsh=MXY3NXVueXk3MjFlMw==', 'https://www.linkedin.com/in/mohd-shahid-0ab082193?utm_source=share_via&utm_content=profile&utm_medium=member_android', '#'
WHERE NOT EXISTS (SELECT 1 FROM public.site_settings);

-- =========================================================================
-- 4. Hero Slides
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.hero_slides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL DEFAULT 'Timeless Luxury For Modern Living',
    subtitle TEXT NOT NULL DEFAULT 'Redefining Spaces',
    image_url TEXT NOT NULL,
    button_primary_text TEXT DEFAULT 'Explore Projects',
    button_primary_link TEXT DEFAULT '/projects',
    button_secondary_text TEXT DEFAULT 'Get Consultation',
    button_secondary_link TEXT DEFAULT '/contact',
    sort_order INT DEFAULT 0,
    is_enabled BOOLEAN DEFAULT true
);

-- Seed initial hero slide
INSERT INTO public.hero_slides (title, subtitle, image_url, sort_order)
SELECT 'Timeless Luxury For Modern Living', 'Redefining Spaces', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000', 1
WHERE NOT EXISTS (SELECT 1 FROM public.hero_slides);

-- =========================================================================
-- 5. Services Table
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT DEFAULT 'Compass',
    is_enabled BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0
);

-- Seed services
INSERT INTO public.services (title, description, icon_name, sort_order)
SELECT 'Space Planning', 'Strategic layout optimization to maximize flow, functionality, and spatial harmony in your environment.', 'Compass', 1 WHERE NOT EXISTS (SELECT 1 FROM public.services WHERE title='Space Planning');
INSERT INTO public.services (title, description, icon_name, sort_order)
SELECT 'Interior Architecture', 'Custom structural modifications, millwork design, and architectural detailing for a cohesive look.', 'PenTool', 2 WHERE NOT EXISTS (SELECT 1 FROM public.services WHERE title='Interior Architecture');
INSERT INTO public.services (title, description, icon_name, sort_order)
SELECT 'Furniture Selection', 'Curated selection of premium furnishings, textiles, and art that reflect your personal style.', 'Layout', 3 WHERE NOT EXISTS (SELECT 1 FROM public.services WHERE title='Furniture Selection');
INSERT INTO public.services (title, description, icon_name, sort_order)
SELECT 'Project Management', 'End-to-end oversight from concept to completion, ensuring quality and timely delivery.', 'Home', 4 WHERE NOT EXISTS (SELECT 1 FROM public.services WHERE title='Project Management');
INSERT INTO public.services (title, description, icon_name, sort_order)
SELECT '3D Visualization', 'Photorealistic rendering and virtual walkthroughs to perfectly visualize your new space.', 'Compass', 5 WHERE NOT EXISTS (SELECT 1 FROM public.services WHERE title='3D Visualization');
INSERT INTO public.services (title, description, icon_name, sort_order)
SELECT 'Custom Lighting', 'Bespoke illumination design that sets the perfect mood and highlights architectural details.', 'PenTool', 6 WHERE NOT EXISTS (SELECT 1 FROM public.services WHERE title='Custom Lighting');
INSERT INTO public.services (title, description, icon_name, sort_order)
SELECT 'Commercial Styling', 'Elevated workspaces and hospitality environments that impress clients and inspire teams.', 'Layout', 7 WHERE NOT EXISTS (SELECT 1 FROM public.services WHERE title='Commercial Styling');
INSERT INTO public.services (title, description, icon_name, sort_order)
SELECT 'Landscape Integration', 'Seamlessly blending indoor luxury with outdoor serenity for a unified aesthetic.', 'Home', 8 WHERE NOT EXISTS (SELECT 1 FROM public.services WHERE title='Landscape Integration');

-- =========================================================================
-- 6. Testimonials Table
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote TEXT NOT NULL,
    author TEXT NOT NULL,
    role TEXT NOT NULL,
    image_url TEXT NOT NULL,
    is_enabled BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0
);

-- Seed testimonials
INSERT INTO public.testimonials (quote, author, role, image_url, sort_order)
SELECT 'I am sitting in my beautiful drawing room and feeling quite emotional. Getting this house redone was my dream but one which came with a lot of risks and uncertainties around whether it will come out as I had imagined it or whether the investment will reflect when someone comes to the house.', 'PRERNA SHARMA', 'BESTACH PARK VIEW SPA', '/Images/Residential Project/living_room.webp', 1
WHERE NOT EXISTS (SELECT 1 FROM public.testimonials WHERE author='PRERNA SHARMA');
INSERT INTO public.testimonials (quote, author, role, image_url, sort_order)
SELECT 'We would like to thank Team Interia for making our house so beautiful. We are loving the interiors. We truly appreciate the effort you take to understand the client and modify things accordingly. It was a great experience for us and I also learned lot of new things and improved my vocabulary in home decor.', 'DR PRASHANT BHANGUI', 'ORCHID PETALS', '/Images/Residential Project (Civil Line Gurugram)/modern_bedroom.webp', 2
WHERE NOT EXISTS (SELECT 1 FROM public.testimonials WHERE author='DR PRASHANT BHANGUI');
INSERT INTO public.testimonials (quote, author, role, image_url, sort_order)
SELECT 'We have enjoyed building our home with you, Umesh and the Interia Team and are delighted with how it''s turned out.', 'SUMIT SHARMA', 'PIONEER ARAYA', '/Images/Residential Project 2/dining_room.webp', 3
WHERE NOT EXISTS (SELECT 1 FROM public.testimonials WHERE author='SUMIT SHARMA');
INSERT INTO public.testimonials (quote, author, role, image_url, sort_order)
SELECT 'Their team brought a level of sophistication and modern elegance to our penthouse that we didn''t know was possible. Every corner feels intentional, perfectly balanced, and uniquely tailored to our lifestyle.', 'AMIT DESAI', 'THE MAGNOLIAS', '/Images/Residential Project 2/living_room_image.webp', 4
WHERE NOT EXISTS (SELECT 1 FROM public.testimonials WHERE author='AMIT DESAI');
INSERT INTO public.testimonials (quote, author, role, image_url, sort_order)
SELECT 'Professionalism at its peak. The entire journey from 3D renders to final execution was flawless. They delivered not just a beautiful house, but a true architectural masterpiece.', 'KAVITA SINGH', 'DLF CAMELLIAS', '/Images/Residential Project (DLF phase 4)/house_entrance.webp', 5
WHERE NOT EXISTS (SELECT 1 FROM public.testimonials WHERE author='KAVITA SINGH');

-- =========================================================================
-- 7. Projects Table
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.projects (
    id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('RESIDENTIAL', 'COMMERCIAL', 'ARCHITECTURAL', 'BESPOKE')),
    scope TEXT NOT NULL,
    location TEXT NOT NULL,
    budget TEXT,
    year TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    sort_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true
);

-- =========================================================================
-- 8. Project Gallery Images
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id INT REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    image_url TEXT NOT NULL,
    sort_order INT DEFAULT 0
);

-- Seed projects & gallery images
-- We will write a function or basic queries to insert initial project data if table is empty
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.projects) THEN
    -- 1. Magnolia Residence
    INSERT INTO public.projects (id, title, category, scope, location, budget, year, image, description, is_featured, sort_order)
    VALUES (1, 'The Magnolia Residence', 'RESIDENTIAL', 'Residential Interior Design', 'Sector 54, Gurugram', '$150k - $250k', '2025', '/Images/Residential Project/living_room.webp', 'A warm, sophisticated residence balancing light oak wood paneling, gold trim accents, and premium bespoke furniture. Emphasizes an optimal flow of natural light coupled with custom-built fireplace surrounds.', true, 1);
    
    INSERT INTO public.project_images (project_id, image_url, sort_order) VALUES
    (1, '/Images/Residential Project/living_room.webp', 1),
    (1, '/Images/Residential Project/interior_image.webp', 2),
    (1, '/Images/Residential Project/IMG-20260514-WA0015.webp', 3),
    (1, '/Images/Residential Project/IMG-20260514-WA0016.webp', 4);

    -- 2. Araya Penthouse
    INSERT INTO public.projects (id, title, category, scope, location, budget, year, image, description, is_featured, sort_order)
    VALUES (2, 'Araya Penthouse Suite', 'BESPOKE', 'Bespoke Interior Design', 'Pioneer Araya, Gurugram', '$300k - $500k', '2026', '/Images/Residential Project 2/living_room_image.webp', 'An extremely premium high-rise penthouse featuring custom glass curtain walls, double-height ceiling lounge, rich velvet seating arrays, and modular bespoke dining systems.', true, 2);
    
    INSERT INTO public.project_images (project_id, image_url, sort_order) VALUES
    (2, '/Images/Residential Project 2/living_room_image.webp', 1),
    (2, '/Images/Residential Project 2/living_room.webp', 2),
    (2, '/Images/Residential Project 2/bedroom_image.webp', 3),
    (2, '/Images/Residential Project 2/dining_room.webp', 4),
    (2, '/Images/Residential Project 2/interior_setup.webp', 5),
    (2, '/Images/Residential Project 2/IMG-20260514-WA0053.webp', 6),
    (2, '/Images/Residential Project 2/IMG-20260514-WA0061.webp', 7);

    -- 3. Civil Lines Apartment
    INSERT INTO public.projects (id, title, category, scope, location, budget, year, image, description, is_featured, sort_order)
    VALUES (3, 'Civil Lines Luxury Apartment', 'RESIDENTIAL', 'Residential Interior Design', 'Civil Lines, Gurugram', '$200k - $300k', '2025', '/Images/Residential Project (Civil Line Gurugram)/interior-era.webp', 'A classic-modernist hybrid apartment incorporating deep charcoal tones, state-of-the-art modular kitchen fixtures, luxury master bedroom acoustics, and premium custom lighting grids.', true, 3);
    
    INSERT INTO public.project_images (project_id, image_url, sort_order) VALUES
    (3, '/Images/Residential Project (Civil Line Gurugram)/interior-era.webp', 1),
    (3, '/Images/Residential Project (Civil Line Gurugram)/modern_bedroom.webp', 2),
    (3, '/Images/Residential Project (Civil Line Gurugram)/kitchen_image.webp', 3),
    (3, '/Images/Residential Project (Civil Line Gurugram)/IMG-20260515-WA0081.webp', 4),
    (3, '/Images/Residential Project (Civil Line Gurugram)/IMG-20260515-WA0086.webp', 5),
    (3, '/Images/Residential Project (Civil Line Gurugram)/IMG-20260515-WA0089.webp', 6),
    (3, '/Images/Residential Project (Civil Line Gurugram)/IMG-20260515-WA0093.webp', 7),
    (3, '/Images/Residential Project (Civil Line Gurugram)/IMG-20260515-WA0115-1.webp', 8),
    (3, '/Images/Residential Project (Civil Line Gurugram)/IMG-20260515-WA0115.webp', 9),
    (3, '/Images/Residential Project (Civil Line Gurugram)/IMG-20260515-WA0117.webp', 10);

    -- 4. DLF Phase 4 Penthouse
    INSERT INTO public.projects (id, title, category, scope, location, budget, year, image, description, is_featured, sort_order)
    VALUES (4, 'DLF Phase 4 Penthouse', 'RESIDENTIAL', 'Residential Interior Design', 'DLF Phase 4, Gurugram', '$150k - $200k', '2025', '/Images/Residential Project (DLF phase 4)/house_entrance.webp', 'A modern sanctuary focusing on fluid indoor-outdoor transitions, beautiful custom stone entrance cladding, and sleek geometric furniture profiles.', false, 4);
    
    INSERT INTO public.project_images (project_id, image_url, sort_order) VALUES
    (4, '/Images/Residential Project (DLF phase 4)/house_entrance.webp', 1),
    (4, '/Images/Residential Project (DLF phase 4)/A.webp', 2),
    (4, '/Images/Residential Project (DLF phase 4)/IMG-20260514-WA0081.webp', 3),
    (4, '/Images/Residential Project (DLF phase 4)/IMG-20260514-WA0083.webp', 4);

    -- 5. Elegance Villa DLF
    INSERT INTO public.projects (id, title, category, scope, location, budget, year, image, description, is_featured, sort_order)
    VALUES (5, 'Elegance Villa DLF', 'ARCHITECTURAL', 'Architectural & Interior Design', 'DLF Phase 4, Gurugram', '$400k - $600k', '2026', '/Images/Residential Project (Phase 4)/kitchen_image.webp', 'Full-scale luxury residential rebuild including high-end marble bath installations, a bright professional chef''s kitchen, custom structural panels, and custom-designed wardrobes.', true, 5);
    
    INSERT INTO public.project_images (project_id, image_url, sort_order) VALUES
    (5, '/Images/Residential Project (Phase 4)/kitchen_image.webp', 1),
    (5, '/Images/Residential Project (Phase 4)/bathroom_image.webp', 2),
    (5, '/Images/Residential Project (Phase 4)/bathroom_design.webp', 3),
    (5, '/Images/Residential Project (Phase 4)/Aa.webp', 4),
    (5, '/Images/Residential Project (Phase 4)/IMG-20260514-WA0114.webp', 5),
    (5, '/Images/Residential Project (Phase 4)/IMG-20260514-WA0133.webp', 6),
    (5, '/Images/Residential Project (Phase 4)/IMG-20260514-WA0140.webp', 7),
    (5, '/Images/Residential Project (Phase 4)/IMG-20260514-WA0145.webp', 8),
    (5, '/Images/Residential Project (Phase 4)/IMG-20260514-WA0147.webp', 9);

    -- 9. Corporate Office (Note ID is 9)
    INSERT INTO public.projects (id, title, category, scope, location, budget, year, image, description, is_featured, sort_order)
    VALUES (9, 'Aevom Corporate Office', 'COMMERCIAL', 'Office Interior Design', 'Bandra Kurla Complex, Mumbai', '$400k - $600k', '2026', '/Images/Aevom Office (Commercial  Project)/office_image.webp', 'A luxury corporate headquarters featuring ergonomic glass workstations, rich oak partitions, soundproof meetings rooms, and vibrant signature branding integrations.', true, 6);
    
    INSERT INTO public.project_images (project_id, image_url, sort_order) VALUES
    (9, '/Images/Aevom Office (Commercial  Project)/office_image.webp', 1),
    (9, '/Images/Aevom Office (Commercial  Project)/office_interior.webp', 2),
    (9, '/Images/Aevom Office (Commercial  Project)/office_interior-1.webp', 3),
    (9, '/Images/Aevom Office (Commercial  Project)/IMG-20260514-WA0037.webp', 4),
    (9, '/Images/Aevom Office (Commercial  Project)/IMG-20260514-WA0039.webp', 5);

    -- 10. Auditorium (Note ID is 10)
    INSERT INTO public.projects (id, title, category, scope, location, budget, year, image, description, is_featured, sort_order)
    VALUES (10, 'Bihar State Auditorium', 'COMMERCIAL', 'Commercial Interior Design', 'Patna, Bihar', '$800k+', '2025', '/Images/Commercial Project (Auditorium Bihar)/auditorium_image.webp', 'State-of-the-art public auditorium featuring bespoke acoustic wall panels, stepped luxury theatre seating, grand lighting rigs, and a monumental stage layout.', true, 7);
    
    INSERT INTO public.project_images (project_id, image_url, sort_order) VALUES
    (10, '/Images/Commercial Project (Auditorium Bihar)/auditorium_image.webp', 1),
    (10, '/Images/Commercial Project (Auditorium Bihar)/auditorium_image-1.webp', 2),
    (10, '/Images/Commercial Project (Auditorium Bihar)/interior_design.webp', 3),
    (10, '/Images/Commercial Project (Auditorium Bihar)/interior_scene.webp', 4),
    (10, '/Images/Commercial Project (Auditorium Bihar)/IMG-20260514-WA0192.jpg', 5),
    (10, '/Images/Commercial Project (Auditorium Bihar)/IMG-20260514-WA0196.jpg', 6),
    (10, '/Images/Commercial Project (Auditorium Bihar)/20260514_201917.jpg', 7);

    -- 12. Showroom (Note ID is 12)
    INSERT INTO public.projects (id, title, category, scope, location, budget, year, image, description, is_featured, sort_order)
    VALUES (12, 'LD Sons Luxury Showroom', 'COMMERCIAL', 'Retail Interior Design', 'South Extension, New Delhi', '$350k - $500k', '2025', '/Images/Commercial Project 1 (LD sons South Extension)/jewelry_showroom.webp', 'Ultra-luxury jewelry showroom emphasizing high-security display vitrines, rich suede seating areas, premium warm downlighting, and exquisite marble flooring.', true, 8);
    
    INSERT INTO public.project_images (project_id, image_url, sort_order) VALUES
    (12, '/Images/Commercial Project 1 (LD sons South Extension)/jewelry_showroom.webp', 1),
    (12, '/Images/Commercial Project 1 (LD sons South Extension)/interior_showroom.webp', 2),
    (12, '/Images/Commercial Project 1 (LD sons South Extension)/IMG-20260515-WA0034.webp', 3),
    (12, '/Images/Commercial Project 1 (LD sons South Extension)/IMG-20260515-WA0035.webp', 4),
    (12, '/Images/Commercial Project 1 (LD sons South Extension)/IMG-20260515-WA0038.webp', 5),
    (12, '/Images/Commercial Project 1 (LD sons South Extension)/IMG-20260515-WA0039.webp', 6);
  END IF;
END $$;

-- =========================================================================
-- 9. Row Level Security (RLS) Configuration
-- =========================================================================
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to prevent errors on rerun
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.contacts;
DROP POLICY IF EXISTS "Allow authenticated read" ON public.contacts;
DROP POLICY IF EXISTS "Allow authenticated update" ON public.contacts;
DROP POLICY IF EXISTS "Allow authenticated delete" ON public.contacts;

DROP POLICY IF EXISTS "Allow anonymous read" ON public.site_settings;
DROP POLICY IF EXISTS "Allow authenticated write" ON public.site_settings;

DROP POLICY IF EXISTS "Allow anonymous read" ON public.hero_slides;
DROP POLICY IF EXISTS "Allow authenticated write" ON public.hero_slides;

DROP POLICY IF EXISTS "Allow anonymous read" ON public.services;
DROP POLICY IF EXISTS "Allow authenticated write" ON public.services;

DROP POLICY IF EXISTS "Allow anonymous read" ON public.testimonials;
DROP POLICY IF EXISTS "Allow authenticated write" ON public.testimonials;

DROP POLICY IF EXISTS "Allow anonymous read" ON public.projects;
DROP POLICY IF EXISTS "Allow authenticated write" ON public.projects;

DROP POLICY IF EXISTS "Allow anonymous read" ON public.project_images;
DROP POLICY IF EXISTS "Allow authenticated write" ON public.project_images;

DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow authenticated read" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow authenticated update" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow authenticated delete" ON public.newsletter_subscribers;

-- Contacts policies
CREATE POLICY "Allow anonymous inserts" ON public.contacts FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow authenticated read" ON public.contacts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated update" ON public.contacts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete" ON public.contacts FOR DELETE TO authenticated USING (true);

-- Newsletter subscribers policies
CREATE POLICY "Allow anonymous inserts" ON public.newsletter_subscribers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow authenticated read" ON public.newsletter_subscribers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated update" ON public.newsletter_subscribers FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete" ON public.newsletter_subscribers FOR DELETE TO authenticated USING (true);

-- Site settings policies
CREATE POLICY "Allow anonymous read" ON public.site_settings FOR SELECT TO anon USING (true);
CREATE POLICY "Allow authenticated write" ON public.site_settings FOR ALL TO authenticated USING (true);

-- Hero slides policies
CREATE POLICY "Allow anonymous read" ON public.hero_slides FOR SELECT TO anon USING (true);
CREATE POLICY "Allow authenticated write" ON public.hero_slides FOR ALL TO authenticated USING (true);

-- Services policies
CREATE POLICY "Allow anonymous read" ON public.services FOR SELECT TO anon USING (true);
CREATE POLICY "Allow authenticated write" ON public.services FOR ALL TO authenticated USING (true);

-- Testimonials policies
CREATE POLICY "Allow anonymous read" ON public.testimonials FOR SELECT TO anon USING (true);
CREATE POLICY "Allow authenticated write" ON public.testimonials FOR ALL TO authenticated USING (true);

-- Projects policies
CREATE POLICY "Allow anonymous read" ON public.projects FOR SELECT TO anon USING (true);
CREATE POLICY "Allow authenticated write" ON public.projects FOR ALL TO authenticated USING (true);

-- Project images policies
CREATE POLICY "Allow anonymous read" ON public.project_images FOR SELECT TO anon USING (true);
CREATE POLICY "Allow authenticated write" ON public.project_images FOR ALL TO authenticated USING (true);

-- =========================================================================
-- 10. Admin User Seeding (haniya@gmail.com / H@mdanH@aniya)
-- =========================================================================
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insert user into auth.users and auth.identities
DO $$
DECLARE
  user_id UUID := gen_random_uuid();
BEGIN
  -- Check if user already exists in auth.users
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'haniya@gmail.com') THEN
    -- Insert into auth.users
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token,
      phone,
      phone_confirmed_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      user_id,
      'authenticated',
      'authenticated',
      'haniya@gmail.com',
      crypt('H@mdanH@aniya', gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{}'::jsonb,
      now(),
      now(),
      '',
      '',
      '',
      '',
      NULL,
      NULL
    );

    -- Insert into auth.identities
    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      provider_id,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      gen_random_uuid(),
      user_id,
      json_build_object('sub', user_id, 'email', 'haniya@gmail.com')::jsonb,
      'email',
      user_id::text,
      now(),
      now(),
      now()
    );
  END IF;
END $$;

-- =========================================================================
-- 11. Signature Details Table (Scrolling Marquee)
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.signature_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    image_url TEXT NOT NULL,
    sort_order INT DEFAULT 0
);

-- Seed initial signature details images from the original list
INSERT INTO public.signature_details (image_url, sort_order)
SELECT '/Images/Residential Project/living_room.webp', 1 WHERE NOT EXISTS (SELECT 1 FROM public.signature_details WHERE sort_order = 1);
INSERT INTO public.signature_details (image_url, sort_order)
SELECT '/Images/Residential Project/interior_image.webp', 2 WHERE NOT EXISTS (SELECT 1 FROM public.signature_details WHERE sort_order = 2);
INSERT INTO public.signature_details (image_url, sort_order)
SELECT '/Images/Residential Project 2/bedroom_image.webp', 3 WHERE NOT EXISTS (SELECT 1 FROM public.signature_details WHERE sort_order = 3);
INSERT INTO public.signature_details (image_url, sort_order)
SELECT '/Images/Residential Project 2/dining_room.webp', 4 WHERE NOT EXISTS (SELECT 1 FROM public.signature_details WHERE sort_order = 4);
INSERT INTO public.signature_details (image_url, sort_order)
SELECT '/Images/Aevom Office (Commercial  Project)/office_interior.webp', 5 WHERE NOT EXISTS (SELECT 1 FROM public.signature_details WHERE sort_order = 5);
INSERT INTO public.signature_details (image_url, sort_order)
SELECT '/Images/Aevom Office (Commercial  Project)/office_image.webp', 6 WHERE NOT EXISTS (SELECT 1 FROM public.signature_details WHERE sort_order = 6);
INSERT INTO public.signature_details (image_url, sort_order)
SELECT '/Images/Residential Project/IMG-20260514-WA0016.webp', 7 WHERE NOT EXISTS (SELECT 1 FROM public.signature_details WHERE sort_order = 7);
INSERT INTO public.signature_details (image_url, sort_order)
SELECT '/Images/Residential Project 2/living_room.webp', 8 WHERE NOT EXISTS (SELECT 1 FROM public.signature_details WHERE sort_order = 8);

-- Enable Row Level Security (RLS)
ALTER TABLE public.signature_details ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow anonymous read" ON public.signature_details FOR SELECT TO anon USING (true);
CREATE POLICY "Allow authenticated write" ON public.signature_details FOR ALL TO authenticated USING (true);

-- =========================================================================
-- 12. Storage Bucket Creation and Policies
-- =========================================================================
-- Create bucket 'interior-era-media' if it does not exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('interior-era-media', 'interior-era-media', true)
ON CONFLICT (id) DO NOTHING;

-- Drop policies if they already exist to avoid name conflicts
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;

-- Create policies for 'interior-era-media' bucket
CREATE POLICY "Allow public read access" ON storage.objects
FOR SELECT TO public USING (bucket_id = 'interior-era-media');

CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'interior-era-media');

CREATE POLICY "Allow authenticated updates" ON storage.objects
FOR UPDATE TO authenticated WITH CHECK (bucket_id = 'interior-era-media');

CREATE POLICY "Allow authenticated deletes" ON storage.objects
FOR DELETE TO authenticated USING (bucket_id = 'interior-era-media');



