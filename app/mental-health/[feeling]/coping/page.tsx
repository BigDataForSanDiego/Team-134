"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import feelings from "@/lib/mental-health-data";

// Emoji / iconos por paso, sin tocar tu mental-health-data.ts
const stepIcons: Record<string, string[]> = {
  anxiety: ["🫁", "👀", "🚶"],          // respirar, grounding, moverse
  "very-sad": ["💧", "🧍", "📞"],      // llanto/tristeza, accion pequena, pedir ayuda
  ptsd: ["🧠", "📍", "🌳"],           // cerebro/recuerdo, orientarse, grounding fuerte
  voices: ["💭", "🔊", "🎧"],         // voces, ruido, musica/sonido
  anger: ["🚫", "🔢", "🏃"],          // parar, contar, mover energia
  overwhelmed: ["🧩", "📝", "➡️"],   // muchas cosas, lista, siguiente paso
};

export default function CopingPage() {
  const params = useParams() as { feeling: string };
  const router = useRouter();

  const data = feelings.find((f) => f.id === params.feeling);

  const [stepIndex, setStepIndex] = useState(0);

  if (!data) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
        <p className="text-xl">Not found</p>
      </div>
    );
  }

  const steps = data.copingSteps;
  const totalSteps = steps.length;
  const currentStep = steps[stepIndex];

  const iconForStep =
    stepIcons[data.id]?.[stepIndex] ?? data.icon;

  const handleNext = () => {
    if (stepIndex < totalSteps - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      // si ya acabo los pasos, lo mandamos a la pantalla de "Do you feel calmer?"
      router.push(`/mental-health/${params.feeling}/better`);
    }
  };

  const handleContinue = () => {
    router.push(`/mental-health/${params.feeling}/better`);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-between p-6">
      {/* Contenido principal */}
      <div className="w-full max-w-3xl mx-auto flex-1 flex flex-col items-center">
        {/* Titulo y linea de apoyo */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          {data.label}
        </h1>

        <p className="text-lg md:text-xl text-center text-slate-700 mb-6 max-w-2xl">
          {data.subText}
        </p>

        {/* Tarjeta de paso con icono grande y texto legible */}
        <div className="bg-white rounded-3xl shadow-lg w-full px-6 py-7 md:px-10 md:py-10 mb-8">
          {/* Barra de progreso simple */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500">
              Step {stepIndex + 1} of {totalSteps}
            </span>
            <div className="flex gap-2">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i <= stepIndex
                      ? "bg-blue-600 w-6"
                      : "bg-slate-200 w-2"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Icono + texto (muy legible) */}
          <div className="flex items-start gap-4 md:gap-6">
            <div className="flex-shrink-0">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-50 animate-pulse">
                <span className="text-3xl md:text-4xl">
                  {iconForStep}
                </span>
              </div>
            </div>

            <p className="text-lg md:text-xl leading-relaxed text-left">
              {currentStep.text}
            </p>
          </div>
        </div>

        {/* Boton principal: NEXT, grande y clarisimo */}
        <button
          onClick={handleNext}
          className="w-full max-w-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xl md:text-2xl py-4 md:py-5 rounded-2xl shadow-lg transition"
        >
          {stepIndex < totalSteps - 1 ? "Next" : "I finished these steps"}
        </button>
      </div>

      {/* Boton secundario: mas chico, abajo, para no competir con NEXT */}
      <button
        onClick={handleContinue}
        className="mt-6 mb-2 text-base md:text-lg text-slate-600 underline underline-offset-4"
      >
        Skip / I already feel a bit better
      </button>
    </div>
  );
}
