"use client";

import { useEffect, useRef, useState } from "react";
import { Habit, FrequencyType } from "@/types/habit";
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
      frequencyType: habit.frequencyType ?? "daily",
      frequencyTarget:
        habit.frequencyType === "daily" ? 1 : habit.frequencyTarget ?? 1,
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

  // 🔥 Toggle habit
  function toggleHabit(id: string) {
    const today = getToday();

    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        if (h.completedToday) return h;

        /* =======================
           DAILY HABIT LOGIC
        ======================= */
        if (h.frequencyType === "daily") {
          const updatedDates = [...h.completedDates, today];

          let streak = 1;
          const sorted = [...updatedDates].sort();

          for (let i = 1; i < sorted.length; i++) {
            const prevDate = new Date(sorted[i - 1]);
            const currDate = new Date(sorted[i]);
            const diff =
              (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);

            if (diff === 1) streak++;
            else streak = 1;
          }

          return {
            ...h,
            completedToday: true,
            completedDates: updatedDates,
            streak,
          };
        }

        /* =======================
           WEEKLY / MONTHLY LOGIC
        ======================= */
        const periodKey =
          h.frequencyType === "weekly" ? getWeekKey(today) : getMonthKey(today);

        const currentPeriodCount = h.completedDates.filter((d) =>
          h.frequencyType === "weekly"
            ? getWeekKey(d) === periodKey
            : getMonthKey(d) === periodKey
        ).length;

        // 🛑 Hard cap
        if (currentPeriodCount >= h.frequencyTarget) {
          return h;
        }

        const updatedDates = [...h.completedDates, today];

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
    frequencyType: FrequencyType;
    frequencyTarget: number;
  }) {
    const newHabit: Habit = {
      id: nanoid(),
      title: data.title,
      subtitle: data.subtitle,
      emoji: data.emoji,

      frequencyType: data.frequencyType,
      frequencyTarget:
        data.frequencyType === "daily" ? 1 : data.frequencyTarget,

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
    deleteHabit,
    completedCount,
    totalCount,
    progress,
  };
}
