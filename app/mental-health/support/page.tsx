import Link from "next/link";

export default function CrisisSupport() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">You are not alone.</h1>

      <p className="text-xl mb-8">
        Would you like me to connect you with emergency help?
      </p>

      <div className="flex flex-col gap-6">
        <a
          href="tel:911"
          className="bg-red-700 text-white px-6 py-4 rounded-xl text-xl"
        >
          Call an ambulance (911)
        </a>

        <a
          href="tel:988"
          className="bg-blue-700 text-white px-6 py-4 rounded-xl text-xl"
        >
          Talk to someone (988)
        </a>

        <Link href="/" className="px-6 py-4 text-xl underline">
          Go back
        </Link>
      </div>
    </div>
  );
}
