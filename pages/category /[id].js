import Layout from '../../components/Layout';
import ToolCard from '../../components/ToolCard';
import { categories, getToolsByCategory, getCategoryById } from '../../utils/tools';
import Link from 'next/link';

export default function CategoryPage({ category, catTools }) {
  if (!category) return null;
  return (
    <Layout
      title={`${category.label} Tools`}
      description={`Free online ${category.label.toLowerCase()} tools. ${catTools.length} tools available, no signup required.`}
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-300">Home</Link>
        <span>›</span>
        <span className="text-slate-300">{category.label}</span>
      </nav>

      <div className="mb-8">
        <div className="text-4xl mb-3">{category.icon}</div>
        <h1 className="font-display font-extrabold text-3xl text-white mb-2">{category.label} Tools</h1>
        <p className="text-slate-400">{catTools.length} free {category.label.toLowerCase()} tools. No signup needed.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {catTools.map(tool => <ToolCard key={tool.slug} tool={tool} />)}
      </div>

      {/* Other categories */}
      <div className="mt-12">
        <h2 className="font-display font-semibold text-white mb-4">Other Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.filter(c => c.id !== category.id).map(c => (
            <Link key={c.id} href={`/category/${c.id}`}>
              <span className={`cat-pill ${c.color}`}>{c.icon} {c.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: categories.map(c => ({ params: { id: c.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const category = getCategoryById(params.id);
  const catTools = getToolsByCategory(params.id);
  return { props: { category: category || null, catTools } };
}
