"use client";

import { useState, useEffect } from "react";

export default function BreathAnimation() {
  const [phase, setPhase] = useState("Inhale");

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev === "Inhale" ? "Exhale" : "Inhale"));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="text-5xl font-bold mb-6">{phase}</div>
      <div
        className={`w-40 h-40 rounded-full bg-blue-300 transition-all duration-1000 ${
          phase === "Inhale" ? "scale-125" : "scale-75"
        }`}
      />
    </div>
  );
}
