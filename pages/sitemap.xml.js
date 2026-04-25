import { tools, categories } from '../utils/tools';

const SITE = 'https://freetoolshub.com';

function generateSitemap() {
  const staticPages = ['', '/all-tools', '/about', '/privacy', '/contact'];
  const toolPages = tools.map(t => `/tools/${t.slug}`);
  const catPages = categories.map(c => `/category/${c.id}`);

  const allPages = [...staticPages, ...toolPages, ...catPages];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${SITE}${page}</loc>
    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : page.startsWith('/tools/') ? '0.8' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>`;
}

export default function Sitemap() {}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/xml');
  res.write(generateSitemap());
  res.end();
  return { props: {} };
}
