-- Migration: Add healthcare_it category to projects table
-- Execute this in Supabase SQL Editor

-- Update the category CHECK constraint to include healthcare_it
ALTER TABLE public.projects DROP CONSTRAINT IF EXISTS projects_category_check;
ALTER TABLE public.projects ADD CONSTRAINT projects_category_check
    CHECK (category IN ('it_ops', 'ai', 'data', 'backend', 'fullstack', 'healthcare_it'));

-- Optional: Update existing projects that should be in healthcare_it category
-- For example, if you have existing healthcare projects, you can update them:
-- UPDATE public.projects SET category = 'healthcare_it' WHERE title LIKE '%医疗%' OR title LIKE '%医院%';