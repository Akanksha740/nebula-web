# PolyHistorical API Authentication and Security Guide

> Complete guide to API key management, authentication flows, and security best practices for PolyHistorical.

*Category: API & Developers*

## Authentication Overview

The PolyHistorical API uses **API key authentication** via the `X-API-Key` header. Every request must include your API key. This guide covers how to generate, manage, and securely use your API keys for accessing Polymarket historical order book data.

## Getting Your API Key

1. Create a free account at [polyhistorical.com](https://polyhistorical.com/dashboard?tab=api-keys) — no credit card required
2. Verify your email
3. Go to your Dashboard and navigate to **API Keys**
4. Click **Create New Key** and give it a descriptive name
5. Copy the key immediately — it will not be shown again

## API Key Limits by Plan

| Plan | Max API Keys |
| --- | --- |
| Starter (Free) | 1 |
| Pro ($11/mo) | 3 |
| Enterprise | 33 |

## Using Your API Key

Include the key in the `X-API-Key` header with every request:

```
curl -H "X-API-Key: nb_your_api_key_here" \\
  "https://api.polyhistorical.com/v1/markets?coin=BTC&limit=5"
```

```
# Python
import requests
headers = {"X-API-Key": "nb_your_api_key_here"}
response = requests.get(
    "https://api.polyhistorical.com/v1/markets",
    params={"coin": "BTC", "limit": 5},
    headers=headers
)
```

## Security Best Practices

### Do

- Store API keys in **environment variables**, never in source code
- Use a secrets manager (AWS Secrets Manager, HashiCorp Vault) in production
- Create **separate keys** for development and production
- Rotate keys periodically
- Revoke unused keys from your dashboard

### Do Not

- Commit API keys to version control (add to .gitignore)
- Expose keys in client-side JavaScript or browser requests
- Share keys between team members — each person should have their own
- Log API keys in application logs or error messages

## Error Responses

| Status Code | Error Code | Meaning |
| --- | --- | --- |
| 401 | UNAUTHORIZED | Missing or invalid API key |
| 403 | TIER_ACCESS_DENIED | Feature requires a higher plan |
| 429 | RATE_LIMIT_EXCEEDED | Too many requests — implement backoff |

## Related Resources

- [Rate Limiting Best Practices for PolyHistorical API](/p/rate-limiting-best-practices-polyhistorical)
- [Polymarket Historical Data API Documentation](/p/polymarket-historical-data-api-documentation)
- [Bulk Data Export Guide: Download Polymarket Historical Data](/p/bulk-data-export-polymarket-historical)

---
Source: https://polyhistorical.com/p/polyhistorical-api-authentication-guide
