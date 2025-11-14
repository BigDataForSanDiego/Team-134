"use client";

import { useParams, useRouter } from "next/navigation";
import feelings from "@/lib/mental-health-data";
import BreathAnimation from "@/components/mental-health/BreathAnimation";
import GroundingSteps from "@/components/mental-health/GroundingSteps";

export default function CopingPage() {
  const { feeling } = useParams() as { feeling: string };
  const router = useRouter();

  const data = feelings.find((f) => f.id === feeling);

  if (!data) {
    return <div className="p-6 text-center text-xl">Not found</div>;
  }

  const handleContinue = () => {
    router.push(`/mental-health/${feeling}/better`);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-2 text-center">{data.label}</h1>
      <p className="text-lg text-center mb-8 max-w-2xl">{data.subText}</p>

      {/* Aqui ya usamos copingType y los pasos del data */}
      {data.copingType === "breathing" ? (
        <BreathAnimation />
      ) : (
        <GroundingSteps steps={data.copingSteps} />
      )}

      <button
        onClick={handleContinue}
        className="mt-10 bg-green-600 text-white text-xl font-semibold px-8 py-4 rounded-2xl shadow-lg w-full max-w-xl"
      >
        Continue
      </button>
    </div>
  );
}
