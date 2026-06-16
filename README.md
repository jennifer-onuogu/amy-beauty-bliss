# Amy Beauty Bliss — Deploy to Vercel

## What's inside
- `src/App.jsx` — full storefront + admin dashboard
- `index.html` — entry point
- `vite.config.js` — build config
- `vercel.json` — Vercel routing

## How to deploy (step by step)

### Step 1 — Install Node.js (if you haven't)
Download from https://nodejs.org (choose LTS version)

### Step 2 — Create a GitHub account (if you don't have one)
Go to https://github.com and sign up free

### Step 3 — Upload this project to GitHub
1. Go to https://github.com/new
2. Name it `amy-beauty-bliss`, set to Public, click Create
3. On your computer, open Terminal (Mac) or Command Prompt (Windows)
4. Run these commands one by one:
   ```
   cd path/to/amy-beauty-bliss
   git init
   git add .
   git commit -m "Amy Beauty Bliss launch"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/amy-beauty-bliss.git
   git push -u origin main
   ```

### Step 4 — Deploy on Vercel
1. Go to https://vercel.com and sign up with your GitHub account
2. Click "Add New Project"
3. Find and import `amy-beauty-bliss`
4. Leave all settings as default — Vercel auto-detects Vite
5. Click "Deploy"

### Step 5 — Your URLs
- **Customer store:** `https://amy-beauty-bliss.vercel.app`
- **Your admin panel:** `https://amy-beauty-bliss.vercel.app/#admin`

Vercel also lets you connect a custom domain (e.g. amybeautybliss.com) for free in Settings → Domains.

## Local development
```
npm install
npm run dev
```
