# Migration Guide: Next.js to Vite + React

## Overview
This project has been migrated from Next.js App Router to Vite + React for simplicity and predictability.

## Key Changes

### 1. Project Structure
- **Old**: `app/` directory with Next.js App Router
- **New**: `src/` directory with standard React structure

### 2. Routing
- **Old**: Next.js file-based routing (`app/page.tsx`, `app/login/page.tsx`)
- **New**: React Router with `src/router.tsx`

### 3. Authentication
- **Old**: Server-side auth with cookies, API routes
- **New**: Client-side only with Supabase client, localStorage persistence

### 4. No More Server Components
- All components are now client-side React components
- No SSR, no hydration issues

## Setup Instructions

1. **Install dependencies:**
```bash
npm install
```

2. **Create `.env` file:**
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Start development server:**
```bash
npm run dev
```

## File Mapping

| Next.js | Vite + React |
|---------|--------------|
| `app/page.tsx` | `src/pages/LandingPage.tsx` |
| `app/login/page.tsx` | `src/pages/LoginPage.tsx` |
| `app/signup/page.tsx` | `src/pages/SignupPage.tsx` |
| `app/creator/page.tsx` | `src/pages/CreatorDashboard.tsx` |
| `app/brand/page.tsx` | `src/pages/BrandDashboard.tsx` |
| `app/profile/page.tsx` | `src/pages/ProfilePage.tsx` |
| `app/settings/page.tsx` | `src/pages/SettingsPage.tsx` |
| `app/components/layout/Header.tsx` | `src/components/layout/Header.tsx` |
| `lib/hooks/useAuth.ts` | `src/hooks/useAuth.ts` |
| `lib/supabase-client.ts` | `src/lib/supabase.ts` |

## Removed Concepts

- ❌ Server Components
- ❌ Route Handlers (`app/api/`)
- ❌ Server-side auth guards
- ❌ AuthGate component
- ❌ Middleware
- ❌ `layout.tsx`
- ❌ `next/image` (use `<img>`)
- ❌ `next/link` (use React Router `Link`)

## What Works Now

✅ Simple client-side routing
✅ Supabase auth with localStorage
✅ No navigation blocking
✅ Predictable behavior
✅ Easy to understand and modify

## Next Steps

1. Copy `vite-package.json` to `package.json`
2. Copy `vite.config.ts` to root
3. Copy `vite-tailwind.config.js` to `tailwind.config.js`
4. Copy `vite-postcss.config.js` to `postcss.config.js`
5. Copy `vite-tsconfig.json` to `tsconfig.json`
6. Copy `vite-tsconfig.node.json` to `tsconfig.node.json`
7. Move `src/` directory to root
8. Move `index.html` to root
9. Update environment variables to use `VITE_` prefix
10. Run `npm install` and `npm run dev`

