# APEX // TERMINAL — The Bloomberg Terminal for Crypto

An institutional-grade, high-performance single-page marketing workstation for **APEX // TERMINAL**. Engineered for systematic hedge funds, proprietary trading desks, and quantitative market makers.

---

## ⚡ Tech Stack & Architecture

- **Framework**: Next.js 14 (App Router, React 18, TypeScript)
- **Styling**: Tailwind CSS with custom institutional terminal palette
  - Near-black background (`#07090C`)
  - Bloomberg amber/gold accents (`#FF9F1C`)
  - Terminal profit green (`#00D27A`)
  - Terminal loss red (`#FF4D5E`)
  - Telemetry cyan (`#00E5FF`)
  - Monospace font integration (`JetBrains Mono`, `IBM Plex Mono`)
- **Charting Engine**: TradingView `lightweight-charts` (Canvas-based, 60fps streaming ticks)
- **Audio Feedback**: Procedural zero-dependency Web Audio API synthesizer for tactile mechanical keyboard clicks
- **Icons**: Lucide React

---

## 🖥️ Page Sections Overview

1. **Sticky Institutional Nav**:
   - Live operational status ping with simulated NY4 latency telemetry (`NY4 14μs | FIX 4.4 ONLINE`).
   - Tactile audio click sound toggle (`AUDIO ON / OFF`).
   - Section anchors and quick "Request Demo" CTA modal trigger.

2. **Real-Time Scrolling Ticker Tape**:
   - Continuous marquee displaying 10+ major crypto assets (BTC, ETH, SOL, BNB, SUI, AVAX, LINK, TAO, RENDER, ARB).
   - Live randomized micro-ticks with momentary green/red flash animations.

3. **Hero Workstation Mock**:
   - Headline: *"EVERY VENUE. ONE SCREEN. ZERO LATENCY."*
   - Interactive multi-panel workstation preview:
     - Real-time candlestick & volume chart with timeframe switcher (`1s`, `5s`, `1m`, `15m`, `1h`, `4h`) powered by TradingView Lightweight Charts.
     - Consolidated Level 2 Order Book with visual depth ladder and real-time spread calculator.
     - Time & Sales streaming tick tape with microsecond buy/sell prints across Binance, Coinbase, Bybit, OKX, and Deribit.

4. **Social Proof & Quantitative Telemetry**:
   - Verified prop desk and quant fund badges (*Aura Quant*, *Vertex Prop*, *Paradigm Dynamics*, *Nexus MM*, *Chronos Digital*, *Talos Delta*).
   - Key stats: **300+** Liquidity Venues, **<18μs** Internal Router Latency, **10,000+** Active Assets, **$140B+** Monthly Volume.

5. **6-Card Feature Grid with Mini Visuals**:
   - Multi-exchange Smart Order Routing (live spread matrix across 4 venues).
   - Quantitative Math & Indicators (OFI +0.84σ, CVD +2,410 BTC, VWAP $68,140).
   - Deep On-Chain & Mempool Radar (live whale tracking, DEX arbitrage detection).
   - Low-Latency News & NLP Sentiment (sentiment score bars on algorithmic wires).
   - Portfolio & Cross-Margin Risk Dashboard (VaR 99%, liquidation distance buffer, portfolio beta).
   - Keyboard-First CLI & Direct FIX 4.4 / WebSocket API.

6. **Interactive Bloomberg CLI Simulator**:
   - Command prompt with live typing, execution feedback, and history buffer.
   - Quick hotkey command chips:
     - `BTC GP`: Bitcoin candlestick momentum, RSI, MACD, and intraday tick bars.
     - `ETH DEPTH`: Aggregated multi-exchange depth ladder and slippage impact simulator.
     - `SOL FLOW`: Solana DEX pool flow radar, Raydium/Orca volumes, and smart money whale tracker.
     - `VOL SURF`: Deribit implied volatility surface, 25-delta call/put skew curves, and term structure.
     - `MACRO CORR`: Cross-asset 90-day rolling correlation matrix (BTC vs ETH, QQQ, SPY, Gold, DXY).
     - `RISK VAR`: Monte Carlo Value-at-Risk simulation and stress test scenarios.

7. **Market Coverage Heatmap & Connectivity Matrix**:
   - Dynamic treemap of 18 top assets colored by 24h performance with click-to-inspect metrics.
   - Supported venues table with latency and data center locations (Equinix NY4, LD4, TY3, SG1).

8. **Transparent Licensing & Pricing**:
   - 3 Tiers: **Pro Workstation** ($490/mo), **Desk / Fund** ($1,850/mo, highlighted), **Institutional / Tier 1** (Custom).
   - Annual billing toggle with automatic 20% discount calculation.

9. **Trader Testimonials**:
   - Verified feedback from Head of Quantitative Trading ($840M AUM), Managing Director of Prop Arbitrage, and Quantitative CIO.

10. **Dual Demo Request Conversion**:
    - Dedicated in-page workstation deployment section.
    - Global accessible modal dialog triggered by all persistent navigation and hero buttons.
    - Fields: Full Name, Institutional Work Email, Firm Name, Desk Classification, AUM Range, Seats Needed, FIX API option.
    - Realistic simulation with ticket ID generation and 2-hour response SLA confirmation.

11. **Regulatory Footer & Risk Disclosure**:
    - Real-time global network node status.
    - Legal compliance, non-custodial disclosures, and mandatory cryptocurrency trading risk warning.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js 18.x or later (tested on Node v24)
- npm 9.x or later

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Start
```bash
npm run build
npm start
```

---

## 🌐 Deployment Options

### Vercel (Recommended)
1. Push repository to GitHub/GitLab.
2. Import project into [Vercel](https://vercel.com).
3. Framework Preset: **Next.js**.
4. Click **Deploy**.

### Hostinger (Shared, Cloud, or WordPress Hosting)
Because APEX is exported as an ultra-fast static web app, it can be deployed on Hostinger with zero server maintenance:
1. Log in to your **Hostinger hPanel** (https://hpanel.hostinger.com).
2. Go to **Websites** -> Select your domain -> Click **Manage**.
3. Under the **Files** section, click **File Manager** (access files of your domain).
4. Navigate into the **`public_html`** folder.
5. If there is a default `default.php` or placeholder file, delete it.
6. Click **Upload** (top right icon) -> Select `c:\TERMINAL\hostinger-deploy.zip` (already created for you).
7. Right-click `hostinger-deploy.zip` in File Manager -> Click **Extract** -> Choose `public_html`.
8. Your terminal landing page is now live on your domain!

### Static Export (GitHub Pages / Cloudflare Pages / AWS S3)
To generate an ultra-fast static bundle (`out/` folder):
1. In `next.config.mjs`, add `output: 'export'`.
2. Run `npm run build`.
3. Deploy the resulting `out` directory to any static hosting provider.

### Docker
```dockerfile
FROM node:20-alpine AS runner
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📜 License & Disclosures
Proprietary software mock developed for APEX Terminal Systems Inc. Not financial advice. Trading digital assets involves significant market risk.

