import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b28', categorySlug: 'use-cases', categoryName: 'Use Cases',
  title: 'Sentiment Analysis Using Polymarket Order Book Data',
  slug: 'sentiment-analysis-polymarket-order-book',
  excerpt: 'How to derive market sentiment signals from Polymarket order book depth and historical bid-ask patterns.',
  metaTitle: 'Sentiment Analysis with Polymarket Order Book Data | PolyHistorical',
  metaDescription: 'Learn how to extract sentiment signals from Polymarket order books. Use bid-ask imbalance, depth ratios, and order flow to gauge market sentiment.',
  ogImage: null, createdAt: '', updatedAt: '',
  content: `<h1>Sentiment Analysis Using Polymarket Order Book Data</h1>
  <h2>Order Books as Sentiment Indicators</h2>
  <p>Polymarket order books contain rich sentiment information that goes beyond simple price data. By analyzing the <strong>depth, imbalance, and dynamics</strong> of bids and asks, you can extract actionable sentiment signals using historical data from PolyHistorical.</p>

  <h2>Key Sentiment Metrics from Order Book Data</h2>
  <table>
  <thead><tr><th>Metric</th><th>Formula</th><th>Interpretation</th></tr></thead>
  <tbody>
  <tr><td>Bid-Ask Imbalance</td><td>(Bid Volume - Ask Volume) / Total Volume</td><td>Positive = bullish sentiment, negative = bearish</td></tr>
  <tr><td>Depth Ratio</td><td>Bid Depth within 5% / Ask Depth within 5%</td><td>Higher ratio = stronger buying interest</td></tr>
  <tr><td>Spread Trend</td><td>Change in bid-ask spread over time</td><td>Narrowing = increasing confidence, widening = uncertainty</td></tr>
  <tr><td>Large Order Presence</td><td>Orders &gt; 2x average size</td><td>Institutional interest or informed trading</td></tr>
  </tbody>
  </table>

  <h2>Bid-Ask Imbalance Analysis</h2>
  <p>The bid-ask imbalance is one of the most powerful sentiment signals available in order book data. When the <strong>bid side is significantly deeper</strong> than the ask side, it suggests more participants want to buy the outcome — a bullish signal. PolyHistorical's sub-second snapshots let you track how this imbalance evolves in real time.</p>

  <h3>How to Calculate It</h3>
  <ul>
  <li>Fetch order book snapshots at regular intervals using the PolyHistorical API</li>
  <li>Sum bid volume within a defined price range (e.g., top 10 levels)</li>
  <li>Sum ask volume within the same range</li>
  <li>Compute the ratio: (bid_vol - ask_vol) / (bid_vol + ask_vol)</li>
  <li>Track this ratio over time to identify sentiment shifts</li>
  </ul>

  <h2>Spread as a Confidence Indicator</h2>
  <p>The bid-ask spread in prediction markets reflects market uncertainty. A <strong>tight spread</strong> (e.g., 0.01-0.02) indicates strong consensus on the outcome probability. A <strong>wide spread</strong> (e.g., 0.05+) suggests disagreement or low liquidity. Tracking spread trends with PolyHistorical data reveals how sentiment is crystallizing over time.</p>

  <h2>Order Flow Sentiment</h2>
  <p>By comparing consecutive order book snapshots, you can infer <strong>net order flow</strong> — whether new orders are predominantly bids or asks. A sustained period of bid-side order flow typically precedes price increases in prediction markets.</p>

  <h3>Practical Applications</h3>
  <ul>
  <li>Build a sentiment dashboard tracking bid-ask imbalance across all Polymarket markets</li>
  <li>Create alerts when sentiment metrics cross predefined thresholds</li>
  <li>Combine order book sentiment with external news events for trading signals</li>
  <li>Use historical sentiment patterns to improve prediction accuracy</li>
  </ul>

  <h2>Getting Started with Sentiment Analysis</h2>
  <p>PolyHistorical's free tier gives you access to BTC market order book history — enough to prototype sentiment analysis models. Upgrade to Pro at <strong>$11/month</strong> for multi-market coverage and build a comprehensive sentiment analysis pipeline across all Polymarket prediction markets.</p>`,
};

export default page;
