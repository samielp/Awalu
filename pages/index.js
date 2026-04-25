import Layout from '../components/Layout';
import ToolCard from '../components/ToolCard';
import Link from 'next/link';
import { tools, categories, getPopularTools } from '../utils/tools';
import { useState } from 'react';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const popular = getPopularTools();

  const filtered = activeCategory === 'all' ? tools : tools.filter(t => t.category === activeCategory);

  return (
    <Layout>
      {/* HERO */}
      <section className="text-center py-14 md:py-20 relative">
        <div className="absolute inset-0 bg-gradient-radial from-brand-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/30 rounded-full px-4 py-1.5 text-xs text-brand-500 font-semibold mb-6 animate-fade-in">
            ✨ 100% Free · No Signup Required
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-white mb-4 leading-tight animate-slide-up">
            Free Online Tools<br />
            <span className="text-brand-500">For Everyone</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto mb-8 animate-slide-up">
            {tools.length}+ professional tools for text, SEO, development, math, colors, and more. No account needed.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <span className="stat-badge">🛠️ {tools.length}+ Tools</span>
            <span className="stat-badge">📂 {categories.length} Categories</span>
            <span className="stat-badge">⚡ Instant Results</span>
            <span className="stat-badge">🔒 Privacy First</span>
          </div>
        </div>
      </section>

      {/* POPULAR TOOLS */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-bold text-xl text-white">🔥 Popular Tools</h2>
          <Link href="/all-tools" className="text-sm text-brand-500 hover:text-brand-400 transition-colors">View all →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {popular.slice(0, 8).map(tool => (
            <ToolCard key={tool.slug} tool={tool} featured />
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mb-14">
        <h2 className="font-display font-bold text-xl text-white mb-5">📂 Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map(cat => {
            const count = tools.filter(t => t.category === cat.id).length;
            return (
              <Link key={cat.id} href={`/category/${cat.id}`}>
                <div className={`bg-dark-card border border-dark-border hover:border-brand-500/50 rounded-2xl p-4 text-center transition-all duration-300 cursor-pointer group`}>
                  <div className="text-3xl mb-2">{cat.icon}</div>
                  <div className="font-semibold text-sm text-white group-hover:text-brand-500 transition-colors">{cat.label}</div>
                  <div className="text-xs text-slate-600 mt-1">{count} tools</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ALL TOOLS (filtered) */}
      <section>
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <h2 className="font-display font-bold text-xl text-white">All Tools</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`cat-pill ${activeCategory === 'all' ? 'bg-brand-500 text-white border-brand-500' : 'text-slate-400 border-dark-border hover:border-slate-500'}`}
            >All</button>
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`cat-pill ${activeCategory === c.id ? `${c.color} border-current` : 'text-slate-400 border-dark-border hover:border-slate-500'}`}
              >{c.icon} {c.label.split(' ')[0]}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(tool => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* SEO CONTENT SECTION */}
      <section className="mt-16 bg-dark-card border border-dark-border rounded-2xl p-8">
        <h2 className="font-display font-bold text-2xl text-white mb-4">Why Use FreeToolsHub?</h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-400">
          <div>
            <h3 className="font-semibold text-white mb-2">⚡ Instant & Free</h3>
            <p>All tools work right in your browser. No download, no signup, no cost — ever.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">🔒 Privacy First</h3>
            <p>Your data stays in your browser. We don't store or transmit anything you type.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">🛠️ Always Improving</h3>
            <p>We add new tools regularly based on community requests and popular demand.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
