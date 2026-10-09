"use client";

import React, { useEffect, useRef, useState } from "react";
import { createChart, IChartApi, ISeriesApi, CandlestickData, Time } from "lightweight-charts";
import { Maximize2, RefreshCw, BarChart2, Layers } from "lucide-react";
import { playTerminalClick } from "@/lib/soundEffect";

interface ChartWidgetProps {
  symbol?: string;
  timeframe?: string;
}

export default function ChartWidget({ symbol = "BTC/USDT", timeframe = "1m" }: ChartWidgetProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

  const [activeTf, setActiveTf] = useState(timeframe);
  const [currentPrice, setCurrentPrice] = useState(68420.5);
  const [priceChange, setPriceChange] = useState(+3.42);
  const [highPrice, setHighPrice] = useState(69150.0);
  const [lowPrice, setLowPrice] = useState(66200.0);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Clear any previous chart instances
    chartContainerRef.current.innerHTML = "";

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "#0A0D14" },
        textColor: "#8F9BA8",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: "#141A24" },
        horzLines: { color: "#141A24" },
      },
      crosshair: {
        mode: 1, // Normal crosshair
        vertLine: {
          color: "#FF9F1C",
          width: 1,
          style: 3,
          labelBackgroundColor: "#1E2533",
        },
        horzLine: {
          color: "#FF9F1C",
          width: 1,
          style: 3,
          labelBackgroundColor: "#1E2533",
        },
      },
      timeScale: {
        borderColor: "#1E2533",
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: "#1E2533",
        scaleMargins: {
          top: 0.1,
          bottom: 0.2,
        },
      },
      handleScale: {
        axisPressedMouseMove: true,
      },
      handleScroll: {
        vertTouchDrag: false,
      },
    });

    chartRef.current = chart;

    // Candlestick Series
    const candleSeries = chart.addCandlestickSeries({
      upColor: "#00D27A",
      downColor: "#FF4D5E",
      borderUpColor: "#00D27A",
      borderDownColor: "#FF4D5E",
      wickUpColor: "#00D27A",
      wickDownColor: "#FF4D5E",
    });
    candleSeriesRef.current = candleSeries;

    // Volume Series
    const volumeSeries = chart.addHistogramSeries({
      color: "#26a69a",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "", // Overlay on same area
    });
    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });
    volumeSeriesRef.current = volumeSeries;

    // Generate initial historical 60 candles
    const initialCandles: CandlestickData<Time>[] = [];
    const initialVolume: Array<{ time: Time; value: number; color: string }> = [];

    const now = Math.floor(Date.now() / 1000);
    let basePrice = symbol.includes("ETH") ? 3520 : symbol.includes("SOL") ? 176 : 68100;
    const intervalSeconds = activeTf === "1s" ? 1 : activeTf === "5s" ? 5 : activeTf === "1m" ? 60 : 300;

    for (let i = 50; i >= 0; i--) {
      const time = (now - i * intervalSeconds) as unknown as Time;
      const variation = (Math.random() - 0.48) * (basePrice * 0.0035);
      const open = basePrice;
      const close = basePrice + variation;
      const high = Math.max(open, close) + Math.random() * (basePrice * 0.002);
      const low = Math.min(open, close) - Math.random() * (basePrice * 0.002);
      const vol = Math.floor(Math.random() * 45 + 5);

      initialCandles.push({
        time,
        open,
        high,
        low,
        close,
      });

      initialVolume.push({
        time,
        value: vol,
        color: close >= open ? "rgba(0, 210, 122, 0.4)" : "rgba(255, 77, 94, 0.4)",
      });

      basePrice = close;
    }

    candleSeries.setData(initialCandles);
    volumeSeries.setData(initialVolume);

    let lastCandle = { ...initialCandles[initialCandles.length - 1] };
    setCurrentPrice(Number(lastCandle.close.toFixed(2)));

    // Live tick simulator
    const tickInterval = setInterval(() => {
      const isUp = Math.random() > 0.48;
      const tickDelta = (Math.random() * 0.0006 + 0.0001) * lastCandle.close * (isUp ? 1 : -1);
      const newClose = Number((lastCandle.close + tickDelta).toFixed(2));
      const newHigh = Math.max(lastCandle.high, newClose);
      const newLow = Math.min(lastCandle.low, newClose);

      lastCandle = {
        ...lastCandle,
        high: newHigh,
        low: newLow,
        close: newClose,
      };

      candleSeries.update(lastCandle);
      setCurrentPrice(newClose);
    }, 900);

    // Responsive resize handler
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      clearInterval(tickInterval);
      resizeObserver.disconnect();
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [symbol, activeTf]);

  return (
    <div className="flex flex-col h-full bg-[#0A0D14] border border-terminal-border rounded overflow-hidden">
      {/* Chart Top Header & Controls */}
      <div className="flex flex-wrap items-center justify-between px-3 py-2 bg-terminal-header border-b border-terminal-border gap-2">
        {/* Symbol & Price Summary */}
        <div className="flex items-center space-x-3 font-mono">
          <span className="font-bold text-white text-sm tracking-wide">{symbol}</span>
          <span className="text-sm font-bold text-terminal-green tabular-nums">
            ${currentPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] font-semibold text-terminal-green px-1.5 py-0.5 rounded bg-terminal-greenMuted border border-terminal-green/30">
            +{priceChange}%
          </span>
          <div className="hidden sm:flex items-center space-x-2 text-[10px] text-terminal-muted border-l border-terminal-border pl-2">
            <span>24H H: <span className="text-gray-300 font-semibold">${highPrice}</span></span>
            <span>24H L: <span className="text-gray-300 font-semibold">${lowPrice}</span></span>
          </div>
        </div>

        {/* Timeframe Selectors & Status */}
        <div className="flex items-center space-x-1.5 font-mono text-[10px]">
          {["1s", "5s", "1m", "15m", "1h", "4h"].map((tf) => (
            <button
              key={tf}
              onClick={() => {
                playTerminalClick(1.0);
                setActiveTf(tf);
              }}
              className={`px-2 py-0.5 rounded transition-colors ${
                activeTf === tf
                  ? "bg-terminal-amber text-black font-bold"
                  : "text-terminal-muted hover:text-white bg-terminal-panel hover:bg-terminal-border"
              }`}
            >
              {tf}
            </button>
          ))}
          <div className="flex items-center space-x-1 pl-2 text-terminal-green">
            <span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse"></span>
            <span className="text-[9px] font-bold tracking-widest hidden md:inline">STREAMING</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="relative flex-1 w-full min-h-[300px] sm:min-h-[360px]" ref={chartContainerRef}>
        {/* Background watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <span className="font-mono text-7xl font-black text-terminal-amber">APEX</span>
        </div>
      </div>
    </div>
  );
}

