"use client";

import React, { useState } from "react";
import ChartWidget from "./ChartWidget";
import OrderBookWidget from "./OrderBookWidget";
import TimeAndSalesWidget from "./TimeAndSalesWidget";
import { Terminal, Shield, Zap, Layers, RefreshCw } from "lucide-react";
import { playTerminalClick } from "@/lib/soundEffect";

export default function HeroTerminal() {
  const [activeTab, setActiveTab] = useState<"BTC" | "ETH" | "SOL">("BTC");

  const symbols = {
    BTC: "BTC/USDT (PERPETUAL)",
    ETH: "ETH/USDT (SPOT)",
    SOL: "SOL/USDT (PERPETUAL)",
  };

  const handleTabChange = (tab: "BTC" | "ETH" | "SOL") => {
    playTerminalClick(1.1);
    setActiveTab(tab);
  };

  return (
    <div className="w-full rounded-lg border border-terminal-border bg-terminal-surface shadow-2xl overflow-hidden relative group">
      {/* Outer ambient glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-terminal-amber/20 via-transparent to-terminal-green/20 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-500 pointer-events-none" />

      {/* Terminal Title Bar & Workstation Chrome */}
      <div className="relative z-10 flex flex-wrap items-center justify-between px-3 py-2 bg-terminal-header border-b border-terminal-border gap-2">
        {/* Terminal Window Dots & Profile */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-terminal-red/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-terminal-amber/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-terminal-green/80 inline-block"></span>
          </div>
          <span className="font-mono text-xs font-bold text-gray-300 tracking-wider hidden sm:inline">
            APEX WORKSTATION // DESK 04
          </span>
        </div>

        {/* Workspace Instrument Tabs */}
        <div className="flex items-center space-x-1 font-mono text-[11px]">
          {(["BTC", "ETH", "SOL"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === tab
                  ? "bg-terminal-borderBright text-white font-bold border border-terminal-amber/40 shadow-sm"
                  : "text-terminal-muted hover:text-gray-300 hover:bg-terminal-panel"
              }`}
            >
              [{tab}] {tab === "BTC" ? "PERP" : tab === "ETH" ? "SPOT" : "ARB"}
            </button>
          ))}
        </div>

        {/* Telemetry info */}
        <div className="hidden lg:flex items-center space-x-3 font-mono text-[10px] text-terminal-muted">
          <span className="flex items-center space-x-1 text-terminal-green">
            <span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse"></span>
            <span>FEED: NY4 CROSS-CONNECT</span>
          </span>
          <span className="border-l border-terminal-border pl-2 text-terminal-subtext">
            MEM: 412MB
          </span>
        </div>
      </div>

      {/* Multi-Panel Grid Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-1.5 p-1.5 bg-terminal-bg">
        {/* Left: Main Candlestick Chart (7 cols) */}
        <div className="lg:col-span-7 h-[360px] sm:h-[420px]">
          <ChartWidget symbol={symbols[activeTab]} timeframe="1m" />
        </div>

        {/* Middle: Level 2 Consolidated Order Book (3 cols) */}
        <div className="lg:col-span-3 h-[360px] sm:h-[420px]">
          <OrderBookWidget midPrice={activeTab === "BTC" ? 68420.5 : activeTab === "ETH" ? 3540.2 : 178.65} />
        </div>

        {/* Right: Time and Sales Tape (2 cols) */}
        <div className="lg:col-span-2 h-[360px] sm:h-[420px] hidden sm:block">
          <TimeAndSalesWidget />
        </div>
      </div>

      {/* Bottom Command Status Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between px-3 py-1.5 bg-terminal-panel border-t border-terminal-border font-mono text-[10px] text-terminal-subtext gap-2">
        <div className="flex items-center space-x-3">
          <span className="text-terminal-amber font-bold flex items-center space-x-1">
            <Terminal className="w-3 h-3 inline" />
            <span>APEX CLI:</span>
          </span>
          <span className="text-gray-300">TYPE &apos;HELP&apos; OR PRESS [CTRL+K] FOR COMMAND BAR</span>
        </div>
        <div className="flex items-center space-x-4 text-terminal-muted">
          <span>ORDERS: 0 PENDING</span>
          <span>ROUTER: SMART DUAL-LEG</span>
          <span className="text-terminal-green">SESSION ACTIVE</span>
        </div>
      </div>
    </div>
  );
}

