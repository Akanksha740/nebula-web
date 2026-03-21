import { useState } from 'react';
import {
  Book,
  Code,
  Server,
  Database,
  Key,
  Zap,
  Copy,
  Check,
  Heart,
  User,
  Settings,
} from 'lucide-react';

const sections = [
  { id: 'getting-started', label: 'Getting Started', icon: Book },
  { id: 'authentication', label: 'Authentication', icon: Key },
  { id: 'api', label: 'API Reference', icon: Server },
  { id: 'health', label: 'Health', icon: Heart },
  { id: 'auth-endpoints', label: 'Auth Endpoints', icon: User },
  { id: 'account-endpoints', label: 'Account Endpoints', icon: Settings },
  { id: 'market-endpoints', label: 'Market Endpoints', icon: Database },
  { id: 'examples', label: 'Code Examples', icon: Code },
  { id: 'rate-limits', label: 'Rate Limits', icon: Zap },
];

export function Docs() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <nav className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold mb-4">Documentation</h2>
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-muted hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <section.icon className="w-4 h-4" />
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Content */}
          <main className="flex-1 min-w-0">
            {/* Getting Started */}
            <section id="getting-started" className="mb-16">
              <h1 className="text-3xl font-bold mb-4">Getting Started</h1>
              <p className="text-text-muted mb-6">
                Welcome to the PolyHistorical API documentation. This guide will help you get started
                with accessing historical Polymarket data for your backtesting and analysis needs.
              </p>

              <div className="card p-6 mb-6">
                <h3 className="font-semibold mb-4">Quick Start</h3>
                <ol className="space-y-4 text-text-primary">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">1</span>
                    <span>Register an account and get your JWT token</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">2</span>
                    <span>Create an API key for programmatic access</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">3</span>
                    <span>Make your first API request to list available markets</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">4</span>
                    <span>Fetch snapshots for a specific market to get historical order book data</span>
                  </li>
                </ol>
              </div>

              <div className="card p-6">
                <h3 className="font-semibold mb-4">Base URL</h3>
                <CodeBlock
                  id="base-url"
                  code="https://api.polyhistorical.com/v1"
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />
              </div>
            </section>

            {/* Authentication */}
            <section id="authentication" className="mb-16">
              <h2 className="text-2xl font-bold mb-4">Authentication</h2>
              <p className="text-text-muted mb-6">
                The API supports two authentication methods: JWT Bearer tokens (obtained via login) and API keys.
                The free tier doesn't require authentication for market endpoints. For Pro and Enterprise plans,
                include your credentials in the request header.
              </p>

              <div className="card p-6 mb-6">
                <h3 className="font-semibold mb-4">JWT Bearer Token</h3>
                <p className="text-text-muted mb-4">
                  Obtain a token by registering or logging in, then include it in the Authorization header.
                </p>
                <CodeBlock
                  id="auth-jwt"
                  code={`curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  https://api.polyhistorical.com/v1/auth/me`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />
              </div>

              <div className="card p-6">
                <h3 className="font-semibold mb-4">API Key</h3>
                <p className="text-text-muted mb-4">
                  Create an API key from your account, then include it in the Authorization header.
                </p>
                <CodeBlock
                  id="auth-apikey"
                  code={`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.polyhistorical.com/v1/markets?coin=btc`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />
              </div>
            </section>

            {/* API Reference */}
            <section id="api" className="mb-16">
              <h2 className="text-2xl font-bold mb-4">API Reference</h2>
              <p className="text-text-muted mb-6">
                All API responses are in JSON format. Timestamps are in ISO 8601 format (UTC).
                Authenticated endpoints wrap responses in a standard envelope.
              </p>

              <div className="space-y-4">
                <div className="card p-6">
                  <h3 className="font-semibold mb-2">Standard Response Format</h3>
                  <p className="text-text-muted mb-4">
                    Auth and account endpoints return responses wrapped in a standard envelope with success status, data, and timestamp.
                  </p>
                  <CodeBlock
                    id="response-format"
                    code={`{
  "success": true,
  "data": { ... },
  "message": "Optional message",
  "timestamp": "2026-03-15T12:00:00Z"
}`}
                    copiedCode={copiedCode}
                    onCopy={copyCode}
                  />
                </div>

                <div className="card p-6">
                  <h3 className="font-semibold mb-2">Error Response Format</h3>
                  <CodeBlock
                    id="error-format"
                    code={`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format"
  },
  "timestamp": "2026-03-15T12:00:00Z"
}`}
                    copiedCode={copiedCode}
                    onCopy={copyCode}
                  />
                </div>
              </div>
            </section>

            {/* Health */}
            <section id="health" className="mb-16">
              <h2 className="text-2xl font-bold mb-4">Health</h2>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-1 bg-accent-green/20 text-accent-green text-xs font-semibold rounded">GET</span>
                  <code className="text-primary">/v1/health</code>
                </div>
                <p className="text-text-muted mb-4">
                  Check API health status. No authentication required.
                </p>

                <h4 className="font-semibold mb-2">Example Request</h4>
                <CodeBlock
                  id="health-request"
                  code={`curl "https://api.polyhistorical.com/v1/health"`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />

                <h4 className="font-semibold mt-4 mb-2">Example Response</h4>
                <CodeBlock
                  id="health-response"
                  code={`{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2026-03-15T12:00:00Z",
    "version": "1.0.0"
  },
  "timestamp": "2026-03-15T12:00:00Z"
}`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />
              </div>
            </section>

            {/* Auth Endpoints */}
            <section id="auth-endpoints" className="mb-16">
              <h2 className="text-2xl font-bold mb-4">Auth Endpoints</h2>

              {/* Register */}
              <div className="card p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-1 bg-accent-yellow/20 text-accent-yellow text-xs font-semibold rounded">POST</span>
                  <code className="text-primary">/v1/auth/register</code>
                </div>
                <p className="text-text-muted mb-4">
                  Register a new account. Returns a JWT token and user details.
                </p>

                <h4 className="font-semibold mb-2">Request Body</h4>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 pr-4 text-text-muted">Field</th>
                        <th className="text-left py-2 pr-4 text-text-muted">Type</th>
                        <th className="text-left py-2 pr-4 text-text-muted">Required</th>
                        <th className="text-left py-2 text-text-muted">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4"><code>email</code></td>
                        <td className="py-2 pr-4">string</td>
                        <td className="py-2 pr-4">Yes</td>
                        <td className="py-2 text-text-muted">Valid email address</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4"><code>password</code></td>
                        <td className="py-2 pr-4">string</td>
                        <td className="py-2 pr-4">Yes</td>
                        <td className="py-2 text-text-muted">8-100 characters</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4"><code>companyName</code></td>
                        <td className="py-2 pr-4">string</td>
                        <td className="py-2 pr-4">No</td>
                        <td className="py-2 text-text-muted">Company name (max 255 chars)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="font-semibold mb-2">Example Request</h4>
                <CodeBlock
                  id="register-request"
                  code={`curl -X POST "https://api.polyhistorical.com/v1/auth/register" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "securepassword",
    "companyName": "Acme Trading"
  }'`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />

                <h4 className="font-semibold mt-4 mb-2">Example Response</h4>
                <CodeBlock
                  id="register-response"
                  code={`{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "tokenType": "Bearer",
    "expiresIn": 86400,
    "customer": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "companyName": "Acme Trading",
      "tier": "FREE",
      "isActive": true,
      "emailVerified": false,
      "createdAt": "2026-03-15T12:00:00Z"
    }
  },
  "message": "Registration successful",
  "timestamp": "2026-03-15T12:00:00Z"
}`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />
              </div>

              {/* Login */}
              <div className="card p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-1 bg-accent-yellow/20 text-accent-yellow text-xs font-semibold rounded">POST</span>
                  <code className="text-primary">/v1/auth/login</code>
                </div>
                <p className="text-text-muted mb-4">
                  Login to an existing account. Returns a JWT token and user details.
                </p>

                <h4 className="font-semibold mb-2">Request Body</h4>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 pr-4 text-text-muted">Field</th>
                        <th className="text-left py-2 pr-4 text-text-muted">Type</th>
                        <th className="text-left py-2 pr-4 text-text-muted">Required</th>
                        <th className="text-left py-2 text-text-muted">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4"><code>email</code></td>
                        <td className="py-2 pr-4">string</td>
                        <td className="py-2 pr-4">Yes</td>
                        <td className="py-2 text-text-muted">Registered email address</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4"><code>password</code></td>
                        <td className="py-2 pr-4">string</td>
                        <td className="py-2 pr-4">Yes</td>
                        <td className="py-2 text-text-muted">Account password</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="font-semibold mb-2">Example Request</h4>
                <CodeBlock
                  id="login-request"
                  code={`curl -X POST "https://api.polyhistorical.com/v1/auth/login" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "securepassword"
  }'`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />

                <h4 className="font-semibold mt-4 mb-2">Example Response</h4>
                <CodeBlock
                  id="login-response"
                  code={`{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "tokenType": "Bearer",
    "expiresIn": 86400,
    "customer": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "companyName": "Acme Trading",
      "tier": "PRO",
      "isActive": true,
      "emailVerified": true,
      "createdAt": "2026-03-01T10:00:00Z"
    }
  },
  "timestamp": "2026-03-15T12:00:00Z"
}`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />
              </div>

              {/* Get Current User */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-1 bg-accent-green/20 text-accent-green text-xs font-semibold rounded">GET</span>
                  <code className="text-primary">/v1/auth/me</code>
                </div>
                <p className="text-text-muted mb-4">
                  Get the current authenticated user's details. Requires JWT authentication.
                </p>

                <h4 className="font-semibold mb-2">Example Request</h4>
                <CodeBlock
                  id="me-request"
                  code={`curl "https://api.polyhistorical.com/v1/auth/me" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />

                <h4 className="font-semibold mt-4 mb-2">Example Response</h4>
                <CodeBlock
                  id="me-response"
                  code={`{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "companyName": "Acme Trading",
    "tier": "PRO",
    "isActive": true,
    "emailVerified": true,
    "createdAt": "2026-03-01T10:00:00Z"
  },
  "timestamp": "2026-03-15T12:00:00Z"
}`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />
              </div>
            </section>

            {/* Account Endpoints */}
            <section id="account-endpoints" className="mb-16">
              <h2 className="text-2xl font-bold mb-4">Account Endpoints</h2>
              <p className="text-text-muted mb-6">
                All account endpoints require JWT authentication.
              </p>

              {/* List API Keys */}
              <div className="card p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-1 bg-accent-green/20 text-accent-green text-xs font-semibold rounded">GET</span>
                  <code className="text-primary">/v1/account/api-keys</code>
                </div>
                <p className="text-text-muted mb-4">
                  List all API keys for the authenticated user.
                </p>

                <h4 className="font-semibold mb-2">Example Request</h4>
                <CodeBlock
                  id="list-keys-request"
                  code={`curl "https://api.polyhistorical.com/v1/account/api-keys" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />

                <h4 className="font-semibold mt-4 mb-2">Example Response</h4>
                <CodeBlock
                  id="list-keys-response"
                  code={`{
  "success": true,
  "data": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "keyPrefix": "nb_k_abc1",
      "name": "Production Key",
      "permissions": ["READ"],
      "isActive": true,
      "lastUsedAt": "2026-03-15T11:30:00Z",
      "expiresAt": null,
      "createdAt": "2026-03-01T10:00:00Z"
    }
  ],
  "timestamp": "2026-03-15T12:00:00Z"
}`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />
              </div>

              {/* Create API Key */}
              <div className="card p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-1 bg-accent-yellow/20 text-accent-yellow text-xs font-semibold rounded">POST</span>
                  <code className="text-primary">/v1/account/api-keys</code>
                </div>
                <p className="text-text-muted mb-4">
                  Create a new API key. The full key is only returned once - store it securely.
                </p>

                <h4 className="font-semibold mb-2">Request Body</h4>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 pr-4 text-text-muted">Field</th>
                        <th className="text-left py-2 pr-4 text-text-muted">Type</th>
                        <th className="text-left py-2 pr-4 text-text-muted">Required</th>
                        <th className="text-left py-2 text-text-muted">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4"><code>name</code></td>
                        <td className="py-2 pr-4">string</td>
                        <td className="py-2 pr-4">Yes</td>
                        <td className="py-2 text-text-muted">Key name (max 100 chars)</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4"><code>permissions</code></td>
                        <td className="py-2 pr-4">string[]</td>
                        <td className="py-2 pr-4">No</td>
                        <td className="py-2 text-text-muted">Set of permissions for the key</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4"><code>expiresAt</code></td>
                        <td className="py-2 pr-4">string</td>
                        <td className="py-2 pr-4">No</td>
                        <td className="py-2 text-text-muted">Expiration time (ISO 8601)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="font-semibold mb-2">Example Request</h4>
                <CodeBlock
                  id="create-key-request"
                  code={`curl -X POST "https://api.polyhistorical.com/v1/account/api-keys" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Production Key",
    "permissions": ["READ"],
    "expiresAt": "2027-01-01T00:00:00Z"
  }'`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />

                <h4 className="font-semibold mt-4 mb-2">Example Response</h4>
                <CodeBlock
                  id="create-key-response"
                  code={`{
  "success": true,
  "data": {
    "apiKey": "nb_k_abc123def456ghi789...",
    "message": "Store this key securely. It won't be shown again."
  },
  "message": "API key created successfully",
  "timestamp": "2026-03-15T12:00:00Z"
}`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />
              </div>

              {/* Revoke API Key */}
              <div className="card p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-1 bg-accent-red/20 text-accent-red text-xs font-semibold rounded">DELETE</span>
                  <code className="text-primary">/v1/account/api-keys/{'{keyId}'}</code>
                </div>
                <p className="text-text-muted mb-4">
                  Revoke an API key by its ID. This action cannot be undone.
                </p>

                <h4 className="font-semibold mb-2">Path Parameters</h4>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 pr-4 text-text-muted">Parameter</th>
                        <th className="text-left py-2 pr-4 text-text-muted">Type</th>
                        <th className="text-left py-2 text-text-muted">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4"><code>keyId</code></td>
                        <td className="py-2 pr-4">UUID</td>
                        <td className="py-2 text-text-muted">The API key ID to revoke</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="font-semibold mb-2">Example Request</h4>
                <CodeBlock
                  id="revoke-key-request"
                  code={`curl -X DELETE "https://api.polyhistorical.com/v1/account/api-keys/a1b2c3d4-e5f6-7890-abcd-ef1234567890" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />

                <h4 className="font-semibold mt-4 mb-2">Example Response</h4>
                <CodeBlock
                  id="revoke-key-response"
                  code={`{
  "success": true,
  "data": null,
  "message": "API key revoked successfully",
  "timestamp": "2026-03-15T12:00:00Z"
}`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />
              </div>

              {/* Get Usage */}
              <div className="card p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-1 bg-accent-green/20 text-accent-green text-xs font-semibold rounded">GET</span>
                  <code className="text-primary">/v1/account/usage</code>
                </div>
                <p className="text-text-muted mb-4">
                  Get API usage statistics for the authenticated user.
                </p>

                <h4 className="font-semibold mb-2">Example Request</h4>
                <CodeBlock
                  id="usage-request"
                  code={`curl "https://api.polyhistorical.com/v1/account/usage" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />

                <h4 className="font-semibold mt-4 mb-2">Example Response</h4>
                <CodeBlock
                  id="usage-response"
                  code={`{
  "success": true,
  "data": {
    "totalRequests": 15234,
    "requestsToday": 142,
    "requestsThisMonth": 4521,
    "dailyLimit": 50000,
    "monthlyLimit": 1500000,
    "remainingToday": 49858,
    "usagePercentage": 0.28,
    "bytesTransferredToday": 52428800,
    "bytesTransferredThisMonth": 1073741824,
    "tier": "PRO",
    "periodStart": "2026-03-01T00:00:00Z",
    "periodEnd": "2026-03-31T23:59:59Z",
    "resetsAt": "2026-03-16T00:00:00Z"
  },
  "timestamp": "2026-03-15T12:00:00Z"
}`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />
              </div>

              {/* Get Subscription */}
              <div className="card p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-1 bg-accent-green/20 text-accent-green text-xs font-semibold rounded">GET</span>
                  <code className="text-primary">/v1/account/subscription</code>
                </div>
                <p className="text-text-muted mb-4">
                  Get current subscription details for the authenticated user.
                </p>

                <h4 className="font-semibold mb-2">Example Request</h4>
                <CodeBlock
                  id="subscription-request"
                  code={`curl "https://api.polyhistorical.com/v1/account/subscription" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />
              </div>

              {/* Checkout */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-1 bg-accent-yellow/20 text-accent-yellow text-xs font-semibold rounded">POST</span>
                  <code className="text-primary">/v1/account/subscription/checkout</code>
                </div>
                <p className="text-text-muted mb-4">
                  Create a Stripe checkout session to upgrade your subscription.
                </p>

                <h4 className="font-semibold mb-2">Query Parameters</h4>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 pr-4 text-text-muted">Parameter</th>
                        <th className="text-left py-2 pr-4 text-text-muted">Type</th>
                        <th className="text-left py-2 pr-4 text-text-muted">Required</th>
                        <th className="text-left py-2 text-text-muted">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4"><code>tier</code></td>
                        <td className="py-2 pr-4">string</td>
                        <td className="py-2 pr-4">Yes</td>
                        <td className="py-2 text-text-muted">Target tier: PRO or ENTERPRISE</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="font-semibold mb-2">Example Request</h4>
                <CodeBlock
                  id="checkout-request"
                  code={`curl -X POST "https://api.polyhistorical.com/v1/account/subscription/checkout?tier=PRO" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />

                <h4 className="font-semibold mt-4 mb-2">Example Response</h4>
                <CodeBlock
                  id="checkout-response"
                  code={`{
  "success": true,
  "data": {
    "checkoutUrl": "https://checkout.stripe.com/c/pay/cs_live_..."
  },
  "timestamp": "2026-03-15T12:00:00Z"
}`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />
              </div>
            </section>

            {/* Market Endpoints */}
            <section id="market-endpoints" className="mb-16">
              <h2 className="text-2xl font-bold mb-4">Market Endpoints</h2>

              {/* List Markets */}
              <div className="card p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-1 bg-accent-green/20 text-accent-green text-xs font-semibold rounded">GET</span>
                  <code className="text-primary">/v1/markets</code>
                </div>
                <p className="text-text-muted mb-4">
                  List all markets with pagination and filtering options. Results are sorted by start_time descending (newest first).
                </p>

                <h4 className="font-semibold mb-2">Query Parameters</h4>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 pr-4 text-text-muted">Parameter</th>
                        <th className="text-left py-2 pr-4 text-text-muted">Type</th>
                        <th className="text-left py-2 pr-4 text-text-muted">Required</th>
                        <th className="text-left py-2 text-text-muted">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4"><code>coin</code></td>
                        <td className="py-2 pr-4">string</td>
                        <td className="py-2 pr-4">Yes</td>
                        <td className="py-2 text-text-muted">btc</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4"><code>limit</code></td>
                        <td className="py-2 pr-4">integer</td>
                        <td className="py-2 pr-4">No</td>
                        <td className="py-2 text-text-muted">Max results (default: 50, max: 100)</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4"><code>offset</code></td>
                        <td className="py-2 pr-4">integer</td>
                        <td className="py-2 pr-4">No</td>
                        <td className="py-2 text-text-muted">Pagination offset (default: 0)</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4"><code>market_type</code></td>
                        <td className="py-2 pr-4">string</td>
                        <td className="py-2 pr-4">No</td>
                        <td className="py-2 text-text-muted">5m, 15m, 1hr, 4hr, or 24hr</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4"><code>resolved</code></td>
                        <td className="py-2 pr-4">boolean</td>
                        <td className="py-2 pr-4">No</td>
                        <td className="py-2 text-text-muted">Filter by resolved status</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4"><code>start_time</code></td>
                        <td className="py-2 pr-4">string</td>
                        <td className="py-2 pr-4">No</td>
                        <td className="py-2 text-text-muted">Filter markets starting after this time (ms epoch or ISO 8601)</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4"><code>end_time</code></td>
                        <td className="py-2 pr-4">string</td>
                        <td className="py-2 pr-4">No</td>
                        <td className="py-2 text-text-muted">Filter markets starting before this time (ms epoch or ISO 8601)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="font-semibold mb-2">Example Request</h4>
                <CodeBlock
                  id="list-markets"
                  code={`curl "https://api.polyhistorical.com/v1/markets?coin=btc&limit=10&market_type=15m"`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />

                <h4 className="font-semibold mt-4 mb-2">Example Response</h4>
                <CodeBlock
                  id="list-markets-response"
                  code={`{
  "markets": [
    {
      "slug": "btc-updown-15m-1773756000",
      "coin": "BTC",
      "marketType": "15m",
      "marketId": "0x1234...",
      "eventId": "0x5678...",
      "active": true,
      "resolved": false,
      "startTime": "2026-03-15T12:00:00Z",
      "endTime": "2026-03-15T12:15:00Z",
      "btcPriceStart": 84235.42,
      "winner": null,
      "finalVolume": null,
      "resolvedAt": null,
      "conditionId": "0xabcd...",
      "clobTokenUp": "0x1111...",
      "clobTokenDown": "0x2222..."
    }
  ],
  "total": 150,
  "limit": 10,
  "offset": 0
}`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />
              </div>

              {/* Get Market */}
              <div className="card p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-1 bg-accent-green/20 text-accent-green text-xs font-semibold rounded">GET</span>
                  <code className="text-primary">/v1/markets/{'{slug}'}</code>
                </div>
                <p className="text-text-muted mb-4">
                  Get details for a specific market by slug.
                </p>

                <h4 className="font-semibold mb-2">Query Parameters</h4>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 pr-4 text-text-muted">Parameter</th>
                        <th className="text-left py-2 pr-4 text-text-muted">Type</th>
                        <th className="text-left py-2 pr-4 text-text-muted">Required</th>
                        <th className="text-left py-2 text-text-muted">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4"><code>coin</code></td>
                        <td className="py-2 pr-4">string</td>
                        <td className="py-2 pr-4">Yes</td>
                        <td className="py-2 text-text-muted">btc</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="font-semibold mb-2">Example Request</h4>
                <CodeBlock
                  id="get-market"
                  code={`curl "https://api.polyhistorical.com/v1/markets/btc-updown-15m-1773756000?coin=btc"`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />
              </div>

              {/* Get Snapshots */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-1 bg-accent-green/20 text-accent-green text-xs font-semibold rounded">GET</span>
                  <code className="text-primary">/v1/markets/{'{slug}'}/snapshots</code>
                </div>
                <p className="text-text-muted mb-4">
                  Get historical snapshots for a market, including order book data.
                </p>

                <h4 className="font-semibold mb-2">Query Parameters</h4>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 pr-4 text-text-muted">Parameter</th>
                        <th className="text-left py-2 pr-4 text-text-muted">Type</th>
                        <th className="text-left py-2 pr-4 text-text-muted">Default</th>
                        <th className="text-left py-2 text-text-muted">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4"><code>coin</code></td>
                        <td className="py-2 pr-4">string</td>
                        <td className="py-2 pr-4">-</td>
                        <td className="py-2 text-text-muted">Required: btc</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4"><code>include_orderbook</code></td>
                        <td className="py-2 pr-4">boolean</td>
                        <td className="py-2 pr-4">false</td>
                        <td className="py-2 text-text-muted">Include full orderbook data</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4"><code>limit</code></td>
                        <td className="py-2 pr-4">integer</td>
                        <td className="py-2 pr-4">100</td>
                        <td className="py-2 text-text-muted">Max snapshots to return</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-4"><code>offset</code></td>
                        <td className="py-2 pr-4">integer</td>
                        <td className="py-2 pr-4">0</td>
                        <td className="py-2 text-text-muted">Pagination offset</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="font-semibold mb-2">Example Request (without orderbook)</h4>
                <CodeBlock
                  id="get-snapshots"
                  code={`curl "https://api.polyhistorical.com/v1/markets/btc-updown-15m-1773756000/snapshots?coin=btc&limit=10"`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />

                <h4 className="font-semibold mt-4 mb-2">Example Request (with orderbook)</h4>
                <CodeBlock
                  id="get-snapshots-orderbook"
                  code={`curl "https://api.polyhistorical.com/v1/markets/btc-updown-15m-1773756000/snapshots?coin=btc&include_orderbook=true"`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />

                <h4 className="font-semibold mt-4 mb-2">Example Response</h4>
                <CodeBlock
                  id="snapshots-response"
                  code={`{
  "market": {
    "slug": "btc-updown-15m-1773756000",
    "coin": "BTC",
    "marketType": "15m"
  },
  "snapshots": [
    {
      "time": "2026-03-15T12:00:01Z",
      "btc_price": 84235.42,
      "price_up": 0.52,
      "price_down": 0.48,
      "orderbook_up": {
        "bids": [{"price": "0.51", "size": "1250.00"}],
        "asks": [{"price": "0.53", "size": "890.00"}]
      },
      "orderbook_down": {
        "bids": [{"price": "0.47", "size": "980.00"}],
        "asks": [{"price": "0.49", "size": "1100.00"}]
      }
    }
  ],
  "total": 1200,
  "limit": 10,
  "offset": 0
}`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />
              </div>
            </section>

            {/* Code Examples */}
            <section id="examples" className="mb-16">
              <h2 className="text-2xl font-bold mb-4">Code Examples</h2>

              <div className="card p-6 mb-6">
                <h3 className="font-semibold mb-4">Python</h3>
                <CodeBlock
                  id="python-example"
                  code={`import requests

BASE_URL = "https://api.polyhistorical.com/v1"
API_KEY = "YOUR_API_KEY"

headers = {"Authorization": f"Bearer {API_KEY}"}

# Register a new account
register = requests.post(f"{BASE_URL}/auth/register", json={
    "email": "user@example.com",
    "password": "securepassword"
}).json()
token = register["data"]["accessToken"]

# List BTC 15m markets
response = requests.get(f"{BASE_URL}/markets", params={
    "coin": "btc",
    "market_type": "15m",
    "limit": 10
}, headers=headers)
markets = response.json()

# Get snapshots with orderbook
slug = markets["markets"][0]["slug"]
snapshots = requests.get(
    f"{BASE_URL}/markets/{slug}/snapshots",
    params={"coin": "btc", "include_orderbook": True},
    headers=headers
).json()

for snap in snapshots["snapshots"]:
    print(f"{snap['time']}: UP={snap['price_up']} DOWN={snap['price_down']}")

# Check usage stats
usage = requests.get(f"{BASE_URL}/account/usage",
    headers={"Authorization": f"Bearer {token}"}
).json()
print(f"Requests today: {usage['data']['requestsToday']}")`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />
              </div>

              <div className="card p-6 mb-6">
                <h3 className="font-semibold mb-4">JavaScript / Node.js</h3>
                <CodeBlock
                  id="js-example"
                  code={`const BASE_URL = "https://api.polyhistorical.com/v1";
const API_KEY = "YOUR_API_KEY";

const headers = { Authorization: \`Bearer \${API_KEY}\` };

// Register a new account
const register = await fetch(\`\${BASE_URL}/auth/register\`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "user@example.com",
    password: "securepassword"
  })
}).then(r => r.json());

const token = register.data.accessToken;

// List markets
const markets = await fetch(
  \`\${BASE_URL}/markets?coin=btc&market_type=15m\`,
  { headers }
).then(r => r.json());

// Get snapshots with orderbook
const slug = markets.markets[0].slug;
const snapshots = await fetch(
  \`\${BASE_URL}/markets/\${slug}/snapshots?coin=btc&include_orderbook=true\`,
  { headers }
).then(r => r.json());

snapshots.snapshots.forEach(snap => {
  console.log(\`\${snap.time}: UP=\${snap.price_up} DOWN=\${snap.price_down}\`);
});

// Check usage stats
const usage = await fetch(\`\${BASE_URL}/account/usage\`, {
  headers: { Authorization: \`Bearer \${token}\` }
}).then(r => r.json());
console.log(\`Requests today: \${usage.data.requestsToday}\`);`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />
              </div>

              <div className="card p-6">
                <h3 className="font-semibold mb-4">cURL</h3>
                <CodeBlock
                  id="curl-example"
                  code={`# Register
curl -X POST "https://api.polyhistorical.com/v1/auth/register" \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com", "password": "securepassword"}'

# Login
curl -X POST "https://api.polyhistorical.com/v1/auth/login" \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com", "password": "securepassword"}'

# Get current user
curl "https://api.polyhistorical.com/v1/auth/me" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# List all BTC 15m markets
curl "https://api.polyhistorical.com/v1/markets?coin=btc&market_type=15m"

# List markets with time filter
curl "https://api.polyhistorical.com/v1/markets?coin=btc&start_time=2026-03-01T00:00:00Z&end_time=2026-03-15T00:00:00Z"

# Get market details
curl "https://api.polyhistorical.com/v1/markets/btc-updown-15m-1773756000?coin=btc"

# Get snapshots without orderbook (faster)
curl "https://api.polyhistorical.com/v1/markets/btc-updown-15m-1773756000/snapshots?coin=btc"

# Get snapshots with full orderbook data
curl "https://api.polyhistorical.com/v1/markets/btc-updown-15m-1773756000/snapshots?coin=btc&include_orderbook=true"

# Create API key
curl -X POST "https://api.polyhistorical.com/v1/account/api-keys" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "My Key"}'

# List API keys
curl "https://api.polyhistorical.com/v1/account/api-keys" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Check usage
curl "https://api.polyhistorical.com/v1/account/usage" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Health check
curl "https://api.polyhistorical.com/v1/health"`}
                  copiedCode={copiedCode}
                  onCopy={copyCode}
                />
              </div>
            </section>

            {/* Rate Limits */}
            <section id="rate-limits" className="mb-16">
              <h2 className="text-2xl font-bold mb-4">Rate Limits</h2>
              <p className="text-text-muted mb-6">
                API rate limits vary by plan. Exceeding limits returns a 429 status code.
              </p>

              <div className="card p-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 text-text-muted">Plan</th>
                      <th className="text-left py-3 text-text-muted">Requests/minute</th>
                      <th className="text-left py-3 text-text-muted">Requests/day</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-3">Free</td>
                      <td className="py-3">60</td>
                      <td className="py-3">1,000</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3">Pro</td>
                      <td className="py-3">300</td>
                      <td className="py-3">50,000</td>
                    </tr>
                    <tr>
                      <td className="py-3">Enterprise</td>
                      <td className="py-3">Custom</td>
                      <td className="py-3">Unlimited</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

function CodeBlock({
  id,
  code,
  copiedCode,
  onCopy,
}: {
  id: string;
  code: string;
  copiedCode: string | null;
  onCopy: (code: string, id: string) => void;
}) {
  return (
    <div className="relative bg-surface-dark rounded-lg overflow-hidden">
      <button
        onClick={() => onCopy(code, id)}
        className="absolute top-3 right-3 p-1.5 bg-surface-card rounded hover:bg-surface-card-hover transition-colors"
      >
        {copiedCode === id ? (
          <Check className="w-4 h-4 text-accent-green" />
        ) : (
          <Copy className="w-4 h-4 text-text-muted" />
        )}
      </button>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-text-primary">{code}</code>
      </pre>
    </div>
  );
}
