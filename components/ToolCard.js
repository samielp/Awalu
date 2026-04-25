import Link from 'next/link';
import { getCategoryById } from '../utils/tools';

export default function ToolCard({ tool, featured }) {
  const cat = getCategoryById(tool.category);

  return (
    <Link href={`/tools/${tool.slug}`}>
      <div className={`tool-card group animate-fade-in ${featured ? 'border-brand-500/30 bg-gradient-to-br from-brand-500/5 to-transparent' : ''}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="text-2xl">{tool.icon}</div>
          {tool.popular && (
            <span className="text-xs bg-accent/20 text-orange-400 border border-accent/30 px-2 py-0.5 rounded-full font-semibold">Popular</span>
          )}
        </div>
        <h3 className="font-display font-semibold text-white group-hover:text-brand-500 transition-colors mb-1">{tool.name}</h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-3">{tool.desc}</p>
        {cat && (
          <span className={`cat-pill ${cat.color} text-xs`}>{cat.icon} {cat.label}</span>
        )}
      </div>
    </Link>
  );
}
