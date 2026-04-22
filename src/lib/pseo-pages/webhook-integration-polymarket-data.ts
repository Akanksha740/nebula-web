import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b36', categorySlug: 'api-developers', categoryName: 'API & Developers',
  title: 'Webhook Integration Guide for Polymarket Data',
  slug: 'webhook-integration-polymarket-data',
  excerpt: 'Set up real-time webhooks to receive Polymarket order book updates and market events from PolyHistorical.',
  metaTitle: 'Webhook Integration for Polymarket Data | PolyHistorical',
  metaDescription: 'Set up webhooks for real-time Polymarket order book updates. Learn how to configure endpoints, handle payloads, and build event-driven prediction market applications.',
  ogImage: '/og/api-developers.png', createdAt: '', updatedAt: '',
  content: `<h2>What Are Webhooks?</h2>
  <p>Webhooks allow PolyHistorical to <strong>push data to your application</strong> in real time, instead of requiring you to poll the API. When a relevant event occurs — such as a significant order book change or market resolution — PolyHistorical sends an HTTP POST request to your configured endpoint with the event data.</p>

  <h2>Supported Webhook Events</h2>
  <table>
  <thead><tr><th>Event Type</th><th>Description</th><th>Typical Use Case</th></tr></thead>
  <tbody>
  <tr><td>order_book.snapshot</td><td>New order book snapshot captured</td><td>Real-time dashboards, live monitoring</td></tr>
  <tr><td>spread.threshold</td><td>Bid-ask spread crosses configured threshold</td><td>Spread trading alerts</td></tr>
  <tr><td>depth.change</td><td>Significant change in order book depth</td><td>Liquidity monitoring, whale alerts</td></tr>
  <tr><td>market.resolution</td><td>A prediction market has resolved</td><td>Settlement tracking, P&amp;L calculation</td></tr>
  <tr><td>market.new</td><td>New prediction market created</td><td>Auto-discovery of new trading opportunities</td></tr>
  </tbody>
  </table>

  <h2>Setting Up a Webhook Endpoint</h2>
  <p>To receive webhooks, you need an HTTPS endpoint that can accept POST requests. Here is what your endpoint should do:</p>
  <ul>
  <li>Accept POST requests with a JSON body</li>
  <li>Return a <strong>200 OK</strong> response within 5 seconds</li>
  <li>Verify the webhook signature using your API secret</li>
  <li>Process the event asynchronously (queue it for background processing)</li>
  </ul>

  <h3>Security Best Practices</h3>
  <ul>
  <li>Always verify the <strong>X-PolyHistorical-Signature</strong> header using HMAC-SHA256</li>
  <li>Use HTTPS for your endpoint — HTTP endpoints will be rejected</li>
  <li>Implement idempotency — webhooks may be delivered more than once</li>
  <li>Store a unique event ID with each processed webhook to detect duplicates</li>
  </ul>

  <h2>Webhook Payload Structure</h2>
  <p>Each webhook payload includes the event type, timestamp, market ID, and the relevant data. For order book snapshots, the payload contains the full bid and ask arrays. For market resolution events, it includes the resolution outcome and final price.</p>

  <h2>Handling Failures and Retries</h2>
  <p>If your endpoint returns a non-2xx response or times out, PolyHistorical will retry the delivery with <strong>exponential backoff</strong>:</p>
  <ul>
  <li>First retry: 30 seconds after initial attempt</li>
  <li>Second retry: 2 minutes after first retry</li>
  <li>Third retry: 10 minutes after second retry</li>
  <li>After 3 failed retries, the webhook is marked as failed (viewable in dashboard)</li>
  </ul>

  <h2>Use Cases for Webhooks</h2>
  <p>Webhooks are ideal for building <strong>event-driven applications</strong> that react to Polymarket changes in real time. Trading bots can receive order book updates without polling. Alerting systems can notify you of unusual spread or depth changes. Research platforms can automatically ingest new data as it becomes available.</p>

  <h2>Availability</h2>
  <p>Webhook integration is available on the <strong>Pro plan ($11/month)</strong> and above. Configure webhooks through the PolyHistorical dashboard or API.</p>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/polyhistorical-api-authentication-guide">PolyHistorical API Authentication and Security Guide</a></li>
  <li><a href="/p/polymarket-historical-data-api-documentation">Polymarket Historical Data API Documentation</a></li>
  <li><a href="/p/rate-limiting-best-practices-polyhistorical">Rate Limiting Best Practices for PolyHistorical API</a></li>
  </ul>`,
};

export default page;
