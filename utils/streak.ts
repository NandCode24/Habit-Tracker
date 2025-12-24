import { Habit } from "@/types/habit";
import { getWeekKey, getMonthKey } from "@/utils/date";

export function calculateBestStreak(habit: Habit): number {
  if (habit.completedDates.length === 0) return 0;

  const periodMap = new Map<string, number>();

  // Group completions by period
  for (const date of habit.completedDates) {
    const key =
      habit.frequencyType === "weekly" ? getWeekKey(date) : getMonthKey(date);

    periodMap.set(key, (periodMap.get(key) ?? 0) + 1);
  }

  // Sort periods chronologically
  const periods = Array.from(periodMap.keys()).sort();

  let best = 0;
  let current = 0;

  for (const period of periods) {
    const count = periodMap.get(period)!;

    if (count >= habit.frequencyTarget) {
      current += 1;
      best = Math.max(best, current);
    } else {
      current = 0;
    }
  }

  return best;
}
