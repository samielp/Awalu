export const categories = [
  { id: 'text', label: 'Text & Writing', icon: '✍️', color: 'text-violet-400 border-violet-400/30 bg-violet-400/10' },
  { id: 'seo', label: 'SEO & Marketing', icon: '📈', color: 'text-green-400 border-green-400/30 bg-green-400/10' },
  { id: 'dev', label: 'Developer', icon: '💻', color: 'text-sky-400 border-sky-400/30 bg-sky-400/10' },
  { id: 'math', label: 'Math & Numbers', icon: '🔢', color: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10' },
  { id: 'image', label: 'Image & Color', icon: '🎨', color: 'text-pink-400 border-pink-400/30 bg-pink-400/10' },
  { id: 'convert', label: 'Converters', icon: '🔄', color: 'text-orange-400 border-orange-400/30 bg-orange-400/10' },
];

export const tools = [
  // Text & Writing
  { slug: 'word-counter', name: 'Word Counter', category: 'text', desc: 'Count words, characters, sentences and reading time instantly.', icon: '📝', popular: true },
  { slug: 'case-converter', name: 'Case Converter', category: 'text', desc: 'Convert text to uppercase, lowercase, title case and more.', icon: '🔡', popular: true },
  { slug: 'lorem-ipsum', name: 'Lorem Ipsum Generator', category: 'text', desc: 'Generate placeholder lorem ipsum text for your designs.', icon: '📄', popular: false },
  { slug: 'text-reverser', name: 'Text Reverser', category: 'text', desc: 'Reverse any text, words, or sentences instantly.', icon: '↩️', popular: false },
  { slug: 'duplicate-remover', name: 'Duplicate Line Remover', category: 'text', desc: 'Remove duplicate lines from any text or list.', icon: '🧹', popular: false },
  { slug: 'text-diff', name: 'Text Diff Checker', category: 'text', desc: 'Compare two texts and highlight the differences.', icon: '🔍', popular: true },

  // SEO & Marketing
  { slug: 'meta-tag-generator', name: 'Meta Tag Generator', category: 'seo', desc: 'Generate SEO-optimized meta tags for your web pages.', icon: '🏷️', popular: true },
  { slug: 'keyword-density', name: 'Keyword Density Checker', category: 'seo', desc: 'Analyze keyword frequency and density in your content.', icon: '🎯', popular: true },
  { slug: 'slug-generator', name: 'URL Slug Generator', category: 'seo', desc: 'Convert titles to SEO-friendly URL slugs.', icon: '🔗', popular: false },
  { slug: 'utm-builder', name: 'UTM Link Builder', category: 'seo', desc: 'Build UTM tracking URLs for marketing campaigns.', icon: '📊', popular: true },
  { slug: 'og-tag-generator', name: 'Open Graph Generator', category: 'seo', desc: 'Generate Open Graph tags for social media sharing.', icon: '🌐', popular: false },

  // Developer
  { slug: 'json-formatter', name: 'JSON Formatter', category: 'dev', desc: 'Format, validate and beautify JSON data.', icon: '{}', popular: true },
  { slug: 'base64-encoder', name: 'Base64 Encoder/Decoder', category: 'dev', desc: 'Encode and decode Base64 strings.', icon: '🔐', popular: true },
  { slug: 'url-encoder', name: 'URL Encoder/Decoder', category: 'dev', desc: 'Encode and decode URL strings safely.', icon: '🌍', popular: false },
  { slug: 'html-entity', name: 'HTML Entity Encoder', category: 'dev', desc: 'Encode special characters to HTML entities.', icon: '🏷️', popular: false },
  { slug: 'regex-tester', name: 'Regex Tester', category: 'dev', desc: 'Test and debug regular expressions in real time.', icon: '🔎', popular: true },
  { slug: 'uuid-generator', name: 'UUID Generator', category: 'dev', desc: 'Generate unique UUIDs (v4) instantly.', icon: '🆔', popular: false },
  { slug: 'hash-generator', name: 'Hash Generator', category: 'dev', desc: 'Generate MD5, SHA-1, SHA-256 hashes from text.', icon: '🔒', popular: true },

  // Math & Numbers
  { slug: 'percentage-calculator', name: 'Percentage Calculator', category: 'math', desc: 'Calculate percentages, increases, and decreases easily.', icon: '%', popular: true },
  { slug: 'age-calculator', name: 'Age Calculator', category: 'math', desc: 'Calculate exact age from a birthdate.', icon: '🎂', popular: true },
  { slug: 'bmi-calculator', name: 'BMI Calculator', category: 'math', desc: 'Calculate your Body Mass Index (BMI) quickly.', icon: '⚖️', popular: false },
  { slug: 'random-number', name: 'Random Number Generator', category: 'math', desc: 'Generate random numbers within a custom range.', icon: '🎲', popular: false },
  { slug: 'number-to-words', name: 'Number to Words', category: 'math', desc: 'Convert numbers to written English words.', icon: '🔢', popular: false },

  // Image & Color
  { slug: 'color-converter', name: 'Color Converter', category: 'image', desc: 'Convert between HEX, RGB, HSL color formats.', icon: '🎨', popular: true },
  { slug: 'gradient-generator', name: 'CSS Gradient Generator', category: 'image', desc: 'Create beautiful CSS gradients visually.', icon: '🌈', popular: true },
  { slug: 'color-palette', name: 'Color Palette Generator', category: 'image', desc: 'Generate harmonious color palettes from a base color.', icon: '🖌️', popular: false },

  // Converters
  { slug: 'px-to-rem', name: 'PX to REM Converter', category: 'convert', desc: 'Convert pixel values to REM units for CSS.', icon: '📐', popular: false },
  { slug: 'temperature-converter', name: 'Temperature Converter', category: 'convert', desc: 'Convert between Celsius, Fahrenheit, and Kelvin.', icon: '🌡️', popular: true },
  { slug: 'time-converter', name: 'Time Zone Converter', category: 'convert', desc: 'Convert times across different time zones.', icon: '🕐', popular: false },
  { slug: 'byte-converter', name: 'Byte Size Converter', category: 'convert', desc: 'Convert between bytes, KB, MB, GB, TB.', icon: '💾', popular: false },
];

export const getToolBySlug = (slug) => tools.find(t => t.slug === slug);
export const getToolsByCategory = (cat) => tools.filter(t => t.category === cat);
export const getPopularTools = () => tools.filter(t => t.popular);
export const getCategoryById = (id) => categories.find(c => c.id === id);
