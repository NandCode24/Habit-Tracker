export type FrequencyType = "daily" | "weekly" | "monthly";

export interface Habit {
  id: string;
  title: string;
  subtitle?: string;
  emoji: string;

  // 🔁 Frequency system
  frequencyType: FrequencyType;
  frequencyTarget: number; // daily = always 1

  // 🔥 Streak system
  streak: number;
  completedToday: boolean;

  // 📅 Completion history (source of truth)
  completedDates: string[];
}
