# AnsuryX Challenge PWA - Deployment Guide

## 🚀 Netlify Deployment Instructions

### Option 1: Drag & Drop Deployment (Easiest)

1. **Build the Project** (Already completed)
   ```bash
   pnpm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com) and sign up/login
   - Click "Add new site" → "Deploy manually"
   - Drag and drop the entire `dist` folder to the deployment area
   - Your PWA will be live instantly with a random URL
   - You can change the site name in Site Settings

### Option 2: Git-based Deployment (Recommended for updates)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AnsuryX Challenge PWA"
   git branch -M main
   git remote add origin https://github.com/yourusername/ansuryx-challenge.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account
   - Select your repository
   - Build settings:
     - Build command: `pnpm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

### Option 3: Netlify CLI (For developers)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

## 🔧 Environment Variables (Optional)

If you want to use real Supabase instead of demo mode:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `database-schema.sql`
3. Add environment variables in Netlify:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

## 📱 PWA Features

Once deployed, users can:
- **Install on Mobile**: Add to home screen on iOS/Android
- **Install on Desktop**: Install as desktop app on Chrome/Edge
- **Work Offline**: Full functionality without internet
- **Push Notifications**: Ready for future implementation

## 🎯 Custom Domain (Optional)

1. In Netlify dashboard, go to Site Settings → Domain management
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL certificate will be automatically provisioned

## ✅ Post-Deployment Checklist

- [ ] Test PWA installation on mobile device
- [ ] Verify offline functionality
- [ ] Test all features (habits, journal, achievements, certificates)
- [ ] Check responsive design on different screen sizes
- [ ] Verify PDF exports work correctly

## 🔄 Future Updates

To update the deployed app:
- Make changes to your code
- Run `pnpm run build`
- If using Git deployment: push changes to GitHub (auto-deploys)
- If using manual deployment: drag new `dist` folder to Netlify

Your AnsuryX Challenge PWA is now ready for the world! 🌟

