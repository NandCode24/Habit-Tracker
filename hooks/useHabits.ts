"use client";

import { useEffect, useRef, useState } from "react";
import { Habit } from "@/types/habit";
import { loadHabits, saveHabits } from "@/lib/storage";
import { getToday, getWeekKey, getMonthKey } from "@/utils/date";
import { nanoid } from "nanoid";

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const hasHydrated = useRef(false);

  // 🔹 Load once
  useEffect(() => {
    const stored = loadHabits();
    const today = getToday();

    const hydrated: Habit[] = stored.map((habit) => ({
      ...habit,
      completedToday: habit.completedDates?.includes(today) ?? false,
      completedDates: habit.completedDates ?? [],
      frequencyType: habit.frequencyType ?? "weekly",
      frequencyTarget: habit.frequencyTarget ?? 1,
    }));

    setHabits(hydrated);
    hasHydrated.current = true;
  }, []);

  // 🔹 Persist safely
  useEffect(() => {
    if (!hasHydrated.current) return;
    if (habits.length === 0 && loadHabits().length > 0) return;
    saveHabits(habits);
  }, [habits]);

  // 🔥 Toggle habit (frequency-aware + HARD CAP)
  function toggleHabit(id: string) {
    const today = getToday();

    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        if (h.completedToday) return h;

        // 🔒 CRITICAL: block over-completion
        const currentPeriodKey =
          h.frequencyType === "weekly" ? getWeekKey(today) : getMonthKey(today);

        const currentPeriodCount = h.completedDates.filter((d) =>
          h.frequencyType === "weekly"
            ? getWeekKey(d) === currentPeriodKey
            : getMonthKey(d) === currentPeriodKey
        ).length;

        // 🛑 Stop if target already met
        if (currentPeriodCount >= h.frequencyTarget) {
          return h;
        }

        // ✅ Safe to add completion
        const updatedDates = [...h.completedDates, today];

        // 🔢 Recalculate streaks
        const periodMap = new Map<string, number>();

        for (const date of updatedDates) {
          const key =
            h.frequencyType === "weekly" ? getWeekKey(date) : getMonthKey(date);

          periodMap.set(key, (periodMap.get(key) ?? 0) + 1);
        }

        const periods = Array.from(periodMap.keys()).sort();

        let streak = 0;
        let current = 0;

        for (const period of periods) {
          const count = periodMap.get(period)!;

          if (count >= h.frequencyTarget) {
            current += 1;
            streak = Math.max(streak, current);
          } else {
            current = 0;
          }
        }

        return {
          ...h,
          completedToday: true,
          completedDates: updatedDates,
          streak,
        };
      })
    );
  }

  function deleteHabit(id: string) {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }

  // ➕ Add habit
  function addHabit(data: {
    title: string;
    subtitle?: string;
    emoji: string;
    frequencyType: "weekly" | "monthly";
    frequencyTarget: number;
  }) {
    const newHabit: Habit = {
      id: nanoid(),
      title: data.title,
      subtitle: data.subtitle,
      emoji: data.emoji,

      frequencyType: data.frequencyType,
      frequencyTarget: data.frequencyTarget,

      streak: 0,
      completedToday: false,
      completedDates: [],
    };

    setHabits((prev) => [...prev, newHabit]);
  }

  // 📊 Stats
  const completedCount = habits.filter((h) => h.completedToday).length;
  const totalCount = habits.length;
  const progress =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return {
    habits,
    addHabit,
    toggleHabit,
    completedCount,
    deleteHabit,
    totalCount,
    progress,
  };
}
