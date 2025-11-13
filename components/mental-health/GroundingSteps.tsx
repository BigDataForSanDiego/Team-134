"use client";

import { useState } from "react";

const steps = [
  "Look around and name 5 things you can see.",
  "Name 4 things you can touch.",
  "Name 3 things you can hear.",
  "Name 2 things you can smell.",
  "Name 1 thing you like about yourself."
];

export default function GroundingSteps() {
  const [index, setIndex] = useState(0);

  return (
    <div className="text-center w-full">
      <p className="text-3xl mb-8">{steps[index]}</p>

      {index < steps.length - 1 ? (
        <button
          onClick={() => setIndex(index + 1)}
          className="bg-blue-600 text-white px-8 py-4 rounded-xl text-xl"
        >
          Next
        </button>
      ) : (
        <p className="text-xl text-green-700 font-semibold">
          Well done.
        </p>
      )}
    </div>
  );
}
