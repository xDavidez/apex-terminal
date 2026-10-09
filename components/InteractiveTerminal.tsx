"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, CornerDownLeft, Sparkles, Volume2, VolumeX, Check, AlertCircle } from "lucide-react";
import { playTerminalClick, playCommandExecuteSound, toggleAudio, getAudioState } from "@/lib/soundEffect";

type TerminalCommand = "BTC GP" | "ETH DEPTH" | "SOL FLOW" | "VOL SURF" | "MACRO CORR" | "RISK VAR";

export default function InteractiveTerminal() {
  const [activeCommand, setActiveCommand] = useState<TerminalCommand>("BTC GP");
  const [inputVal, setInputVal] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([
    "INITIALIZING APEX REAL-TIME TERMINAL KERNEL v4.8.2...",
    "CONNECTED TO NY4 / TY3 LOW-LATENCY CROSS-CONNECT.",
    "READY. ACTIVE RUNNER: BTC GP",
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSoundEnabled(getAudioState());
  }, []);

  const handleCommandSelect = (cmd: TerminalCommand) => {
    playTerminalClick(1.2);
    playCommandExecuteSound();
    setActiveCommand(cmd);
    setCommandHistory((prev) => [
      ...prev.slice(-4),
      `APEX> ${cmd}`,
      `OK. REROUTING WORKSTATION DISPLAY TO [${cmd}]...`,
    ]);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputVal.trim().toUpperCase();
    if (!trimmed) return;

    playCommandExecuteSound();

    if (trimmed === "BTC GP" || trimmed === "BTC") {
      setActiveCommand("BTC GP");
      setCommandHistory((prev) => [...prev.slice(-4), `APEX> ${trimmed}`, "DISPLAYING BTC GENERAL PRICE & MOMENTUM."]);
    } else if (trimmed === "ETH DEPTH" || trimmed === "ETH" || trimmed === "ORDERBOOK") {
      setActiveCommand("ETH DEPTH");
      setCommandHistory((prev) => [...prev.slice(-4), `APEX> ${trimmed}`, "DISPLAYING ETH CONSOLIDATED ORDERBOOK DEPTH."]);
    } else if (trimmed === "SOL FLOW" || trimmed === "SOL" || trimmed === "FLOW") {
      setActiveCommand("SOL FLOW");
      setCommandHistory((prev) => [...prev.slice(-4), `APEX> ${trimmed}`, "DISPLAYING SOLANA ON-CHAIN FLOW & DEX POOLS."]);
    } else if (trimmed === "VOL SURF" || trimmed === "VOL" || trimmed === "OPTIONS") {
      setActiveCommand("VOL SURF");
      setCommandHistory((prev) => [...prev.slice(-4), `APEX> ${trimmed}`, "DISPLAYING IMPLIED VOLATILITY SURFACE & SKEW."]);
    } else if (trimmed === "MACRO CORR" || trimmed === "MACRO" || trimmed === "CORR") {
      setActiveCommand("MACRO CORR");
      setCommandHistory((prev) => [...prev.slice(-4), `APEX> ${trimmed}`, "DISPLAYING CROSS-ASSET CORRELATION MATRIX."]);
    } else if (trimmed === "RISK VAR" || trimmed === "RISK" || trimmed === "VAR") {
      setActiveCommand("RISK VAR");
      setCommandHistory((prev) => [...prev.slice(-4), `APEX> ${trimmed}`, "RUNNING MONTE CARLO VaR STRESS SIMULATION."]);
    } else if (trimmed === "HELP") {
      setCommandHistory((prev) => [
        ...prev.slice(-4),
        `APEX> HELP`,
        "AVAILABLE COMMANDS: 'BTC GP', 'ETH DEPTH', 'SOL FLOW', 'VOL SURF', 'MACRO CORR', 'RISK VAR', 'CLEAR'",
      ]);
    } else if (trimmed === "CLEAR") {
      setCommandHistory(["APEX WORKSTATION CONSOLE CLEARED."]);
    } else {
      setCommandHistory((prev) => [
        ...prev.slice(-4),
        `APEX> ${trimmed}`,
        `UNKNOWN INSTRUCTION '${trimmed}'. TYPE 'HELP' OR CLICK COMMAND CHIPS.`,
      ]);
    }
    setInputVal("");
  };

  const handleAudioToggle = () => {
    const nextState = toggleAudio();
    setSoundEnabled(nextState);
    if (nextState) playTerminalClick(1.2);
  };

  return (
    <section id="terminal-demo" className="py-20 bg-[#05070A] border-b border-terminal-border relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-terminal-panel border border-terminal-border text-xs font-mono tracking-widest text-terminal-amber">
            <span>[SECTION 02]</span>
            <span>INTERACTIVE COMMAND LINE DEMO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-sans tracking-tight">
            The Bloomberg Syntax <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-terminal-amber to-amber-200">
              For Digital Assets.
            </span>
          </h2>
          <p className="text-base text-terminal-subtext font-sans">
            Every screen, order book, volatility surface, and risk matrix is accessible in milliseconds via command bar shortcuts.
          </p>
        </div>

        {/* Command Bar Interface Wrapper */}
        <div className="max-w-5xl mx-auto rounded-lg border border-terminal-border bg-terminal-surface shadow-2xl overflow-hidden">
          {/* Top Command Line Shell Bar */}
          <div className="p-3 bg-terminal-header border-b border-terminal-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2 font-mono text-xs text-terminal-amber shrink-0">
              <Terminal className="w-4 h-4 text-terminal-amber" />
              <span className="font-bold">APEX CLI:</span>
            </div>

            {/* Live Typing Input */}
            <form onSubmit={handleInputSubmit} className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  playTerminalClick(1.1);
                }}
                placeholder="Type command e.g. 'BTC GP', 'ETH DEPTH', 'RISK VAR' or 'HELP'..."
                className="w-full bg-[#07090C] border border-terminal-border focus:border-terminal-amber rounded px-3 py-1.5 font-mono text-xs text-white placeholder-terminal-muted focus:outline-none uppercase"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-terminal-muted hover:text-terminal-amber transition-colors"
                title="Execute Command"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Audio Toggle */}
            <button
              onClick={handleAudioToggle}
              className={`px-2.5 py-1.5 rounded border font-mono text-[11px] flex items-center justify-center space-x-1 transition-all ${
                soundEnabled
                  ? "border-terminal-amber/60 text-terminal-amber bg-terminal-amber/10"
                  : "border-terminal-border text-terminal-muted hover:text-white"
              }`}
              title="Toggle tactile keystroke sounds"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="text-[10px] hidden md:inline">{soundEnabled ? "KEY SOUND ON" : "KEY SOUND OFF"}</span>
            </button>
          </div>

          {/* Quick-Click Command Chips */}
          <div className="px-3 py-2 bg-terminal-panel/80 border-b border-terminal-border flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
            <span className="text-terminal-muted text-[10px] uppercase font-bold mr-1">HOTKEYS:</span>
            {(["BTC GP", "ETH DEPTH", "SOL FLOW", "VOL SURF", "MACRO CORR", "RISK VAR"] as const).map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommandSelect(cmd)}
                className={`px-2.5 py-1 rounded transition-all flex items-center space-x-1.5 ${
                  activeCommand === cmd
                    ? "bg-terminal-amber text-black font-bold shadow-sm"
                    : "bg-terminal-bg border border-terminal-border text-gray-300 hover:text-white hover:border-terminal-amber/50"
                }`}
              >
                <span>{cmd}</span>
                {activeCommand === cmd && <span className="w-1.5 h-1.5 rounded-full bg-black inline-block"></span>}
              </button>
            ))}
          </div>

          {/* Console Log History */}
          <div className="px-4 py-2 bg-[#050709] border-b border-terminal-border/60 font-mono text-[11px] text-terminal-muted space-y-0.5 max-h-24 overflow-y-auto">
            {commandHistory.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.startsWith("APEX>")
                    ? "text-terminal-amber font-semibold"
                    : line.startsWith("OK")
                    ? "text-terminal-green"
                    : line.startsWith("UNKNOWN")
                    ? "text-terminal-red"
                    : "text-terminal-muted"
                }
              >
                {line}
              </div>
            ))}
          </div>

          {/* Dynamic Panel Canvas */}
          <div className="p-4 sm:p-6 bg-terminal-surface min-h-[360px] flex flex-col justify-center">
            {/* Panel 1: BTC GP */}
            {activeCommand === "BTC GP" && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between border-b border-terminal-border pb-3">
                  <div>
                    <h3 className="font-mono text-lg font-bold text-white flex items-center space-x-2">
                      <span>BTC/USDT</span>
                      <span className="text-terminal-amber text-xs px-2 py-0.5 rounded bg-terminal-amber/10 border border-terminal-amber/30">
                        PERPETUAL SWAP
                      </span>
                    </h3>
                    <p className="font-mono text-xs text-terminal-muted">INDEX PRICE: $68,418.20 | BASIS: +$2.30 (ANNUALIZED +2.18%)</p>
                  </div>
                  <div className="font-mono text-right">
                    <div className="text-xl font-bold text-terminal-green tabular-nums">$68,420.50</div>
                    <div className="text-xs text-terminal-green">+3.42% (24H DELTA)</div>
                  </div>
                </div>

                {/* Technical Indicators Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                  <div className="p-3 rounded bg-terminal-panel border border-terminal-border">
                    <div className="text-terminal-muted text-[10px]">RSI (14)</div>
                    <div className="text-white text-base font-bold tabular-nums">58.4</div>
                    <div className="text-terminal-green text-[10px]">BULLISH MOMENTUM</div>
                  </div>
                  <div className="p-3 rounded bg-terminal-panel border border-terminal-border">
                    <div className="text-terminal-muted text-[10px]">MACD HISTOGRAM</div>
                    <div className="text-terminal-green text-base font-bold tabular-nums">+142.8</div>
                    <div className="text-terminal-subtext text-[10px]">ACCELERATING</div>
                  </div>
                  <div className="p-3 rounded bg-terminal-panel border border-terminal-border">
                    <div className="text-terminal-muted text-[10px]">FUNDING RATE</div>
                    <div className="text-terminal-amber text-base font-bold tabular-nums">+0.0102%</div>
                    <div className="text-terminal-subtext text-[10px]">NEXT IN 03:14:22</div>
                  </div>
                  <div className="p-3 rounded bg-terminal-panel border border-terminal-border">
                    <div className="text-terminal-muted text-[10px]">OPEN INTEREST</div>
                    <div className="text-white text-base font-bold tabular-nums">$14.2B</div>
                    <div className="text-terminal-green text-[10px]">+4.8% THIS SESSION</div>
                  </div>
                </div>

                {/* Micro Candlestick Visual Simulation */}
                <div className="h-32 bg-[#07090C] rounded border border-terminal-border p-3 flex items-end justify-between gap-1 relative overflow-hidden">
                  <div className="absolute top-2 left-2 font-mono text-[10px] text-terminal-muted">
                    HIGH-FREQUENCY INTRADAY TICKS (NY4 CO-LOCATION)
                  </div>
                  {[45, 48, 52, 50, 56, 62, 58, 64, 70, 68, 74, 82, 79, 85, 92, 88, 95, 98, 94, 100].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div className="w-[1px] bg-terminal-green/50 h-3" />
                      <div
                        className="w-full bg-terminal-green/80 rounded-sm hover:bg-terminal-amber transition-colors"
                        style={{ height: `${h * 0.9}px` }}
                      />
                      <div className="w-[1px] bg-terminal-green/50 h-2" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Panel 2: ETH DEPTH */}
            {activeCommand === "ETH DEPTH" && (
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-terminal-border pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                      <span>ETH CONSOLIDATED ORDERBOOK</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-terminal-cyan/10 border border-terminal-cyan/30 text-terminal-cyan">
                        DEPTH SCAN
                      </span>
                    </h3>
                    <p className="text-terminal-muted">AGGREGATING 12 HIGH-LIQUIDITY BOOKS (BINANCE, COINBASE, BYBIT, OKX)</p>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-bold text-white">$3,540.20</div>
                    <div className="text-terminal-green text-[11px]">SPREAD: $0.15 (0.004%)</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Bids Depth Box */}
                  <div className="p-3 rounded bg-terminal-panel border border-terminal-border space-y-2">
                    <div className="flex justify-between text-terminal-muted text-[10px] border-b border-terminal-border/50 pb-1">
                      <span>BID PRICE</span>
                      <span>SIZE (ETH)</span>
                      <span>VENUE</span>
                    </div>
                    {[
                      { p: "3,540.10", s: "48.24", v: "BINANCE" },
                      { p: "3,539.95", s: "112.50", v: "COINBASE" },
                      { p: "3,539.80", s: "84.10", v: "BYBIT" },
                      { p: "3,539.50", s: "230.00", v: "DERIBIT" },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between text-terminal-green">
                        <span className="font-bold tabular-nums">${row.p}</span>
                        <span className="text-gray-300 tabular-nums">{row.s}</span>
                        <span className="text-terminal-muted text-[10px]">{row.v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Asks Depth Box */}
                  <div className="p-3 rounded bg-terminal-panel border border-terminal-border space-y-2">
                    <div className="flex justify-between text-terminal-muted text-[10px] border-b border-terminal-border/50 pb-1">
                      <span>ASK PRICE</span>
                      <span>SIZE (ETH)</span>
                      <span>VENUE</span>
                    </div>
                    {[
                      { p: "3,540.25", s: "35.10", v: "BYBIT" },
                      { p: "3,540.40", s: "95.40", v: "BINANCE" },
                      { p: "3,540.60", s: "140.20", v: "OKX" },
                      { p: "3,540.85", s: "310.00", v: "COINBASE" },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between text-terminal-red">
                        <span className="font-bold tabular-nums">${row.p}</span>
                        <span className="text-gray-300 tabular-nums">{row.s}</span>
                        <span className="text-terminal-muted text-[10px]">{row.v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 rounded bg-terminal-header border border-terminal-border text-terminal-subtext flex justify-between items-center text-[11px]">
                  <span>IMPACT SIMULATION (1,000 ETH MARKET BUY):</span>
                  <span className="text-terminal-amber font-bold">ESTIMATED SLIPPAGE: 1.84 BPS ($0.65)</span>
                </div>
              </div>
            )}

            {/* Panel 3: SOL FLOW */}
            {activeCommand === "SOL FLOW" && (
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-terminal-border pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                      <span>SOLANA ON-CHAIN FLOW RADAR</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-terminal-green/10 border border-terminal-green/30 text-terminal-green">
                        LIVE MEMPOOL
                      </span>
                    </h3>
                    <p className="text-terminal-muted">REAL-TIME PROGRAM ACTIVITY, RAYDIUM/ORCA DEX POOLS & LARGE WALLET TRANSFERS</p>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-bold text-white">$178.65</div>
                    <div className="text-terminal-green text-[11px]">+7.84% (HIGH INFLOWS)</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 rounded bg-terminal-panel border border-terminal-border">
                    <div className="text-terminal-muted text-[10px]">DEX 24H VOLUME</div>
                    <div className="text-white text-lg font-bold tabular-nums">$3.84B</div>
                    <div className="text-terminal-green text-[10px]">RAYDIUM + ORCA + PHOENIX</div>
                  </div>
                  <div className="p-3 rounded bg-terminal-panel border border-terminal-border">
                    <div className="text-terminal-muted text-[10px]">NET STABLECOIN INFLOW</div>
                    <div className="text-terminal-green text-lg font-bold tabular-nums">+$182.4M</div>
                    <div className="text-terminal-subtext text-[10px]">PAST 12 HOURS</div>
                  </div>
                  <div className="p-3 rounded bg-terminal-panel border border-terminal-border">
                    <div className="text-terminal-muted text-[10px]">SMART MONEY RATIO</div>
                    <div className="text-terminal-amber text-lg font-bold tabular-nums">3.4 : 1</div>
                    <div className="text-terminal-subtext text-[10px]">NET BUYERS OVER SELLERS</div>
                  </div>
                </div>

                <div className="space-y-1.5 bg-[#07090C] p-3 rounded border border-terminal-border">
                  <div className="text-terminal-muted text-[10px] pb-1 border-b border-terminal-border/50">
                    RECENT HIGH-CONVICTION CLIPS (&gt;$1M)
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-terminal-subtext">08:14:02 | Wallet 8x...F9B</span>
                    <span className="text-white font-bold">BOUGHT 42,000 SOL ($7.5M)</span>
                    <span className="text-terminal-green font-semibold">VIA PHOENIX DEX</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-terminal-subtext">08:11:45 | Wallet 4v...29a</span>
                    <span className="text-white font-bold">STAKED 120,000 SOL ($21.4M)</span>
                    <span className="text-terminal-cyan font-semibold">JITO VALIDATOR</span>
                  </div>
                </div>
              </div>
            )}

            {/* Panel 4: VOL SURF */}
            {activeCommand === "VOL SURF" && (
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-terminal-border pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                      <span>DERIBIT IMPLIED VOLATILITY SURFACE</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-terminal-amber/10 border border-terminal-amber/30 text-terminal-amber">
                        SKEW & TERM
                      </span>
                    </h3>
                    <p className="text-terminal-muted">REAL-TIME DERIBIT OPTIONS PRICING, DELTA RISK REVERSALS & BUTTERFLIES</p>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-bold text-white">ATM VOL: 54.8%</div>
                    <div className="text-terminal-amber text-[11px]">25Δ SKEW: +4.2% (CALL OVER)</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { expiry: "7 DAYS", atm: "51.2%", callSkew: "+2.1", putVol: "49.8%" },
                    { expiry: "30 DAYS", atm: "54.8%", callSkew: "+4.2", putVol: "52.4%" },
                    { expiry: "90 DAYS", atm: "58.6%", callSkew: "+5.8", putVol: "55.1%" },
                    { expiry: "180 DAYS", atm: "63.2%", callSkew: "+6.9", putVol: "58.9%" },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded bg-terminal-panel border border-terminal-border space-y-1">
                      <div className="text-terminal-amber font-bold text-[11px]">{item.expiry}</div>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-terminal-muted">ATM IV:</span>
                        <span className="text-white font-semibold">{item.atm}</span>
                      </div>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-terminal-muted">25Δ SKEW:</span>
                        <span className="text-terminal-green font-semibold">{item.callSkew}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-terminal-header rounded border border-terminal-border text-[11px] space-y-1">
                  <div className="text-terminal-muted text-[10px]">VOLATILITY DESK COMMENTARY:</div>
                  <div className="text-gray-200">
                    Call skew remains sharply elevated into election/Q4 expiries. Dealers are short gamma above $72,000, creating upward convexity acceleration risk.
                  </div>
                </div>
              </div>
            )}

            {/* Panel 5: MACRO CORR */}
            {activeCommand === "MACRO CORR" && (
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-terminal-border pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                      <span>CROSS-ASSET MACRO CORRELATION</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-terminal-panel border border-terminal-border text-terminal-subtext">
                        90-DAY ROLLING
                      </span>
                    </h3>
                    <p className="text-terminal-muted">PEARSON CORRELATION COEFFICIENTS ACROSS TRADFI & DIGITAL ASSETS</p>
                  </div>
                  <div className="text-right">
                    <div className="text-terminal-muted text-[11px]">CALCULATED: DAILY CLOSE</div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-terminal-border text-terminal-muted text-[10px]">
                        <th className="py-2">ASSET</th>
                        <th className="py-2">BTC</th>
                        <th className="py-2">ETH</th>
                        <th className="py-2">NASDAQ (QQQ)</th>
                        <th className="py-2">S&P 500 (SPY)</th>
                        <th className="py-2">GOLD (XAU)</th>
                        <th className="py-2">DXY INDEX</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-terminal-border/40">
                      {[
                        { name: "BTC", btc: "1.00", eth: "0.84", qqq: "0.52", spy: "0.48", gold: "0.38", dxy: "-0.46" },
                        { name: "ETH", btc: "0.84", eth: "1.00", qqq: "0.58", spy: "0.51", gold: "0.31", dxy: "-0.42" },
                        { name: "NASDAQ", btc: "0.52", eth: "0.58", qqq: "1.00", spy: "0.92", gold: "0.18", dxy: "-0.64" },
                        { name: "GOLD", btc: "0.38", eth: "0.31", qqq: "0.18", spy: "0.14", gold: "1.00", dxy: "-0.58" },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-terminal-panel/40">
                          <td className="py-2 font-bold text-terminal-amber">{row.name}</td>
                          <td className="py-2 text-white">{row.btc}</td>
                          <td className="py-2 text-white">{row.eth}</td>
                          <td className="py-2 text-terminal-cyan">{row.qqq}</td>
                          <td className="py-2 text-terminal-cyan">{row.spy}</td>
                          <td className="py-2 text-yellow-300">{row.gold}</td>
                          <td className="py-2 text-terminal-red">{row.dxy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-2.5 rounded bg-terminal-header border border-terminal-border text-terminal-subtext text-[11px]">
                  <span>KEY OBSERVATION: </span>
                  <span className="text-white">BTC correlation to equities has decoupled from 0.78 (2022) to 0.48 (current), showing emergent gold-like monetary properties.</span>
                </div>
              </div>
            )}

            {/* Panel 6: RISK VAR */}
            {activeCommand === "RISK VAR" && (
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-terminal-border pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                      <span>MONTE CARLO VALUE-AT-RISK (VaR)</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-terminal-green/10 border border-terminal-green/30 text-terminal-green">
                        STRESS ENGINE
                      </span>
                    </h3>
                    <p className="text-terminal-muted">10,000 ITERATIONS | 99% CONFIDENCE INTERVAL | 24-HOUR HORIZON</p>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-bold text-terminal-green">BUFFER: 48.2%</div>
                    <div className="text-terminal-muted text-[11px]">LIQUIDATION DISTANCE</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded bg-terminal-panel border border-terminal-border space-y-1">
                    <div className="text-terminal-muted text-[10px]">HISTORICAL VaR (99%)</div>
                    <div className="text-white text-lg font-bold tabular-nums">-$148,200</div>
                    <div className="text-terminal-subtext text-[10px]">3.12% OF PORTFOLIO</div>
                  </div>
                  <div className="p-3 rounded bg-terminal-panel border border-terminal-border space-y-1">
                    <div className="text-terminal-muted text-[10px]">CONDITIONAL VaR (CVaR)</div>
                    <div className="text-terminal-amber text-lg font-bold tabular-nums">-$215,400</div>
                    <div className="text-terminal-subtext text-[10px]">EXPECTED SHORTFALL</div>
                  </div>
                  <div className="p-3 rounded bg-terminal-panel border border-terminal-border space-y-1">
                    <div className="text-terminal-muted text-[10px]">CROSS-MARGIN UTILIZATION</div>
                    <div className="text-terminal-green text-lg font-bold tabular-nums">34.6%</div>
                    <div className="text-terminal-green text-[10px]">OPTIMAL RISK PROFILE</div>
                  </div>
                </div>

                <div className="p-3 rounded bg-[#07090C] border border-terminal-border space-y-2">
                  <div className="text-terminal-muted text-[10px]">SCENARIO STRESS TEST MATRIX</div>
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="p-2 rounded bg-terminal-panel border border-terminal-border">
                      <div className="text-terminal-muted">BTC -15% FLASH DROP</div>
                      <div className="text-terminal-green font-bold mt-1">NO LIQUIDATION</div>
                      <div className="text-terminal-subtext">Margin: 54.2%</div>
                    </div>
                    <div className="p-2 rounded bg-terminal-panel border border-terminal-border">
                      <div className="text-terminal-muted">ETH DE-PEG BASIS CRASH</div>
                      <div className="text-terminal-green font-bold mt-1">NO LIQUIDATION</div>
                      <div className="text-terminal-subtext">Margin: 61.8%</div>
                    </div>
                    <div className="p-2 rounded bg-terminal-panel border border-terminal-border">
                      <div className="text-terminal-muted">OCT 2023 REPEAT (-30%)</div>
                      <div className="text-terminal-amber font-bold mt-1">MARGIN CALL AT -28%</div>
                      <div className="text-terminal-subtext">Buffer: $420k</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

