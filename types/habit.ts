export type FrequencyType = "weekly" | "monthly";

export interface Habit {
  id: string;
  title: string;
  subtitle?: string;
  emoji: string;

  // 🔁 Frequency system
  frequencyType: FrequencyType; // weekly | monthly
  frequencyTarget: number; // times per period

  // 🔥 Streak system
  streak: number;
  completedToday: boolean;
  lastCompletedDate?: string;

  // 📅 History
  completedDates: string[];
}
