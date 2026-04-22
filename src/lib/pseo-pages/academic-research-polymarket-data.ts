import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b9', categorySlug: 'use-cases', categoryName: 'Use Cases',
  title: 'Academic Research with Polymarket Historical Order Book Data',
  slug: 'academic-research-polymarket-data',
  excerpt: 'How researchers and academics can use Polymarket historical data for market microstructure and prediction market studies.',
  metaTitle: 'Academic Research with Polymarket Data | PolyHistorical',
  metaDescription: 'Use Polymarket historical order book data for academic research. Market microstructure, prediction accuracy, and behavioral finance studies with PolyHistorical.',
  ogImage: '/og/use-cases.png', createdAt: '', updatedAt: '',
  content: `<h2>Why Polymarket Data Matters for Research</h2>
  <p>Prediction markets are a rich source of data for studying <strong>information aggregation, market microstructure, and behavioral finance</strong>. PolyHistorical provides the granular order book data that most academic studies require but rarely have access to.</p>

  <h2>Research Areas</h2>
  <table>
  <thead><tr><th>Field</th><th>Research Questions</th><th>Data Needed</th></tr></thead>
  <tbody>
  <tr><td>Market Microstructure</td><td>How do spreads form? What drives depth?</td><td>Order book snapshots</td></tr>
  <tr><td>Information Efficiency</td><td>How fast do markets incorporate news?</td><td>Time-series prices + events</td></tr>
  <tr><td>Behavioral Finance</td><td>Do biases exist in probability pricing?</td><td>Historical prices near resolution</td></tr>
  <tr><td>Forecasting Accuracy</td><td>Do market probabilities match outcomes?</td><td>Prices + resolution data</td></tr>
  <tr><td>Liquidity Studies</td><td>What determines market maker participation?</td><td>Order book depth over time</td></tr>
  </tbody>
  </table>

  <h2>Data Access for Academics</h2>
  <p>PolyHistorical's <strong>free Starter tier</strong> provides enough data for initial research and paper prototyping. For comprehensive studies requiring full historical depth:</p>
  <ul>
  <li><strong>Pro plan ($11/mo):</strong> Unlimited history for BTC, ETH, and SOL markets</li>
  <li><strong>Bulk export:</strong> Download datasets in CSV/JSON for offline analysis in R, Stata, or Python</li>
  <li><strong>API access:</strong> Programmatic queries for reproducible research pipelines</li>
  </ul>

  <h2>Example: Calibration Study</h2>
  <pre><code># Fetch resolved markets and compare final price to outcome
import requests

resp = requests.get(
    "https://api.polyhistorical.com/v1/markets",
    headers={"X-API-Key": "your_key"},
    params={"resolved": "true", "coin": "BTC", "limit": "100"}
)
for market in resp.json()["data"]:
    final_up = float(market["price_up"])
    winner = market["winner"]  # "Up" or "Down"
    actual = 1.0 if winner == "Up" else 0.0
    print(f"Predicted: {final_up:.2f}, Actual: {actual}")</code></pre>

  <h2>Citation</h2>
  <p>When using PolyHistorical data in publications, please cite the data source and API version used. Consistent data provenance strengthens reproducibility.</p>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/polymarket-historical-data-availability">Polymarket Historical Data Availability</a></li>
  <li><a href="/p/time-series-analysis-prediction-markets">Time-Series Analysis for Prediction Markets</a></li>
  <li><a href="/p/polymarket-historical-data-download">Polymarket Historical Data Download</a></li>
  </ul>`,
};

export default page;
