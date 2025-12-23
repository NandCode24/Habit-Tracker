"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Habit } from "@/types/habit";

interface Options {
  habits: Habit[];
  openAddModal: () => void;
  toggleHabit: (id: string) => void;
  closeModal?: () => void;
}

export function useKeyboardShortcuts({
  habits,
  openAddModal,
  toggleHabit,
  closeModal,
}: Options) {
  const router = useRouter();

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const target = e.target as HTMLElement;

      // ❌ Ignore when typing
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        return;
      }

      // ⌘ + K → Add habit
      if (e.metaKey && e.key === "k") {
        e.preventDefault();
        openAddModal();
      }

      // Space → toggle first incomplete habit
      if (e.key === " ") {
        const firstIncomplete = habits.find((h) => !h.completedToday);
        if (firstIncomplete) {
          e.preventDefault();
          toggleHabit(firstIncomplete.id);
        }
      }

      // Esc → close modal
      if (e.key === "Escape" && closeModal) {
        closeModal();
      }

      // ⌘ + / → Motivation page
      if (e.metaKey && e.key === "/") {
        e.preventDefault();
        router.push("/motivation");
      }

      // ⌘ + ← → Dashboard
      if (e.metaKey && e.key === "ArrowLeft") {
        e.preventDefault();
        router.push("/");
      }
    }

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [habits, openAddModal, toggleHabit, closeModal, router]);
}
