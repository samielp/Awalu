import Layout from '../components/Layout';

export default function Privacy() {
  return (
    <Layout title="Privacy Policy" description="FreeToolsHub privacy policy.">
      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1 className="font-display font-extrabold text-4xl text-white mb-2">Privacy Policy</h1>
        <p className="text-slate-500 text-sm mb-8">Last updated: January 2025</p>

        <div className="space-y-6 text-slate-400 leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-xl text-white mb-2">1. Overview</h2>
            <p>FreeToolsHub ("we", "us", "our") is committed to protecting your privacy. This policy explains what information we collect and how it is used.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-white mb-2">2. Data We Do Not Collect</h2>
            <p>All tool processing happens entirely in your browser. We do <strong className="text-white">not</strong> collect, store, transmit, or share any input data you enter into our tools. Your text, URLs, code, and other tool inputs never leave your device.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-white mb-2">3. Google AdSense</h2>
            <p>We use Google AdSense to display advertisements, which helps fund the website. Google may use cookies and similar technologies to show relevant ads based on your browsing. You can opt out via <a href="https://adssettings.google.com" className="text-brand-500 hover:underline" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-white mb-2">4. Analytics</h2>
            <p>We may use privacy-respecting analytics (such as aggregated page view counts) to understand which tools are popular. No personally identifiable information is collected.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-white mb-2">5. Cookies</h2>
            <p>Our site itself does not set any cookies. Third-party services like Google AdSense may set their own cookies. Refer to Google's Privacy Policy for details.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-white mb-2">6. Changes</h2>
            <p>We may update this policy occasionally. Continued use of the site after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-white mb-2">7. Contact</h2>
            <p>Questions? <a href="/contact" className="text-brand-500 hover:underline">Contact us</a>.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
