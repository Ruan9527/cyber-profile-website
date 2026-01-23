# Supabase Database Setup

This project uses Supabase as the backend database for dynamic skill and project data.

## Prerequisites

1. **Supabase Account**: Create an account at [supabase.com](https://supabase.com)
2. **Supabase Project**: Create a new project in your Supabase dashboard
3. **Project URL and Anon Key**: After creating the project, go to Project Settings → API to find:
   - `Project URL` (e.g., `https://xxxxxxxx.supabase.co`)
   - `Anonymous API Key` (public key)

## Setup Steps

### 1. Configure Environment Variables

Copy the example environment file and update with your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 2. Run Database Migrations

You have two options to apply the database schema:

#### Option A: Using Supabase SQL Editor (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Create a new query
4. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
5. Paste and run the query
6. Verify tables are created in the **Table Editor**

#### Option B: Using Supabase CLI (Advanced)
1. Install Supabase CLI: [Installation Guide](https://supabase.com/docs/guides/cli)
2. Login to Supabase:
   ```bash
   supabase login
   ```
3. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```
4. Push migrations:
   ```bash
   supabase db push
   ```

### 3. Verify Data Import

After running the migration, check that data is populated:

1. Go to **Table Editor** in your Supabase dashboard
2. Select the `skills` table - should have 16 records
3. Select the `projects` table - should have 8 records

### 4. Test Connection Locally

Start the development server to test the connection:

```bash
npm run dev
```

Visit `http://localhost:3000` and check that skills and projects are loaded from the database.

## Database Schema

### Skills Table
- `id` (UUID, primary key)
- `name` (text) - Skill name
- `level` (integer, 0-100) - Proficiency level
- `category` (enum: 'it_ops', 'ai') - Skill category
- `description` (text, optional) - Chinese description
- `created_at`, `updated_at` (timestamps)

### Projects Table
- `id` (UUID, primary key)
- `title` (text) - Project title
- `description` (text) - Project description
- `image` (text) - Image path/URL
- `tech` (JSONB) - Array of technologies
- `link` (text) - GitHub/project link
- `category` (enum: 'it_ops', 'ai', 'data', 'backend', 'fullstack')
- `created_at`, `updated_at` (timestamps)

## Security

- Row Level Security (RLS) is enabled on both tables
- Public read access is allowed (no authentication required)
- No write access from the frontend (read-only)

## Troubleshooting

### "supabase is null" error
Check that your environment variables are correctly set and the Supabase client is initialized in `src/lib/supabase.ts`.

### No data displayed
Verify that:
1. Migration script ran successfully
2. Tables contain data in Supabase dashboard
3. Network requests to Supabase are successful (check browser console)

### CORS issues
Ensure your Supabase project CORS settings include `http://localhost:3000` (for development) and your production domain.

## Updating Data

To update skills or projects, you can:

1. **Direct database edits**: Use Supabase Table Editor
2. **Add new migration**: Create `002_new_feature.sql` in migrations folder
3. **Programmatic updates**: Use the Supabase dashboard API or admin client (not implemented in frontend)