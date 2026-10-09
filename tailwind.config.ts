import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: "#07090C",
          surface: "#0C0F15",
          panel: "#10141D",
          header: "#141A24",
          border: "#1C2331",
          borderBright: "#2D3748",
          amber: "#FF9F1C",
          amberMuted: "rgba(255, 159, 28, 0.15)",
          amberHover: "#FFAE3D",
          green: "#00D27A",
          greenMuted: "rgba(0, 210, 122, 0.12)",
          red: "#FF4D5E",
          redMuted: "rgba(255, 77, 94, 0.12)",
          cyan: "#00E5FF",
          cyanMuted: "rgba(0, 229, 255, 0.12)",
          muted: "#6B7280",
          text: "#E5E7EB",
          subtext: "#9CA3AF",
        },
      },
      fontFamily: {
        mono: [
          "'JetBrains Mono'",
          "'IBM Plex Mono'",
          "'SF Mono'",
          "Menlo",
          "Consolas",
          "monospace",
        ],
        sans: [
          "'Inter'",
          "'Space Grotesk'",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
      animation: {
        "ticker": "ticker 35s linear infinite",
        "ticker-reverse": "tickerReverse 35s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scanline": "scanline 8s linear infinite",
        "flash-green": "flashGreen 0.6s ease-out",
        "flash-red": "flashRed 0.6s ease-out",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        tickerReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        flashGreen: {
          "0%": { backgroundColor: "rgba(0, 210, 122, 0.35)" },
          "100%": { backgroundColor: "transparent" },
        },
        flashRed: {
          "0%": { backgroundColor: "rgba(255, 77, 94, 0.35)" },
          "100%": { backgroundColor: "transparent" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

