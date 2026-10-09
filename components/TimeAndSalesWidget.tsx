"use client";

import React, { useState, useEffect } from "react";
import { INITIAL_TRADES, TradePrint } from "@/lib/mockData";

export default function TimeAndSalesWidget() {
  const [trades, setTrades] = useState<TradePrint[]>(INITIAL_TRADES);

  useEffect(() => {
    const venues = ["BINANCE", "COINBASE", "BYBIT", "DERIBIT", "OKX"];
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}.${String(Math.floor(Math.random() * 900 + 100))}`;
      const isBuy = Math.random() > 0.48;
      const basePrice = 68420.0;
      const priceDelta = (Math.random() * 4 - 2);
      const newTrade: TradePrint = {
        id: `t-${Date.now()}-${Math.random()}`,
        time: timeStr,
        price: Number((basePrice + priceDelta).toFixed(2)),
        size: Number((Math.random() * 2.8 + 0.1).toFixed(3)),
        side: isBuy ? "BUY" : "SELL",
        venue: venues[Math.floor(Math.random() * venues.length)],
      };

      setTrades((prev) => [newTrade, ...prev.slice(0, 11)]);
    }, 950);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#0A0D14] border border-terminal-border rounded overflow-hidden select-none">
      <div className="flex items-center justify-between px-3 py-2 bg-terminal-header border-b border-terminal-border font-mono text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-white tracking-wide">TIME & SALES</span>
          <span className="text-[10px] text-terminal-green font-semibold px-1.5 py-0.2 bg-terminal-green/10 rounded border border-terminal-green/30">
            TAPE
          </span>
        </div>
        <span className="text-[10px] text-terminal-muted hidden sm:inline">CROSS-VENUE</span>
      </div>

      <div className="grid grid-cols-4 px-3 py-1 font-mono text-[10px] text-terminal-muted border-b border-terminal-border/40 bg-terminal-panel/40">
        <span>TIME</span>
        <span className="text-right">PRICE</span>
        <span className="text-right">SIZE</span>
        <span className="text-right">VENUE</span>
      </div>

      <div className="flex-1 flex flex-col space-y-1 p-2 font-mono text-[11px] overflow-hidden">
        {trades.slice(0, 9).map((trade) => {
          const isBuy = trade.side === "BUY";
          return (
            <div
              key={trade.id}
              className="grid grid-cols-4 items-center px-1 py-0.5 rounded hover:bg-terminal-panel/60 transition-colors"
            >
              <span className="text-terminal-subtext text-[10px] tabular-nums">
                {trade.time}
              </span>
              <span
                className={`text-right font-semibold tabular-nums ${
                  isBuy ? "text-terminal-green" : "text-terminal-red"
                }`}
              >
                ${trade.price.toFixed(2)}
              </span>
              <span className="text-right text-gray-300 tabular-nums">
                {trade.size.toFixed(3)}
              </span>
              <span className="text-right text-[9px] text-terminal-muted uppercase">
                {trade.venue}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

