import Layout from '../../components/Layout';
import ToolCard from '../../components/ToolCard';
import AdSlot from '../../components/AdSlot';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { tools, getToolBySlug, getCategoryById, getToolsByCategory } from '../../utils/tools';

// ============================================================
// INDIVIDUAL TOOL COMPONENTS
// ============================================================

function WordCounter() {
  const [text, setText] = useState('');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(Boolean).length : 0;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return (
    <div>
      <textarea className="tool-textarea" placeholder="Paste or type your text here..." value={text} onChange={e => setText(e.target.value)} rows={8} />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
        {[['Words', words], ['Characters', chars], ['Chars (no spaces)', charsNoSpaces], ['Sentences', sentences], ['Paragraphs', paragraphs], ['Reading Time', `~${readingTime} min`]].map(([label, val]) => (
          <div key={label} className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
            <div className="text-2xl font-display font-bold text-brand-500">{val}</div>
            <div className="text-xs text-slate-500 mt-1">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CaseConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = (type) => {
    switch (type) {
      case 'upper': setOutput(input.toUpperCase()); break;
      case 'lower': setOutput(input.toLowerCase()); break;
      case 'title': setOutput(input.replace(/\b\w/g, c => c.toUpperCase())); break;
      case 'sentence': setOutput(input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()); break;
      case 'camel': setOutput(input.replace(/(?:^\w|[A-Z]|\b\w)/g, (w, i) => i === 0 ? w.toLowerCase() : w.toUpperCase()).replace(/\s+/g, '')); break;
      case 'snake': setOutput(input.toLowerCase().replace(/\s+/g, '_')); break;
      case 'kebab': setOutput(input.toLowerCase().replace(/\s+/g, '-')); break;
    }
  };

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" placeholder="Enter text to convert..." value={input} onChange={e => setInput(e.target.value)} rows={5} />
      <div className="flex flex-wrap gap-2">
        {[['upper', 'UPPERCASE'], ['lower', 'lowercase'], ['title', 'Title Case'], ['sentence', 'Sentence case'], ['camel', 'camelCase'], ['snake', 'snake_case'], ['kebab', 'kebab-case']].map(([type, label]) => (
          <button key={type} onClick={() => convert(type)} className="btn-secondary">{label}</button>
        ))}
      </div>
      {output && (
        <div>
          <label className="text-xs text-slate-500 mb-1 block">Result</label>
          <textarea className="tool-textarea" value={output} readOnly rows={5} />
          <button onClick={() => navigator.clipboard.writeText(output)} className="btn-primary mt-2">Copy Result</button>
        </div>
      )}
    </div>
  );
}

function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState(3);
  const [output, setOutput] = useState('');
  const sentences = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
    'Pellentesque habitant morbi tristique senectus et netus et malesuada fames.',
    'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.',
    'Nullam varius, turpis molestie dictum semper, turpis nunc aliquet dolor.',
  ];

  const generate = () => {
    const result = Array.from({ length: paragraphs }, (_, i) => {
      const shuffled = [...sentences].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 4 + Math.floor(Math.random() * 3)).join(' ');
    }).join('\n\n');
    setOutput(result);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-sm text-slate-400">Paragraphs:</label>
        <input type="number" min={1} max={20} value={paragraphs} onChange={e => setParagraphs(+e.target.value)} className="bg-dark-card border border-dark-border rounded-lg px-3 py-2 text-sm text-slate-200 w-20 focus:outline-none focus:border-brand-500" />
        <button onClick={generate} className="btn-primary">Generate</button>
      </div>
      {output && (
        <>
          <textarea className="tool-textarea" value={output} readOnly rows={10} />
          <button onClick={() => navigator.clipboard.writeText(output)} className="btn-secondary">Copy Text</button>
        </>
      )}
    </div>
  );
}

function TextReverser() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('chars');

  const reversed = mode === 'chars' ? input.split('').reverse().join('') : input.split(' ').reverse().join(' ');

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setMode('chars')} className={mode === 'chars' ? 'btn-primary' : 'btn-secondary'}>Reverse Characters</button>
        <button onClick={() => setMode('words')} className={mode === 'words' ? 'btn-primary' : 'btn-secondary'}>Reverse Words</button>
      </div>
      <textarea className="tool-textarea" placeholder="Enter text to reverse..." value={input} onChange={e => setInput(e.target.value)} rows={5} />
      {input && (
        <>
          <label className="text-xs text-slate-500 block">Result</label>
          <textarea className="tool-textarea" value={reversed} readOnly rows={5} />
          <button onClick={() => navigator.clipboard.writeText(reversed)} className="btn-primary">Copy</button>
        </>
      )}
    </div>
  );
}

function DuplicateRemover() {
  const [input, setInput] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);

  const lines = input.split('\n');
  const seen = new Set();
  const unique = lines.filter(line => {
    const key = caseSensitive ? line : line.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const removed = lines.length - unique.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
          <input type="checkbox" checked={caseSensitive} onChange={e => setCaseSensitive(e.target.checked)} className="accent-brand-500" />
          Case sensitive
        </label>
      </div>
      <textarea className="tool-textarea" placeholder="Enter lines (one per line)..." value={input} onChange={e => setInput(e.target.value)} rows={8} />
      {input && (
        <>
          <div className="text-xs text-slate-500">Found <span className="text-accent">{removed}</span> duplicates removed. <span className="text-brand-500">{unique.length}</span> unique lines remain.</div>
          <textarea className="tool-textarea" value={unique.join('\n')} readOnly rows={8} />
          <button onClick={() => navigator.clipboard.writeText(unique.join('\n'))} className="btn-primary">Copy Result</button>
        </>
      )}
    </div>
  );
}

function TextDiff() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diff, setDiff] = useState(null);

  const compare = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const result = [];
    const maxLen = Math.max(lines1.length, lines2.length);
    for (let i = 0; i < maxLen; i++) {
      const l1 = lines1[i] ?? null;
      const l2 = lines2[i] ?? null;
      if (l1 === l2) result.push({ type: 'same', text: l1 });
      else {
        if (l1 !== null) result.push({ type: 'removed', text: l1 });
        if (l2 !== null) result.push({ type: 'added', text: l2 });
      }
    }
    setDiff(result);
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-slate-500 block mb-1">Original Text</label>
          <textarea className="tool-textarea" placeholder="Paste original text..." value={text1} onChange={e => setText1(e.target.value)} rows={8} />
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1">Modified Text</label>
          <textarea className="tool-textarea" placeholder="Paste modified text..." value={text2} onChange={e => setText2(e.target.value)} rows={8} />
        </div>
      </div>
      <button onClick={compare} className="btn-primary">Compare Texts</button>
      {diff && (
        <div className="bg-dark-card border border-dark-border rounded-xl p-4 font-mono text-xs space-y-0.5 max-h-80 overflow-y-auto">
          {diff.map((line, i) => (
            <div key={i} className={`px-2 py-0.5 rounded ${line.type === 'added' ? 'bg-green-500/10 text-green-400' : line.type === 'removed' ? 'bg-red-500/10 text-red-400' : 'text-slate-500'}`}>
              {line.type === 'added' ? '+ ' : line.type === 'removed' ? '- ' : '  '}{line.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MetaTagGenerator() {
  const [form, setForm] = useState({ title: '', desc: '', keywords: '', author: '', url: '', image: '' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const tags = `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${form.title}</title>
<meta name="description" content="${form.desc}">
<meta name="keywords" content="${form.keywords}">
<meta name="author" content="${form.author}">
<meta property="og:title" content="${form.title}">
<meta property="og:description" content="${form.desc}">
<meta property="og:url" content="${form.url}">
<meta property="og:image" content="${form.image}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${form.title}">
<meta name="twitter:description" content="${form.desc}">`;

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-3">
        {[['title', 'Page Title'], ['desc', 'Description'], ['keywords', 'Keywords'], ['author', 'Author'], ['url', 'Page URL'], ['image', 'OG Image URL']].map(([key, label]) => (
          <div key={key}>
            <label className="text-xs text-slate-500 block mb-1">{label}</label>
            <input
              type="text"
              value={form[key]}
              onChange={e => set(key, e.target.value)}
              className="w-full bg-dark-card border border-dark-border rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-500 transition-colors"
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          </div>
        ))}
      </div>
      <div>
        <label className="text-xs text-slate-500 block mb-1">Generated Meta Tags</label>
        <textarea className="tool-textarea" value={tags} readOnly rows={14} />
        <button onClick={() => navigator.clipboard.writeText(tags)} className="btn-primary mt-2">Copy Tags</button>
      </div>
    </div>
  );
}

function KeywordDensity() {
  const [text, setText] = useState('');
  const results = (() => {
    if (!text.trim()) return [];
    const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const freq = {};
    words.forEach(w => freq[w] = (freq[w] || 0) + 1);
    return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 20).map(([word, count]) => ({
      word, count, density: ((count / words.length) * 100).toFixed(2)
    }));
  })();

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" placeholder="Paste your content here..." value={text} onChange={e => setText(e.target.value)} rows={8} />
      {results.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-border">
                <th className="text-left py-2 px-3 text-slate-500 font-medium">Keyword</th>
                <th className="text-right py-2 px-3 text-slate-500 font-medium">Count</th>
                <th className="text-right py-2 px-3 text-slate-500 font-medium">Density</th>
              </tr>
            </thead>
            <tbody>
              {results.map(r => (
                <tr key={r.word} className="border-b border-dark-border/50 hover:bg-dark-card/50">
                  <td className="py-2 px-3 text-slate-200 font-mono">{r.word}</td>
                  <td className="py-2 px-3 text-right text-slate-400">{r.count}</td>
                  <td className="py-2 px-3 text-right text-brand-500">{r.density}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function SlugGenerator() {
  const [input, setInput] = useState('');
  const slug = input.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/[\s_-]+/g, '-');

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Enter your title..."
        value={input}
        onChange={e => setInput(e.target.value)}
        className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-brand-500 transition-colors"
      />
      {slug && (
        <div className="bg-dark-card border border-dark-border rounded-xl p-4">
          <p className="text-xs text-slate-500 mb-2">Generated Slug</p>
          <p className="font-mono text-brand-500 text-lg break-all">{slug}</p>
          <button onClick={() => navigator.clipboard.writeText(slug)} className="btn-primary mt-3">Copy Slug</button>
        </div>
      )}
    </div>
  );
}

function UtmBuilder() {
  const [form, setForm] = useState({ url: '', source: '', medium: '', campaign: '', term: '', content: '' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const params = Object.entries({ utm_source: form.source, utm_medium: form.medium, utm_campaign: form.campaign, utm_term: form.term, utm_content: form.content })
    .filter(([, v]) => v).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
  const utmUrl = form.url ? `${form.url}${form.url.includes('?') ? '&' : '?'}${params}` : '';

  return (
    <div className="space-y-3">
      {[['url', 'Website URL *', 'https://example.com'], ['source', 'Campaign Source *', 'google'], ['medium', 'Campaign Medium *', 'cpc'], ['campaign', 'Campaign Name *', 'summer_sale'], ['term', 'Campaign Term (optional)', 'shoes'], ['content', 'Campaign Content (optional)', 'banner_a']].map(([key, label, placeholder]) => (
        <div key={key}>
          <label className="text-xs text-slate-500 block mb-1">{label}</label>
          <input type="text" value={form[key]} onChange={e => set(key, e.target.value)} placeholder={placeholder}
            className="w-full bg-dark-card border border-dark-border rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-500 transition-colors" />
        </div>
      ))}
      {utmUrl && (
        <div className="bg-dark-card border border-brand-500/30 rounded-xl p-4 break-all">
          <p className="text-xs text-slate-500 mb-2">Generated URL</p>
          <p className="font-mono text-xs text-brand-500">{utmUrl}</p>
          <button onClick={() => navigator.clipboard.writeText(utmUrl)} className="btn-primary mt-3">Copy URL</button>
        </div>
      )}
    </div>
  );
}

function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e) { setError(e.message); }
  };

  const minify = () => {
    try {
      setOutput(JSON.stringify(JSON.parse(input)));
      setError('');
    } catch (e) { setError(e.message); }
  };

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" placeholder='{"key": "value"}' value={input} onChange={e => setInput(e.target.value)} rows={8} />
      <div className="flex gap-2">
        <button onClick={format} className="btn-primary">Beautify</button>
        <button onClick={minify} className="btn-secondary">Minify</button>
      </div>
      {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-2">{error}</p>}
      {output && <textarea className="tool-textarea" value={output} readOnly rows={10} />}
      {output && <button onClick={() => navigator.clipboard.writeText(output)} className="btn-secondary">Copy</button>}
    </div>
  );
}

function Base64Codec() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const encode = () => { try { setOutput(btoa(unescape(encodeURIComponent(input)))); } catch { setOutput('Error encoding'); } };
  const decode = () => { try { setOutput(decodeURIComponent(escape(atob(input)))); } catch { setOutput('Invalid Base64 string'); } };

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" placeholder="Enter text to encode or Base64 to decode..." value={input} onChange={e => setInput(e.target.value)} rows={6} />
      <div className="flex gap-2">
        <button onClick={encode} className="btn-primary">Encode to Base64</button>
        <button onClick={decode} className="btn-secondary">Decode from Base64</button>
      </div>
      {output && (
        <>
          <textarea className="tool-textarea" value={output} readOnly rows={6} />
          <button onClick={() => navigator.clipboard.writeText(output)} className="btn-secondary">Copy</button>
        </>
      )}
    </div>
  );
}

function UrlCodec() {
  const [input, setInput] = useState('');
  const encode = encodeURIComponent(input);
  const decode = (() => { try { return decodeURIComponent(input); } catch { return 'Invalid encoded URL'; } })();

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" placeholder="Enter URL or text..." value={input} onChange={e => setInput(e.target.value)} rows={4} />
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-slate-500 block mb-1">Encoded</label>
          <textarea className="tool-textarea" value={encode} readOnly rows={4} />
          <button onClick={() => navigator.clipboard.writeText(encode)} className="btn-secondary mt-2">Copy Encoded</button>
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1">Decoded</label>
          <textarea className="tool-textarea" value={decode} readOnly rows={4} />
          <button onClick={() => navigator.clipboard.writeText(decode)} className="btn-secondary mt-2">Copy Decoded</button>
        </div>
      </div>
    </div>
  );
}

function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('');

  const matches = (() => {
    if (!pattern || !text) return [];
    try {
      const re = new RegExp(pattern, flags);
      return [...text.matchAll(new RegExp(pattern, flags.includes('g') ? flags : flags + 'g'))].map(m => ({ match: m[0], index: m.index }));
    } catch { return null; }
  })();

  const highlighted = (() => {
    if (!matches || !matches.length) return text;
    try {
      return text.replace(new RegExp(pattern, flags.includes('g') ? flags : flags + 'g'), m => `<mark>${m}</mark>`);
    } catch { return text; }
  })();

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="text-xs text-slate-500 block mb-1">Regular Expression</label>
          <input type="text" value={pattern} onChange={e => setPattern(e.target.value)} placeholder="e.g. \d+" className="w-full bg-dark-card border border-dark-border rounded-xl px-3 py-2 font-mono text-sm text-slate-200 focus:outline-none focus:border-brand-500" />
        </div>
        <div className="w-24">
          <label className="text-xs text-slate-500 block mb-1">Flags</label>
          <input type="text" value={flags} onChange={e => setFlags(e.target.value)} placeholder="gi" className="w-full bg-dark-card border border-dark-border rounded-xl px-3 py-2 font-mono text-sm text-slate-200 focus:outline-none focus:border-brand-500" />
        </div>
      </div>
      <textarea className="tool-textarea" placeholder="Test string here..." value={text} onChange={e => setText(e.target.value)} rows={6} />
      {matches === null && <p className="text-red-400 text-sm">Invalid regular expression</p>}
      {matches && text && (
        <div className="bg-dark-card border border-dark-border rounded-xl p-4">
          <p className="text-xs text-slate-500 mb-2">{matches.length} match{matches.length !== 1 ? 'es' : ''} found</p>
          <div className="font-mono text-sm text-slate-300 break-all" dangerouslySetInnerHTML={{ __html: highlighted.replace(/<mark>/g, '<mark style="background:#0ea5e933;color:#0ea5e9;border-radius:3px;padding:0 2px">') }} />
        </div>
      )}
    </div>
  );
}

function UuidGenerator() {
  const [uuids, setUuids] = useState([]);
  const [count, setCount] = useState(5);

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  };

  const generate = () => setUuids(Array.from({ length: count }, generateUUID));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-sm text-slate-400">Count:</label>
        <input type="number" min={1} max={50} value={count} onChange={e => setCount(+e.target.value)} className="bg-dark-card border border-dark-border rounded-xl px-3 py-2 text-sm text-slate-200 w-20 focus:outline-none focus:border-brand-500" />
        <button onClick={generate} className="btn-primary">Generate UUIDs</button>
      </div>
      {uuids.length > 0 && (
        <>
          <div className="bg-dark-card border border-dark-border rounded-xl p-4 font-mono text-sm space-y-1">
            {uuids.map((u, i) => <div key={i} className="text-brand-500">{u}</div>)}
          </div>
          <button onClick={() => navigator.clipboard.writeText(uuids.join('\n'))} className="btn-secondary">Copy All</button>
        </>
      )}
    </div>
  );
}

function PercentageCalculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');

  return (
    <div className="space-y-6">
      {[
        { label: 'What is X% of Y?', inputs: [['X (%)', a, setA], ['Y (value)', b, setB]], result: a && b ? `${((+a / 100) * +b).toFixed(4)} (${a}% of ${b})` : '' },
        { label: 'X is what % of Y?', inputs: [['X (value)', a, setA], ['Y (total)', b, setB]], result: a && b ? `${((+a / +b) * 100).toFixed(4)}%` : '' },
        { label: '% change from X to Y', inputs: [['X (original)', a, setA], ['Y (new)', b, setB]], result: a && b ? `${(((+b - +a) / +a) * 100).toFixed(4)}% ${+b >= +a ? 'increase' : 'decrease'}` : '' },
      ].map(({ label, inputs, result }, i) => (
        <div key={i} className="bg-dark-card border border-dark-border rounded-xl p-4">
          <h3 className="font-semibold text-white text-sm mb-3">{label}</h3>
          <div className="flex flex-wrap gap-2 items-center">
            {inputs.map(([placeholder, val, setter]) => (
              <input key={placeholder} type="number" placeholder={placeholder} value={val} onChange={e => setter(e.target.value)}
                className="bg-dark/50 border border-dark-border rounded-lg px-3 py-2 text-sm text-slate-200 w-32 focus:outline-none focus:border-brand-500" />
            ))}
            {result && <span className="text-brand-500 font-semibold text-sm">= {result}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

function AgeCalculator() {
  const [dob, setDob] = useState('');
  const age = (() => {
    if (!dob) return null;
    const now = new Date();
    const birth = new Date(dob);
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    if (days < 0) { months--; days += 30; }
    if (months < 0) { years--; months += 12; }
    return { years, months, days };
  })();

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm text-slate-400 block mb-2">Date of Birth</label>
        <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="bg-dark-card border border-dark-border rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-brand-500" />
      </div>
      {age && (
        <div className="grid grid-cols-3 gap-4">
          {[['Years', age.years], ['Months', age.months], ['Days', age.days]].map(([label, val]) => (
            <div key={label} className="bg-dark-card border border-brand-500/30 rounded-xl p-5 text-center">
              <div className="text-3xl font-display font-bold text-brand-500">{val}</div>
              <div className="text-xs text-slate-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BmiCalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const bmi = height && weight ? (+weight / ((+height / 100) ** 2)).toFixed(1) : null;
  const category = !bmi ? '' : bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal weight' : bmi < 30 ? 'Overweight' : 'Obese';
  const color = !bmi ? '' : bmi < 18.5 ? 'text-blue-400' : bmi < 25 ? 'text-green-400' : bmi < 30 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-slate-500 block mb-1">Height (cm)</label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="175" className="w-full bg-dark-card border border-dark-border rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-brand-500" />
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1">Weight (kg)</label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="70" className="w-full bg-dark-card border border-dark-border rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-brand-500" />
        </div>
      </div>
      {bmi && (
        <div className="bg-dark-card border border-dark-border rounded-xl p-6 text-center">
          <div className={`text-5xl font-display font-bold ${color}`}>{bmi}</div>
          <div className={`text-lg font-semibold mt-2 ${color}`}>{category}</div>
          <div className="grid grid-cols-4 gap-2 mt-4 text-xs">
            {[['< 18.5', 'Underweight', 'text-blue-400'], ['18.5–24.9', 'Normal', 'text-green-400'], ['25–29.9', 'Overweight', 'text-yellow-400'], ['≥ 30', 'Obese', 'text-red-400']].map(([range, label, cls]) => (
              <div key={label} className={`p-2 rounded-lg bg-dark-border/50 ${cls}`}><div>{range}</div><div className="text-slate-500 mt-0.5">{label}</div></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function RandomNumber() {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [result, setResult] = useState(null);
  const generate = () => setResult(Math.floor(Math.random() * (+max - +min + 1)) + +min);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div><label className="text-xs text-slate-500 block mb-1">Min</label>
          <input type="number" value={min} onChange={e => setMin(e.target.value)} className="bg-dark-card border border-dark-border rounded-xl px-3 py-2 text-slate-200 w-28 focus:outline-none focus:border-brand-500" /></div>
        <div><label className="text-xs text-slate-500 block mb-1">Max</label>
          <input type="number" value={max} onChange={e => setMax(e.target.value)} className="bg-dark-card border border-dark-border rounded-xl px-3 py-2 text-slate-200 w-28 focus:outline-none focus:border-brand-500" /></div>
        <div className="pt-5"><button onClick={generate} className="btn-primary">Generate</button></div>
      </div>
      {result !== null && (
        <div className="bg-dark-card border border-brand-500/30 rounded-2xl p-10 text-center">
          <div className="text-7xl font-display font-extrabold text-brand-500">{result}</div>
        </div>
      )}
    </div>
  );
}

function ColorConverter() {
  const [hex, setHex] = useState('#0ea5e9');

  const hexToRgb = (h) => {
    const r = parseInt(h.slice(1, 3), 16);
    const g = parseInt(h.slice(3, 5), 16);
    const b = parseInt(h.slice(5, 7), 16);
    return { r, g, b };
  };

  const rgbToHsl = ({ r, g, b }) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const isValid = /^#[0-9A-Fa-f]{6}$/.test(hex);
  const rgb = isValid ? hexToRgb(hex) : null;
  const hsl = rgb ? rgbToHsl(rgb) : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input type="color" value={isValid ? hex : '#000000'} onChange={e => setHex(e.target.value)} className="w-16 h-16 rounded-xl cursor-pointer border-0 bg-transparent" />
        <input type="text" value={hex} onChange={e => setHex(e.target.value)} placeholder="#0ea5e9"
          className="bg-dark-card border border-dark-border rounded-xl px-4 py-2.5 font-mono text-slate-200 w-40 focus:outline-none focus:border-brand-500" />
      </div>
      {isValid && rgb && hsl && (
        <div className="grid gap-3">
          {[['HEX', hex], ['RGB', `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`], ['HSL', `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`]].map(([fmt, val]) => (
            <div key={fmt} className="flex items-center justify-between bg-dark-card border border-dark-border rounded-xl px-4 py-3">
              <span className="text-xs text-slate-500 w-10">{fmt}</span>
              <span className="font-mono text-sm text-slate-200 flex-1 ml-4">{val}</span>
              <button onClick={() => navigator.clipboard.writeText(val)} className="text-xs text-brand-500 hover:text-brand-400">Copy</button>
            </div>
          ))}
          <div className="h-16 rounded-xl border border-dark-border" style={{ background: hex }} />
        </div>
      )}
    </div>
  );
}

function GradientGenerator() {
  const [color1, setColor1] = useState('#0ea5e9');
  const [color2, setColor2] = useState('#f97316');
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState('linear');

  const gradient = type === 'linear'
    ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`;
  const css = `background: ${gradient};`;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="text-xs text-slate-500 block mb-1">Color 1</label>
          <input type="color" value={color1} onChange={e => setColor1(e.target.value)} className="w-14 h-10 rounded-lg cursor-pointer border border-dark-border" />
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1">Color 2</label>
          <input type="color" value={color2} onChange={e => setColor2(e.target.value)} className="w-14 h-10 rounded-lg cursor-pointer border border-dark-border" />
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1">Type</label>
          <div className="flex gap-2">
            <button onClick={() => setType('linear')} className={type === 'linear' ? 'btn-primary' : 'btn-secondary'}>Linear</button>
            <button onClick={() => setType('radial')} className={type === 'radial' ? 'btn-primary' : 'btn-secondary'}>Radial</button>
          </div>
        </div>
        {type === 'linear' && (
          <div>
            <label className="text-xs text-slate-500 block mb-1">Angle: {angle}°</label>
            <input type="range" min={0} max={360} value={angle} onChange={e => setAngle(+e.target.value)} className="accent-brand-500 w-40" />
          </div>
        )}
      </div>
      <div className="h-40 rounded-2xl border border-dark-border" style={{ background: gradient }} />
      <div className="bg-dark-card border border-dark-border rounded-xl p-4 font-mono text-sm text-slate-300">
        {css}
        <button onClick={() => navigator.clipboard.writeText(css)} className="btn-secondary ml-4 text-xs">Copy CSS</button>
      </div>
    </div>
  );
}

function TemperatureConverter() {
  const [value, setValue] = useState('');
  const [from, setFrom] = useState('C');

  const conversions = (() => {
    const v = parseFloat(value);
    if (isNaN(v)) return null;
    let c;
    if (from === 'C') c = v;
    else if (from === 'F') c = (v - 32) * 5 / 9;
    else c = v - 273.15;
    return { C: c.toFixed(2), F: (c * 9 / 5 + 32).toFixed(2), K: (c + 273.15).toFixed(2) };
  })();

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="Enter value"
          className="flex-1 bg-dark-card border border-dark-border rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-brand-500" />
        <select value={from} onChange={e => setFrom(e.target.value)} className="bg-dark-card border border-dark-border rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none">
          <option value="C">°C</option>
          <option value="F">°F</option>
          <option value="K">K</option>
        </select>
      </div>
      {conversions && (
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(conversions).map(([unit, val]) => (
            <div key={unit} className={`bg-dark-card border rounded-xl p-4 text-center ${unit === from ? 'border-brand-500' : 'border-dark-border'}`}>
              <div className="text-2xl font-display font-bold text-white">{val}</div>
              <div className="text-xs text-slate-500 mt-1">°{unit}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ByteConverter() {
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('MB');
  const units = { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3, TB: 1024 ** 4 };

  const bytes = parseFloat(value) * (units[unit] || 1);
  const conversions = Object.entries(units).map(([u, factor]) => [u, (bytes / factor).toFixed(4)]);

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="Enter value"
          className="flex-1 bg-dark-card border border-dark-border rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-brand-500" />
        <select value={unit} onChange={e => setUnit(e.target.value)} className="bg-dark-card border border-dark-border rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none">
          {Object.keys(units).map(u => <option key={u}>{u}</option>)}
        </select>
      </div>
      {value && (
        <div className="space-y-2">
          {conversions.map(([u, val]) => (
            <div key={u} className={`flex justify-between bg-dark-card border rounded-xl px-4 py-3 ${u === unit ? 'border-brand-500' : 'border-dark-border'}`}>
              <span className="text-slate-400 text-sm">{u}</span>
              <span className="font-mono text-brand-500 text-sm">{parseFloat(val).toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PxToRem() {
  const [px, setPx] = useState('');
  const [base, setBase] = useState(16);
  const rem = px ? (parseFloat(px) / base).toFixed(4) : '';

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-end">
        <div>
          <label className="text-xs text-slate-500 block mb-1">PX Value</label>
          <input type="number" value={px} onChange={e => setPx(e.target.value)} placeholder="16"
            className="bg-dark-card border border-dark-border rounded-xl px-3 py-2.5 text-slate-200 w-32 focus:outline-none focus:border-brand-500" />
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1">Base Font Size</label>
          <input type="number" value={base} onChange={e => setBase(+e.target.value)} placeholder="16"
            className="bg-dark-card border border-dark-border rounded-xl px-3 py-2.5 text-slate-200 w-32 focus:outline-none focus:border-brand-500" />
        </div>
      </div>
      {rem && (
        <div className="bg-dark-card border border-brand-500/30 rounded-xl p-6 text-center">
          <div className="text-4xl font-display font-bold text-brand-500">{rem} <span className="text-xl">rem</span></div>
          <p className="text-slate-500 text-sm mt-2">{px}px ÷ {base} = {rem}rem</p>
        </div>
      )}
    </div>
  );
}

// Generic "coming soon" fallback
function ComingSoon({ tool }) {
  return (
    <div className="text-center py-16">
      <div className="text-5xl mb-4">{tool.icon}</div>
      <h3 className="font-display font-bold text-xl text-white mb-2">{tool.name}</h3>
      <p className="text-slate-400">This tool is coming soon. Stay tuned!</p>
    </div>
  );
}

// TOOL MAP
const TOOL_COMPONENTS = {
  'word-counter': WordCounter,
  'case-converter': CaseConverter,
  'lorem-ipsum': LoremIpsum,
  'text-reverser': TextReverser,
  'duplicate-remover': DuplicateRemover,
  'text-diff': TextDiff,
  'meta-tag-generator': MetaTagGenerator,
  'keyword-density': KeywordDensity,
  'slug-generator': SlugGenerator,
  'utm-builder': UtmBuilder,
  'json-formatter': JsonFormatter,
  'base64-encoder': Base64Codec,
  'url-encoder': UrlCodec,
  'regex-tester': RegexTester,
  'uuid-generator': UuidGenerator,
  'percentage-calculator': PercentageCalculator,
  'age-calculator': AgeCalculator,
  'bmi-calculator': BmiCalculator,
  'random-number': RandomNumber,
  'color-converter': ColorConverter,
  'gradient-generator': GradientGenerator,
  'temperature-converter': TemperatureConverter,
  'byte-converter': ByteConverter,
  'px-to-rem': PxToRem,
};

// ============================================================
// PAGE COMPONENT
// ============================================================
export default function ToolPage({ tool, relatedTools }) {
  if (!tool) return null;
  const ToolComponent = TOOL_COMPONENTS[tool.slug] || (() => <ComingSoon tool={tool} />);
  const cat = getCategoryById(tool.category);

  return (
    <Layout title={tool.name} description={`${tool.desc} Free online ${tool.name.toLowerCase()} tool — no signup required.`}>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-slate-300">Home</Link>
        <span>›</span>
        {cat && <Link href={`/category/${cat.id}`} className="hover:text-slate-300">{cat.label}</Link>}
        <span>›</span>
        <span className="text-slate-300">{tool.name}</span>
      </nav>

      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
        {/* Main */}
        <div>
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{tool.icon}</span>
              <h1 className="font-display font-extrabold text-2xl md:text-3xl text-white">{tool.name}</h1>
              {tool.popular && <span className="text-xs bg-accent/20 text-orange-400 border border-accent/30 px-2 py-0.5 rounded-full">Popular</span>}
            </div>
            <p className="text-slate-400">{tool.desc}</p>
          </div>

          {/* Tool */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-5 md:p-6 mb-6">
            <ToolComponent />
          </div>

          {/* In-content Ad */}
          <AdSlot slot="1122334455" className="h-28 mb-6" />

          {/* About section */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
            <h2 className="font-display font-bold text-lg text-white mb-3">About {tool.name}</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              The <strong className="text-slate-200">{tool.name}</strong> is a free, browser-based tool that works instantly without any signup or installation.
              {tool.desc} This tool is part of the {cat?.label} category on FreeToolsHub.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Sidebar Ad */}
          <AdSlot slot="9988776655" className="h-64 w-full" />

          {/* Related Tools */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-4">
            <h3 className="font-display font-semibold text-white mb-3 text-sm">Related Tools</h3>
            <div className="space-y-2">
              {relatedTools.map(t => (
                <Link key={t.slug} href={`/tools/${t.slug}`} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-dark-border transition-colors">
                  <span>{t.icon}</span>
                  <span className="text-sm text-slate-300">{t.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: tools.map(t => ({ params: { slug: t.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const tool = getToolBySlug(params.slug);
  const relatedTools = tool ? getToolsByCategory(tool.category).filter(t => t.slug !== tool.slug).slice(0, 6) : [];
  return { props: { tool: tool || null, relatedTools } };
}
