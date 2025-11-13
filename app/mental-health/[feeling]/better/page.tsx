import Link from "next/link";

export default function BetterPage() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">
        Do you feel calmer now?
      </h1>

      <div className="flex flex-col gap-6 mt-4">
        <Link
          href="/"
          className="bg-green-600 text-white text-xl px-6 py-4 rounded-xl"
        >
          Yes, I feel better
        </Link>

        <Link
          href="/mental-health/support"
          className="bg-red-600 text-white text-xl px-6 py-4 rounded-xl"
        >
          No, I still need help
        </Link>
      </div>
    </div>
  );
}
