import Layout from '../components/Layout';
import ToolCard from '../components/ToolCard';
import { tools, categories } from '../utils/tools';
import { useState } from 'react';

export default function AllTools() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = tools.filter(t => {
    const matchesCat = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <Layout title="All Tools" description="Browse all 30+ free online tools on FreeToolsHub. Text, SEO, developer, math, color, and converter tools.">
      <div className="mb-8">
        <h1 className="font-display font-extrabold text-3xl text-white mb-2">All Tools</h1>
        <p className="text-slate-400">Browse all {tools.length}+ free tools. Filter by category or search.</p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search tools..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-dark-card border border-dark-border rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
        />
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setActiveCategory('all')} className={`cat-pill ${activeCategory === 'all' ? 'bg-brand-500 text-white border-brand-500' : 'text-slate-400 border-dark-border'}`}>All</button>
          {categories.map(c => (
            <button key={c.id} onClick={() => setActiveCategory(c.id)} className={`cat-pill ${activeCategory === c.id ? `${c.color} border-current` : 'text-slate-400 border-dark-border'}`}>
              {c.icon} {c.label.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-600 mb-4">{filtered.length} tools found</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(tool => <ToolCard key={tool.slug} tool={tool} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <div className="text-4xl mb-3">🔍</div>
          <p>No tools found. Try a different search or category.</p>
        </div>
      )}
    </Layout>
  );
}
