# FreeToolsHub 🛠️

A professional, AdSense-ready free tools website built with **Next.js 14**, **Tailwind CSS**, and deployed on **Vercel**.

## ✨ Features

- **30+ working tools** across 6 categories
- AdSense monetization ready (header, footer, sidebar, in-content ad slots)
- SEO optimized (meta tags, OG tags, sitemap.xml, robots.txt)
- Fully responsive dark-mode UI
- Search bar with live results
- Category filtering
- Static generation (fast & SEO-friendly)
- Contact form (via Formspree)

## 📂 Categories

| Category | Tools |
|----------|-------|
| ✍️ Text & Writing | Word Counter, Case Converter, Lorem Ipsum, Text Diff, and more |
| 📈 SEO & Marketing | Meta Tag Generator, Keyword Density, UTM Builder, Slug Generator |
| 💻 Developer | JSON Formatter, Base64, Regex Tester, UUID Generator, Hash |
| 🔢 Math & Numbers | Percentage Calc, Age Calc, BMI, Random Number |
| 🎨 Image & Color | Color Converter, Gradient Generator, Color Palette |
| 🔄 Converters | PX to REM, Temperature, Byte Size |

## 🚀 Deploy to Vercel (Step by Step)

### 1. Push to GitHub

```bash
# Initialize git repo
git init
git add .
git commit -m "Initial commit - FreeToolsHub"

# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/freetoolshub.git
git branch -M main
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/log in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Leave all settings as default (Next.js is auto-detected)
5. Click **"Deploy"**

Your site will be live in ~60 seconds! 🎉

### 3. Custom Domain (Optional)

In Vercel dashboard → Project → Settings → Domains → Add your domain.

## 💰 AdSense Setup

1. Apply at [google.com/adsense](https://www.google.com/adsense)
2. Once approved, get your publisher ID (`ca-pub-XXXXXXXX`)
3. Replace `ca-pub-XXXXXXXXXXXXXXXXX` in:
   - `components/Layout.js`
   - `components/AdSlot.js`
4. Replace ad slot IDs (`data-ad-slot`) with your real slot IDs
5. Add the AdSense auto ads script or manual slots as configured

## 📬 Contact Form Setup

1. Sign up at [formspree.io](https://formspree.io)
2. Create a form, copy your form ID
3. In `pages/contact.js`, replace `YOUR_FORM_ID` with your actual ID

## 🔧 Adding New Tools

1. Add the tool to `utils/tools.js`
2. Create the component in `pages/tools/[slug].js` under `TOOL_COMPONENTS`
3. That's it! The page, routing, and SEO are handled automatically.

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router compatible)
- **Styling**: Tailwind CSS
- **Fonts**: Syne (display), DM Sans (body), JetBrains Mono (code)
- **Deployment**: Vercel
- **Monetization**: Google AdSense
- **Contact**: Formspree

## 🌐 SEO

- Automatic `sitemap.xml` at `/sitemap.xml`
- `robots.txt` configured
- Unique title + description per page
- Open Graph tags on every page
- Static generation = fast indexing

## 📁 Project Structure

```
freetoolshub/
├── components/
│   ├── Layout.js       ← Header, footer, AdSense banner
│   ├── ToolCard.js     ← Tool grid card
│   └── AdSlot.js       ← Reusable ad unit
├── pages/
│   ├── index.js        ← Homepage
│   ├── all-tools.js    ← All tools with search
│   ├── about.js
│   ├── privacy.js
│   ├── contact.js
│   ├── 404.js
│   ├── sitemap.xml.js
│   ├── category/[id].js   ← Category pages
│   └── tools/[slug].js    ← Tool pages (all logic here)
├── utils/
│   └── tools.js        ← Tool data & categories
├── styles/
│   └── globals.css
├── public/
│   └── robots.txt
├── package.json
├── next.config.js
├── tailwind.config.js
└── vercel.json
```

## License

MIT — Use freely, build your own tools empire! 🚀
