import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b38', categorySlug: 'api-developers', categoryName: 'API & Developers',
  title: 'PolyHistorical API Authentication and Security Guide',
  slug: 'polyhistorical-api-authentication-guide',
  excerpt: 'Complete guide to API key management, authentication flows, and security best practices for PolyHistorical.',
  metaTitle: 'PolyHistorical API Authentication Guide | Developer Docs',
  metaDescription: 'Learn how to authenticate with the PolyHistorical API. API key management, security best practices, and common authentication patterns for Polymarket data access.',
  ogImage: '/og/api-developers.png', createdAt: '', updatedAt: '',
  content: `<h2>Authentication Overview</h2>
<p>The PolyHistorical API uses <strong>API key authentication</strong> via the <code>X-API-Key</code> header. Every request must include your API key. This guide covers how to generate, manage, and securely use your API keys for accessing Polymarket historical order book data.</p>

<h2>Getting Your API Key</h2>
<ol>
<li>Create a free account at <a href="https://polyhistorical.com/dashboard?tab=api-keys">polyhistorical.com</a> — no credit card required</li>
<li>Verify your email</li>
<li>Go to your Dashboard and navigate to <strong>API Keys</strong></li>
<li>Click <strong>Create New Key</strong> and give it a descriptive name</li>
<li>Copy the key immediately — it will not be shown again</li>
</ol>

<h2>API Key Limits by Plan</h2>
<table>
<thead><tr><th>Plan</th><th>Max API Keys</th></tr></thead>
<tbody>
<tr><td>Starter (Free)</td><td>1</td></tr>
<tr><td>Pro ($11/mo)</td><td>3</td></tr>
<tr><td>Enterprise</td><td>33</td></tr>
</tbody>
</table>

<h2>Using Your API Key</h2>
<p>Include the key in the <code>X-API-Key</code> header with every request:</p>
<pre><code>curl -H "X-API-Key: nb_your_api_key_here" \\
  "https://api.polyhistorical.com/v1/markets?coin=BTC&amp;limit=5"</code></pre>

<pre><code># Python
import requests
headers = {"X-API-Key": "nb_your_api_key_here"}
response = requests.get(
    "https://api.polyhistorical.com/v1/markets",
    params={"coin": "BTC", "limit": 5},
    headers=headers
)</code></pre>

<h2>Security Best Practices</h2>

<h3>Do</h3>
<ul>
<li>Store API keys in <strong>environment variables</strong>, never in source code</li>
<li>Use a secrets manager (AWS Secrets Manager, HashiCorp Vault) in production</li>
<li>Create <strong>separate keys</strong> for development and production</li>
<li>Rotate keys periodically</li>
<li>Revoke unused keys from your dashboard</li>
</ul>

<h3>Do Not</h3>
<ul>
<li>Commit API keys to version control (add to .gitignore)</li>
<li>Expose keys in client-side JavaScript or browser requests</li>
<li>Share keys between team members — each person should have their own</li>
<li>Log API keys in application logs or error messages</li>
</ul>

<h2>Error Responses</h2>
<table>
<thead><tr><th>Status Code</th><th>Error Code</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td>401</td><td>UNAUTHORIZED</td><td>Missing or invalid API key</td></tr>
<tr><td>403</td><td>TIER_ACCESS_DENIED</td><td>Feature requires a higher plan</td></tr>
<tr><td>429</td><td>RATE_LIMIT_EXCEEDED</td><td>Too many requests — implement backoff</td></tr>
</tbody>
</table>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/rate-limiting-best-practices-polyhistorical">Rate Limiting Best Practices for PolyHistorical API</a></li>
  <li><a href="/p/polymarket-historical-data-api-documentation">Polymarket Historical Data API Documentation</a></li>
  <li><a href="/p/bulk-data-export-polymarket-historical">Bulk Data Export Guide: Download Polymarket Historical Data</a></li>
  </ul>`,
};

export default page;
