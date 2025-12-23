import { Habit } from "@/types/habit";
import { getLast7Days, getToday } from "@/utils/date";

interface WeeklyBarsProps {
  habits: Habit[];
}

export default function WeeklyBars({ habits }: WeeklyBarsProps) {
  const days = getLast7Days();
  const today = getToday();

  const labels = days.map((date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { weekday: "short" });
  });

  const data = days.map((date) => {
    if (habits.length === 0) return 0;

    const completed = habits.filter((h) =>
      h.completedDates.includes(date)
    ).length;

    return Math.round((completed / habits.length) * 100);
  });

  return (
    <div className="mt-8">
      <div className="flex items-end justify-between gap-4 h-44">
        {data.map((value, index) => {
          const isToday = days[index] === today;
          const isZero = value === 0;

          return (
            <div
              key={days[index]}
              className="flex flex-col items-center gap-3 w-full"
            >
              {/* Bar */}
              <div className="relative h-36 w-full flex items-end justify-center">
                <div
                  className={`
                    w-10 rounded-xl transition-all duration-500 ease-out
                    ${
                      isZero
                        ? "border border-dashed border-neutral-700 bg-transparent"
                        : "bg-green-400"
                    }
                    ${isToday ? "bg-green-500" : ""}
                  `}
                  style={{ height: `${Math.max(value, 6)}%` }}
                />
              </div>

              {/* Label */}
              <span
                className={`
                  text-xs
                  ${isToday ? "text-green-400 font-medium" : "text-neutral-400"}
                `}
              >
                {labels[index]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
