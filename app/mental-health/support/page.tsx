"use client";

import { useRouter } from "next/navigation";

export default function SupportPage() {
  const router = useRouter();

  const handleCall911 = () => {
    // Marca al 911
    window.location.href = "tel:911";
  };

  const handleCall988 = () => {
    // Linea de crisis / apoyo emocional
    window.location.href = "tel:988";
  };

  return (
    <div className="min-h-screen bg-[#f2fbff] flex flex-col items-center pt-10 md:pt-16 px-3 md:px-6">
      {/* Titulo y texto descriptivo */}
      <div className="max-w-4xl w-full mb-6 md:mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-4">
          You are not alone.
        </h1>
        <p className="text-base md:text-xl text-center text-gray-700">
          If you are in crisis or feel unsafe, please reach out now.  
          Choose one of the options below and we will help you connect with
          emergency support.
        </p>
      </div>

      {/* Botones enormes */}
      <div className="w-full max-w-4xl flex-1 flex flex-col gap-6 justify-center mb-10">
        {/* 911 */}
        <button
          onClick={handleCall911}
          className="flex-1 rounded-3xl bg-red-700 hover:bg-red-800 text-white
                     shadow-xl flex items-center justify-center px-6 md:px-10
                     text-xl md:text-3xl font-semibold transition-transform
                     hover:-translate-y-1"
        >
          <span className="text-3xl md:text-4xl mr-3">🚨</span>
          <span className="truncate">Call an ambulance (911)</span>
        </button>

        {/* 988 */}
        <button
          onClick={handleCall988}
          className="flex-1 rounded-3xl bg-blue-700 hover:bg-blue-800 text-white
                     shadow-xl flex items-center justify-center px-6 md:px-10
                     text-xl md:text-3xl font-semibold transition-transform
                     hover:-translate-y-1"
        >
          <span className="text-3xl md:text-4xl mr-3">💬</span>
          <span className="truncate">Talk to someone (988)</span>
        </button>
      </div>

      {/* Link pequeño para regresar */}
      <button
        onClick={() => router.back()}
        className="mb-8 text-sm md:text-base text-gray-600 underline hover:text-gray-800"
      >
        Go back
      </button>
    </div>
  );
}
