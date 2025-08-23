# 🌟 AnsuryX Challenge - Transform Your Life in 40 Days

A progressive web app (PWA) designed to help users build life-changing habits through a structured 40-day challenge focused on spiritual growth, physical health, and mental clarity.

![AnsuryX Challenge](https://img.shields.io/badge/PWA-Ready-brightgreen) ![React](https://img.shields.io/badge/React-18+-blue) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3+-06B6D4) ![Vite](https://img.shields.io/badge/Vite-6+-646CFF)

## ✨ Features

### 🔐 Authentication & User Management
- Secure user registration and login
- JWT-based session management
- Demo mode for instant testing
- Password reset functionality (when using Supabase)

### 📊 Progress Tracking Dashboard
- **Real-time habit tracking** for 5 core daily habits
- **Dynamic progress visualization** with animated progress bars
- **Streak counter** with fire emoji motivation
- **Auto-reset mechanism** - miss a day, start from Day 1
- Beautiful stat cards showing current progress

### 📝 Daily Journal System
- **Daily reflection prompts** to encourage mindful journaling
- **Entry persistence** with date stamps
- **Previous entries view** for progress review
- **PDF export functionality** to download complete journal

### 🏆 Gamification & Achievements
- **6 achievement milestones** (1, 7, 14, 21, 30, 40 days)
- **Visual badge system** with unlock animations
- **Progress tracking** toward next achievement
- **Motivational messaging** to encourage consistency

### 📜 Certificate Generation
- **Beautiful certificate preview** with professional design
- **Personalized certificates** with user name and completion date
- **PDF download** for completed challenges
- **Progress tracking** showing days remaining

### 📱 Progressive Web App Features
- **Installable** on mobile and desktop devices
- **Offline functionality** - works without internet
- **Push notification ready** (infrastructure in place)
- **Responsive design** - perfect on all screen sizes
- **Service worker** for caching and background sync

### 🎨 Modern UI/UX
- **Futuristic dark theme** with purple gradients
- **Smooth animations** powered by Framer Motion
- **Glass morphism effects** for modern aesthetics
- **Accessible design** with proper contrast and focus states
- **Mobile-first responsive** design

## 🏛️ The Five Pillars

1. **🙏 Spiritual Connection** - Daily prayer/meditation
2. **📖 Sacred Knowledge** - Quran/Scripture reading
3. **💪 Physical Strength** - Exercise and movement
4. **💧 Life Essence** - Proper hydration (8+ glasses)
5. **🧠 Mental Clarity** - Daily reflection and journaling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd ansuryx-challenge

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

### Environment Setup (Optional)
Create a `.env` file for Supabase integration:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

*Note: The app works perfectly in demo mode without Supabase setup.*

## 🛠️ Tech Stack

### Frontend
- **React 18+** - Modern React with hooks
- **Vite 6** - Lightning-fast build tool
- **TailwindCSS 3** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library

### Backend & Database
- **Supabase** - Backend-as-a-Service (optional)
- **localStorage** - Demo mode data persistence
- **JWT** - Secure authentication tokens

### PWA & Build Tools
- **Vite PWA Plugin** - Service worker and manifest generation
- **Workbox** - Advanced caching strategies
- **jsPDF** - PDF generation for certificates and journals

### Deployment
- **Netlify** - Recommended hosting platform
- **Vercel** - Alternative deployment option
- **GitHub Pages** - Free hosting option

## 📁 Project Structure

```
ansuryx-challenge/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker
│   ├── offline.html           # Offline fallback page
│   └── icons/                 # PWA icons
├── src/
│   ├── components/            # Reusable UI components
│   ├── contexts/              # React contexts (Auth, Challenge, Theme)
│   ├── pages/                 # Main application pages
│   ├── lib/                   # Utilities and configurations
│   ├── constants/             # App constants and challenge rules
│   └── utils/                 # Helper functions
├── database-schema.sql        # Supabase database schema
├── DEPLOYMENT.md             # Deployment instructions
└── SUPABASE_SETUP.md         # Supabase configuration guide
```

## 🎯 Core Pages

- **`/`** - Landing/Login page
- **`/dashboard`** - Main habit tracking dashboard
- **`/journal`** - Daily journaling interface
- **`/rules`** - Challenge rules and manifesto
- **`/achievements`** - Progress badges and milestones
- **`/certificate`** - Certificate preview and download
- **`/profile`** - User settings and theme toggle

## 🔧 Available Scripts

```bash
# Development
pnpm run dev          # Start development server
pnpm run build        # Build for production
pnpm run preview      # Preview production build
pnpm run lint         # Run ESLint

# Deployment
pnpm run deploy       # Deploy to Netlify (if configured)
```

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for:
- Netlify (recommended)
- Vercel
- GitHub Pages
- Custom hosting

## 🔒 Security Features

- **Input validation** on all forms
- **XSS protection** with proper sanitization
- **Secure authentication** with JWT tokens
- **Environment variable protection**
- **HTTPS enforcement** in production

## 🎨 Customization

### Theme Customization
The app supports dark/light mode toggle. Customize colors in:
- `src/index.css` - CSS custom properties
- `tailwind.config.js` - Tailwind theme configuration

### Challenge Customization
Modify challenge rules and habits in:
- `src/constants/challenge.js` - Challenge configuration
- `src/pages/ChallengeRules.jsx` - Rules page content

## 📱 PWA Installation

### Mobile (iOS/Android)
1. Open the app in Safari (iOS) or Chrome (Android)
2. Tap the "Install" button or "Add to Home Screen"
3. The app will appear on your home screen like a native app

### Desktop (Chrome/Edge)
1. Open the app in Chrome or Edge
2. Click the install icon in the address bar
3. The app will install as a desktop application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Aristotle** for the inspiring quote: "Excellence is not an act, but a habit."
- **Islamic tradition** for the spiritual foundation of the challenge
- **Modern web technologies** that make this PWA possible
- **Open source community** for the amazing tools and libraries

## 📞 Support

For support, questions, or feature requests:
- Open an issue on GitHub
- Contact the development team
- Check the documentation in the `/docs` folder

---

**Transform your life in 40 days. Start your AnsuryX Challenge today!** 🌟

*"Excellence is not an act, but a habit. We are what we repeatedly do."* - Aristotle

