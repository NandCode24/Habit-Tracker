"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const MESSAGES = [
  "Do it even when you don’t feel like it.",
  "Discipline is choosing what you want most over what you want now.",
  "Consistency is more important than intensity.",
  "You don’t need motivation. You need standards.",
  "Miss once, it’s a mistake. Miss twice, it’s a habit.",
  "Show up. Even when it’s boring.",
  "Your future self is watching your choices today.",
  "Small actions, done daily, decide everything.",
];

export default function MotivationPage() {
  const [message, setMessage] = useState<string | null>(null);

  // Pick message ONLY on client after hydration
  useEffect(() => {
    const random = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    setMessage(random);
  }, []);

  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-3xl px-6 py-10">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-green-500 text-white flex items-center justify-center font-bold">
              ✓
            </div>
            <span className="font-semibold text-lg">HabitSync</span>
          </div>

          <Link
            href="/"
            className="px-4 py-2 rounded-lg border bg-white text-sm"
          >
            ← Dashboard
          </Link>
        </div>

        {/* Message */}
        <div className="mt-24 flex flex-col items-center text-center">
          <p className="text-3xl md:text-4xl font-semibold leading-relaxed min-h-3.5rem">
            {message ?? ""}
          </p>

          <div className="mt-10 h-px w-24 bg-gray-300" />

          <p className="mt-6 text-sm text-gray-400">
            Discipline beats motivation.
          </p>
        </div>
      </div>
    </main>
  );
}
