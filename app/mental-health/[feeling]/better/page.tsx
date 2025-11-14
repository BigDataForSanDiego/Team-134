"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

const feelingLabels: Record<string, string> = {
  anxiety: "Do you feel calmer now?",
  sadness: "Do you feel a bit lighter now?",
  anger: "Do you feel less angry now?",
  psychosis: "Do the voices feel less intense now?",
  overwhelmed: "Do you feel a little less overwhelmed now?",
};

export default function BetterPage() {
  const router = useRouter();
  const params = useParams<{ feeling?: string }>();

  // valor por defecto por si algo raro pasa
  const feeling = params.feeling ?? "anxiety";

  const [step, setStep] = useState<"check" | "followup">("check");

  const question =
    feelingLabels[feeling] ?? "Do you feel calmer now?";

  // Cuando responde YES en la primera pantalla
  const handleYes = () => {
    setStep("followup");
  };

  // Cuando responde NO en la primera pantalla
  const handleNo = () => {
    router.push("/mental-health/support");
  };

  // Boton para llamar a alguien real (988)
  const handleCall = () => {
    window.location.href = "tel:988";
  };

  // Boton para regresar al home
  const handleGoHome = () => {
    router.push("/");
  };

  // SEGUNDA PANTALLA: "Do you want to talk to someone real?"
  if (step === "followup") {
    return (
      <div className="min-h-screen bg-[#f2fbff] flex flex-col items-center pt-10 md:pt-16 px-3 md:px-6">
        <div className="max-w-4xl w-full mb-6 md:mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-4">
            Do you want to talk to someone real?
          </h1>
          <p className="text-base md:text-xl text-center text-gray-700">
            You can talk to a real person right now. Someone who will listen without judging you.
          </p>
        </div>

        <div className="w-full max-w-4xl flex-1 flex flex-col gap-6 justify-center mb-10">
          <button
            onClick={handleCall}
            className="flex-1 rounded-3xl bg-blue-700 hover:bg-blue-800 text-white
                       shadow-xl flex items-center justify-center px-6 md:px-10
                       text-xl md:text-3xl font-semibold transition-transform
                       hover:-translate-y-1"
          >
            <span className="text-3xl md:text-4xl mr-3">📞</span>
            <span className="truncate">Yes, call someone (988)</span>
          </button>

          <button
            onClick={handleGoHome}
            className="flex-1 rounded-3xl bg-gray-700 hover:bg-gray-800 text-white
                       shadow-xl flex items-center justify-center px-6 md:px-10
                       text-xl md:text-3xl font-semibold transition-transform
                       hover:-translate-y-1"
          >
            <span className="text-3xl md:text-4xl mr-3">🏠</span>
            <span className="truncate">No, go back to find shelters</span>
          </button>
        </div>
      </div>
    );
  }

  // PRIMERA PANTALLA: "Do you feel calmer now?"
  return (
    <div className="min-h-screen bg-[#f2fbff] flex flex-col items-center justify-center px-3 md:px-6">
      <div className="max-w-4xl w-full mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-4">
          {question}
        </h1>
      </div>

      <div className="w-full max-w-4xl flex flex-col gap-6 mb-10">
        <button
          onClick={handleYes}
          className="h-28 md:h-32 rounded-3xl bg-green-600 hover:bg-green-700 text-white
                     shadow-xl flex items-center justify-center px-6 md:px-10
                     text-xl md:text-3xl font-semibold transition-transform
                     hover:-translate-y-1"
        >
          <span className="text-3xl md:text-4xl mr-3">😊</span>
          <span className="truncate">Yes, I feel better</span>
        </button>

        <button
          onClick={handleNo}
          className="h-28 md:h-32 rounded-3xl bg-red-600 hover:bg-red-700 text-white
                     shadow-xl flex items-center justify-center px-6 md:px-10
                     text-xl md:text-3xl font-semibold transition-transform
                     hover:-translate-y-1"
        >
          <span className="text-3xl md:text-4xl mr-3">⚠️</span>
          <span className="truncate">No, I still need help</span>
        </button>
      </div>
    </div>
  );
}
