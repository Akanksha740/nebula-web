import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b69', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data',
  title: 'Polymarket Parquet Data: Download Order Book History in Parquet Format',
  slug: 'polymarket-parquet-data',
  excerpt: 'Download Polymarket historical order book data in Parquet format. PolyHistorical provides columnar Parquet exports for fast analysis of BTC, ETH, and SOL prediction markets.',
  metaTitle: 'Polymarket Parquet Data: Order Book History Downloads | PolyHistorical',
  metaDescription: 'Download Polymarket historical data in Parquet format. Columnar order book snapshots for BTC, ETH, and SOL — optimized for pandas, Spark, and DuckDB analysis.',
  ogImage: '/og/polymarket-historical-data.png', createdAt: '', updatedAt: '',
  content: `<h2>Why Parquet for Polymarket Data?</h2>
  <p>Apache Parquet is a <strong>columnar storage format</strong> designed for efficient analytical queries. For Polymarket order book data — where you often query specific columns (prices, depths, timestamps) across millions of rows — Parquet offers massive advantages over CSV or JSON.</p>

  <h2>Parquet vs Other Formats</h2>
  <table>
  <thead><tr><th>Feature</th><th>Parquet</th><th>CSV</th><th>JSON</th></tr></thead>
  <tbody>
  <tr><td>File Size</td><td>5-10x smaller (compressed)</td><td>Baseline</td><td>2-3x larger than CSV</td></tr>
  <tr><td>Read Speed</td><td>Column pruning — read only what you need</td><td>Must scan full rows</td><td>Must parse full objects</td></tr>
  <tr><td>Type Safety</td><td>&#10003; Schema embedded</td><td>&#10007; Everything is strings</td><td>Partial (no decimals)</td></tr>
  <tr><td>pandas Loading</td><td>pd.read_parquet() — fast</td><td>pd.read_csv() — slow for large files</td><td>pd.read_json() — slowest</td></tr>
  <tr><td>Nested Data</td><td>&#10003; Supports nested order books</td><td>&#10007; Requires flattening</td><td>&#10003; Native</td></tr>
  <tr><td>Spark / DuckDB</td><td>&#10003; Native support</td><td>Requires parsing</td><td>Requires parsing</td></tr>
  </tbody>
  </table>

  <h2>Data Schema</h2>
  <p>PolyHistorical Parquet exports include the following columns per snapshot:</p>
  <table>
  <thead><tr><th>Column</th><th>Type</th><th>Description</th></tr></thead>
  <tbody>
  <tr><td>time</td><td>timestamp</td><td>Snapshot capture time (UTC)</td></tr>
  <tr><td>price_up</td><td>decimal</td><td>Last trade price for Up outcome</td></tr>
  <tr><td>price_down</td><td>decimal</td><td>Last trade price for Down outcome</td></tr>
  <tr><td>coin_price</td><td>decimal</td><td>BTC/ETH/SOL spot price</td></tr>
  <tr><td>volume</td><td>decimal</td><td>Cumulative market volume</td></tr>
  <tr><td>liquidity</td><td>decimal</td><td>Total available liquidity</td></tr>
  <tr><td>orderbook_up</td><td>struct</td><td>Full L2 bids/asks for Up token</td></tr>
  <tr><td>orderbook_down</td><td>struct</td><td>Full L2 bids/asks for Down token</td></tr>
  </tbody>
  </table>

  <h2>Loading Parquet Data in Python</h2>
  <pre><code>import pandas as pd

# Load Parquet file — only read the columns you need
df = pd.read_parquet(
    "btc-5m-snapshots.parquet",
    columns=["time", "price_up", "price_down", "coin_price"]
)
print(f"Loaded {len(df):,} snapshots")
print(df.head())

# Calculate spread
df["spread"] = df["price_up"] + df["price_down"] - 1
print(f"Mean spread: {df['spread'].mean():.4f}")</code></pre>

  <h2>Using DuckDB for Fast Queries</h2>
  <pre><code>import duckdb

# Query Parquet directly without loading into memory
result = duckdb.sql("""
    SELECT
        date_trunc('hour', time) AS hour,
        avg(price_up) AS avg_up,
        avg(price_down) AS avg_down,
        count(*) AS snapshots
    FROM 'btc-5m-snapshots.parquet'
    GROUP BY 1
    ORDER BY 1
""")
print(result.fetchdf())</code></pre>

  <h2>How to Get Parquet Exports</h2>
  <ol>
  <li><strong>API + conversion:</strong> Fetch snapshots via the PolyHistorical API and save as Parquet using <code>df.to_parquet()</code></li>
  <li><strong>Bulk export:</strong> Use the bulk data export endpoint to download large datasets, then convert to Parquet for offline analysis</li>
  </ol>
  <pre><code>import requests
import pandas as pd

API_KEY = "your_api_key"
slug = "btc-5m-up-down-2026-04-27-1200"

resp = requests.get(
    f"https://api.polyhistorical.com/v1/markets/{slug}/snapshots",
    headers={"X-API-Key": API_KEY},
    params={"include_orderbook": "true"}
)
df = pd.DataFrame(resp.json()["data"])
df.to_parquet(f"{slug}.parquet", index=False)
print(f"Saved {len(df)} snapshots to {slug}.parquet")</code></pre>

  <h2>When to Use Parquet</h2>
  <ul>
  <li><strong>Large-scale backtesting:</strong> Analyzing thousands of markets with millions of snapshots</li>
  <li><strong>Repeated analysis:</strong> Load once, query many times — Parquet reads are 10-100x faster than CSV</li>
  <li><strong>Distributed processing:</strong> Spark, Dask, and other frameworks read Parquet natively</li>
  <li><strong>Storage efficiency:</strong> Archive months of order book history in a fraction of the CSV size</li>
  </ul>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/polymarket-historical-data-download">Polymarket Historical Data Download: CSV, JSON & Bulk Export</a></li>
  <li><a href="/p/bulk-data-export-polymarket-historical">Bulk Data Export Guide</a></li>
  <li><a href="/p/polymarket-l2-order-book">Polymarket L2 Order Book: Full Depth Historical Data</a></li>
  </ul>`,
};

export default page;
