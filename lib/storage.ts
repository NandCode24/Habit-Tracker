import { Habit } from "@/types/habit";

const STORAGE_KEY = "habitsync_habits";

export function loadHabits(): Habit[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveHabits(habits: Habit[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}
