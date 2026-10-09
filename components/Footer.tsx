"use client";

import React from "react";
import { Terminal, Shield, ArrowUp, Activity } from "lucide-react";
import { playTerminalClick } from "@/lib/soundEffect";

export default function Footer() {
  const scrollToTop = () => {
    playTerminalClick(1.0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#040608] border-t border-terminal-border pt-16 pb-12 font-mono relative z-10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Status & Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between pb-8 mb-10 border-b border-terminal-border/60 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded bg-terminal-panel border border-terminal-border flex items-center justify-center text-terminal-amber">
              ▲
            </div>
            <div>
              <span className="font-bold text-white tracking-wider text-sm">
                APEX <span className="text-terminal-amber">//</span> TERMINAL
              </span>
              <span className="text-terminal-muted block text-[10px]">
                INSTITUTIONAL WORKSTATION SYSTEM
              </span>
            </div>
          </div>

          {/* Infrastructure Health Badge */}
          <div className="flex items-center space-x-3 text-[11px] text-terminal-subtext">
            <span className="flex items-center space-x-1.5 text-terminal-green">
              <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse"></span>
              <span className="font-bold">ALL GLOBAL NODES OPERATIONAL</span>
            </span>
            <span className="text-terminal-border">|</span>
            <span className="text-terminal-muted">GLOBAL P99 LATENCY: 22μs</span>
            <span className="text-terminal-border">|</span>
            <span className="text-terminal-muted">BUILD: 4.8.2-PROD</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded bg-terminal-panel border border-terminal-border text-terminal-muted hover:text-white hover:border-terminal-amber transition-colors flex items-center space-x-1"
            title="Return to Top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-bold">TOP</span>
          </button>
        </div>

        {/* 4 Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-[11px]">
          <div>
            <div className="text-white font-bold uppercase tracking-wider mb-3 border-b border-terminal-border/40 pb-1">
              [01] WORKSTATION
            </div>
            <ul className="space-y-2 text-terminal-muted">
              <li><a href="#features" className="hover:text-terminal-amber transition-colors">Consolidated L2/L3 Books</a></li>
              <li><a href="#features" className="hover:text-terminal-amber transition-colors">Smart Order Routing</a></li>
              <li><a href="#terminal-demo" className="hover:text-terminal-amber transition-colors">Bloomberg CLI Shell</a></li>
              <li><a href="#terminal-demo" className="hover:text-terminal-amber transition-colors">Volatility Surface & Skew</a></li>
              <li><a href="#terminal-demo" className="hover:text-terminal-amber transition-colors">On-Chain Whale Radar</a></li>
              <li><a href="#terminal-demo" className="hover:text-terminal-amber transition-colors">Monte Carlo VaR Risk</a></li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold uppercase tracking-wider mb-3 border-b border-terminal-border/40 pb-1">
              [02] ARCHITECTURE
            </div>
            <ul className="space-y-2 text-terminal-muted">
              <li><a href="#coverage" className="hover:text-terminal-amber transition-colors">Equinix NY4 Cross-Connect</a></li>
              <li><a href="#coverage" className="hover:text-terminal-amber transition-colors">London LD4 Derivatives Hub</a></li>
              <li><a href="#coverage" className="hover:text-terminal-amber transition-colors">Tokyo TY3 Low-Latency Node</a></li>
              <li><a href="#coverage" className="hover:text-terminal-amber transition-colors">FIX 4.4 / 5.0 Direct Drop</a></li>
              <li><a href="#coverage" className="hover:text-terminal-amber transition-colors">High-Throughput WebSocket</a></li>
              <li><a href="#coverage" className="hover:text-terminal-amber transition-colors">Hardware Timestamping</a></li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold uppercase tracking-wider mb-3 border-b border-terminal-border/40 pb-1">
              [03] INSTITUTIONAL
            </div>
            <ul className="space-y-2 text-terminal-muted">
              <li><a href="#pricing" className="hover:text-terminal-amber transition-colors">Systematic Fund Licensing</a></li>
              <li><a href="#pricing" className="hover:text-terminal-amber transition-colors">Prop Desk Pilots</a></li>
              <li><a href="#pricing" className="hover:text-terminal-amber transition-colors">Prime Broker Solutions</a></li>
              <li><a href="#demo" className="hover:text-terminal-amber transition-colors">Request Desk Trial</a></li>
              <li><a href="#demo" className="hover:text-terminal-amber transition-colors">Dedicated Solutions Engineer</a></li>
              <li><a href="#demo" className="hover:text-terminal-amber transition-colors">SLA & Uptime Guarantees</a></li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold uppercase tracking-wider mb-3 border-b border-terminal-border/40 pb-1">
              [04] GOVERNANCE
            </div>
            <ul className="space-y-2 text-terminal-muted">
              <li><a href="#" className="hover:text-terminal-amber transition-colors">SOC2 Type II Report</a></li>
              <li><a href="#" className="hover:text-terminal-amber transition-colors">ISO 27001 Certified</a></li>
              <li><a href="#" className="hover:text-terminal-amber transition-colors">Master Services Agreement</a></li>
              <li><a href="#" className="hover:text-terminal-amber transition-colors">Non-Custodial Architecture</a></li>
              <li><a href="#" className="hover:text-terminal-amber transition-colors">Confidentiality & NDA</a></li>
              <li><a href="#" className="hover:text-terminal-amber transition-colors">Security Incident Response</a></li>
            </ul>
          </div>
        </div>

        {/* Risk Disclaimer & Legal Block */}
        <div className="p-4 rounded bg-[#070A0F] border border-terminal-border/80 text-[10px] text-terminal-muted space-y-2 leading-relaxed">
          <div className="text-terminal-amber font-bold flex items-center space-x-1.5 uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>MANDATORY RISK DISCLOSURE & REGULATORY STATEMENT</span>
          </div>
          <p>
            APEX Terminal Systems Inc. is a financial software and data communications provider. APEX is not a registered investment advisor, broker-dealer, futures commission merchant, commodity trading advisor, custodian, or designated contract market. The software provides consolidated visual interface tooling and routing connectivity to third-party liquidity providers.
          </p>
          <p>
            Trading digital assets, cryptographic currencies, perpetual swaps, and derivative contracts involves substantial risk of rapid loss and is not suitable for every investor. You may lose all of your initial principal capital. Nothing contained within this website, terminal mockups, or demonstration interfaces constitutes financial, legal, tax, or investment advice.
          </p>
          <div className="flex flex-wrap items-center justify-between pt-2 border-t border-terminal-border/40 text-[9px] text-terminal-subtext">
            <span>© 2026 APEX Terminal Systems Inc. All rights reserved. Bloomberg is a registered trademark of Bloomberg Finance L.P., with which APEX is not affiliated.</span>
            <span>ENCRYPTED VIA TLS 1.3 // ZERO ORDER FLOW MONETIZATION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

