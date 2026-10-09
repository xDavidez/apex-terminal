export interface TickerItem {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: string;
  sparkline: number[];
}

export const INITIAL_TICKERS: TickerItem[] = [
  {
    symbol: "BTC/USD",
    name: "Bitcoin",
    price: 68420.5,
    change24h: 3.42,
    high24h: 69150.0,
    low24h: 66200.0,
    volume24h: "$38.4B",
    sparkline: [66200, 66800, 66400, 67200, 67900, 68100, 68420],
  },
  {
    symbol: "ETH/USD",
    name: "Ethereum",
    price: 3540.2,
    change24h: 2.18,
    high24h: 3590.0,
    low24h: 3410.0,
    volume24h: "$19.2B",
    sparkline: [3410, 3440, 3490, 3470, 3510, 3530, 3540],
  },
  {
    symbol: "SOL/USD",
    name: "Solana",
    price: 178.65,
    change24h: 7.84,
    high24h: 182.4,
    low24h: 164.2,
    volume24h: "$8.7B",
    sparkline: [164.2, 168.0, 169.5, 172.0, 175.4, 177.1, 178.65],
  },
  {
    symbol: "BNB/USD",
    name: "BNB",
    price: 592.4,
    change24h: -0.65,
    high24h: 602.0,
    low24h: 588.0,
    volume24h: "$1.4B",
    sparkline: [600, 598, 595, 591, 594, 590, 592.4],
  },
  {
    symbol: "SUI/USD",
    name: "Sui Network",
    price: 2.14,
    change24h: 11.25,
    high24h: 2.22,
    low24h: 1.89,
    volume24h: "$940M",
    sparkline: [1.89, 1.94, 1.98, 2.05, 2.1, 2.12, 2.14],
  },
  {
    symbol: "AVAX/USD",
    name: "Avalanche",
    price: 29.8,
    change24h: -1.42,
    high24h: 30.9,
    low24h: 28.9,
    volume24h: "$480M",
    sparkline: [30.5, 30.2, 29.9, 29.4, 29.6, 29.5, 29.8],
  },
  {
    symbol: "LINK/USD",
    name: "Chainlink",
    price: 13.45,
    change24h: 4.12,
    high24h: 13.8,
    low24h: 12.8,
    volume24h: "$380M",
    sparkline: [12.8, 12.9, 13.1, 13.3, 13.2, 13.4, 13.45],
  },
  {
    symbol: "TAO/USD",
    name: "Bittensor",
    price: 582.1,
    change24h: 6.94,
    high24h: 598.0,
    low24h: 535.0,
    volume24h: "$310M",
    sparkline: [535, 545, 560, 570, 565, 578, 582.1],
  },
  {
    symbol: "RENDER/USD",
    name: "Render",
    price: 6.42,
    change24h: 5.38,
    high24h: 6.65,
    low24h: 6.05,
    volume24h: "$210M",
    sparkline: [6.05, 6.15, 6.22, 6.35, 6.3, 6.38, 6.42],
  },
  {
    symbol: "ARB/USD",
    name: "Arbitrum",
    price: 0.584,
    change24h: -2.15,
    high24h: 0.605,
    low24h: 0.572,
    volume24h: "$195M",
    sparkline: [0.6, 0.595, 0.59, 0.58, 0.586, 0.582, 0.584],
  },
];

export interface OrderBookLevel {
  price: number;
  size: number;
  total: number;
  depthPct: number;
  venue?: string;
}

export function generateOrderBook(midPrice: number): { bids: OrderBookLevel[]; asks: OrderBookLevel[] } {
  const venues = ["BINANCE", "COINBASE", "BYBIT", "OKX", "DERIBIT"];
  const bids: OrderBookLevel[] = [];
  const asks: OrderBookLevel[] = [];
  let bidAccum = 0;
  let askAccum = 0;

  for (let i = 0; i < 9; i++) {
    const spreadStep = (i + 1) * (midPrice > 1000 ? 5 : 0.05);
    const bidPrice = Number((midPrice - spreadStep + (Math.random() * 2 - 1) * 0.5).toFixed(2));
    const bidSize = Number((Math.random() * 2.8 + 0.35).toFixed(3));
    bidAccum += bidSize;
    bids.push({
      price: bidPrice,
      size: bidSize,
      total: Number(bidAccum.toFixed(3)),
      depthPct: Math.min(100, Math.round((bidAccum / 25) * 100)),
      venue: venues[i % venues.length],
    });

    const askPrice = Number((midPrice + spreadStep + (Math.random() * 2 - 1) * 0.5).toFixed(2));
    const askSize = Number((Math.random() * 2.8 + 0.35).toFixed(3));
    askAccum += askSize;
    asks.push({
      price: askPrice,
      size: askSize,
      total: Number(askAccum.toFixed(3)),
      depthPct: Math.min(100, Math.round((askAccum / 25) * 100)),
      venue: venues[(i + 2) % venues.length],
    });
  }

  // Sort asks ascending from best ask down, or asks top-down
  return { bids, asks: asks.reverse() };
}

export interface TradePrint {
  id: string;
  time: string;
  price: number;
  size: number;
  side: "BUY" | "SELL";
  venue: string;
}

export const INITIAL_TRADES: TradePrint[] = [
  { id: "t1", time: "08:14:22.419", price: 68422.5, size: 0.842, side: "BUY", venue: "BINANCE" },
  { id: "t2", time: "08:14:22.391", price: 68422.0, size: 2.15, side: "BUY", venue: "COINBASE" },
  { id: "t3", time: "08:14:21.902", price: 68420.0, size: 0.314, side: "SELL", venue: "DERIBIT" },
  { id: "t4", time: "08:14:21.844", price: 68420.5, size: 1.488, side: "BUY", venue: "BYBIT" },
  { id: "t5", time: "08:14:21.109", price: 68419.5, size: 4.22, side: "SELL", venue: "OKX" },
  { id: "t6", time: "08:14:20.782", price: 68419.0, size: 0.195, side: "SELL", venue: "BINANCE" },
  { id: "t7", time: "08:14:20.551", price: 68421.0, size: 0.76, side: "BUY", venue: "KRAKEN" },
];

export interface HeatmapAsset {
  symbol: string;
  name: string;
  category: "Layer 1" | "Layer 2" | "DeFi" | "AI & Depin" | "Infrastructure";
  marketCap: string;
  marketCapVal: number;
  change24h: number;
  price: string;
  volume24h: string;
}

export const HEATMAP_ASSETS: HeatmapAsset[] = [
  { symbol: "BTC", name: "Bitcoin", category: "Layer 1", marketCap: "$1.35T", marketCapVal: 1350, change24h: 3.42, price: "$68,420", volume24h: "$38.4B" },
  { symbol: "ETH", name: "Ethereum", category: "Layer 1", marketCap: "$426B", marketCapVal: 426, change24h: 2.18, price: "$3,540", volume24h: "$19.2B" },
  { symbol: "SOL", name: "Solana", category: "Layer 1", marketCap: "$84B", marketCapVal: 84, change24h: 7.84, price: "$178.65", volume24h: "$8.7B" },
  { symbol: "BNB", name: "BNB Chain", category: "Layer 1", marketCap: "$87B", marketCapVal: 87, change24h: -0.65, price: "$592.40", volume24h: "$1.4B" },
  { symbol: "SUI", name: "Sui", category: "Layer 1", marketCap: "$6.1B", marketCapVal: 6.1, change24h: 11.25, price: "$2.14", volume24h: "$940M" },
  { symbol: "AVAX", name: "Avalanche", category: "Layer 1", marketCap: "$12.2B", marketCapVal: 12.2, change24h: -1.42, price: "$29.80", volume24h: "$480M" },
  { symbol: "ARB", name: "Arbitrum", category: "Layer 2", marketCap: "$2.4B", marketCapVal: 2.4, change24h: -2.15, price: "$0.584", volume24h: "$195M" },
  { symbol: "OP", name: "Optimism", category: "Layer 2", marketCap: "$1.8B", marketCapVal: 1.8, change24h: 1.44, price: "$1.62", volume24h: "$142M" },
  { symbol: "BASE", name: "Base Ecosystem", category: "Layer 2", marketCap: "$3.9B", marketCapVal: 3.9, change24h: 4.80, price: "N/A", volume24h: "$620M" },
  { symbol: "UNI", name: "Uniswap", category: "DeFi", marketCap: "$4.9B", marketCapVal: 4.9, change24h: 4.75, price: "$8.12", volume24h: "$290M" },
  { symbol: "AAVE", name: "Aave", category: "DeFi", marketCap: "$2.3B", marketCapVal: 2.3, change24h: 6.15, price: "$154.20", volume24h: "$210M" },
  { symbol: "MKR", name: "Maker / Sky", category: "DeFi", marketCap: "$1.6B", marketCapVal: 1.6, change24h: -0.85, price: "$1,720", volume24h: "$85M" },
  { symbol: "TAO", name: "Bittensor", category: "AI & Depin", marketCap: "$4.3B", marketCapVal: 4.3, change24h: 6.94, price: "$582.10", volume24h: "$310M" },
  { symbol: "RENDER", name: "Render", category: "AI & Depin", marketCap: "$2.5B", marketCapVal: 2.5, change24h: 5.38, price: "$6.42", volume24h: "$210M" },
  { symbol: "FET", name: "ASI Alliance", category: "AI & Depin", marketCap: "$3.4B", marketCapVal: 3.4, change24h: 3.20, price: "$1.34", volume24h: "$180M" },
  { symbol: "LINK", name: "Chainlink", category: "Infrastructure", marketCap: "$8.2B", marketCapVal: 8.2, change24h: 4.12, price: "$13.45", volume24h: "$380M" },
  { symbol: "TIA", name: "Celestia", category: "Infrastructure", marketCap: "$1.2B", marketCapVal: 1.2, change24h: -3.80, price: "$5.15", volume24h: "$160M" },
  { symbol: "PYTH", name: "Pyth Network", category: "Infrastructure", marketCap: "$1.4B", marketCapVal: 1.4, change24h: 2.90, price: "$0.38", volume24h: "$95M" },
];

export const VENUES_DATA = [
  { name: "Binance Global", type: "CEX", tier: "Tier 1", latency: "1.2ms", location: "Tokyo TY3" },
  { name: "Coinbase Prime", type: "CEX", tier: "Tier 1", latency: "0.8ms", location: "New York NY4" },
  { name: "OKX Global", type: "CEX", tier: "Tier 1", latency: "1.4ms", location: "Hong Kong HK1" },
  { name: "Bybit Pro", type: "CEX", tier: "Tier 1", latency: "1.1ms", location: "Singapore SG1" },
  { name: "Deribit (Options/Perps)", type: "Derivatives", tier: "Tier 1", latency: "1.8ms", location: "London LD4" },
  { name: "CME Crypto", type: "Institutional", tier: "Tier 1", latency: "0.4ms", location: "Chicago CH4" },
  { name: "Kraken Institutional", type: "CEX", tier: "Tier 1", latency: "1.9ms", location: "Frankfurt FR2" },
  { name: "Hyperliquid L1", type: "DEX", tier: "Tier 1", latency: "18ms", location: "Global Consensus" },
  { name: "Uniswap v3 / v4", type: "DEX", tier: "AMM", latency: "120ms", location: "Ethereum / L2s" },
  { name: "dYdX v4", type: "DEX", tier: "AppChain", latency: "25ms", location: "Cosmos Tendermint" },
];

export const NEWS_FEED = [
  {
    time: "08:12:04",
    headline: "BlackRock IBIT records $320M net inflow; CME Open Interest reaches record $12.4B",
    source: "APEX WIRES",
    sentiment: "+0.84",
    sentimentType: "BULLISH",
    impact: "HIGH",
  },
  {
    time: "08:08:19",
    headline: "Deribit Oct expiry skew tilts calls: 25-delta risk reversal hits 6-month high at +4.8",
    source: "VOL DESK",
    sentiment: "+0.61",
    sentimentType: "BULLISH",
    impact: "MEDIUM",
  },
  {
    time: "07:54:33",
    headline: "Fed Governor notes stablecoin settlement efficiency in cross-border interbank transfers",
    source: "MACRO INTEL",
    sentiment: "+0.45",
    sentimentType: "NEUTRAL",
    impact: "MEDIUM",
  },
  {
    time: "07:41:10",
    headline: "Binance hot wallet rebalance executes: 15,000 BTC transfer to cold storage cluster",
    source: "ON-CHAIN RADAR",
    sentiment: "+0.12",
    sentimentType: "NEUTRAL",
    impact: "LOW",
  },
];

export const PRICING_TIERS = [
  {
    id: "pro",
    name: "Pro Workstation",
    subtitle: "For individual systematic traders, quantitative researchers, and active prop operators.",
    priceMonthly: 490,
    priceAnnual: 390,
    features: [
      "1 Workstation Seat",
      "Full Level-2 Consolidated Order Books",
      "Unified Access to 120+ Exchanges",
      "Sub-50ms WebSocket & REST Feeds",
      "TradingView Chart Engine with Custom Indicators",
      "Bloomberg-Style CLI Command Shell",
      "Standard Historical Tick Data (3 Years)",
      "Standard Email & Discord Quant Support",
    ],
    highlight: false,
    cta: "Start Pro Trial",
  },
  {
    id: "team",
    name: "Desk / Fund",
    subtitle: "For proprietary trading desks, multi-strategy crypto hedge funds, and market makers.",
    priceMonthly: 1850,
    priceAnnual: 1480,
    badge: "MOST POPULAR",
    features: [
      "Up to 5 Synchronized Trader Seats",
      "Full Level-3 Order Book Depth & Market By Order",
      "Unified Access to All 300+ Venues & DEXs",
      "Co-Located Relays (<15ms NY4, TY3, LD4)",
      "On-Chain Mempool Sniffer & Whale Inflow Radar",
      "Real-Time Cross-Exchange Arbitrage Scanner",
      "Portfolio VaR & Dynamic Liquidation Stress Tests",
      "Complete Python & Rust SDK Client Libraries",
      "Dedicated Slack/Telegram Support with 15m SLA",
    ],
    highlight: true,
    cta: "Request Desk Access",
  },
  {
    id: "enterprise",
    name: "Institutional / Tier 1",
    subtitle: "For global prime brokers, high-frequency market makers, and multibillion-dollar asset managers.",
    priceMonthly: null,
    priceAnnual: null,
    priceCustom: "Bespoke / Custom",
    features: [
      "Unlimited Firm Seats & Sub-Accounts",
      "Direct FIX 4.4 / 5.0 Ultra-Low Latency Drop Copies",
      "Bare-Metal NY4 / LD4 / TY3 Cross-Connects",
      "Custom Microsecond Execution Algorithms",
      "Custom Internal Clearing & Settlement Bridges",
      "Full Historical Tick Archive (Since 2017)",
      "SOC2 Type II & ISO 27001 Compliance Reporting",
      "Dedicated Account Quantitative Engineer 24/7/365",
    ],
    highlight: false,
    cta: "Contact Institutional Sales",
  },
];

export const TESTIMONIALS = [
  {
    quote: "APEX consolidated our 14 exchange API feeds into a sub-millisecond unified pipe. We cut execution slippage by 4.2 bps across our delta-neutral books within 72 hours of deployment.",
    author: "Marcus Vance",
    role: "Head of Quantitative Trading",
    firm: "Vance-Alvarez Asset Management ($840M AUM)",
  },
  {
    quote: "The Bloomberg CLI for crypto finally exists. Being able to type `BTC GP` or `ETH DEPTH` and inspect aggregated multi-venue liquidity without lag is an absolute game-changer for our desk.",
    author: "Elena Rostova",
    role: "Managing Director, Prop Arbitrage",
    firm: "Krypton Global Capital",
  },
  {
    quote: "Before APEX, tracking fragmented DEX pool liquidity alongside Binance and Deribit options required four custom internal monitors. APEX unified everything on a single workstation screen.",
    author: "Julian Chen, PhD",
    role: "Chief Investment Officer",
    firm: "Hyperion Systematic Partners",
  },
];

