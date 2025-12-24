import HabitRow from "./HabitRow";
import { Habit } from "@/types/habit";

interface Props {
  habits: Habit[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function HabitList({ habits, onToggle, onDelete }: Props) {
  return (
    <section className="mt-10 space-y-3">
      {habits.map((habit) => (
        <HabitRow
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}
