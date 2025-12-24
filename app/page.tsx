"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import StatsCards from "@/components/StatsCards";
import HabitList from "@/components/HabitList";
import AddHabitModal from "@/components/AddHabitModal";

import { useHabits } from "@/hooks/useHabits";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

export default function HomePage() {
  const [open, setOpen] = useState(false);

  const {
    habits,
    addHabit,
    toggleHabit,
    completedCount,
    deleteHabit,
    totalCount,
    progress,
  } = useHabits();

  // 🔑 Keyboard shortcuts (Mac power-user mode)
  useKeyboardShortcuts({
    habits,
    openAddModal: () => setOpen(true),
    toggleHabit,
    closeModal: () => setOpen(false),
  });

  return (
    <main className="min-h-screen flex justify-center bg-black text-white">
      <div className="w-full max-w-4xl px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-end gap-2">
          <Link
            href="/stats"
            className="
              px-4 py-2 rounded-lg border border-neutral-800
              bg-neutral-900 text-sm text-neutral-200
              hover:bg-neutral-800 transition
            "
          >
            Stats
          </Link>

          <Link
            href="/motivation"
            className="
              px-4 py-2 rounded-lg border border-neutral-800
              bg-neutral-900 text-sm text-neutral-200
              hover:bg-neutral-800 transition
            "
          >
            Motivation
          </Link>
        </div>

        {/* Date */}
        <section className="mt-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </h1>

          <p className="mt-2 text-sm text-neutral-400">
            Stay consistent. Small steps, big results.
          </p>
        </section>

        {/* Stats */}
        <section className="mt-10">
          <StatsCards
            completedCount={completedCount}
            totalCount={totalCount}
            progress={progress}
          />
        </section>

        {/* Habits */}
        <section className="mt-10">
          <HabitList
            habits={habits}
            onToggle={toggleHabit}
            onDelete={deleteHabit}
          />

          {habits.length === 0 && (
            <p className="mt-10 text-sm text-neutral-500 text-center">
              No habits yet. Start with one small commitment.
            </p>
          )}

          {/* ➕ Add Habit Button (below list, all devices) */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setOpen(true)}
              className="
                flex items-center gap-2
                px-6 py-3 rounded-xl
                border border-neutral-800
                bg-neutral-900
                text-sm text-neutral-200
                hover:bg-neutral-800 transition
              "
            >
              <Plus size={18} />
              Add Habit
            </button>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-16 flex justify-center">
          <span className="px-4 py-2 rounded-full bg-neutral-900 text-neutral-300 text-sm">
            Discipline beats motivation.
          </span>
        </div>
      </div>

      {/* Modal */}
      <AddHabitModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onAdd={addHabit}
      />
    </main>
  );
}
