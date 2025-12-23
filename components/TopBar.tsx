import { Plus } from "lucide-react";

interface Props {
  onAddClick: () => void;
}

export default function TopBar({ onAddClick }: Props) {
  return (
    <header className="flex items-center justify-between">
      {/* App name (quiet, not dominant) */}
      <span className="text-sm font-medium text-neutral-300">HabitSync</span>

      {/* Primary action */}
      <button
        onClick={onAddClick}
        className="
          flex items-center gap-2
          px-4 py-2 rounded-lg
          bg-neutral-900 border border-neutral-800
          text-sm text-neutral-200
          hover:bg-neutral-800 transition
        "
      >
        <Plus size={16} />
        New Habit
      </button>
    </header>
  );
}
