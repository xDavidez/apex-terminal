"use client";

import React from "react";
import { Server, Zap, Globe2, ShieldCheck, Activity } from "lucide-react";

export default function StatsProof() {
  const logos = [
    "AURA QUANT CAPITAL",
    "VERTEX PROP TRADING",
    "PARADIGM DYNAMICS",
    "NEXUS MARKET MAKING",
    "CHRONOS DIGITAL ASSETS",
    "TALOS DELTA LABS",
  ];

  const stats = [
    {
      value: "300+",
      label: "LIQUIDITY VENUES",
      sublabel: "Consolidated CEX, DEX & OTC pools",
      icon: Globe2,
    },
    {
      value: "<18μs",
      label: "INTERNAL ROUTER LATENCY",
      sublabel: "Hardware timestamping at NY4 & TY3",
      icon: Zap,
    },
    {
      value: "10,000+",
      label: "ACTIVE DIGITAL ASSETS",
      sublabel: "Perps, spot, options, basis pairs",
      icon: Server,
    },
    {
      value: "$140B+",
      label: "MONTHLY VOLUME ROUTED",
      sublabel: "99.999% SLA during peak cascades",
      icon: Activity,
    },
  ];

  return (
    <section className="border-y border-terminal-border bg-[#05070A] py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Proof Logos Header */}
        <div className="text-center space-y-3 mb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-terminal-muted">
            TRUSTED BY QUANTITATIVE PROP DESKS AND TIER-1 ASSET MANAGERS
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-60">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-gray-400 border border-terminal-border/60 px-3 py-1.5 rounded bg-terminal-panel/30 hover:opacity-100 hover:text-terminal-amber hover:border-terminal-amber/40 transition-all cursor-default"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>

        {/* 4 Quantitative Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded border border-terminal-border bg-terminal-panel/70 hover:border-terminal-amber/40 transition-all duration-200 group relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-2xl sm:text-3xl font-black text-white group-hover:text-terminal-amber transition-colors tabular-nums">
                    {stat.value}
                  </span>
                  <div className="p-2 rounded bg-terminal-bg border border-terminal-border group-hover:border-terminal-amber/40 transition-colors">
                    <Icon className="w-4 h-4 text-terminal-amber" />
                  </div>
                </div>

                <div className="font-mono text-xs font-bold text-gray-300 tracking-wider">
                  {stat.label}
                </div>
                <div className="text-xs text-terminal-muted mt-1 font-sans">
                  {stat.sublabel}
                </div>

                {/* Subtle corner marker */}
                <div className="absolute top-1 right-1 w-1 h-1 bg-terminal-border group-hover:bg-terminal-amber transition-colors" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

