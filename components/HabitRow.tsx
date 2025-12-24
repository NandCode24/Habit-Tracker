import { Habit } from "@/types/habit";
import { Trash2 } from "lucide-react";
import { getToday, getWeekKey, getMonthKey } from "@/utils/date";

interface Props {
  habit: Habit;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function HabitRow({ habit, onToggle, onDelete }: Props) {
  const today = getToday();

  const currentKey =
    habit.frequencyType === "weekly" ? getWeekKey(today) : getMonthKey(today);

  const currentCount = habit.completedDates.filter((d) =>
    habit.frequencyType === "weekly"
      ? getWeekKey(d) === currentKey
      : getMonthKey(d) === currentKey
  ).length;

  return (
    <div className="group flex items-center justify-between rounded-xl bg-neutral-900 px-5 py-4 border border-neutral-800">
      {/* Left */}
      <div className="flex items-center gap-4">
        <span className="text-2xl">{habit.emoji}</span>

        <div>
          <p className="font-medium text-white">{habit.title}</p>
          <p className="text-sm text-neutral-400">
            This {habit.frequencyType}: {currentCount} / {habit.frequencyTarget}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {habit.streak > 0 && (
          <span className="text-sm text-orange-400">🔥 {habit.streak}</span>
        )}

        <button
          onClick={() => onToggle(habit.id)}
          className={`
            h-6 w-6 rounded-md border flex items-center justify-center
            ${
              habit.completedToday
                ? "bg-green-500 border-green-500 text-black"
                : "border-neutral-600 hover:border-neutral-400"
            }
          `}
          aria-label="Toggle habit"
        >
          {habit.completedToday && "✓"}
        </button>

        {/* Delete */}
        <button
          onClick={() => {
            if (confirm("Delete this habit?")) {
              onDelete(habit.id);
            }
          }}
          className="
            opacity-0 group-hover:opacity-100
            transition text-neutral-500 hover:text-red-500
          "
          aria-label="Delete habit"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
