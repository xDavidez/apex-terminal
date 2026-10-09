"use client";

import React, { useState, useEffect } from "react";
import { X, ArrowRight, CheckCircle2, ShieldCheck, Terminal } from "lucide-react";
import { playTerminalClick, playCommandExecuteSound } from "@/lib/soundEffect";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTier?: string;
}

export default function DemoModal({ isOpen, onClose, preselectedTier }: DemoModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    firmName: "",
    deskType: "Hedge Fund",
    aumRange: "$50M - $250M",
    tier: preselectedTier || "Desk / Fund",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  useEffect(() => {
    if (preselectedTier) {
      setFormData((prev) => ({ ...prev, tier: preselectedTier }));
    }
  }, [preselectedTier]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.workEmail || !formData.firmName) return;

    playTerminalClick(1.2);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const generated = `APX-${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketId(generated);
      playCommandExecuteSound();
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div
        className="w-full max-w-xl bg-terminal-surface border border-terminal-border rounded-lg shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-terminal-header border-b border-terminal-border">
          <div className="flex items-center space-x-2 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-terminal-amber animate-pulse"></span>
            <span className="font-bold text-white uppercase tracking-wider">
              APEX // REQUEST INSTITUTIONAL DEMO
            </span>
          </div>
          <button
            onClick={() => {
              playTerminalClick(0.9);
              onClose();
            }}
            className="p-1 rounded text-terminal-muted hover:text-white hover:bg-terminal-panel transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4 font-mono">
              <div className="w-12 h-12 rounded-full bg-terminal-green/20 border border-terminal-green flex items-center justify-center mx-auto text-terminal-green">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase">
                DEMO SESSION SCHEDULED: {ticketId}
              </h3>
              <p className="text-xs text-terminal-subtext max-w-sm mx-auto font-sans leading-relaxed">
                Confirmation details and temporary testbed API credentials have been sent to{" "}
                <span className="text-white font-bold">{formData.workEmail}</span>. Our desk lead will contact you shortly.
              </p>
              <div className="pt-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded bg-terminal-amber text-black font-mono font-bold text-xs uppercase"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-xs text-terminal-subtext font-sans">
                Experience full Level-3 depth, historical tick replay, and sub-millisecond execution routing.
              </div>

              <div>
                <label className="block font-mono text-[11px] text-terminal-subtext uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Sterling"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#07090C] border border-terminal-border focus:border-terminal-amber rounded px-3 py-2 font-mono text-xs text-white placeholder-terminal-muted focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[11px] text-terminal-subtext uppercase mb-1">
                    Institutional Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sterling@alpha.fund"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    className="w-full bg-[#07090C] border border-terminal-border focus:border-terminal-amber rounded px-3 py-2 font-mono text-xs text-white placeholder-terminal-muted focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-terminal-subtext uppercase mb-1">
                    Firm / Desk Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sterling Capital"
                    value={formData.firmName}
                    onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                    className="w-full bg-[#07090C] border border-terminal-border focus:border-terminal-amber rounded px-3 py-2 font-mono text-xs text-white placeholder-terminal-muted focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[11px] text-terminal-subtext uppercase mb-1">
                    Fund Classification
                  </label>
                  <select
                    value={formData.deskType}
                    onChange={(e) => setFormData({ ...formData, deskType: e.target.value })}
                    className="w-full bg-[#07090C] border border-terminal-border focus:border-terminal-amber rounded px-3 py-2 font-mono text-xs text-white focus:outline-none"
                  >
                    <option value="Hedge Fund">Crypto Hedge Fund</option>
                    <option value="Prop Desk">Proprietary Trading Desk</option>
                    <option value="Market Maker">Market Maker</option>
                    <option value="Family Office">Family Office</option>
                    <option value="Active Independent">Active Independent Quant</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-terminal-subtext uppercase mb-1">
                    AUM Range
                  </label>
                  <select
                    value={formData.aumRange}
                    onChange={(e) => setFormData({ ...formData, aumRange: e.target.value })}
                    className="w-full bg-[#07090C] border border-terminal-border focus:border-terminal-amber rounded px-3 py-2 font-mono text-xs text-white focus:outline-none"
                  >
                    <option value="<$10M">&lt; $10M</option>
                    <option value="$10M - $50M">$10M - $50M</option>
                    <option value="$50M - $250M">$50M - $250M</option>
                    <option value="$250M+">$250M+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] text-terminal-subtext uppercase mb-1">
                  License Tier Target
                </label>
                <input
                  type="text"
                  readOnly
                  value={formData.tier}
                  className="w-full bg-[#07090C]/60 border border-terminal-border rounded px-3 py-2 font-mono text-xs text-terminal-amber cursor-not-allowed"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded bg-terminal-amber text-black font-mono text-xs font-bold tracking-wider uppercase transition-all duration-150 hover:bg-terminal-amberHover active:scale-98 shadow-md amber-glow flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>CONFIRMING WORKSTATION ACCESS...</span>
                  ) : (
                    <>
                      <span>Confirm Demo Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-[10px] text-terminal-muted font-mono text-center flex items-center justify-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-terminal-green" />
                <span>Protected by 256-bit TLS. Direct NDA on file.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

