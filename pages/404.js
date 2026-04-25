import Layout from '../components/Layout';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Layout title="404 - Page Not Found" noAds>
      <div className="text-center py-24">
        <div className="text-8xl font-display font-extrabold text-brand-500 mb-4">404</div>
        <h1 className="font-display font-bold text-2xl text-white mb-3">Page Not Found</h1>
        <p className="text-slate-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex justify-center gap-3">
          <Link href="/" className="btn-primary">← Back to Home</Link>
          <Link href="/all-tools" className="btn-secondary">Browse All Tools</Link>
        </div>
      </div>
    </Layout>
  );
}
