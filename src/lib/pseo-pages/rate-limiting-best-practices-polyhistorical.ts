import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b35', categorySlug: 'api-developers', categoryName: 'API & Developers',
  title: 'Rate Limiting Best Practices for PolyHistorical API',
  slug: 'rate-limiting-best-practices-polyhistorical',
  excerpt: 'How to handle rate limits efficiently when fetching Polymarket historical data from the PolyHistorical API.',
  metaTitle: 'Rate Limiting Best Practices for PolyHistorical API',
  metaDescription: 'Learn how to handle PolyHistorical API rate limits efficiently. Best practices for retry logic, request batching, caching, and avoiding 429 errors.',
  ogImage: null, createdAt: '', updatedAt: '',
  content: `<h1>Rate Limiting Best Practices for PolyHistorical API</h1>
<h2>Understanding PolyHistorical Rate Limits</h2>
<p>PolyHistorical API applies rate limits to ensure fair usage and platform stability. Understanding these limits and designing your application around them is essential for reliable <strong>Polymarket historical data</strong> retrieval.</p>

<h2>Rate Limit Tiers</h2>
<table>
<thead><tr><th>Plan</th><th>Requests/min</th><th>Requests/day</th></tr></thead>
<tbody>
<tr><td>Starter (Free)</td><td>60</td><td>1,000</td></tr>
<tr><td>Pro ($11/mo)</td><td>300</td><td>50,000</td></tr>
<tr><td>Enterprise</td><td>Custom</td><td>Unlimited</td></tr>
</tbody>
</table>

<h2>Rate Limit Headers</h2>
<p>Every API response includes headers to help you track your usage:</p>
<ul>
<li><strong>X-RateLimit-Limit:</strong> Your daily request limit</li>
<li><strong>X-RateLimit-Remaining:</strong> Requests remaining today</li>
<li><strong>X-RateLimit-Reset:</strong> Unix timestamp when the limit resets (midnight UTC)</li>
<li><strong>X-Tier:</strong> Your current plan tier</li>
</ul>

<h2>Best Practice: Implement Exponential Backoff</h2>
<p>When you receive a <strong>429 Too Many Requests</strong> response, implement exponential backoff with jitter. Check the <code>Retry-After</code> header for how many seconds to wait.</p>
<ul>
<li>First retry: wait 1 second + random 0-500ms</li>
<li>Second retry: wait 2 seconds + random 0-500ms</li>
<li>Third retry: wait 4 seconds + random 0-500ms</li>
<li>Max retries: 5 (then log the failure and move on)</li>
</ul>

<h2>Best Practice: Use Pagination Wisely</h2>
<p>The snapshots endpoint supports up to 1,000 results per request with <code>limit</code> and <code>offset</code> parameters. Fetch the maximum per call to minimize your total request count.</p>

<h2>Best Practice: Cache Historical Data</h2>
<p>Historical order book data is immutable — once a snapshot is recorded, it never changes. Cache responses locally in a database or flat files and only request new data for markets you haven't fetched yet.</p>

<h2>Best Practice: Skip Order Books When Not Needed</h2>
<p>Set <code>include_orderbook=false</code> (the default) when you only need price data. This significantly reduces response size and latency, helping you stay within rate limits more easily.</p>

<h2>Common Mistakes to Avoid</h2>
<ul>
<li>Do not poll the API in a tight loop without delays</li>
<li>Do not re-fetch historical data you have already cached</li>
<li>Do not ignore 429 responses — they will escalate to longer cooldowns</li>
<li>Do not request order book data when you only need prices</li>
</ul>`,
};

export default page;
