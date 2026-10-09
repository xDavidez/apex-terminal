"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, Terminal, AlertCircle } from "lucide-react";
import { playTerminalClick, playCommandExecuteSound } from "@/lib/soundEffect";

export default function DemoFormSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    firmName: "",
    deskType: "Hedge Fund",
    aumRange: "$50M - $250M",
    seats: "2-5 Seats",
    fixApiInterest: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.workEmail || !formData.firmName) return;

    playTerminalClick(1.2);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const generatedTicket = `APX-${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketId(generatedTicket);
      playCommandExecuteSound();
    }, 1200);
  };

  return (
    <section id="demo" className="py-20 bg-[#05070A] border-b border-terminal-border relative z-10">
      {/* Background radial accent */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-terminal-amber/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Institutional Call to Action Copy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-terminal-panel border border-terminal-border text-xs font-mono tracking-widest text-terminal-amber">
              <span>[SECTION 06]</span>
              <span>WORKSTATION DEPLOYMENT</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-sans tracking-tight">
              Deploy Your Desk <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-terminal-amber to-amber-200">
                In Under 24 Hours.
              </span>
            </h2>

            <p className="text-base text-terminal-subtext font-sans leading-relaxed">
              We provision isolated NY4/TY3 relays, configure your venue API secrets with hardware security modules (HSM), and grant instant workstation credentials.
            </p>

            <div className="space-y-4 pt-2 font-mono text-xs">
              <div className="flex items-start space-x-3 text-gray-300">
                <div className="p-1 rounded bg-terminal-panel border border-terminal-border text-terminal-amber">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white uppercase">&lt; 2-Hour Response SLA</div>
                  <div className="text-terminal-muted text-[11px] font-sans">
                    An institutional onboarding quantitative engineer will schedule your live terminal walk-through.
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-gray-300">
                <div className="p-1 rounded bg-terminal-panel border border-terminal-border text-terminal-green">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white uppercase">Zero Custody Risk</div>
                  <div className="text-terminal-muted text-[11px] font-sans">
                    APEX operates purely on local client-side API signers or institutional drop-copy proxy nodes.
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-gray-300">
                <div className="p-1 rounded bg-terminal-panel border border-terminal-border text-terminal-cyan">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white uppercase">14-Day Pilot Sandbox</div>
                  <div className="text-terminal-muted text-[11px] font-sans">
                    Includes full historical tick archive access and live simulation paper trading.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The Demo Request Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-lg border border-terminal-border bg-terminal-surface shadow-2xl relative">
              {isSubmitted ? (
                /* Success State */
                <div className="py-12 px-4 text-center space-y-4 font-mono">
                  <div className="w-14 h-14 rounded-full bg-terminal-green/20 border border-terminal-green flex items-center justify-center mx-auto text-terminal-green">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                    DEMO ACCESS LOGGED: {ticketId}
                  </h3>
                  <p className="text-xs text-terminal-subtext max-w-md mx-auto font-sans">
                    Your institutional workstation request has been routed to our Quant Solutions Desk. We have dispatched onboarding credentials and calendar availability to <span className="text-white font-mono font-bold">{formData.workEmail}</span>.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: "",
                          workEmail: "",
                          firmName: "",
                          deskType: "Hedge Fund",
                          aumRange: "$50M - $250M",
                          seats: "2-5 Seats",
                          fixApiInterest: true,
                        });
                      }}
                      className="px-6 py-2 rounded bg-terminal-panel border border-terminal-border text-white text-xs hover:border-terminal-amber font-mono"
                    >
                      Submit Another In-House Desk Request
                    </button>
                  </div>
                </div>
              ) : (
                /* Form Fields */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-terminal-border pb-3">
                    <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                      REQUEST WORKSTATION DEMO & TRIAL
                    </h3>
                    <span className="font-mono text-[10px] text-terminal-amber px-2 py-0.5 rounded bg-terminal-amber/10 border border-terminal-amber/30">
                      TIER-1 ACCESS
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] text-terminal-subtext uppercase mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Mercer"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-[#07090C] border border-terminal-border focus:border-terminal-amber rounded px-3 py-2 font-mono text-xs text-white placeholder-terminal-muted focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] text-terminal-subtext uppercase mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="mercer@capitallabs.com"
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        className="w-full bg-[#07090C] border border-terminal-border focus:border-terminal-amber rounded px-3 py-2 font-mono text-xs text-white placeholder-terminal-muted focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] text-terminal-subtext uppercase mb-1">
                        Firm / Prop Desk Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mercer Quant Capital"
                        value={formData.firmName}
                        onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                        className="w-full bg-[#07090C] border border-terminal-border focus:border-terminal-amber rounded px-3 py-2 font-mono text-xs text-white placeholder-terminal-muted focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] text-terminal-subtext uppercase mb-1">
                        Firm Classification
                      </label>
                      <select
                        value={formData.deskType}
                        onChange={(e) => setFormData({ ...formData, deskType: e.target.value })}
                        className="w-full bg-[#07090C] border border-terminal-border focus:border-terminal-amber rounded px-3 py-2 font-mono text-xs text-white focus:outline-none"
                      >
                        <option value="Hedge Fund">Crypto Hedge Fund</option>
                        <option value="Prop Desk">Proprietary Trading Desk</option>
                        <option value="Market Maker">Market Maker / Liquidity Provider</option>
                        <option value="Family Office">Family Office / Liquid Alpha</option>
                        <option value="Active Independent">Active Independent Quant</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] text-terminal-subtext uppercase mb-1">
                        AUM Range (Assets Under Management)
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

                    <div>
                      <label className="block font-mono text-[11px] text-terminal-subtext uppercase mb-1">
                        Workstation Seats
                      </label>
                      <select
                        value={formData.seats}
                        onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                        className="w-full bg-[#07090C] border border-terminal-border focus:border-terminal-amber rounded px-3 py-2 font-mono text-xs text-white focus:outline-none"
                      >
                        <option value="1 Seat">1 Seat (Pro)</option>
                        <option value="2-5 Seats">2-5 Seats (Desk)</option>
                        <option value="6-20 Seats">6-20 Seats (Firm)</option>
                        <option value="20+ Seats">20+ Seats (Enterprise)</option>
                      </select>
                    </div>
                  </div>

                  {/* FIX API Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-center space-x-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.fixApiInterest}
                        onChange={(e) => setFormData({ ...formData, fixApiInterest: e.target.checked })}
                        className="rounded bg-terminal-panel border-terminal-border text-terminal-amber focus:ring-terminal-amber w-4 h-4"
                      />
                      <span className="font-mono text-xs text-gray-300">
                        Include direct FIX 4.4 and Equinix NY4 cross-connect technical specifications.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded bg-terminal-amber text-black font-mono text-xs font-bold tracking-wider uppercase transition-all duration-150 hover:bg-terminal-amberHover active:scale-98 shadow-md amber-glow flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>PROVISIONING PILOT CREDENTIALS...</span>
                      ) : (
                        <>
                          <span>Submit Workstation Request</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[10px] text-terminal-muted font-mono text-center">
                    Strict NDA enforced. Your fund credentials and contact details remain confidential.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

