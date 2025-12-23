export interface Habit {
  id: string;
  title: string;
  subtitle?: string;
  emoji: string;

  streak: number;
  completedToday: boolean;
  lastCompletedDate?: string;

  completedDates: string[]; // 👈 NEW
}
