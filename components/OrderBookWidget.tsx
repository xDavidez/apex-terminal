"use client";

import React, { useState, useEffect } from "react";
import { generateOrderBook, OrderBookLevel } from "@/lib/mockData";

interface OrderBookWidgetProps {
  midPrice?: number;
}

export default function OrderBookWidget({ midPrice = 68420.5 }: OrderBookWidgetProps) {
  const [book, setBook] = useState(() => generateOrderBook(midPrice));
  const [spread, setSpread] = useState(0.5);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time Level 2 book updates
      setBook((prev) => {
        const nextAsks = prev.asks.map((ask) => {
          if (Math.random() > 0.6) {
            const sizeDelta = (Math.random() - 0.48) * 0.4;
            const newSize = Math.max(0.08, Number((ask.size + sizeDelta).toFixed(3)));
            return { ...ask, size: newSize };
          }
          return ask;
        });

        const nextBids = prev.bids.map((bid) => {
          if (Math.random() > 0.6) {
            const sizeDelta = (Math.random() - 0.48) * 0.4;
            const newSize = Math.max(0.08, Number((bid.size + sizeDelta).toFixed(3)));
            return { ...bid, size: newSize };
          }
          return bid;
        });

        return { bids: nextBids, asks: nextAsks };
      });

      setSpread(Number((0.35 + Math.random() * 0.35).toFixed(2)));
    }, 850);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#0A0D14] border border-terminal-border rounded overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-terminal-header border-b border-terminal-border font-mono text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-white tracking-wide">ORDER BOOK</span>
          <span className="text-[10px] text-terminal-amber font-semibold px-1.5 py-0.2 bg-terminal-amber/10 rounded border border-terminal-amber/30">
            L2 CONSOLIDATED
          </span>
        </div>
        <span className="text-[10px] text-terminal-muted hidden sm:inline">14 EXCHANGES</span>
      </div>

      {/* Table Column Headers */}
      <div className="grid grid-cols-4 px-3 py-1 font-mono text-[10px] text-terminal-muted border-b border-terminal-border/40 bg-terminal-panel/40">
        <span className="text-left">PRICE (USD)</span>
        <span className="text-right">SIZE</span>
        <span className="text-right">TOTAL</span>
        <span className="text-right">VENUE</span>
      </div>

      {/* Asks (Red) */}
      <div className="flex-1 flex flex-col justify-end space-y-0.5 px-1 py-1 font-mono text-[11px] overflow-hidden">
        {book.asks.slice(-6).map((item, idx) => (
          <div key={`ask-${idx}`} className="relative grid grid-cols-4 px-2 py-0.5 rounded items-center group">
            {/* Background depth bar */}
            <div
              className="absolute right-0 top-0 bottom-0 bg-terminal-red/15 rounded-sm transition-all duration-300 pointer-events-none"
              style={{ width: `${item.depthPct}%` }}
            />
            <span className="text-terminal-red font-semibold relative z-10 tabular-nums">
              {item.price.toFixed(2)}
            </span>
            <span className="text-right text-gray-300 relative z-10 tabular-nums">
              {item.size.toFixed(3)}
            </span>
            <span className="text-right text-terminal-subtext relative z-10 tabular-nums text-[10px]">
              {item.total.toFixed(3)}
            </span>
            <span className="text-right text-[9px] text-terminal-muted relative z-10 uppercase tracking-tight">
              {item.venue}
            </span>
          </div>
        ))}
      </div>

      {/* Spread Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-terminal-panel border-y border-terminal-border font-mono text-[10px]">
        <div className="flex items-center space-x-2 text-terminal-subtext">
          <span>SPREAD:</span>
          <span className="text-terminal-amber font-bold tabular-nums">${spread.toFixed(2)}</span>
          <span className="text-terminal-muted">({(spread / midPrice * 100).toFixed(4)}%)</span>
        </div>
        <span className="text-terminal-green flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse"></span>
          <span>ROUTED (NY4)</span>
        </span>
      </div>

      {/* Bids (Green) */}
      <div className="flex-1 flex flex-col space-y-0.5 px-1 py-1 font-mono text-[11px] overflow-hidden">
        {book.bids.slice(0, 6).map((item, idx) => (
          <div key={`bid-${idx}`} className="relative grid grid-cols-4 px-2 py-0.5 rounded items-center group">
            {/* Background depth bar */}
            <div
              className="absolute right-0 top-0 bottom-0 bg-terminal-green/15 rounded-sm transition-all duration-300 pointer-events-none"
              style={{ width: `${item.depthPct}%` }}
            />
            <span className="text-terminal-green font-semibold relative z-10 tabular-nums">
              {item.price.toFixed(2)}
            </span>
            <span className="text-right text-gray-300 relative z-10 tabular-nums">
              {item.size.toFixed(3)}
            </span>
            <span className="text-right text-terminal-subtext relative z-10 tabular-nums text-[10px]">
              {item.total.toFixed(3)}
            </span>
            <span className="text-right text-[9px] text-terminal-muted relative z-10 uppercase tracking-tight">
              {item.venue}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

