# Cyber Portfolio Website

A futuristic cyberpunk-themed personal portfolio website built with Next.js 16, featuring dynamic content management via Supabase.

## Features

- **Cyberpunk Design** - Custom cyberpunk aesthetic with neon colors, glow effects, and futuristic UI
- **Dynamic Content** - Skills and projects managed through Supabase database
- **Admin Dashboard** - Protected admin area for managing content
- **Chat Bot** - AI-powered chat functionality
- **Weather Widget** - Real-time weather display
- **Responsive Design** - Fully responsive across all devices
- **i18n Ready** - Language context support

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript 5.9.3
- **React**: 19.2.3
- **Styling**: Tailwind CSS 3.4.19
- **Database**: Supabase (PostgreSQL)
- **Animations**: Framer Motion 12.26.1
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Configure your `.env.local` with Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── components/        # Shared components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Shared non-page components
├── lib/                   # Services (Supabase, API)
└── types/                 # TypeScript definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT
