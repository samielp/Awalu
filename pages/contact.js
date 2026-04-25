import Layout from '../components/Layout';
import { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);

  // Using Formspree - replace with your form ID
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    });
    setSent(true);
  };

  return (
    <Layout title="Contact" description="Contact FreeToolsHub.">
      <div className="max-w-xl mx-auto">
        <h1 className="font-display font-extrabold text-4xl text-white mb-2">Contact Us</h1>
        <p className="text-slate-400 mb-8">Tool suggestion? Bug report? Partnership inquiry? Send us a message.</p>

        {sent ? (
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-3">✅</div>
            <h2 className="font-display font-bold text-xl text-white mb-2">Message Sent!</h2>
            <p className="text-slate-400">Thanks for reaching out. We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-slate-400 block mb-1">Name</label>
              <input name="name" required type="text" placeholder="Your name"
                className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-brand-500 transition-colors" />
            </div>
            <div>
              <label className="text-sm text-slate-400 block mb-1">Email</label>
              <input name="email" required type="email" placeholder="your@email.com"
                className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-brand-500 transition-colors" />
            </div>
            <div>
              <label className="text-sm text-slate-400 block mb-1">Subject</label>
              <select name="subject" className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-brand-500">
                <option>Tool Suggestion</option>
                <option>Bug Report</option>
                <option>Partnership / Advertising</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-400 block mb-1">Message</label>
              <textarea name="message" required rows={5} placeholder="Your message..."
                className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 text-slate-200 resize-none focus:outline-none focus:border-brand-500 transition-colors" />
            </div>
            <button type="submit" className="btn-primary w-full py-3">Send Message</button>
          </form>
        )}
      </div>
    </Layout>
  );
}
