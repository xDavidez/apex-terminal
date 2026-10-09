"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsProof from "@/components/StatsProof";
import FeatureGrid from "@/components/FeatureGrid";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import MarketHeatmap from "@/components/MarketHeatmap";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import DemoFormSection from "@/components/DemoFormSection";
import DemoModal from "@/components/DemoModal";
import Footer from "@/components/Footer";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTier, setModalTier] = useState<string>("Desk / Fund");

  const handleOpenDemoModal = (tier = "Desk / Fund") => {
    setModalTier(tier);
    setModalOpen(true);
  };

  const handleCloseDemoModal = () => {
    setModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-terminal-bg text-terminal-text relative selection:bg-terminal-amber selection:text-black">
      {/* Top Sticky Institutional Navigation */}
      <Navbar onRequestDemo={() => handleOpenDemoModal("Desk / Fund")} />

      {/* Hero Section with Live Mock Terminal & Ticker Tape */}
      <Hero onRequestDemo={() => handleOpenDemoModal("Desk / Fund")} />

      {/* Social Proof Strip & Latency Telemetry Stats */}
      <StatsProof />

      {/* Institutional 6-Feature Grid with Mini Visuals */}
      <FeatureGrid />

      {/* Interactive Bloomberg CLI Simulator */}
      <InteractiveTerminal />

      {/* Data & Market Coverage Heatmap + Venue Connectivity Matrix */}
      <MarketHeatmap />

      {/* Institutional Pricing with Annual Discount Toggle */}
      <Pricing onSelectTier={(tier) => handleOpenDemoModal(tier)} />

      {/* Verified Desk Reviews & Trader Testimonials */}
      <Testimonials />

      {/* Final Deployment CTA & Demo Request Form */}
      <DemoFormSection />

      {/* Regulatory Footer & Risk Disclosure */}
      <Footer />

      {/* Global Accessible Demo Request Modal */}
      <DemoModal
        isOpen={modalOpen}
        onClose={handleCloseDemoModal}
        preselectedTier={modalTier}
      />
    </main>
  );
}

