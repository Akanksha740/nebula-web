# PolyHistorical API JavaScript/Node.js Quick Start

> How to integrate PolyHistorical API in your JavaScript or Node.js application for Polymarket data.

*Category: API & Developers*

## Prerequisites

- Node.js 18+ (or any modern browser for client-side)
- A free PolyHistorical API key from [polyhistorical.com/signup](/signup)

## Step 1: Fetch Active Markets

```
const API_KEY = "your_api_key";
const BASE = "https://api.polyhistorical.com/v1";

const resp = await fetch(\`\${BASE}/markets?coin=BTC&active=true\`, {
  headers: { "X-API-Key": API_KEY },
});
const { data: markets } = await resp.json();
markets.forEach((m) =>
  console.log(\`\${m.slug} — Up: \${m.price_up}, Down: \${m.price_down}\`)
);
```

## Step 2: Fetch Snapshots with Order Book

```
const slug = markets[0].slug;
const snapResp = await fetch(
  \`\${BASE}/markets/\${slug}/snapshots?include_orderbook=true&limit=10\`,
  { headers: { "X-API-Key": API_KEY } }
);
const { data: snapshots } = await snapResp.json();
snapshots.forEach((snap) => {
  console.log(\`Time: \${snap.time}\`);
  console.log(\`  Up: \${snap.price_up}, Down: \${snap.price_down}\`);
  console.log(\`  Bid levels: \${snap.orderbook_up.bids.length}\`);
});
```

## Step 3: TypeScript Types

```
interface Snapshot {
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
}
```

## Error Handling

```
const resp = await fetch(url, { headers: { "X-API-Key": API_KEY } });
if (!resp.ok) {
  if (resp.status === 429) console.error("Rate limited — back off");
  else if (resp.status === 401) console.error("Invalid API key");
  else console.error(\`Error: \${resp.status}\`);
  return;
}
const data = await resp.json();
```

## Related Resources

- [Python Quick Start Guide](/p/getting-started-polyhistorical-python)
- [Rate Limiting Best Practices](/p/rate-limiting-best-practices-polyhistorical)
- [API Documentation](/p/polymarket-historical-data-api-documentation)

---
Source: https://polyhistorical.com/p/polyhistorical-api-javascript-quickstart
