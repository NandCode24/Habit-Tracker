"use client";

import Link from "next/link";
import ProgressRing from "@/components/ProgressRing";
import WeeklyBars from "@/components/WeeklyBars";
import { useHabits } from "@/hooks/useHabits";
import { calculateBestStreak } from "@/utils/streak";

export default function StatsPage() {
  const { completedCount, totalCount, progress, habits } = useHabits();

  // 🔥 Current streak = max active streak today
  const currentStreak = Math.max(...habits.map((h) => h.streak), 0);

  // 🏆 Best streak ever (derived from history)
  const bestStreakAllTime = Math.max(
    ...habits.map((h) => calculateBestStreak(h.completedDates)),
    0
  );

  return (
    <main className="min-h-screen flex justify-center">
      <div className="w-full max-w-5xl px-6 py-6">
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

        {/* Heading */}
        <section className="mt-10">
          <h1 className="text-3xl font-bold">Progress</h1>
          <p className="text-gray-500 mt-1">
            Consistency is the key to discipline.
          </p>
        </section>

        {/* Top cards */}
        <section className="mt-10 grid grid-cols-2 gap-6">
          {/* Today focus */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-xs uppercase text-gray-600 mb-4">
              Today’s Focus
            </p>

            <div className="flex justify-center">
              <ProgressRing
                progress={progress}
                completed={completedCount}
                total={totalCount}
              />
            </div>

            <p className="mt-4 text-center text-sm text-gray-600">
              Complete{" "}
              <span className="text-green-600 font-medium">
                {Math.max(totalCount - completedCount, 0)} more
              </span>{" "}
              to hit your goal.
            </p>
          </div>

          {/* Streak summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-xs uppercase text-gray-600 mb-4">
              🔥 Current Streak
            </p>

            <p className="text-5xl font-bold">
              {currentStreak}
              <span className="text-lg text-gray-600 ml-2">days</span>
            </p>

            <p className="mt-4 text-gray-600 text-sm">
              Discipline compounds when you don’t break the chain.
            </p>

            <div className="mt-6 flex gap-12 text-sm">
              <div>
                <p className="text-gray-600">Best Streak</p>
                <p className="font-semibold">{bestStreakAllTime} Days</p>
              </div>

              <div>
                <p className="text-gray-600">Active Habits</p>
                <p className="font-semibold">
                  {habits.filter((h) => h.streak > 0).length}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly progress */}
        <section className="mt-10 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs uppercase text-gray-600">Last 7 Days</p>

            <span className="text-green-600 text-sm bg-green-100 px-3 py-1 rounded-full">
              Based on real data
            </span>
          </div>

          {/* ✅ PASS REAL HABITS DATA */}
          <WeeklyBars habits={habits} />
        </section>

        {/* Footer */}
        <div className="mt-16 flex justify-center">
          <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm">
            Discipline beats motivation.
          </span>
        </div>
      </div>
    </main>
  );
}
