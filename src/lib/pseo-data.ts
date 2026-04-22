import type { CategoryItem, PseoPageSummary, PseoPageFull } from './api';

// ── Page imports (one file per page) ──
import page_best_coinmarketcap_api_alternative from './pseo-pages/best-coinmarketcap-api-alternative';
import page_best_messari_alternative_prediction_market from './pseo-pages/best-messari-alternative-prediction-market';
import page_best_prediction_market_data_providers_2025 from './pseo-pages/best-prediction-market-data-providers-2025';
import page_bulk_data_export_polymarket_historical from './pseo-pages/bulk-data-export-polymarket-historical';
import page_data_cleaning_prediction_market_backtests from './pseo-pages/data-cleaning-prediction-market-backtests';
import page_historical_polymarket_data from './pseo-pages/historical-polymarket-data';
import page_how_to_read_prediction_market_order_books from './pseo-pages/how-to-read-prediction-market-order-books';
import page_liquidity_analysis_polymarket from './pseo-pages/liquidity-analysis-polymarket';
import page_market_resolution_data_explained from './pseo-pages/market-resolution-data-explained';
import page_mean_reversion_prediction_markets from './pseo-pages/mean-reversion-prediction-markets';
import page_monte_carlo_simulation_prediction_markets from './pseo-pages/monte-carlo-simulation-prediction-markets';
import page_polyhistorical_api_authentication_guide from './pseo-pages/polyhistorical-api-authentication-guide';
import page_polymarket_api_historical_data from './pseo-pages/polymarket-api-historical-data';
import page_polymarket_btc_odds_today from './pseo-pages/polymarket-btc-odds-today';
import page_polymarket_eth_odds_today from './pseo-pages/polymarket-eth-odds-today';
import page_polymarket_sol_odds_today from './pseo-pages/polymarket-sol-odds-today';
import page_polymarket_crypto_odds_today from './pseo-pages/polymarket-crypto-odds-today';
import page_polyhistorical_vs_amberdata from './pseo-pages/polyhistorical-vs-amberdata';
import page_polyhistorical_vs_binance_historical_data from './pseo-pages/polyhistorical-vs-binance-historical-data';
import page_polyhistorical_vs_coingecko_api from './pseo-pages/polyhistorical-vs-coingecko-api';
import page_polyhistorical_vs_cryptocompare from './pseo-pages/polyhistorical-vs-cryptocompare';
import page_polyhistorical_vs_kaiko from './pseo-pages/polyhistorical-vs-kaiko';
import page_polyhistorical_vs_messari from './pseo-pages/polyhistorical-vs-messari';
import page_polyhistorical_vs_polygon_io from './pseo-pages/polyhistorical-vs-polygon-io';
import page_polymarket_historical_data_api from './pseo-pages/polymarket-historical-data-api';
import page_polymarket_historical_data_api_backtesting from './pseo-pages/polymarket-historical-data-api-backtesting';
import page_polymarket_historical_data_api_backtesting_dev from './pseo-pages/polymarket-historical-data-api-backtesting-dev';
import page_polymarket_historical_data_api_documentation from './pseo-pages/polymarket-historical-data-api-documentation';
import page_polymarket_historical_data_api_or_dataset from './pseo-pages/polymarket-historical-data-api-or-dataset';
import page_polymarket_historical_data_availability from './pseo-pages/polymarket-historical-data-availability';
import page_polymarket_historical_data_backtesting from './pseo-pages/polymarket-historical-data-backtesting';
import page_polymarket_historical_data_download from './pseo-pages/polymarket-historical-data-download';
import page_polymarket_historical_data_for_backtesting from './pseo-pages/polymarket-historical-data-for-backtesting';
import page_polymarket_historical_data_github from './pseo-pages/polymarket-historical-data-github';
import page_polymarket_historical_data_guide from './pseo-pages/polymarket-historical-data-guide';
import page_portfolio_risk_analysis_polymarket from './pseo-pages/portfolio-risk-analysis-polymarket';
import page_rate_limiting_best_practices_polyhistorical from './pseo-pages/rate-limiting-best-practices-polyhistorical';
import page_scalping_strategies_polymarket from './pseo-pages/scalping-strategies-polymarket';
import page_sentiment_analysis_polymarket_order_book from './pseo-pages/sentiment-analysis-polymarket-order-book';
import page_spread_trading_prediction_markets from './pseo-pages/spread-trading-prediction-markets';
import page_strategy_evaluation_metrics_prediction_markets from './pseo-pages/strategy-evaluation-metrics-prediction-markets';
import page_time_series_analysis_prediction_markets from './pseo-pages/time-series-analysis-prediction-markets';
import page_understanding_bid_ask_spread_prediction_markets from './pseo-pages/understanding-bid-ask-spread-prediction-markets';
import page_volatility_modeling_prediction_markets from './pseo-pages/volatility-modeling-prediction-markets';
import page_volume_analysis_polymarket_trading from './pseo-pages/volume-analysis-polymarket-trading';
import page_walk_forward_optimization_prediction_markets from './pseo-pages/walk-forward-optimization-prediction-markets';
import page_webhook_integration_polymarket_data from './pseo-pages/webhook-integration-polymarket-data';
import page_polyhistorical_vs_dune_analytics from './pseo-pages/polyhistorical-vs-dune-analytics';
import page_polymarket_historical_data_free_vs_paid from './pseo-pages/polymarket-historical-data-free-vs-paid';
import page_polyhistorical_vs_the_graph from './pseo-pages/polyhistorical-vs-the-graph';
import page_backtesting_prediction_market_strategies from './pseo-pages/backtesting-prediction-market-strategies';
import page_building_polymarket_trading_bot from './pseo-pages/building-polymarket-trading-bot';
import page_academic_research_polymarket_data from './pseo-pages/academic-research-polymarket-data';
import page_market_making_polymarket_order_book from './pseo-pages/market-making-polymarket-order-book';
import page_what_is_polymarket_order_book_data from './pseo-pages/what-is-polymarket-order-book-data';
import page_sub_second_vs_minute_level_market_data from './pseo-pages/sub-second-vs-minute-level-market-data';
import page_polymarket_api_vs_polyhistorical_api from './pseo-pages/polymarket-api-vs-polyhistorical-api';
import page_getting_started_polyhistorical_python from './pseo-pages/getting-started-polyhistorical-python';
import page_polyhistorical_api_javascript_quickstart from './pseo-pages/polyhistorical-api-javascript-quickstart';
import page_best_kaiko_alternative_prediction_market from './pseo-pages/best-kaiko-alternative-prediction-market';
import page_affordable_cryptocompare_alternative from './pseo-pages/affordable-cryptocompare-alternative';
import page_best_free_polymarket_data_api from './pseo-pages/best-free-polymarket-data-api';
import page_how_to_analyze_polymarket_up_down_markets from './pseo-pages/how-to-analyze-polymarket-up-down-markets';
import page_prediction_market_order_book_dynamics from './pseo-pages/prediction-market-order-book-dynamics';
import page_backtesting_framework_polymarket_python from './pseo-pages/backtesting-framework-polymarket-python';
import page_common_backtesting_mistakes_prediction_markets from './pseo-pages/common-backtesting-mistakes-prediction-markets';
import page_polymarket_subsecond_data from './pseo-pages/polymarket-subsecond-data';
import page_polymarket_l2_order_book from './pseo-pages/polymarket-l2-order-book';
import page_polymarket_parquet_data from './pseo-pages/polymarket-parquet-data';

// ── Static seed data — used as fallback when API is unavailable ──

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'a1000000-0000-0000-0000-000000000001',
    name: 'Comparisons',
    slug: 'compare',
    description: 'Side-by-side comparisons of PolyHistorical with other crypto market data providers. See how we stack up on price, quality, and features.',
    metaTitle: 'Crypto Market Data Comparisons | PolyHistorical',
    metaDescription: 'Compare PolyHistorical with Kaiko, CryptoCompare, Amberdata, and other market data providers. See pricing, features, and data quality differences.',
    displayOrder: 1,
    pageCount: 10,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000002',
    name: 'Use Cases',
    slug: 'use-cases',
    description: 'How traders, quants, and developers use Polymarket historical data for backtesting, algo trading, and research.',
    metaTitle: 'Polymarket Data Use Cases | PolyHistorical',
    metaDescription: 'Discover how to use Polymarket historical order book data for backtesting, algo trading, market making, and research.',
    displayOrder: 2,
    pageCount: 8,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000003',
    name: 'Market Data Guides',
    slug: 'market-data',
    description: 'Deep dives into prediction market data, order books, and time-series analysis.',
    metaTitle: 'Prediction Market Data Guides | PolyHistorical',
    metaDescription: 'Learn about prediction market order books, time-series data, snapshot granularity, and how to analyze Polymarket data.',
    displayOrder: 3,
    pageCount: 6,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000004',
    name: 'API & Developers',
    slug: 'api-developers',
    description: 'Integration guides, API comparisons, and developer resources for market data APIs.',
    metaTitle: 'Market Data API Developer Guides | PolyHistorical',
    metaDescription: 'Developer guides for integrating Polymarket historical data APIs. Code examples, SDKs, and best practices.',
    displayOrder: 4,
    pageCount: 7,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000005',
    name: 'Alternatives',
    slug: 'alternatives',
    description: 'PolyHistorical as an alternative to other market data and prediction market platforms.',
    metaTitle: 'Best Alternatives for Crypto Market Data | PolyHistorical',
    metaDescription: 'Looking for alternatives to expensive crypto market data providers? Compare PolyHistorical pricing and features.',
    displayOrder: 5,
    pageCount: 6,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000006',
    name: 'Crypto Trading',
    slug: 'crypto-trading',
    description: 'Guides on crypto prediction market trading strategies and analysis.',
    metaTitle: 'Crypto Prediction Market Trading Guides | PolyHistorical',
    metaDescription: 'Trading strategies, analysis techniques, and insights for crypto prediction markets using historical order book data.',
    displayOrder: 6,
    pageCount: 10,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000007',
    name: 'Backtesting',
    slug: 'backtesting',
    description: 'How to backtest trading strategies using Polymarket historical data.',
    metaTitle: 'Backtest Trading Strategies with Polymarket Data | PolyHistorical',
    metaDescription: 'Step-by-step guides on backtesting prediction market strategies using historical order book snapshots.',
    displayOrder: 7,
    pageCount: 6,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000008',
    name: 'Polymarket Historical Data',
    slug: 'polymarket-historical-data',
    description: 'Everything about Polymarket historical data — free API access, downloads, GitHub resources, backtesting datasets, and documentation. PolyHistorical gives you complete historical order book data at no cost.',
    metaTitle: 'Polymarket Historical Data — Free API, Downloads & Backtesting | PolyHistorical',
    metaDescription: 'Access Polymarket historical data for free. Download datasets, use the API for backtesting, explore GitHub resources, and read full documentation at PolyHistorical.',
    displayOrder: 8,
    pageCount: 16,
    createdAt: '',
    updatedAt: '',
  },
];

// ── Pages by category slug ──

const PAGES_MAP: Record<string, PseoPageSummary[]> = {
  compare: [
    { id: 'b1', title: 'PolyHistorical vs Kaiko: Prediction Market Data Compared', slug: 'polyhistorical-vs-kaiko', excerpt: 'How does PolyHistorical compare to Kaiko for crypto prediction market data? We break down pricing, data granularity, and coverage.', categorySlug: 'compare', categoryName: 'Comparisons' },
    { id: 'b2', title: 'PolyHistorical vs CryptoCompare: Which Has Better Historical Data?', slug: 'polyhistorical-vs-cryptocompare', excerpt: 'Comparing PolyHistorical with CryptoCompare for historical crypto data — coverage, API design, and pricing.', categorySlug: 'compare', categoryName: 'Comparisons' },
    { id: 'b3', title: 'PolyHistorical vs Amberdata: Market Data API Comparison', slug: 'polyhistorical-vs-amberdata', excerpt: 'How PolyHistorical stacks up against Amberdata for crypto market data APIs.', categorySlug: 'compare', categoryName: 'Comparisons' },
    { id: 'b4', title: 'PolyHistorical vs Dune Analytics for Prediction Market Research', slug: 'polyhistorical-vs-dune-analytics', excerpt: 'Comparing PolyHistorical API data with Dune Analytics for Polymarket research and analysis.', categorySlug: 'compare', categoryName: 'Comparisons' },
    { id: 'b5', title: 'Polymarket Historical Data: Free vs Paid API Comparison', slug: 'polymarket-historical-data-free-vs-paid', excerpt: 'Comparing free and paid options for accessing Polymarket historical market data.', categorySlug: 'compare', categoryName: 'Comparisons' },
    { id: 'b6', title: 'PolyHistorical vs The Graph for Polymarket Data', slug: 'polyhistorical-vs-the-graph', excerpt: 'How PolyHistorical compares to The Graph protocol for accessing Polymarket data.', categorySlug: 'compare', categoryName: 'Comparisons' },
    { id: 'b23', title: 'PolyHistorical vs Messari: Prediction Market Data Coverage', slug: 'polyhistorical-vs-messari', excerpt: 'Comparing PolyHistorical and Messari for prediction market data — research tools, coverage, and pricing.', categorySlug: 'compare', categoryName: 'Comparisons' },
    { id: 'b24', title: 'PolyHistorical vs CoinGecko API for Historical Crypto Data', slug: 'polyhistorical-vs-coingecko-api', excerpt: 'How PolyHistorical prediction market data compares to CoinGecko API for historical crypto analysis.', categorySlug: 'compare', categoryName: 'Comparisons' },
    { id: 'b25', title: 'PolyHistorical vs Binance Historical Data Exports', slug: 'polyhistorical-vs-binance-historical-data', excerpt: 'Comparing PolyHistorical order book snapshots with Binance historical data downloads for trading research.', categorySlug: 'compare', categoryName: 'Comparisons' },
    { id: 'b26', title: 'PolyHistorical vs Polygon.io for Market Data APIs', slug: 'polyhistorical-vs-polygon-io', excerpt: 'How PolyHistorical compares to Polygon.io for market data APIs — prediction markets vs equities and crypto.', categorySlug: 'compare', categoryName: 'Comparisons' },
  ],
  'use-cases': [
    { id: 'b7', title: 'Backtesting Prediction Market Strategies with Historical Order Books', slug: 'backtesting-prediction-market-strategies', excerpt: 'Learn how to backtest trading strategies on Polymarket using historical order book data from PolyHistorical.', categorySlug: 'use-cases', categoryName: 'Use Cases' },
    { id: 'b8', title: 'Building a Polymarket Trading Bot with Historical Data', slug: 'building-polymarket-trading-bot', excerpt: 'How to build an automated trading bot for Polymarket using historical order book data for strategy development.', categorySlug: 'use-cases', categoryName: 'Use Cases' },
    { id: 'b9', title: 'Academic Research with Polymarket Historical Order Book Data', slug: 'academic-research-polymarket-data', excerpt: 'How researchers and academics can use Polymarket historical data for market microstructure and prediction market studies.', categorySlug: 'use-cases', categoryName: 'Use Cases' },
    { id: 'b10', title: 'Market Making on Polymarket: Using Order Book History', slug: 'market-making-polymarket-order-book', excerpt: 'How to develop market making strategies for Polymarket using historical order book depth data.', categorySlug: 'use-cases', categoryName: 'Use Cases' },
    { id: 'b27', title: 'Portfolio Risk Analysis with Polymarket Historical Data', slug: 'portfolio-risk-analysis-polymarket', excerpt: 'How to perform portfolio risk analysis on prediction market positions using historical order book data from PolyHistorical.', categorySlug: 'use-cases', categoryName: 'Use Cases' },
    { id: 'b28', title: 'Sentiment Analysis Using Polymarket Order Book Data', slug: 'sentiment-analysis-polymarket-order-book', excerpt: 'How to derive market sentiment signals from Polymarket order book depth and historical bid-ask patterns.', categorySlug: 'use-cases', categoryName: 'Use Cases' },
    { id: 'b29', title: 'Volatility Modeling for Prediction Markets', slug: 'volatility-modeling-prediction-markets', excerpt: 'Build volatility models for Polymarket Up/Down markets using historical order book snapshots from PolyHistorical.', categorySlug: 'use-cases', categoryName: 'Use Cases' },
    { id: 'b30', title: 'Liquidity Analysis for Polymarket Markets', slug: 'liquidity-analysis-polymarket', excerpt: 'How to measure and analyze liquidity in Polymarket prediction markets using historical order book depth data.', categorySlug: 'use-cases', categoryName: 'Use Cases' },
  ],
  'market-data': [
    { id: 'b21', title: 'What is Polymarket Order Book Data?', slug: 'what-is-polymarket-order-book-data', excerpt: 'Understanding order book data in Polymarket prediction markets — what it is, why it matters, and how to access it.', categorySlug: 'market-data', categoryName: 'Market Data Guides' },
    { id: 'b22', title: 'Sub-Second vs Minute-Level Market Data: Why Granularity Matters', slug: 'sub-second-vs-minute-level-market-data', excerpt: 'Why sub-second data granularity gives you an edge in prediction market analysis compared to minute-level snapshots.', categorySlug: 'market-data', categoryName: 'Market Data Guides' },
    { id: 'b31', title: 'How to Read Prediction Market Order Books', slug: 'how-to-read-prediction-market-order-books', excerpt: 'A beginner-friendly guide to reading and interpreting order books in Polymarket prediction markets.', categorySlug: 'market-data', categoryName: 'Market Data Guides' },
    { id: 'b32', title: 'Understanding Bid-Ask Spread in Prediction Markets', slug: 'understanding-bid-ask-spread-prediction-markets', excerpt: 'What the bid-ask spread tells you about Polymarket liquidity, efficiency, and trading opportunities.', categorySlug: 'market-data', categoryName: 'Market Data Guides' },
    { id: 'b33', title: 'Time-Series Analysis for Prediction Market Data', slug: 'time-series-analysis-prediction-markets', excerpt: 'How to apply time-series analysis techniques to Polymarket historical order book data for trend detection and forecasting.', categorySlug: 'market-data', categoryName: 'Market Data Guides' },
    { id: 'b34', title: 'Market Resolution Data Explained: How Polymarket Settles', slug: 'market-resolution-data-explained', excerpt: 'Understanding how Polymarket markets resolve, what settlement data looks like, and how to use resolution history in your analysis.', categorySlug: 'market-data', categoryName: 'Market Data Guides' },
  ],
  'api-developers': [
    { id: 'b14', title: "Polymarket API vs PolyHistorical API: What's the Difference?", slug: 'polymarket-api-vs-polyhistorical-api', excerpt: "Understanding the difference between Polymarket's official API and PolyHistorical's historical data API.", categorySlug: 'api-developers', categoryName: 'API & Developers' },
    { id: 'b15', title: 'Getting Started with PolyHistorical API in Python', slug: 'getting-started-polyhistorical-python', excerpt: 'Quick start guide for accessing Polymarket historical data with Python and the PolyHistorical API.', categorySlug: 'api-developers', categoryName: 'API & Developers' },
    { id: 'b16', title: 'PolyHistorical API JavaScript/Node.js Quick Start', slug: 'polyhistorical-api-javascript-quickstart', excerpt: 'How to integrate PolyHistorical API in your JavaScript or Node.js application for Polymarket data.', categorySlug: 'api-developers', categoryName: 'API & Developers' },
    { id: 'b35', title: 'Rate Limiting Best Practices for PolyHistorical API', slug: 'rate-limiting-best-practices-polyhistorical', excerpt: 'How to handle rate limits efficiently when fetching Polymarket historical data from the PolyHistorical API.', categorySlug: 'api-developers', categoryName: 'API & Developers' },
    { id: 'b36', title: 'Webhook Integration Guide for Polymarket Data', slug: 'webhook-integration-polymarket-data', excerpt: 'Set up real-time webhooks to receive Polymarket order book updates and market events from PolyHistorical.', categorySlug: 'api-developers', categoryName: 'API & Developers' },
    { id: 'b37', title: 'Bulk Data Export Guide: Download Polymarket Historical Data', slug: 'bulk-data-export-polymarket-historical', excerpt: 'How to export large datasets of Polymarket historical order book data in CSV and JSON formats using the PolyHistorical API.', categorySlug: 'api-developers', categoryName: 'API & Developers' },
    { id: 'b38', title: 'PolyHistorical API Authentication and Security Guide', slug: 'polyhistorical-api-authentication-guide', excerpt: 'Complete guide to API key management, authentication flows, and security best practices for PolyHistorical.', categorySlug: 'api-developers', categoryName: 'API & Developers' },
  ],
  alternatives: [
    { id: 'b11', title: 'Best Kaiko Alternative for Prediction Market Data', slug: 'best-kaiko-alternative-prediction-market', excerpt: 'Looking for a Kaiko alternative that covers prediction market data? PolyHistorical offers Polymarket order book history starting at $0.', categorySlug: 'alternatives', categoryName: 'Alternatives' },
    { id: 'b12', title: 'Affordable CryptoCompare Alternative for Historical Data', slug: 'affordable-cryptocompare-alternative', excerpt: 'PolyHistorical offers prediction market historical data at 86% less than CryptoCompare.', categorySlug: 'alternatives', categoryName: 'Alternatives' },
    { id: 'b13', title: 'Best Free Polymarket Data API', slug: 'best-free-polymarket-data-api', excerpt: "PolyHistorical offers the most generous free tier for Polymarket historical data — no credit card required.", categorySlug: 'alternatives', categoryName: 'Alternatives' },
    { id: 'b39', title: 'Best Messari Alternative for Prediction Market Research', slug: 'best-messari-alternative-prediction-market', excerpt: 'Why PolyHistorical is the best Messari alternative for prediction market data, order book history, and backtesting.', categorySlug: 'alternatives', categoryName: 'Alternatives' },
    { id: 'b40', title: 'Best CoinMarketCap API Alternative for Historical Data', slug: 'best-coinmarketcap-api-alternative', excerpt: 'Compare PolyHistorical with CoinMarketCap API for historical crypto and prediction market data access.', categorySlug: 'alternatives', categoryName: 'Alternatives' },
    { id: 'b41', title: 'Best Prediction Market Data Providers in 2025', slug: 'best-prediction-market-data-providers-2025', excerpt: 'A comprehensive ranking of the best prediction market data providers including PolyHistorical, Polymarket API, and more.', categorySlug: 'alternatives', categoryName: 'Alternatives' },
  ],
  'crypto-trading': [
    { id: 'b17', title: 'How to Analyze Polymarket Up/Down Markets', slug: 'how-to-analyze-polymarket-up-down-markets', excerpt: 'A complete guide to analyzing Polymarket BTC and ETH Up/Down prediction markets using historical data.', categorySlug: 'crypto-trading', categoryName: 'Crypto Trading' },
    { id: 'b18', title: 'Understanding Prediction Market Order Book Dynamics', slug: 'prediction-market-order-book-dynamics', excerpt: 'Deep dive into how order books work in crypto prediction markets and what historical patterns reveal.', categorySlug: 'crypto-trading', categoryName: 'Crypto Trading' },
    { id: 'b42', title: 'Scalping Strategies for Polymarket Prediction Markets', slug: 'scalping-strategies-polymarket', excerpt: 'How to develop and backtest scalping strategies on Polymarket using sub-second order book data from PolyHistorical.', categorySlug: 'crypto-trading', categoryName: 'Crypto Trading' },
    { id: 'b43', title: 'Mean Reversion Strategies in Prediction Markets', slug: 'mean-reversion-prediction-markets', excerpt: 'Applying mean reversion trading strategies to Polymarket Up/Down markets using historical order book data.', categorySlug: 'crypto-trading', categoryName: 'Crypto Trading' },
    { id: 'b44', title: 'Volume Analysis for Polymarket Trading', slug: 'volume-analysis-polymarket-trading', excerpt: 'How to analyze trading volume patterns in Polymarket prediction markets to identify opportunities and confirm trends.', categorySlug: 'crypto-trading', categoryName: 'Crypto Trading' },
    { id: 'b45', title: 'Spread Trading Strategies for Prediction Markets', slug: 'spread-trading-prediction-markets', excerpt: 'How to trade spreads between correlated Polymarket prediction markets using historical order book data.', categorySlug: 'crypto-trading', categoryName: 'Crypto Trading' },
    { id: 'b63', title: 'Polymarket BTC Odds Today: Live Bitcoin Up/Down Prediction Markets', slug: 'polymarket-btc-odds-today', excerpt: 'How Polymarket BTC odds work today — live Bitcoin Up/Down markets, how prices reflect probabilities, and how to track historical BTC odds.', categorySlug: 'crypto-trading', categoryName: 'Crypto Trading' },
    { id: 'b64', title: 'Polymarket ETH Odds Today: Live Ethereum Up/Down Prediction Market Lines', slug: 'polymarket-eth-odds-today', excerpt: 'Track Polymarket ETH odds today. Understand how Ethereum Up/Down prediction markets price probability and how to access historical ETH odds.', categorySlug: 'crypto-trading', categoryName: 'Crypto Trading' },
    { id: 'b65', title: 'Polymarket SOL Odds Today: Live Solana Up/Down Prediction Markets', slug: 'polymarket-sol-odds-today', excerpt: 'Polymarket SOL odds today — Solana Up/Down prediction markets are now live on PolyHistorical. Learn how SOL odds work and how to track them historically.', categorySlug: 'crypto-trading', categoryName: 'Crypto Trading' },
    { id: 'b66', title: 'Polymarket Crypto Odds Today: BTC, ETH & SOL Up/Down Markets', slug: 'polymarket-crypto-odds-today', excerpt: 'Track Polymarket crypto odds today across BTC, ETH, and SOL Up/Down prediction markets. Live prices, probability conversion, and historical archives.', categorySlug: 'crypto-trading', categoryName: 'Crypto Trading' },
  ],
  backtesting: [
    { id: 'b19', title: 'Backtesting Framework for Polymarket with Python', slug: 'backtesting-framework-polymarket-python', excerpt: 'Build a complete backtesting framework for Polymarket prediction markets using Python and PolyHistorical data.', categorySlug: 'backtesting', categoryName: 'Backtesting' },
    { id: 'b20', title: 'Common Backtesting Mistakes with Prediction Market Data', slug: 'common-backtesting-mistakes-prediction-markets', excerpt: 'Avoid these common pitfalls when backtesting strategies on Polymarket historical data.', categorySlug: 'backtesting', categoryName: 'Backtesting' },
    { id: 'b46', title: 'Walk-Forward Optimization for Prediction Market Strategies', slug: 'walk-forward-optimization-prediction-markets', excerpt: 'How to use walk-forward optimization to validate trading strategies on Polymarket historical data and avoid overfitting.', categorySlug: 'backtesting', categoryName: 'Backtesting' },
    { id: 'b47', title: 'Monte Carlo Simulation for Prediction Market Backtests', slug: 'monte-carlo-simulation-prediction-markets', excerpt: 'Apply Monte Carlo simulation methods to stress-test your Polymarket trading strategies using historical order book data.', categorySlug: 'backtesting', categoryName: 'Backtesting' },
    { id: 'b48', title: 'Strategy Evaluation Metrics for Prediction Market Backtests', slug: 'strategy-evaluation-metrics-prediction-markets', excerpt: 'Key performance metrics for evaluating backtested prediction market strategies — Sharpe ratio, drawdown, win rate, and more.', categorySlug: 'backtesting', categoryName: 'Backtesting' },
    { id: 'b49', title: 'Data Cleaning for Prediction Market Backtests', slug: 'data-cleaning-prediction-market-backtests', excerpt: 'How to clean and prepare Polymarket historical order book data for accurate backtesting and strategy development.', categorySlug: 'backtesting', categoryName: 'Backtesting' },
  ],
  'polymarket-historical-data': [
    { id: 'b50', title: 'Polymarket Historical Data: Complete Guide to Free Order Book History', slug: 'polymarket-historical-data-guide', excerpt: 'Everything you need to know about accessing Polymarket historical data for free — order book snapshots, API access, and downloadable datasets from PolyHistorical.', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data' },
    { id: 'b51', title: 'Polymarket Historical Data API: Full Documentation & Quick Start', slug: 'polymarket-historical-data-api', excerpt: 'Complete documentation for the Polymarket historical data API. Get started in minutes with free API access to historical order book snapshots from PolyHistorical.', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data' },
    { id: 'b52', title: 'Polymarket Historical Data Download: CSV, JSON & Bulk Export', slug: 'polymarket-historical-data-download', excerpt: 'Download Polymarket historical data in CSV and JSON formats. PolyHistorical offers free bulk exports of historical order book snapshots for offline analysis.', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data' },
    { id: 'b53', title: 'Polymarket Historical Data on GitHub: Open-Source Tools & Libraries', slug: 'polymarket-historical-data-github', excerpt: 'Explore open-source GitHub tools, Python libraries, and community projects for working with Polymarket historical data via PolyHistorical.', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data' },
    { id: 'b54', title: 'Polymarket Historical Data API for Backtesting Trading Strategies', slug: 'polymarket-historical-data-api-backtesting', excerpt: 'Use the Polymarket historical data API from PolyHistorical to backtest prediction market trading strategies with real order book data — completely free.', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data' },
    { id: 'b55', title: 'Polymarket Historical Data for Backtesting: Step-by-Step Guide', slug: 'polymarket-historical-data-for-backtesting', excerpt: 'Step-by-step guide to using Polymarket historical data for backtesting. Build, test, and validate prediction market strategies with free data from PolyHistorical.', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data' },
    { id: 'b56', title: 'Polymarket Historical Data Availability: What Data Exists & How Far Back', slug: 'polymarket-historical-data-availability', excerpt: 'Full breakdown of Polymarket historical data availability — which markets are covered, how far back the data goes, and snapshot granularity on PolyHistorical.', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data' },
    { id: 'b57', title: 'Polymarket Historical Data API for Backtesting: Developer Guide', slug: 'polymarket-historical-data-api-backtesting-dev', excerpt: 'Developer-focused guide to the Polymarket historical data API for backtesting. Code examples in Python and JavaScript using free PolyHistorical endpoints.', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data' },
    { id: 'b58', title: 'Polymarket Historical Data API or Dataset: Which Should You Use?', slug: 'polymarket-historical-data-api-or-dataset', excerpt: 'Should you use the Polymarket historical data API or download a static dataset? Compare both approaches with PolyHistorical for your research and trading needs.', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data' },
    { id: 'b59', title: 'Polymarket Historical Data API Documentation: Endpoints, Auth & Examples', slug: 'polymarket-historical-data-api-documentation', excerpt: 'Full API documentation for Polymarket historical data — endpoints, authentication, rate limits, and code examples. Free access via PolyHistorical.', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data' },
    { id: 'b60', title: 'Polymarket Historical Data for Backtesting: Free Datasets & Strategies', slug: 'polymarket-historical-data-backtesting', excerpt: 'Access free Polymarket historical data for backtesting prediction market strategies. PolyHistorical provides sub-second order book snapshots for BTC and ETH markets.', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data' },
    { id: 'b61', title: 'Historical Polymarket Data: Free Access to Past Order Book Snapshots', slug: 'historical-polymarket-data', excerpt: 'Get free access to historical Polymarket data. PolyHistorical archives every order book snapshot from Polymarket prediction markets so you can analyze past market behavior.', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data' },
    { id: 'b62', title: 'Polymarket API Historical Data: How to Get Past Market Snapshots', slug: 'polymarket-api-historical-data', excerpt: 'Learn how to access Polymarket API historical data through PolyHistorical. Get past order book snapshots, price history, and market data via a free REST API.', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data' },
    { id: 'b67', title: 'Polymarket Subsecond Data: 300ms Order Book Snapshots', slug: 'polymarket-subsecond-data', excerpt: 'Access Polymarket subsecond data with 300ms order book snapshots. PolyHistorical captures full bid/ask depth at sub-second intervals for BTC, ETH, and SOL Up/Down markets.', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data' },
    { id: 'b68', title: 'Polymarket L2 Order Book: Full Depth Historical Data', slug: 'polymarket-l2-order-book', excerpt: 'Access Polymarket L2 order book data — full depth bid/ask snapshots at 300ms intervals for BTC, ETH, and SOL Up/Down markets.', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data' },
    { id: 'b69', title: 'Polymarket Parquet Data: Download Order Book History in Parquet Format', slug: 'polymarket-parquet-data', excerpt: 'Download Polymarket historical order book data in Parquet format. Columnar exports optimized for pandas, Spark, and DuckDB analysis.', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data' },
  ],
};

// ── Full page content (assembled from individual page files) ──

const FULL_PAGES: Record<string, PseoPageFull> = {
  'best-coinmarketcap-api-alternative': page_best_coinmarketcap_api_alternative,
  'best-messari-alternative-prediction-market': page_best_messari_alternative_prediction_market,
  'best-prediction-market-data-providers-2025': page_best_prediction_market_data_providers_2025,
  'bulk-data-export-polymarket-historical': page_bulk_data_export_polymarket_historical,
  'data-cleaning-prediction-market-backtests': page_data_cleaning_prediction_market_backtests,
  'how-to-read-prediction-market-order-books': page_how_to_read_prediction_market_order_books,
  'liquidity-analysis-polymarket': page_liquidity_analysis_polymarket,
  'market-resolution-data-explained': page_market_resolution_data_explained,
  'mean-reversion-prediction-markets': page_mean_reversion_prediction_markets,
  'monte-carlo-simulation-prediction-markets': page_monte_carlo_simulation_prediction_markets,
  'polyhistorical-api-authentication-guide': page_polyhistorical_api_authentication_guide,
  'polyhistorical-vs-amberdata': page_polyhistorical_vs_amberdata,
  'polyhistorical-vs-binance-historical-data': page_polyhistorical_vs_binance_historical_data,
  'polyhistorical-vs-coingecko-api': page_polyhistorical_vs_coingecko_api,
  'polyhistorical-vs-cryptocompare': page_polyhistorical_vs_cryptocompare,
  'polyhistorical-vs-kaiko': page_polyhistorical_vs_kaiko,
  'polyhistorical-vs-messari': page_polyhistorical_vs_messari,
  'polyhistorical-vs-polygon-io': page_polyhistorical_vs_polygon_io,
  'polymarket-historical-data-api': page_polymarket_historical_data_api,
  'polymarket-historical-data-api-backtesting': page_polymarket_historical_data_api_backtesting,
  'polymarket-historical-data-api-backtesting-dev': page_polymarket_historical_data_api_backtesting_dev,
  'polymarket-historical-data-api-documentation': page_polymarket_historical_data_api_documentation,
  'polymarket-historical-data-api-or-dataset': page_polymarket_historical_data_api_or_dataset,
  'polymarket-historical-data-availability': page_polymarket_historical_data_availability,
  'polymarket-historical-data-backtesting': page_polymarket_historical_data_backtesting,
  'polymarket-historical-data-download': page_polymarket_historical_data_download,
  'polymarket-historical-data-for-backtesting': page_polymarket_historical_data_for_backtesting,
  'polymarket-historical-data-github': page_polymarket_historical_data_github,
  'polymarket-historical-data-guide': page_polymarket_historical_data_guide,
  'portfolio-risk-analysis-polymarket': page_portfolio_risk_analysis_polymarket,
  'rate-limiting-best-practices-polyhistorical': page_rate_limiting_best_practices_polyhistorical,
  'scalping-strategies-polymarket': page_scalping_strategies_polymarket,
  'sentiment-analysis-polymarket-order-book': page_sentiment_analysis_polymarket_order_book,
  'spread-trading-prediction-markets': page_spread_trading_prediction_markets,
  'strategy-evaluation-metrics-prediction-markets': page_strategy_evaluation_metrics_prediction_markets,
  'time-series-analysis-prediction-markets': page_time_series_analysis_prediction_markets,
  'understanding-bid-ask-spread-prediction-markets': page_understanding_bid_ask_spread_prediction_markets,
  'volatility-modeling-prediction-markets': page_volatility_modeling_prediction_markets,
  'volume-analysis-polymarket-trading': page_volume_analysis_polymarket_trading,
  'walk-forward-optimization-prediction-markets': page_walk_forward_optimization_prediction_markets,
  'webhook-integration-polymarket-data': page_webhook_integration_polymarket_data,
  'historical-polymarket-data': page_historical_polymarket_data,
  'polymarket-api-historical-data': page_polymarket_api_historical_data,
  'polymarket-btc-odds-today': page_polymarket_btc_odds_today,
  'polymarket-eth-odds-today': page_polymarket_eth_odds_today,
  'polymarket-sol-odds-today': page_polymarket_sol_odds_today,
  'polymarket-crypto-odds-today': page_polymarket_crypto_odds_today,
  'polyhistorical-vs-dune-analytics': page_polyhistorical_vs_dune_analytics,
  'polymarket-historical-data-free-vs-paid': page_polymarket_historical_data_free_vs_paid,
  'polyhistorical-vs-the-graph': page_polyhistorical_vs_the_graph,
  'backtesting-prediction-market-strategies': page_backtesting_prediction_market_strategies,
  'building-polymarket-trading-bot': page_building_polymarket_trading_bot,
  'academic-research-polymarket-data': page_academic_research_polymarket_data,
  'market-making-polymarket-order-book': page_market_making_polymarket_order_book,
  'what-is-polymarket-order-book-data': page_what_is_polymarket_order_book_data,
  'sub-second-vs-minute-level-market-data': page_sub_second_vs_minute_level_market_data,
  'polymarket-api-vs-polyhistorical-api': page_polymarket_api_vs_polyhistorical_api,
  'getting-started-polyhistorical-python': page_getting_started_polyhistorical_python,
  'polyhistorical-api-javascript-quickstart': page_polyhistorical_api_javascript_quickstart,
  'best-kaiko-alternative-prediction-market': page_best_kaiko_alternative_prediction_market,
  'affordable-cryptocompare-alternative': page_affordable_cryptocompare_alternative,
  'best-free-polymarket-data-api': page_best_free_polymarket_data_api,
  'how-to-analyze-polymarket-up-down-markets': page_how_to_analyze_polymarket_up_down_markets,
  'prediction-market-order-book-dynamics': page_prediction_market_order_book_dynamics,
  'backtesting-framework-polymarket-python': page_backtesting_framework_polymarket_python,
  'common-backtesting-mistakes-prediction-markets': page_common_backtesting_mistakes_prediction_markets,
  'polymarket-subsecond-data': page_polymarket_subsecond_data,
  'polymarket-l2-order-book': page_polymarket_l2_order_book,
  'polymarket-parquet-data': page_polymarket_parquet_data,
};

// ── Helper functions ──

export function getCategories(): CategoryItem[] {
  return CATEGORIES;
}

export function getCategoryBySlug(slug: string): CategoryItem | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getPagesByCategory(slug: string): PseoPageSummary[] {
  return PAGES_MAP[slug] || [];
}

export function getAllPages(): PseoPageSummary[] {
  return Object.values(PAGES_MAP).flat();
}

export function getPageBySlug(slug: string): PseoPageFull | undefined {
  // Check full pages first
  if (FULL_PAGES[slug]) return FULL_PAGES[slug];

  // Fallback: build a basic page from summary data
  const all = getAllPages();
  const summary = all.find((p) => p.slug === slug);
  if (!summary) return undefined;

  return {
    ...summary,
    content: `<p>${summary.excerpt || ''}</p>`,
    metaTitle: summary.title,
    metaDescription: summary.excerpt || '',
    ogImage: null,
    createdAt: '',
    updatedAt: '',
  };
}
