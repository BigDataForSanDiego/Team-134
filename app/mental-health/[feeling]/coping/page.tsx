"use client";

import { useParams, useRouter } from "next/navigation";
import feelings from "@/lib/mental-health-data";
import BreathAnimation from "@/components/mental-health/BreathAnimation";
import GroundingSteps from "@/components/mental-health/GroundingSteps";

export default function CopingPage() {
  const params = useParams() as { feeling: string };
  const router = useRouter();

  const data = feelings.find((f) => f.id === params.feeling);

  if (!data) {
    return <div className="p-6 text-center text-xl">Not found</div>;
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">{data.label}</h1>

      {data.coping === "breathing" ? (
        <BreathAnimation />
      ) : (
        <GroundingSteps />
      )}

      <button
        onClick={() =>
          router.push(`/mental-health/${params.feeling}/better`)
        }
        className="mt-10 bg-green-600 text-white text-xl font-semibold px-8 py-4 rounded-2xl shadow-lg"
      >
        Continue
      </button>
    </div>
  );
}
