"use client";

import React from "react";
import TickerTape from "./TickerTape";
import HeroTerminal from "./HeroTerminal";
import { ArrowRight, Terminal, Shield, Zap, CheckCircle2 } from "lucide-react";
import { playTerminalClick } from "@/lib/soundEffect";

interface HeroProps {
  onRequestDemo: () => void;
}

export default function Hero({ onRequestDemo }: HeroProps) {
  const handleScrollToDemo = () => {
    playTerminalClick(1.0);
    const elem = document.querySelector("#terminal-demo");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden">
      {/* Real-Time Scrolling Ticker Tape pinned under Navbar */}
      <TickerTape />

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 terminal-grid-bg opacity-30 pointer-events-none" />

      {/* Subtle radial amber gradient in center */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-terminal-amber/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 relative z-10">
        {/* Top Institutional Badge */}
        <div className="flex flex-col items-center text-center space-y-4 mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-terminal-panel border border-terminal-border text-xs font-mono tracking-widest text-terminal-amber">
            <span className="w-1.5 h-1.5 rounded-full bg-terminal-amber animate-pulse"></span>
            <span>THE BLOOMBERG TERMINAL FOR CRYPTO</span>
          </div>

          {/* Primary Punchy Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-sans text-white uppercase max-w-4xl">
            Every Venue. One Screen. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-terminal-amber via-amber-300 to-yellow-500">
              Zero Latency.
            </span>
          </h1>

          {/* One-Line Subhead */}
          <p className="max-w-2xl text-base sm:text-lg text-terminal-subtext font-normal font-sans leading-relaxed">
            Consolidated Level-2 depth, sub-millisecond smart routing, and institutional risk analytics for active prop desks and systematic funds.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => {
                playTerminalClick(1.2);
                onRequestDemo();
              }}
              className="w-full sm:w-auto px-7 py-3 rounded bg-terminal-amber text-black font-mono text-sm font-bold tracking-wider uppercase transition-all duration-150 hover:bg-terminal-amberHover active:scale-95 shadow-lg amber-glow flex items-center justify-center space-x-2"
            >
              <span>Request Workstation Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleScrollToDemo}
              className="w-full sm:w-auto px-6 py-3 rounded bg-terminal-panel border border-terminal-border hover:border-terminal-amber/60 text-gray-200 font-mono text-sm font-semibold tracking-wider uppercase transition-colors flex items-center justify-center space-x-2 hover:text-white"
            >
              <Terminal className="w-4 h-4 text-terminal-amber" />
              <span>Launch Interactive CLI</span>
            </button>
          </div>

          {/* Institutional Trust Bullets */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-3 text-xs font-mono text-terminal-muted">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-terminal-green" />
              <span>Sub-50ms Global Relay</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-terminal-green" />
              <span>Direct FIX 4.4 & WebSocket</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-terminal-green" />
              <span>SOC2 Type II Certified</span>
            </div>
          </div>
        </div>

        {/* Live Workstation Mock Container */}
        <div className="mt-8 sm:mt-10">
          <HeroTerminal />
        </div>
      </div>
    </section>
  );
}

