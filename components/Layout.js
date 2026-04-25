import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { tools, categories } from '../utils/tools';

// Replace with your real AdSense publisher ID
const ADSENSE_ID = 'ca-pub-XXXXXXXXXXXXXXXXX';

export default function Layout({ children, title, description, noAds }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState('');

  const searchResults = search.length > 1
    ? tools.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase())).slice(0, 6)
    : [];

  return (
    <>
      <Head>
        <title>{title ? `${title} — FreeToolsHub` : 'FreeToolsHub — 30+ Free Online Tools'}</title>
        <meta name="description" content={description || 'FreeToolsHub offers 30+ free online tools for text, SEO, developers, math, colors, and converters. No signup required.'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title || 'FreeToolsHub'} />
        <meta property="og:description" content={description || 'Free online tools for everyone.'} />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#0a0f1e" />
        <link rel="icon" href="/favicon.ico" />
        {/* Google AdSense */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          crossOrigin="anonymous"
        />
      </Head>

      <div className="min-h-screen flex flex-col">
        {/* HEADER */}
        <header className="sticky top-0 z-50 border-b border-dark-border bg-dark/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white font-display font-bold text-sm">F</div>
              <span className="font-display font-bold text-lg text-white hidden sm:block">FreeToolsHub</span>
            </Link>

            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search tools..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                onBlur={() => setTimeout(() => setSearch(''), 200)}
                className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-dark-card border border-dark-border rounded-xl overflow-hidden shadow-xl z-50">
                  {searchResults.map(t => (
                    <Link key={t.slug} href={`/tools/${t.slug}`} className="flex items-center gap-3 px-4 py-2.5 hover:bg-dark-border transition-colors">
                      <span className="text-lg">{t.icon}</span>
                      <div>
                        <div className="text-sm font-medium text-slate-200">{t.name}</div>
                        <div className="text-xs text-slate-500">{t.desc.slice(0, 50)}...</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Nav */}
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/" className="text-sm text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-dark-card transition-colors">Home</Link>
              {categories.slice(0, 3).map(c => (
                <Link key={c.id} href={`/category/${c.id}`} className="text-sm text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-dark-card transition-colors">
                  {c.label.split(' ')[0]}
                </Link>
              ))}
              <Link href="/all-tools" className="text-sm text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-dark-card transition-colors">All Tools</Link>
            </nav>

            {/* Mobile menu btn */}
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-slate-400 hover:text-white p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenu ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenu && (
            <div className="md:hidden border-t border-dark-border bg-dark-card px-4 py-3 space-y-1">
              <Link href="/" onClick={() => setMobileMenu(false)} className="block text-sm text-slate-300 py-2">Home</Link>
              {categories.map(c => (
                <Link key={c.id} href={`/category/${c.id}`} onClick={() => setMobileMenu(false)} className="block text-sm text-slate-300 py-2">
                  {c.icon} {c.label}
                </Link>
              ))}
              <Link href="/all-tools" onClick={() => setMobileMenu(false)} className="block text-sm text-slate-300 py-2">All Tools</Link>
            </div>
          )}
        </header>

        {/* Top Ad Banner */}
        {!noAds && (
          <div className="max-w-7xl mx-auto w-full px-4 pt-4">
            <div className="ad-slot h-24">
              {/* AdSense — replace with real ad unit */}
              <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={ADSENSE_ID}
                data-ad-slot="1234567890"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
            </div>
          </div>
        )}

        {/* MAIN */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
          {children}
        </main>

        {/* Bottom Ad */}
        {!noAds && (
          <div className="max-w-7xl mx-auto w-full px-4 pb-4">
            <div className="ad-slot h-24">
              <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={ADSENSE_ID}
                data-ad-slot="0987654321"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="border-t border-dark-border bg-dark-card mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-2 md:col-span-1">
                <Link href="/" className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">F</div>
                  <span className="font-display font-bold text-white">FreeToolsHub</span>
                </Link>
                <p className="text-sm text-slate-500">Free online tools for everyone. No signup, no cost.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Categories</h4>
                <ul className="space-y-2">
                  {categories.map(c => (
                    <li key={c.id}><Link href={`/category/${c.id}`} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">{c.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Popular Tools</h4>
                <ul className="space-y-2">
                  {tools.filter(t => t.popular).slice(0, 5).map(t => (
                    <li key={t.slug}><Link href={`/tools/${t.slug}`} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">{t.name}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Pages</h4>
                <ul className="space-y-2">
                  <li><Link href="/all-tools" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">All Tools</Link></li>
                  <li><Link href="/about" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">About</Link></li>
                  <li><Link href="/privacy" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/contact" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Contact</Link></li>
                  <li><Link href="/sitemap.xml" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Sitemap</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-dark-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="text-xs text-slate-600">© {new Date().getFullYear()} FreeToolsHub. All rights reserved.</p>
              <p className="text-xs text-slate-600">Built with ❤️ for the web</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
