-- Migration: Clean up profiles table structure
-- Remove unused columns and ensure proper schema

-- Step 1: Remove unused columns
ALTER TABLE public.profiles
  DROP COLUMN IF EXISTS role_selected_at,
  DROP COLUMN IF EXISTS onboarding_completed_at;

-- Step 2: Ensure all required columns exist with correct types
-- Core fields
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS display_name TEXT,
  ADD COLUMN IF NOT EXISTS avatar_url TEXT,
  ADD COLUMN IF NOT EXISTS country TEXT,
  ADD COLUMN IF NOT EXISTS city TEXT,
  ADD COLUMN IF NOT EXISTS birth_year INTEGER,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Creator fields
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS bio TEXT,
  ADD COLUMN IF NOT EXISTS creator_platforms JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS followers_count INTEGER,
  ADD COLUMN IF NOT EXISTS avg_views INTEGER,
  ADD COLUMN IF NOT EXISTS content_categories JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS success_collaboration_rate INTEGER CHECK (success_collaboration_rate >= 0 AND success_collaboration_rate <= 100),
  ADD COLUMN IF NOT EXISTS preferred_collaboration_type JSONB DEFAULT '[]'::jsonb;

-- Brand fields
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS company_name TEXT,
  ADD COLUMN IF NOT EXISTS website TEXT,
  ADD COLUMN IF NOT EXISTS industry TEXT,
  ADD COLUMN IF NOT EXISTS company_size TEXT,
  ADD COLUMN IF NOT EXISTS campaign_budget_range TEXT,
  ADD COLUMN IF NOT EXISTS campaign_goal TEXT,
  ADD COLUMN IF NOT EXISTS target_platforms JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS target_creator_size TEXT,
  ADD COLUMN IF NOT EXISTS contact_person_name TEXT,
  ADD COLUMN IF NOT EXISTS contact_person_phone TEXT;

-- Step 3: Remove old columns that are no longer needed
ALTER TABLE public.profiles
  DROP COLUMN IF EXISTS collaboration_expectation,
  DROP COLUMN IF EXISTS collaboration_success_rate,
  DROP COLUMN IF EXISTS budget,
  DROP COLUMN IF EXISTS contact_person_email;

-- Step 4: Create function to upsert profile on first login
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role, onboarding_completed)
  VALUES (NEW.id, NULL, false)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 5: Create trigger (if not exists)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Step 6: Update RLS policies
-- Users can read their own profile
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Users can insert their own profile
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Step 7: Ensure updated_at is updated on change
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

