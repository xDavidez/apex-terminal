"use client";

import React, { useState } from "react";
import { HEATMAP_ASSETS, VENUES_DATA, HeatmapAsset } from "@/lib/mockData";
import { Search, Filter, Server, Shield, Check, Globe } from "lucide-react";
import { playTerminalClick } from "@/lib/soundEffect";

export default function MarketHeatmap() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedAsset, setSelectedAsset] = useState<HeatmapAsset | null>(HEATMAP_ASSETS[0]);
  const [venueFilter, setVenueFilter] = useState<string>("ALL");

  const categories = ["ALL", "Layer 1", "Layer 2", "DeFi", "AI & Depin", "Infrastructure"];

  const filteredAssets = selectedCategory === "ALL"
    ? HEATMAP_ASSETS
    : HEATMAP_ASSETS.filter((a) => a.category === selectedCategory);

  const filteredVenues = venueFilter === "ALL"
    ? VENUES_DATA
    : VENUES_DATA.filter((v) => v.type === venueFilter);

  const getHeatmapColor = (change: number) => {
    if (change >= 7) return "bg-emerald-950/70 border-emerald-500/70 text-emerald-300";
    if (change >= 3) return "bg-emerald-950/40 border-emerald-600/50 text-emerald-400";
    if (change >= 0) return "bg-emerald-950/20 border-emerald-700/30 text-emerald-400";
    if (change >= -2) return "bg-rose-950/20 border-rose-700/30 text-rose-400";
    return "bg-rose-950/50 border-rose-500/60 text-rose-300";
  };

  return (
    <section id="coverage" className="py-20 bg-terminal-bg border-b border-terminal-border relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-terminal-panel border border-terminal-border text-xs font-mono tracking-widest text-terminal-amber">
            <span>[SECTION 03]</span>
            <span>UNIFIED MARKET COVERAGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-sans tracking-tight">
            Full Market Topology. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-terminal-amber to-amber-200">
              300+ Venues Aggregated.
            </span>
          </h2>
          <p className="text-base text-terminal-subtext font-sans">
            Real-time multi-asset market heatmap and consolidated connectivity matrix spanning Tier-1 centralized order books, decentralized AMMs, and co-located derivatives hubs.
          </p>
        </div>

        {/* Heatmap Section */}
        <div className="p-4 sm:p-6 rounded-lg border border-terminal-border bg-terminal-surface mb-12">
          {/* Heatmap Top Bar & Category Tabs */}
          <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-terminal-border gap-3">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-sm font-bold text-white uppercase">MARKET HEATMAP (24H VOLUME & RETURN)</span>
              <span className="font-mono text-[10px] text-terminal-green px-1.5 py-0.5 rounded bg-terminal-green/10 border border-terminal-green/30">
                LIVE COMPOSITE
              </span>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center gap-1 font-mono text-[11px]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    playTerminalClick(1.0);
                    setSelectedCategory(cat);
                  }}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    selectedCategory === cat
                      ? "bg-terminal-amber text-black font-bold"
                      : "bg-terminal-panel border border-terminal-border text-terminal-subtext hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Interactive Heatmap Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 mb-6">
            {filteredAssets.map((asset) => {
              const isSelected = selectedAsset?.symbol === asset.symbol;
              const colorClasses = getHeatmapColor(asset.change24h);

              return (
                <div
                  key={asset.symbol}
                  onClick={() => {
                    playTerminalClick(1.1);
                    setSelectedAsset(asset);
                  }}
                  className={`p-3 rounded border cursor-pointer transition-all duration-150 flex flex-col justify-between min-h-[92px] ${colorClasses} ${
                    isSelected ? "ring-2 ring-terminal-amber scale-[1.02]" : "hover:scale-[1.01]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-sm font-bold text-white block">{asset.symbol}</span>
                      <span className="text-[10px] text-gray-300 font-sans block truncate max-w-[80px]">{asset.name}</span>
                    </div>
                    <span className="font-mono text-xs font-bold tabular-nums">
                      {asset.change24h >= 0 ? "+" : ""}{asset.change24h.toFixed(2)}%
                    </span>
                  </div>

                  <div className="flex items-end justify-between font-mono text-[10px] pt-2 border-t border-white/10">
                    <span className="text-gray-200 tabular-nums">{asset.price}</span>
                    <span className="text-gray-400 text-[9px] tabular-nums">MCAP {asset.marketCap}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Asset Telemetry Drawer */}
          {selectedAsset && (
            <div className="p-3 bg-terminal-header rounded border border-terminal-border flex flex-wrap items-center justify-between font-mono text-xs gap-3">
              <div className="flex items-center space-x-3">
                <span className="font-bold text-terminal-amber text-sm">{selectedAsset.symbol} // {selectedAsset.name}</span>
                <span className="text-terminal-muted border-l border-terminal-border pl-3">CATEGORY: <span className="text-white">{selectedAsset.category}</span></span>
                <span className="text-terminal-muted hidden sm:inline">24H VOLUME: <span className="text-white">{selectedAsset.volume24h}</span></span>
              </div>
              <div className="flex items-center space-x-3">
                <span>PRICE: <span className="text-white font-bold">{selectedAsset.price}</span></span>
                <span>24H DELTA: <span className={selectedAsset.change24h >= 0 ? "text-terminal-green font-bold" : "text-terminal-red font-bold"}>
                  {selectedAsset.change24h >= 0 ? "+" : ""}{selectedAsset.change24h}%
                </span></span>
              </div>
            </div>
          )}
        </div>

        {/* Supported Venues & Co-Location Connectivity Matrix */}
        <div className="rounded-lg border border-terminal-border bg-terminal-surface overflow-hidden">
          <div className="p-4 bg-terminal-header border-b border-terminal-border flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-mono text-sm font-bold text-white flex items-center space-x-2">
                <Server className="w-4 h-4 text-terminal-amber" />
                <span>SUPPORTED VENUES & CO-LOCATION MATRIX</span>
              </h3>
              <p className="font-mono text-[11px] text-terminal-muted">
                CO-LOCATED ENGINE RELAYS AT EQUINIX NY4, LD4, TY3, AND SG1
              </p>
            </div>

            {/* Venue Filter Tabs */}
            <div className="flex items-center space-x-1.5 font-mono text-[10px]">
              {["ALL", "CEX", "DEX", "Derivatives"].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    playTerminalClick(1.0);
                    setVenueFilter(type);
                  }}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    venueFilter === type
                      ? "bg-terminal-borderBright text-white font-bold border border-terminal-amber/40"
                      : "text-terminal-muted hover:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-terminal-border text-terminal-muted text-[10px] bg-terminal-panel/50">
                  <th className="py-2.5 px-4">EXCHANGE / PROTOCOL</th>
                  <th className="py-2.5 px-4">MARKET TYPE</th>
                  <th className="py-2.5 px-4">LIQUIDITY TIER</th>
                  <th className="py-2.5 px-4">ENGINE LATENCY</th>
                  <th className="py-2.5 px-4">DATA CENTER CROSS-CONNECT</th>
                  <th className="py-2.5 px-4 text-right">FEED STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-terminal-border/40">
                {filteredVenues.map((v, idx) => (
                  <tr key={idx} className="hover:bg-terminal-panel/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-white flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-terminal-green inline-block"></span>
                      <span>{v.name}</span>
                    </td>
                    <td className="py-3 px-4 text-terminal-subtext">{v.type}</td>
                    <td className="py-3 px-4 text-terminal-amber font-semibold">{v.tier}</td>
                    <td className="py-3 px-4 text-terminal-green tabular-nums font-semibold">{v.latency}</td>
                    <td className="py-3 px-4 text-gray-300">{v.location}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-[10px] font-bold text-terminal-green px-2 py-0.5 rounded bg-terminal-green/10 border border-terminal-green/20">
                        ACTIVE 100%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

