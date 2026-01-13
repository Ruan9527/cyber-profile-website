# 🚀 Cyber Profile - Dynamic Personal Website

A cyberpunk-themed personal website with interactive features, built with Next.js and Supabase.

## 🎯 Features

### Core Features
- **Hero Section**: Animated introduction with social links
- **Skills Showcase**: Interactive skill bars with animations
- **Project Portfolio**: Project cards with hover effects and tech stacks
- **Message Board**: Real-time guest book functionality
- **Analytics Dashboard**: Live visitor statistics and activity feeds
- **Contact Section**: Multiple contact methods with QR code support

### Design Features
- **Cyberpunk Aesthetic**: Neon colors, glitch effects, and scanline overlays
- **Custom Cursors**: Different cursors for different interactions
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Micro-interactions**: Hover states, transitions, and animations

### Technical Features
- **Next.js 14**: App Router with TypeScript
- **Supabase**: Backend database for real-time data
- **Tailwind CSS**: Utility-first styling with custom cyberpunk theme
- **Framer Motion**: Advanced animations and transitions

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Add your Supabase credentials to `.env.local`

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Customization

### Personal Information
Edit the default values in the following components:
- `src/app/components/Hero.tsx` - Name, title, bio, social links
- `src/app/components/SkillsSection.tsx` - Skills and levels
- `src/app/components/ProjectsSection.tsx` - Project information
- `src/app/components/ContactSection.tsx` - Contact details

### Colors and Theme
Modify the cyberpunk theme in:
- `src/app/globals.css` - CSS variables and animations
- `tailwind.config.js` - Tailwind color extensions

### Database Tables
Create these tables in your Supabase project:
- `messages` - Guest book entries
- `visitors` - Visitor analytics
- `downloads` - Resume download tracking
- `ai_chats` - AI conversation logs (future feature)
- `image_uploads` - Image upload tracking (future feature)

## 📱 Mobile Optimization

The website is fully responsive with:
- Touch-optimized interactions
- Mobile-friendly navigation
- Optimized font sizes and spacing
- Reduced animations for performance

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Digital Ocean

## 📊 Analytics

### Google Analytics
1. Create a GA4 property
2. Add your measurement ID to `.env.local`
3. Configure custom events:
   - `download_resume`
   - `submit_message`
   - `view_project`
   - `scan_qr_code`

## 🔄 Future Features

- **AI Chat Integration**: Real-time chat with AI assistant
- **Image Upload**: User-generated content uploads
- **Blog System**: Dynamic blog posts with categories
- **Newsletter**: Email subscription system
- **Multi-language**: Internationalization support

## 🎯 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   ├── globals.css         # Global styles and theme
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── lib/
│   └── supabase.ts         # Database configuration
└── types/
    └── index.ts            # TypeScript type definitions
```

## 🎨 Design System

### Colors
- `--cyber-black`: #050505
- `--cyber-gray`: #2d2d2d
- `--cyber-cyan`: #00f0ff
- `--cyber-yellow`: #fcee0a
- `--cyber-red`: #ff003c

### Typography
- Primary: Microsoft YaHei, Heiti SC
- Display: Orbitron
- Monospace: Share Tech Mono

### Animations
- Glitch effects on text and images
- Hover states with color transitions
- Loading animations
- Scanline overlay effect

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Built with ❤️ and cyberpunk vibes 🤖