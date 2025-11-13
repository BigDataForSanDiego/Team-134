"use client";

import Link from "next/link";
import feelings from "@/lib/mental-health-data";

export default function FeelingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {feelings.map((feeling) => (
        <Link
          key={feeling.id}
          href={`/mental-health/${feeling.id}/coping`}
          className="
            bg-white 
            rounded-xl 
            shadow 
            hover:shadow-lg 
            p-6 
            flex 
            flex-col 
            items-center 
            text-center 
            transition 
            hover:-translate-y-1
          "
        >
          <div className="text-6xl mb-4">{feeling.icon}</div>
          <div className="text-xl font-semibold">{feeling.label}</div>
        </Link>
      ))}
    </div>
  );
}
