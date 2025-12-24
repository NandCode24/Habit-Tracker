"use client";

import Link from "next/link";
import ProgressRing from "@/components/ProgressRing";
import WeeklyBars from "@/components/WeeklyBars";
import { useHabits } from "@/hooks/useHabits";

export default function StatsPage() {
  const { completedCount, totalCount, progress, habits } = useHabits();

  // 🔥 Current streak = max active streak
  const currentStreak = Math.max(...habits.map((h) => h.streak), 0);

  // 🏆 Best streak ever (already computed in hook)
  const bestStreakAllTime = Math.max(...habits.map((h) => h.streak), 0);

  return (
    <main className="min-h-screen flex justify-center bg-black text-white">
      <div className="w-full max-w-5xl px-6 py-6">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-green-500 text-black flex items-center justify-center font-bold">
              ✓
            </div>
            <span className="font-semibold text-lg">HabitSync</span>
          </div>

          <Link
            href="/"
            className="
              px-4 py-2 rounded-lg
              border border-neutral-800
              bg-neutral-900 text-sm text-neutral-200
              hover:bg-neutral-800 transition
            "
          >
            ← Dashboard
          </Link>
        </div>

        {/* Heading */}
        <section className="mt-10">
          <h1 className="text-3xl font-semibold tracking-tight">Progress</h1>
          <p className="text-neutral-400 mt-1">
            Consistency is the key to discipline.
          </p>
        </section>

        {/* Top cards */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Today focus */}
          <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
            <p className="text-xs uppercase text-neutral-400 mb-4">
              Today’s Focus
            </p>

            <div className="flex justify-center">
              <ProgressRing
                progress={progress}
                completed={completedCount}
                total={totalCount}
              />
            </div>

            <p className="mt-4 text-center text-sm text-neutral-400">
              Complete{" "}
              <span className="text-green-400 font-medium">
                {Math.max(totalCount - completedCount, 0)} more
              </span>{" "}
              to hit your goal.
            </p>
          </div>

          {/* Streak summary */}
          <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
            <p className="text-xs uppercase text-neutral-400 mb-4">
              🔥 Current Streak
            </p>

            <p className="text-5xl font-bold text-white">
              {currentStreak}
              <span className="text-lg text-neutral-400 ml-2">periods</span>
            </p>

            <p className="mt-4 text-neutral-400 text-sm">
              Discipline compounds when you don’t break the chain.
            </p>

            <div className="mt-6 flex gap-12 text-sm">
              <div>
                <p className="text-neutral-500">Best Streak</p>
                <p className="font-semibold text-white">{bestStreakAllTime}</p>
              </div>

              <div>
                <p className="text-neutral-500">Active Habits</p>
                <p className="font-semibold text-white">
                  {habits.filter((h) => h.streak > 0).length}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly progress */}
        <section className="mt-10 bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs uppercase text-neutral-400">Last 7 Days</p>

            <span className="text-green-400 text-sm bg-green-500/10 px-3 py-1 rounded-full">
              Real data
            </span>
          </div>

          <WeeklyBars habits={habits} />
        </section>

        {/* Footer */}
        <div className="mt-16 flex justify-center">
          <span
            className="
            px-4 py-2 rounded-full
            bg-neutral-900 border border-neutral-800
            text-neutral-300 text-sm
          "
          >
            Discipline beats motivation.
          </span>
        </div>
      </div>
    </main>
  );
}
