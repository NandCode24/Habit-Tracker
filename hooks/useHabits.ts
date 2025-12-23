"use client";

import { useEffect, useRef, useState } from "react";
import { Habit } from "@/types/habit";
import { loadHabits, saveHabits } from "@/lib/storage";
import { getToday, getYesterday } from "@/utils/date";
import { nanoid } from "nanoid";

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const hasHydrated = useRef(false);

  // 🔹 Load once + normalize for today
  useEffect(() => {
    const stored = loadHabits();
    const today = getToday();

    const hydrated: Habit[] = stored.map((habit) => ({
      ...habit,
      completedToday: habit.lastCompletedDate === today,
      completedDates: habit.completedDates ?? [], // backward safety
    }));

    setHabits(hydrated);
    hasHydrated.current = true;
  }, []);

  // 🔹 Persist AFTER hydration
useEffect(() => {
  if (!hasHydrated.current) return;

  // 🛑 CRITICAL GUARD: never overwrite with empty state
  if (habits.length === 0 && loadHabits().length > 0) {
    return;
  }

  saveHabits(habits);
}, [habits]);

  // 🔥 Strict streak + history logic
  function toggleHabit(id: string) {
    const today = getToday();
    const yesterday = getYesterday();

    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        if (h.completedToday) return h; // no double completion

        let newStreak = 1;

        // Continue streak
        if (h.lastCompletedDate === yesterday) {
          newStreak = h.streak + 1;
        }

        // Missed any day → reset to 1 (fresh start)
        if (h.lastCompletedDate && h.lastCompletedDate !== yesterday) {
          newStreak = 1;
        }

        return {
          ...h,
          completedToday: true,
          streak: newStreak,
          lastCompletedDate: today,
          completedDates: h.completedDates.includes(today)
            ? h.completedDates
            : [...h.completedDates, today],
        };
      })
    );
  }

  // ➕ Add habit
  function addHabit(data: { title: string; subtitle?: string; emoji: string }) {
    const newHabit: Habit = {
      id: nanoid(),
      title: data.title,
      subtitle: data.subtitle,
      emoji: data.emoji,

      streak: 0,
      completedToday: false,
      lastCompletedDate: undefined,
      completedDates: [],
    };

    setHabits((prev) => [...prev, newHabit]);
  }

  // 📊 Derived stats
  const completedCount = habits.filter((h) => h.completedToday).length;
  const totalCount = habits.length;
  const progress =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return {
    habits,
    addHabit,
    toggleHabit,
    completedCount,
    totalCount,
    progress,
  };
}
