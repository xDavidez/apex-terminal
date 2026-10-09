"use client";

import React, { useState } from "react";
import {
  Globe2,
  LineChart,
  Network,
  Radio,
  ShieldAlert,
  Terminal,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
} from "lucide-react";
import { playTerminalClick } from "@/lib/soundEffect";

export default function FeatureGrid() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const features = [
    {
      id: 1,
      tag: "CORE EXECUTION",
      title: "Real-Time Multi-Exchange Liquidity",
      description:
        "Consolidate Level-2 and Level-3 order books across 300+ centralized exchanges, DEXs, and OTC desks. Automated smart order routing splits clips to minimize market impact.",
      icon: Globe2,
      renderVisual: () => (
        <div className="bg-[#06080D] p-3 rounded border border-terminal-border font-mono text-[11px] space-y-1.5 select-none">
          <div className="flex items-center justify-between text-terminal-muted border-b border-terminal-border/60 pb-1 text-[10px]">
            <span>VENUE</span>
            <span>BID / ASK</span>
            <span>SPREAD</span>
            <span>STATUS</span>
          </div>
          {[
            { venue: "BINANCE", bid: "68,420.0", ask: "68,420.5", spread: "$0.50", latency: "0.8ms", live: true },
            { venue: "COINBASE", bid: "68,419.5", ask: "68,420.5", spread: "$1.00", latency: "0.4ms", live: true },
            { venue: "BYBIT", bid: "68,420.0", ask: "68,421.0", spread: "$1.00", latency: "1.1ms", live: true },
            { venue: "DERIBIT", bid: "68,419.0", ask: "68,420.0", spread: "$1.00", latency: "1.4ms", live: true },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between text-gray-300">
              <span className="text-terminal-amber font-semibold">{row.venue}</span>
              <span className="tabular-nums text-[10px]">
                <span className="text-terminal-green">{row.bid}</span> / <span className="text-terminal-red">{row.ask}</span>
              </span>
              <span className="text-terminal-subtext text-[10px] tabular-nums">{row.spread}</span>
              <span className="text-terminal-green text-[10px] flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-terminal-green inline-block"></span>
                <span>{row.latency}</span>
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 2,
      tag: "QUANT ENGINE",
      title: "Advanced Math & Quantitative Charting",
      description:
        "Over 180 built-in indicators, custom Pine/Python overlays, order flow imbalance (OFI), cumulative volume delta (CVD), and microsecond footprint charts.",
      icon: LineChart,
      renderVisual: () => (
        <div className="bg-[#06080D] p-3 rounded border border-terminal-border font-mono text-[11px] space-y-2 select-none">
          <div className="flex items-center justify-between text-[10px] text-terminal-muted">
            <span className="text-white font-bold">OFI & DELTA ANALYTICS</span>
            <span className="text-terminal-green font-semibold">BULLISH SKEW</span>
          </div>
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between">
              <span className="text-terminal-subtext">Order Flow Imbalance:</span>
              <span className="text-terminal-green font-bold tabular-nums">+0.84 σ</span>
            </div>
            <div className="w-full bg-terminal-panel h-1.5 rounded overflow-hidden">
              <div className="bg-terminal-green h-full" style={{ width: "78%" }} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1 pt-1 text-[9px] text-center">
            <div className="p-1 rounded bg-terminal-panel border border-terminal-border/50">
              <div className="text-terminal-muted">VWAP</div>
              <div className="text-white font-bold">$68,140</div>
            </div>
            <div className="p-1 rounded bg-terminal-panel border border-terminal-border/50">
              <div className="text-terminal-muted">CVD 24H</div>
              <div className="text-terminal-green font-bold">+2,410 BTC</div>
            </div>
            <div className="p-1 rounded bg-terminal-panel border border-terminal-border/50">
              <div className="text-terminal-muted">DELTA SKEW</div>
              <div className="text-terminal-amber font-bold">64.2%</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      tag: "ON-CHAIN INTELLIGENCE",
      title: "Deep On-Chain & Mempool Radar",
      description:
        "Trace smart money flows, bridge rebalances, automated sandwich attacks, and large wallet transfers before they hit centralized order books.",
      icon: Network,
      renderVisual: () => (
        <div className="bg-[#06080D] p-3 rounded border border-terminal-border font-mono text-[10px] space-y-1.5 select-none">
          <div className="flex items-center justify-between border-b border-terminal-border/60 pb-1 text-terminal-muted">
            <span>MEMPOOL FLOW</span>
            <span className="text-terminal-cyan flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-terminal-cyan animate-pulse"></span>
              <span>LIVE SNIFFER</span>
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="p-1.5 rounded bg-terminal-panel/60 border border-terminal-border/50 flex justify-between items-center">
              <div>
                <span className="text-terminal-amber font-bold">WHALE INFLOW: </span>
                <span className="text-white">1,450 BTC ($99.2M)</span>
              </div>
              <span className="text-terminal-muted text-[9px]">2s ago</span>
            </div>
            <div className="p-1.5 rounded bg-terminal-panel/60 border border-terminal-border/50 flex justify-between items-center">
              <div>
                <span className="text-terminal-cyan font-bold">DEX POOL ARB: </span>
                <span className="text-white">Uniswap v3 ↔ Bybit ($3.4M)</span>
              </div>
              <span className="text-terminal-muted text-[9px]">7s ago</span>
            </div>
            <div className="p-1.5 rounded bg-terminal-panel/60 border border-terminal-border/50 flex justify-between items-center">
              <div>
                <span className="text-terminal-green font-bold">BRIDGE MINT: </span>
                <span className="text-white">50M USDC on Solana</span>
              </div>
              <span className="text-terminal-muted text-[9px]">14s ago</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      tag: "SYSTEMATIC FEED",
      title: "Low-Latency News & NLP Sentiment",
      description:
        "Algorithmic wire filtering aggregating Bloomberg, Reuters, regulatory filings, and social chatter with real-time NLP sentiment and volatility classification.",
      icon: Radio,
      renderVisual: () => (
        <div className="bg-[#06080D] p-3 rounded border border-terminal-border font-mono text-[10px] space-y-1.5 select-none">
          <div className="flex items-center justify-between border-b border-terminal-border/60 pb-1 text-terminal-muted">
            <span>ALGORITHMIC NEWS WIRE</span>
            <span>NLP SCORE</span>
          </div>
          {[
            { time: "08:14", text: "BlackRock Spot ETF +$320M net inflow", score: "+0.84", color: "text-terminal-green" },
            { time: "08:10", text: "Deribit 25-delta call skew reaches +4.8", score: "+0.62", color: "text-terminal-green" },
            { time: "07:55", text: "Fed governor notes stablecoin settlement", score: "+0.45", color: "text-terminal-amber" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between space-x-2 py-0.5">
              <span className="text-terminal-muted shrink-0 text-[9px]">{item.time}</span>
              <span className="text-gray-300 truncate text-[10px]">{item.text}</span>
              <span className={`font-bold tabular-nums shrink-0 text-[10px] ${item.color}`}>
                {item.score}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 5,
      tag: "RISK & COMPLIANCE",
      title: "Portfolio & Real-Time Risk Dashboard",
      description:
        "Cross-margin monitoring, Monte Carlo Value-at-Risk (VaR), liquidation buffer alerts, and portfolio delta hedging calculations updated on every tick.",
      icon: ShieldAlert,
      renderVisual: () => (
        <div className="bg-[#06080D] p-3 rounded border border-terminal-border font-mono text-[10px] space-y-2 select-none">
          <div className="flex items-center justify-between text-terminal-muted">
            <span className="text-white font-bold">PORTFOLIO VaR (99%)</span>
            <span className="text-terminal-green font-semibold">NORMAL RISK</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="p-1.5 rounded bg-terminal-panel border border-terminal-border/50">
              <div className="text-terminal-muted">LIQUIDATION DISTANCE</div>
              <div className="text-terminal-green text-sm font-bold tabular-nums">48.2%</div>
            </div>
            <div className="p-1.5 rounded bg-terminal-panel border border-terminal-border/50">
              <div className="text-terminal-muted">PORTFOLIO DELTA</div>
              <div className="text-terminal-amber text-sm font-bold tabular-nums">+0.14 β</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[9px] text-terminal-subtext pt-1">
            <span>MARGIN UTILIZATION: 32.4%</span>
            <span className="text-terminal-green">STRESS TEST: PASSED</span>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      tag: "DEVELOPER FIRST",
      title: "Keyboard-First CLI & Direct FIX API",
      description:
        "Every operation can be executed in under 200 milliseconds via keyboard shortcuts, Bloomberg syntax, or ultra-low latency FIX 4.4 and WebSocket connections.",
      icon: Terminal,
      renderVisual: () => (
        <div className="bg-[#06080D] p-3 rounded border border-terminal-border font-mono text-[10px] space-y-1.5 select-none">
          <div className="flex items-center justify-between text-terminal-muted border-b border-terminal-border/60 pb-1">
            <span className="text-terminal-amber font-bold">APEX REPL CONSOLE</span>
            <span className="text-terminal-green">200μs EXEC</span>
          </div>
          <div className="p-1.5 rounded bg-terminal-panel/80 border border-terminal-border/50 text-gray-300 space-y-1 text-[10px]">
            <div>
              <span className="text-terminal-amber">APEX&gt; </span>
              <span>EXEC TWAP 25 BTC DURATION:30m --smart-route</span>
            </div>
            <div className="text-terminal-green text-[9px]">
              ✓ Order #8192 active: 4 venues engaged. Slippage: &lt;0.2 bps
            </div>
          </div>
          <div className="flex items-center justify-between text-[9px] text-terminal-muted pt-1">
            <span>HOTKEYS: [ALT+O] [CTRL+K]</span>
            <span className="text-terminal-subtext">SDK: PYTHON / RUST / C++</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="py-20 bg-terminal-bg relative z-10 border-b border-terminal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-terminal-panel border border-terminal-border text-xs font-mono tracking-widest text-terminal-amber">
            <span>[SECTION 01]</span>
            <span>INSTITUTIONAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-sans tracking-tight">
            Engineered For Active Desks. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-terminal-amber to-amber-200">
              Not Casual Traders.
            </span>
          </h2>
          <p className="text-base text-terminal-subtext font-sans">
            Six dedicated subsystems designed to deliver continuous execution edge, consolidated liquidity, and sub-millisecond market awareness.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                onMouseEnter={() => {
                  setActiveCard(feature.id);
                  playTerminalClick(0.9);
                }}
                onMouseLeave={() => setActiveCard(null)}
                className={`p-6 rounded-lg border bg-terminal-surface/90 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${
                  activeCard === feature.id
                    ? "border-terminal-amber/60 shadow-xl bg-terminal-panel"
                    : "border-terminal-border hover:border-terminal-borderBright"
                }`}
              >
                {/* Top Card Header */}
                <div className="space-y-3 mb-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold tracking-widest text-terminal-amber px-2 py-0.5 rounded bg-terminal-amber/10 border border-terminal-amber/20">
                      {feature.tag}
                    </span>
                    <Icon className="w-5 h-5 text-terminal-subtext group-hover:text-terminal-amber transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-sans tracking-tight group-hover:text-terminal-amber transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-terminal-subtext font-sans leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Card Mini Visual */}
                <div className="mt-auto pt-2">
                  {feature.renderVisual()}
                </div>

                {/* Subtle corner highlight */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-transparent group-hover:border-terminal-amber transition-colors" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

