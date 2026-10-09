"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Volume2, VolumeX, Menu, X, ArrowUpRight, ShieldCheck, Activity } from "lucide-react";
import { toggleAudio, getAudioState, playTerminalClick } from "@/lib/soundEffect";

interface NavbarProps {
  onRequestDemo: () => void;
}

export default function Navbar({ onRequestDemo }: NavbarProps) {
  const [soundOn, setSoundOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [latency, setLatency] = useState(14);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Subtle micro latency jitter for institutional realism
    const interval = setInterval(() => {
      setLatency(Math.floor(12 + Math.random() * 6));
    }, 4000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const handleSoundToggle = () => {
    const nextState = toggleAudio();
    setSoundOn(nextState);
    if (nextState) {
      playTerminalClick(1.2);
    }
  };

  const handleNavClick = (href: string) => {
    playTerminalClick(1.0);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-terminal-bg/95 backdrop-blur-md border-b border-terminal-border py-2.5 shadow-2xl"
          : "bg-terminal-bg/80 backdrop-blur-sm border-b border-terminal-border/60 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Terminal Brand */}
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="flex items-center space-x-2.5 group cursor-pointer"
              onClick={() => playTerminalClick(1.1)}
            >
              <div className="w-8 h-8 rounded bg-terminal-panel border border-terminal-border flex items-center justify-center text-terminal-amber group-hover:border-terminal-amber/60 transition-colors shadow-inner">
                <span className="font-mono font-bold text-sm text-terminal-amber">▲</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-sm sm:text-base font-bold tracking-wider text-white group-hover:text-terminal-amber transition-colors">
                  APEX <span className="text-terminal-amber">//</span> TERMINAL
                </span>
                <span className="text-[10px] font-mono tracking-widest text-terminal-muted -mt-1 hidden sm:block">
                  INSTITUTIONAL WORKSTATION v4.8
                </span>
              </div>
            </a>

            {/* Institutional Live Telemetry Badge */}
            <div className="hidden xl:flex items-center space-x-2 text-[11px] font-mono border-l border-terminal-border pl-5 text-terminal-muted">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terminal-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-terminal-green"></span>
              </span>
              <span className="text-terminal-green">OPERATIONAL</span>
              <span className="text-terminal-border">|</span>
              <span>NY4 <span className="text-terminal-subtext">{latency}μs</span></span>
              <span className="text-terminal-border">|</span>
              <span>FIX 4.4 ONLINE</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 font-mono text-xs uppercase tracking-wider text-terminal-subtext">
            <button
              onClick={() => handleNavClick("#features")}
              className="hover:text-terminal-amber transition-colors flex items-center space-x-1"
            >
              <span>[01]</span>
              <span className="text-gray-300 hover:text-terminal-amber">Features</span>
            </button>
            <button
              onClick={() => handleNavClick("#terminal-demo")}
              className="hover:text-terminal-amber transition-colors flex items-center space-x-1"
            >
              <span>[02]</span>
              <span className="text-gray-300 hover:text-terminal-amber">CLI Demo</span>
            </button>
            <button
              onClick={() => handleNavClick("#coverage")}
              className="hover:text-terminal-amber transition-colors flex items-center space-x-1"
            >
              <span>[03]</span>
              <span className="text-gray-300 hover:text-terminal-amber">Coverage</span>
            </button>
            <button
              onClick={() => handleNavClick("#pricing")}
              className="hover:text-terminal-amber transition-colors flex items-center space-x-1"
            >
              <span>[04]</span>
              <span className="text-gray-300 hover:text-terminal-amber">Pricing</span>
            </button>
          </nav>

          {/* Action Area: Audio Toggle & CTA */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Audio Feedback Toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundOn ? "Mute Terminal Clicks" : "Enable Terminal Audio (Tactile Clicks)"}
              className={`p-2 rounded border font-mono text-xs transition-all flex items-center space-x-1.5 ${
                soundOn
                  ? "border-terminal-amber/60 text-terminal-amber bg-terminal-amber/10"
                  : "border-terminal-border text-terminal-muted hover:text-gray-300 hover:border-terminal-borderBright bg-terminal-panel"
              }`}
            >
              {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden lg:inline text-[10px] tracking-wider uppercase font-semibold">
                {soundOn ? "AUDIO ON" : "AUDIO OFF"}
              </span>
            </button>

            {/* Request Demo Button */}
            <button
              onClick={() => {
                playTerminalClick(1.2);
                onRequestDemo();
              }}
              className="relative group overflow-hidden px-4 sm:px-5 py-2 rounded bg-terminal-amber text-black font-mono text-xs font-bold tracking-wider uppercase transition-all duration-150 hover:bg-terminal-amberHover active:scale-95 shadow-sm amber-glow-sm"
            >
              <span className="relative z-10 flex items-center space-x-1.5">
                <span>Request Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded border border-terminal-border text-gray-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-terminal-border bg-terminal-bg/98 px-4 pt-3 pb-6 space-y-3 font-mono text-xs tracking-wider">
          <div className="flex items-center justify-between pb-2 border-b border-terminal-border/40 text-[11px] text-terminal-muted">
            <span className="flex items-center space-x-1.5 text-terminal-green">
              <span className="h-1.5 w-1.5 rounded-full bg-terminal-green inline-block"></span>
              <span>NETWORK STATUS: 100% UP</span>
            </span>
            <span>PING: {latency}μs</span>
          </div>
          <button
            onClick={() => handleNavClick("#features")}
            className="w-full text-left py-2 text-gray-300 hover:text-terminal-amber border-b border-terminal-border/30"
          >
            [01] FEATURES
          </button>
          <button
            onClick={() => handleNavClick("#terminal-demo")}
            className="w-full text-left py-2 text-gray-300 hover:text-terminal-amber border-b border-terminal-border/30"
          >
            [02] INTERACTIVE CLI DEMO
          </button>
          <button
            onClick={() => handleNavClick("#coverage")}
            className="w-full text-left py-2 text-gray-300 hover:text-terminal-amber border-b border-terminal-border/30"
          >
            [03] LIQUIDITY COVERAGE
          </button>
          <button
            onClick={() => handleNavClick("#pricing")}
            className="w-full text-left py-2 text-gray-300 hover:text-terminal-amber border-b border-terminal-border/30"
          >
            [04] INSTITUTIONAL PRICING
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestDemo();
              }}
              className="w-full py-2.5 rounded bg-terminal-amber text-black font-bold uppercase tracking-wider text-center"
            >
              Request Workstation Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

