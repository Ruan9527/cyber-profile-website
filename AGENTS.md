# Agent Development Guidelines

This document provides guidelines for AI agents working on this Next.js codebase.

## Project Overview

- **Framework**: Next.js 16.1.1 with App Router
- **Language**: TypeScript 5.9.3  
- **React**: 19.2.3
- **Styling**: Tailwind CSS 3.4.19 with custom cyberpunk theme
- **Database**: Supabase (PostgreSQL)
- **Animations**: Framer Motion 12.26.1
- **Icons**: Lucide React 0.562.0

## Build & Development Commands

```bash
# Development server (port 3000)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code with ESLint
npm run lint

# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local
```

## Code Style Guidelines

### File Structure
- Next.js App Router structure (`src/app/`)
- Pages: `src/app/[page]/page.tsx`
- Layouts: `src/app/[page]/layout.tsx`
- Components: `src/app/components/` or `src/app/[page]/components/`
- Hooks: `src/app/hooks/` or `src/app/[page]/hooks/`
- API routes: `src/app/api/[route]/route.ts`

### Imports Order
```typescript
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import WeatherBadge from './WeatherBadge'
```

### TypeScript
- Strict mode enabled (`"strict": true`)
- Explicit types for props, state, function returns
- Avoid `any` - use `unknown` or proper interfaces
- Interface for object types, type for unions/aliases

Example:
```typescript
interface NavbarProps {
  title: string
  showWeather?: boolean
}
export default function Navbar({ title, showWeather = true }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  // ...
}
```

### Naming Conventions
- **Components**: PascalCase (`Navbar.tsx`, `HeroSection.tsx`)
- **Files**: kebab-case for non-components (`use-auth.ts`)
- **Variables**: camelCase (`mobileMenuOpen`, `activeSection`)
- **Constants**: UPPER_SNAKE_CASE for true constants
- **Types/Interfaces**: PascalCase (`UserProfile`, `ApiResponse`)
- **Custom Hooks**: `use` prefix (`useAuth`, `useLanguage`)

### Component Patterns
```typescript
"use client"
import { useState } from 'react'

export default function ComponentName() {
  const [state, setState] = useState<Type>(initialValue)
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // handler logic
  }
  return (
    // JSX with Tailwind classes
  )
}
```

### Styling with Tailwind
- Custom cyberpunk palette: `text-cyber-cyan`, `bg-cyber-black`
- Custom animations: `animate-pulse-glow`
- Custom cursors: `cursor-tactical`
- Custom shadows: `shadow-cyber`, `shadow-cyber-red`

Example:
```tsx
<div className="cyber-card bg-cyber-black border border-cyber-cyan/30 shadow-cyber">
  <h2 className="font-display text-cyber-yellow animate-pulse-glow">
    Cyberpunk Title
  </h2>
</div>
```

### Error Handling
```typescript
try {
  const response = await fetch('/api/endpoint')
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return await response.json()
} catch (error) {
  console.error('Failed to fetch:', error)
  throw error
}
```

## Testing Guidelines

### Current Setup
- **Playwright**: Installed but no config found
- **No unit test framework** configured
- **Manual testing** scripts in Python (`test-*.py`)

### Test File Structure (When Configured)
- Unit tests: `*.test.ts` or `*.spec.ts` alongside source
- E2E tests: `tests/` directory with `*.spec.ts`
- Test data: `__tests__/fixtures/` or `test-data/`

## Linting & Formatting

- ESLint extends `next/core-web-vitals`
- Run with `npm run lint`
- Auto-fix: `npx eslint --fix src/`

## Database & API

### Supabase Integration
- Client: `@supabase/supabase-js`
- Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Row Level Security (RLS) enabled

### API Routes
```typescript
export async function GET(request: Request) {
  // Handle GET request
}
export async function POST(request: Request) {
  // Handle POST request
}
```

## Development Workflow

### Git
- Branch naming: `feature/description`, `fix/description`, `docs/description`
- Commit messages: Conventional commits recommended

### Code Review Checklist
- [ ] TypeScript types correct and strict
- [ ] No `any` types used
- [ ] ESLint passes (`npm run lint`)
- [ ] Tailwind classes follow project conventions
- [ ] Component follows project patterns
- [ ] Error handling implemented
- [ ] No console.log in production code

## Agent-Specific Notes

### Creating New Components
1. Determine if "use client" directive needed
2. Use TypeScript interfaces for props
3. Follow existing Tailwind class patterns
4. Add error boundaries
5. Consider responsive design

### Modifying Existing Code
1. Maintain existing code style and patterns
2. Update TypeScript types when changing interfaces
3. Run `npm run lint` before committing
4. Check for breaking changes

### Performance
- Use `useMemo` and `useCallback` for expensive computations
- Implement loading states for data fetching
- Optimize images with Next.js Image component
- Consider code splitting for large components

---

*Last Updated: Based on codebase analysis*
*Target: AI agents operating in this repository*