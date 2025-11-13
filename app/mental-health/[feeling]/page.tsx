import feelings from "@/lib/mental-health-data";
import Link from "next/link";

export default async function FeelingPage({
  params,
}: {
  params: Promise<{ feeling: string }>;
}) {
  // Next.js now passes params as a Promise – we MUST await it
  const { feeling: feelingId } = await params;

  const feeling = feelings.find((f) => f.id === feelingId);

  if (!feeling) {
    return <p className="p-6 text-center text-red-600 text-xl">Not found</p>;
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">{feeling.label}</h1>
      <p className="text-lg mb-6">
        Lets try something to help you feel calmer.
      </p>

      <Link
        href={`/mental-health/${feeling.id}/coping`}
        className="bg-blue-600 text-white text-xl px-6 py-4 rounded-xl shadow-lg"
      >
        Start
      </Link>
    </div>
  );
}
