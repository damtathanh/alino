# Profiles Implementation Guide

## Overview
This implementation creates `public.profiles` as the single source of truth for user data, with proper RLS policies for admin vs user access control.

## SQL Migration

Run the SQL migration file to create the profiles table and RLS policies:

**File:** `supabase/migrations/001_create_profiles.sql`

Execute this SQL in your Supabase SQL Editor or via Supabase CLI.

## Key Features

1. **Profiles Table**: Stores all user data including role, onboarding completion status, and all onboarding survey data
2. **RLS Policies**:
   - Users can read/update their own profile
   - Admin users (email ends with `@alino.net`) can read/update all profiles
3. **Data Flow**:
   - Role selection → Creates/updates profile in `profiles` table
   - Onboarding completion → Updates profile with survey data
   - Dashboards → Read from `profiles` table (via `/api/profile`)

## API Endpoints

### POST `/api/auth/role`
- Creates/updates profile with role
- Sets `onboarding_completed = false`

### POST `/api/auth/onboarding`
- Updates profile with onboarding survey data
- Sets `onboarding_completed = true`

### GET `/api/profile`
- Users: Returns their own profile
- Admins: Returns all profiles

## Admin Detection

Admin users are identified by email ending with `@alino.net` (checked in `lib/supabase-helpers.ts`).

## Notes

- `user_metadata` is still updated for AuthGate compatibility (role, onboardingCompleted flags)
- `profiles` table is the source of truth for all user data
- RLS policies enforce data access restrictions automatically

