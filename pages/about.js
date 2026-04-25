import Layout from '../components/Layout';
import { tools, categories } from '../utils/tools';

export default function About() {
  return (
    <Layout title="About" description="Learn about FreeToolsHub — free online tools for everyone.">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display font-extrabold text-4xl text-white mb-4">About FreeToolsHub</h1>
        <p className="text-slate-400 text-lg mb-10">We build free, fast, and privacy-respecting tools for developers, writers, marketers, and everyone in between.</p>

        <div className="space-y-8">
          <section className="bg-dark-card border border-dark-border rounded-2xl p-6">
            <h2 className="font-display font-bold text-xl text-white mb-3">🎯 Our Mission</h2>
            <p className="text-slate-400">FreeToolsHub was built to provide simple, reliable, and free tools that work in your browser — no accounts, no subscriptions, no ads that track you (beyond standard AdSense). We believe the web should be open and useful.</p>
          </section>

          <section className="bg-dark-card border border-dark-border rounded-2xl p-6">
            <h2 className="font-display font-bold text-xl text-white mb-3">🛠️ What We Offer</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map(c => (
                <div key={c.id} className="flex items-center gap-2 text-sm text-slate-400">
                  <span>{c.icon}</span>
                  <span>{c.label}</span>
                </div>
              ))}
            </div>
            <p className="text-slate-400 text-sm mt-4">Currently offering <strong className="text-white">{tools.length}+ tools</strong> across {categories.length} categories, with more added regularly.</p>
          </section>

          <section className="bg-dark-card border border-dark-border rounded-2xl p-6">
            <h2 className="font-display font-bold text-xl text-white mb-3">🔒 Privacy</h2>
            <p className="text-slate-400">All processing happens in your browser. We do not send, store, or log any data you input into our tools. We use Google AdSense to help fund the site, which may use cookies — see our <a href="/privacy" className="text-brand-500 hover:underline">Privacy Policy</a>.</p>
          </section>

          <section className="bg-dark-card border border-dark-border rounded-2xl p-6">
            <h2 className="font-display font-bold text-xl text-white mb-3">📬 Contact</h2>
            <p className="text-slate-400">Have a suggestion for a tool, found a bug, or want to get in touch? Visit our <a href="/contact" className="text-brand-500 hover:underline">Contact page</a>.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
