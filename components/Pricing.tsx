"use client";

import React, { useState } from "react";
import { PRICING_TIERS } from "@/lib/mockData";
import { Check, Zap, Shield, ArrowRight } from "lucide-react";
import { playTerminalClick } from "@/lib/soundEffect";

interface PricingProps {
  onSelectTier: (tierName: string) => void;
}

export default function Pricing({ onSelectTier }: PricingProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  const handleToggle = (annual: boolean) => {
    playTerminalClick(1.0);
    setIsAnnual(annual);
  };

  return (
    <section id="pricing" className="py-20 bg-[#05070A] border-b border-terminal-border relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-terminal-panel border border-terminal-border text-xs font-mono tracking-widest text-terminal-amber">
            <span>[SECTION 04]</span>
            <span>INSTITUTIONAL LICENSING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-sans tracking-tight">
            Transparent Pricing. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-terminal-amber to-amber-200">
              No Hidden BPS Markups.
            </span>
          </h2>
          <p className="text-base text-terminal-subtext font-sans">
            Flat software licensing. We do not front-run your orders, mark up spreads, or monetize your order flow.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="pt-4 flex items-center justify-center">
            <div className="p-1 rounded bg-terminal-panel border border-terminal-border flex items-center space-x-1 font-mono text-xs">
              <button
                onClick={() => handleToggle(false)}
                className={`px-4 py-1.5 rounded transition-colors ${
                  !isAnnual
                    ? "bg-terminal-borderBright text-white font-bold"
                    : "text-terminal-muted hover:text-white"
                }`}
              >
                MONTHLY BILLING
              </button>
              <button
                onClick={() => handleToggle(true)}
                className={`px-4 py-1.5 rounded transition-colors flex items-center space-x-1.5 ${
                  isAnnual
                    ? "bg-terminal-amber text-black font-bold shadow-sm"
                    : "text-terminal-muted hover:text-white"
                }`}
              >
                <span>ANNUAL BILLING</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/20 font-extrabold">SAVE 20%</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_TIERS.map((tier) => {
            const isHighlighted = tier.highlight;
            const price = isAnnual ? tier.priceAnnual : tier.priceMonthly;

            return (
              <div
                key={tier.id}
                className={`rounded-lg p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group ${
                  isHighlighted
                    ? "bg-terminal-surface border-2 border-terminal-amber shadow-2xl amber-glow"
                    : "bg-terminal-surface/70 border border-terminal-border hover:border-terminal-borderBright"
                }`}
              >
                {/* Popular Badge */}
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded bg-terminal-amber text-black font-mono text-[10px] font-black tracking-widest uppercase shadow-md">
                    {tier.badge}
                  </div>
                )}

                <div>
                  {/* Tier Title */}
                  <div className="space-y-1 mb-4">
                    <h3 className="font-mono text-lg font-bold text-white uppercase">{tier.name}</h3>
                    <p className="text-xs text-terminal-subtext font-sans min-h-[34px]">{tier.subtitle}</p>
                  </div>

                  {/* Price Display */}
                  <div className="py-4 border-y border-terminal-border/60 mb-6 font-mono">
                    {price !== null ? (
                      <div className="flex items-baseline space-x-1">
                        <span className="text-3xl sm:text-4xl font-black text-white tabular-nums">${price}</span>
                        <span className="text-xs text-terminal-muted">/ month per seat</span>
                      </div>
                    ) : (
                      <div className="text-2xl sm:text-3xl font-black text-terminal-amber tracking-tight">
                        {tier.priceCustom}
                      </div>
                    )}
                    <div className="text-[11px] text-terminal-muted mt-1">
                      {price !== null
                        ? isAnnual
                          ? "Billed annually with institutional SLA"
                          : "Billed monthly, cancel anytime"
                        : "Custom co-location & SLA contract"}
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 mb-8 font-mono text-xs">
                    <div className="text-[10px] text-terminal-muted uppercase tracking-wider font-bold mb-2">
                      INCLUDED IN WORKSTATION:
                    </div>
                    {tier.features.map((feat, i) => (
                      <div key={i} className="flex items-start space-x-2 text-gray-300">
                        <Check className="w-3.5 h-3.5 text-terminal-amber shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    playTerminalClick(1.2);
                    onSelectTier(tier.name);
                  }}
                  className={`w-full py-3 rounded font-mono text-xs font-bold tracking-wider uppercase transition-all duration-150 flex items-center justify-center space-x-2 ${
                    isHighlighted
                      ? "bg-terminal-amber text-black hover:bg-terminal-amberHover shadow-md active:scale-98"
                      : "bg-terminal-panel border border-terminal-border text-white hover:border-terminal-amber/60 hover:text-terminal-amber"
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Enterprise Bottom Guarantee Bar */}
        <div className="mt-12 p-4 rounded bg-terminal-header border border-terminal-border flex flex-wrap items-center justify-between font-mono text-xs text-terminal-subtext gap-3">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-terminal-green" />
            <span className="text-white font-semibold">ALL CONTRACTS BACKED BY 99.999% LATENCY & UPTIME SLA</span>
          </div>
          <div className="text-terminal-muted text-[11px]">
            CUSTOM PROPRIETARY RISK ENGINE ADAPTERS AVAILABLE ON REQUEST
          </div>
        </div>
      </div>
    </section>
  );
}

