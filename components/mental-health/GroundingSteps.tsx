"use client";

import { useState } from "react";
import type { CopingStep } from "@/lib/mental-health-data";

type GroundingStepsProps = {
  steps: CopingStep[];
};

export default function GroundingSteps({ steps }: GroundingStepsProps) {
  const [index, setIndex] = useState(0);

  const current = steps[index];
  const hasNext = index < steps.length - 1;

  const handleNext = () => {
    if (hasNext) {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Tarjeta grande y legible */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-md px-6 md:px-10 py-6 md:py-8">
        <p className="text-sm md:text-base text-slate-500 mb-4">
          Step {index + 1} of {steps.length}
        </p>

        <p className="whitespace-pre-line text-lg md:text-2xl text-center leading-relaxed">
          {current.text}
        </p>
      </div>

      {/* Boton NEXT grande (protagonista) */}
      {hasNext && (
        <button
          onClick={handleNext}
          className="mt-6 w-full max-w-2xl bg-blue-600 hover:bg-blue-700 text-white text-lg md:text-2xl font-semibold py-4 md:py-5 rounded-2xl shadow-md transition-colors"
        >
          Next Step
        </button>
      )}
    </div>
  );
}
