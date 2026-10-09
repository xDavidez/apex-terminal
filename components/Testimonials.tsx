"use client";

import React from "react";
import { TESTIMONIALS } from "@/lib/mockData";
import { Quote, Terminal, CheckCircle2 } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-20 bg-terminal-bg border-b border-terminal-border relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-terminal-panel border border-terminal-border text-xs font-mono tracking-widest text-terminal-amber">
            <span>[SECTION 05]</span>
            <span>VERIFIED DESK REVIEWS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-sans tracking-tight">
            Institutional Feedback. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-terminal-amber to-amber-200">
              Battle-Tested Under Pressure.
            </span>
          </h2>
          <p className="text-base text-terminal-subtext font-sans">
            Read how tier-1 quantitative prop desks and multi-strategy funds execute with APEX.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg border border-terminal-border bg-terminal-surface flex flex-col justify-between hover:border-terminal-amber/50 transition-colors group relative"
            >
              <div className="space-y-4">
                <Quote className="w-6 h-6 text-terminal-amber opacity-60 group-hover:opacity-100 transition-opacity" />
                <p className="text-sm text-gray-200 font-sans leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-terminal-border/60 font-mono">
                <div className="font-bold text-white text-xs">{t.author}</div>
                <div className="text-[11px] text-terminal-amber font-semibold">{t.role}</div>
                <div className="text-[10px] text-terminal-muted mt-0.5">{t.firm}</div>
              </div>

              {/* Verified Badge */}
              <div className="absolute top-4 right-4 flex items-center space-x-1 text-[9px] font-mono text-terminal-green">
                <CheckCircle2 className="w-3 h-3 text-terminal-green" />
                <span>VERIFIED DESK</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

