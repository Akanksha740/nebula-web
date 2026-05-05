# Rate Limiting Best Practices for PolyHistorical API

> How to handle rate limits efficiently when fetching Polymarket historical data from the PolyHistorical API.

*Category: API & Developers*

## Understanding PolyHistorical Rate Limits

PolyHistorical API applies rate limits to ensure fair usage and platform stability. Understanding these limits and designing your application around them is essential for reliable **Polymarket historical data** retrieval.

## Rate Limit Tiers

| Plan | Requests/min | Requests/day |
| --- | --- | --- |
| Starter (Free) | 60 | 1,000 |
| Pro ($11/mo) | 300 | 50,000 |
| Enterprise | Custom | Unlimited |

## Rate Limit Headers

Every API response includes headers to help you track your usage:

- **X-RateLimit-Limit:** Your daily request limit
- **X-RateLimit-Remaining:** Requests remaining today
- **X-RateLimit-Reset:** Unix timestamp when the limit resets (midnight UTC)
- **X-Tier:** Your current plan tier

## Best Practice: Implement Exponential Backoff

When you receive a **429 Too Many Requests** response, implement exponential backoff with jitter. Check the `Retry-After` header for how many seconds to wait.

- First retry: wait 1 second + random 0-300ms
- Second retry: wait 2 seconds + random 0-300ms
- Third retry: wait 4 seconds + random 0-300ms
- Max retries: 5 (then log the failure and move on)

## Best Practice: Use Pagination Wisely

The snapshots endpoint supports up to 1,000 results per request with `limit` and `offset` parameters. Fetch the maximum per call to minimize your total request count.

## Best Practice: Cache Historical Data

Historical order book data is immutable — once a snapshot is recorded, it never changes. Cache responses locally in a database or flat files and only request new data for markets you haven't fetched yet.

## Best Practice: Skip Order Books When Not Needed

Set `include_orderbook=false` (the default) when you only need price data. This significantly reduces response size and latency, helping you stay within rate limits more easily.

## Common Mistakes to Avoid

- Do not poll the API in a tight loop without delays
- Do not re-fetch historical data you have already cached
- Do not ignore 429 responses — they will escalate to longer cooldowns
- Do not request order book data when you only need prices

## Related Resources

- [PolyHistorical API Authentication and Security Guide](/p/polyhistorical-api-authentication-guide)
- [Bulk Data Export Guide: Download Polymarket Historical Data](/p/bulk-data-export-polymarket-historical)
- [Polymarket Historical Data API: Full Documentation](/p/polymarket-historical-data-api)

---
Source: https://polyhistorical.com/p/rate-limiting-best-practices-polyhistorical
