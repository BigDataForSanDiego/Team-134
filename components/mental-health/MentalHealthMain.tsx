"use client";

import FeelingGrid from "./FeelingGrid";

export default function MentalHealthMain() {
  return (
    <div className="w-full h-full p-6 flex flex-col items-center">
      {/* HEADER ÚNICO */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold">How are you feeling today?</h1>
        <p className="text-lg mt-2 opacity-80">
          Tap the option that describes what you are experiencing.
        </p>
      </div>

      {/* GRID */}
      <div className="w-full max-w-3xl">
        <FeelingGrid />
      </div>
    </div>
  );
}
