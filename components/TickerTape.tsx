"use client";

import React, { useState, useEffect } from "react";
import { INITIAL_TICKERS, TickerItem } from "@/lib/mockData";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function TickerTape() {
  const [tickers, setTickers] = useState<TickerItem[]>(INITIAL_TICKERS);
  const [flashStates, setFlashStates] = useState<{ [key: string]: "up" | "down" | null }>({});

  useEffect(() => {
    // Live tick simulator: every 1.5 seconds, randomly pick an asset and nudge price
    const interval = setInterval(() => {
      setTickers((prev) => {
        const randomIndex = Math.floor(Math.random() * prev.length);
        const target = prev[randomIndex];
        const isUp = Math.random() > 0.45;
        const delta = target.price * (Math.random() * 0.0018 + 0.0002) * (isUp ? 1 : -1);
        const newPrice = Number((target.price + delta).toFixed(target.price > 100 ? 2 : 4));

        // Update flash state
        setFlashStates((f) => ({ ...f, [target.symbol]: isUp ? "up" : "down" }));
        setTimeout(() => {
          setFlashStates((f) => ({ ...f, [target.symbol]: null }));
        }, 800);

        return prev.map((item, idx) =>
          idx === randomIndex
            ? {
                ...item,
                price: newPrice,
                change24h: Number((item.change24h + (isUp ? 0.02 : -0.02)).toFixed(2)),
              }
            : item
        );
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // Double array for continuous seamless infinite loop
  const displayTickers = [...tickers, ...tickers];

  return (
    <div className="w-full bg-[#05070A] border-b border-terminal-border/80 overflow-hidden select-none py-1.5 relative z-20">
      <div className="flex items-center">
        {/* Fixed terminal badge on left */}
        <div className="hidden lg:flex items-center px-3 py-0.5 bg-terminal-header border-r border-terminal-border font-mono text-[11px] font-semibold text-terminal-amber whitespace-nowrap z-10 shrink-0">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-terminal-amber mr-2 animate-pulse"></span>
          REALTIME TICK FEED
        </div>

        {/* Marquee track */}
        <div className="flex animate-ticker whitespace-nowrap hover:[animation-play-state:paused] cursor-default">
          {displayTickers.map((ticker, i) => {
            const isPositive = ticker.change24h >= 0;
            const flash = flashStates[ticker.symbol];

            return (
              <div
                key={`${ticker.symbol}-${i}`}
                className={`inline-flex items-center space-x-2.5 px-4 font-mono text-xs border-r border-terminal-border/40 transition-colors duration-200 ${
                  flash === "up"
                    ? "bg-terminal-greenMuted text-terminal-green"
                    : flash === "down"
                    ? "bg-terminal-redMuted text-terminal-red"
                    : "text-gray-300"
                }`}
              >
                <span className="font-bold tracking-tight text-white">{ticker.symbol}</span>
                <span className="tabular-nums font-semibold">
                  ${ticker.price >= 100 ? ticker.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ticker.price.toFixed(3)}
                </span>
                <span
                  className={`inline-flex items-center text-[10px] font-bold tabular-nums ${
                    isPositive ? "text-terminal-green" : "text-terminal-red"
                  }`}
                >
                  {isPositive ? (
                    <ArrowUpRight className="w-2.5 h-2.5 inline mr-0.5" />
                  ) : (
                    <ArrowDownRight className="w-2.5 h-2.5 inline mr-0.5" />
                  )}
                  {isPositive ? "+" : ""}
                  {ticker.change24h.toFixed(2)}%
                </span>
                <span className="text-[10px] text-terminal-muted hidden sm:inline">
                  VOL {ticker.volume24h}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

