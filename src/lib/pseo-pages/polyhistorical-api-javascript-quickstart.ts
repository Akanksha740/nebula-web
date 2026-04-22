import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b16', categorySlug: 'api-developers', categoryName: 'API & Developers',
  title: 'PolyHistorical API JavaScript/Node.js Quick Start',
  slug: 'polyhistorical-api-javascript-quickstart',
  excerpt: 'How to integrate PolyHistorical API in your JavaScript or Node.js application for Polymarket data.',
  metaTitle: 'PolyHistorical JavaScript/Node.js Quick Start',
  metaDescription: 'Get started with PolyHistorical API in JavaScript and Node.js. Fetch Polymarket historical data with code examples and best practices.',
  ogImage: '/og/api-developers.png', createdAt: '', updatedAt: '',
  content: `<h2>Prerequisites</h2>
  <ul>
  <li>Node.js 18+ (or any modern browser for client-side)</li>
  <li>A free PolyHistorical API key from <a href="/signup">polyhistorical.com/signup</a></li>
  </ul>

  <h2>Step 1: Fetch Active Markets</h2>
  <pre><code>const API_KEY = "your_api_key";
const BASE = "https://api.polyhistorical.com/v1";

const resp = await fetch(\`\${BASE}/markets?coin=BTC&active=true\`, {
  headers: { "X-API-Key": API_KEY },
});
const { data: markets } = await resp.json();
markets.forEach((m) =>
  console.log(\`\${m.slug} — Up: \${m.price_up}, Down: \${m.price_down}\`)
);</code></pre>

  <h2>Step 2: Fetch Snapshots with Order Book</h2>
  <pre><code>const slug = markets[0].slug;
const snapResp = await fetch(
  \`\${BASE}/markets/\${slug}/snapshots?include_orderbook=true&limit=10\`,
  { headers: { "X-API-Key": API_KEY } }
);
const { data: snapshots } = await snapResp.json();
snapshots.forEach((snap) => {
  console.log(\`Time: \${snap.time}\`);
  console.log(\`  Up: \${snap.price_up}, Down: \${snap.price_down}\`);
  console.log(\`  Bid levels: \${snap.orderbook_up.bids.length}\`);
});</code></pre>

  <h2>Step 3: TypeScript Types</h2>
  <pre><code>interface Snapshot {
  time: string;
  price_up: string;
  price_down: string;
  volume: string;
  liquidity: string;
  coin_price: string;
  orderbook_up?: { bids: Level[]; asks: Level[] };
  orderbook_down?: { bids: Level[]; asks: Level[] };
}

interface Level {
  price: string;
  size: string;
}</code></pre>

  <h2>Error Handling</h2>
  <pre><code>const resp = await fetch(url, { headers: { "X-API-Key": API_KEY } });
if (!resp.ok) {
  if (resp.status === 429) console.error("Rate limited — back off");
  else if (resp.status === 401) console.error("Invalid API key");
  else console.error(\`Error: \${resp.status}\`);
  return;
}
const data = await resp.json();</code></pre>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/getting-started-polyhistorical-python">Python Quick Start Guide</a></li>
  <li><a href="/p/rate-limiting-best-practices-polyhistorical">Rate Limiting Best Practices</a></li>
  <li><a href="/p/polymarket-historical-data-api-documentation">API Documentation</a></li>
  </ul>`,
};

export default page;
