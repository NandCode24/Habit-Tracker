export function getToday(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/**
 * Returns last 7 days INCLUDING today
 * Format: YYYY-MM-DD
 * Order: oldest → newest
 */
export function getLast7Days(): string[] {
  const days: string[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    days.push(`${year}-${month}-${day}`);
  }

  return days;
}

/* ───────────────────────────── */
/* 🔁 FREQUENCY HELPERS           */
/* ───────────────────────────── */

export function getWeekKey(date: string): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const start = new Date(year, 0, 1);
  const diff = (d.getTime() - start.getTime()) / 86400000 + start.getDay() + 1;
  const week = Math.ceil(diff / 7);

  return `${year}-W${week}`;
}

export function getMonthKey(date: string): string {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
