import { Habit } from "@/types/habit";

interface Props {
  habit: Habit;
  onToggle: (id: string) => void;
}

export default function HabitRow({ habit, onToggle }: Props) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-neutral-900 px-5 py-4 border border-neutral-800">
      {/* Left: emoji + text */}
      <div className="flex items-center gap-4">
        <span className="text-2xl">{habit.emoji}</span>

        <div>
          <p className="font-medium text-white">{habit.title}</p>

          {habit.subtitle && (
            <p className="text-sm text-neutral-400">{habit.subtitle}</p>
          )}
        </div>
      </div>

      {/* Right: streak + checkbox */}
      <div className="flex items-center gap-4">
        {habit.streak > 0 && (
          <span className="text-sm text-orange-400">🔥 {habit.streak}</span>
        )}

        <button
          onClick={() => onToggle(habit.id)}
          className={`
            h-6 w-6 rounded-md border flex items-center justify-center
            transition-colors duration-200
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
      </div>
    </div>
  );
}
