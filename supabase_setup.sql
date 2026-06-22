-- ============================================================
-- NAFA WEBSITE — SUPABASE DATABASE SETUP
-- Run this SQL in: Supabase → SQL Editor → New Query → Run
-- ============================================================

-- 1. Create the profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id                  UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name           TEXT NOT NULL,
  email               TEXT NOT NULL,
  phone               TEXT,
  country             TEXT,
  province            TEXT,
  city                TEXT,
  cnic                TEXT,
  trading_experience  TEXT,
  profession          TEXT,
  avatar_url          TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (keeps each user's data private)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Policy: users can only read their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- 4. Policy: users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 5. Policy: users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 6. (Optional) Admin can view all profiles
-- Uncomment this if you want to view all users in the Supabase dashboard
-- CREATE POLICY "Admin can view all profiles"
--   ON public.profiles FOR SELECT
--   USING (auth.jwt() ->> 'role' = 'service_role');

-- ============================================================
-- DONE! Your database is ready.
-- ============================================================
