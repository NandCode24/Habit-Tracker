"use client";

import { useState } from "react";
import { FrequencyType } from "@/types/habit";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: {
    title: string;
    subtitle?: string;
    emoji: string;
    frequencyType: FrequencyType;
    frequencyTarget: number;
  }) => void;
}

export default function AddHabitModal({ isOpen, onClose, onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [emoji, setEmoji] = useState("🌱");

  const [frequencyType, setFrequencyType] = useState<FrequencyType>("daily");
  const [frequencyTarget, setFrequencyTarget] = useState(1);

  if (!isOpen) return null;

  function handleSubmit() {
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      emoji,
      frequencyType,
      frequencyTarget: frequencyType === "daily" ? 1 : frequencyTarget,
    });

    // reset
    setTitle("");
    setSubtitle("");
    setEmoji("🌱");
    setFrequencyType("daily");
    setFrequencyTarget(1);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-neutral-900 p-6 border border-neutral-800">
        <h2 className="text-lg font-semibold text-white">Add New Habit</h2>

        <div className="mt-4 space-y-4">
          {/* Habit title */}
          <input
            placeholder="Habit name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
              w-full rounded-lg bg-neutral-800 border border-neutral-700
              px-3 py-2 text-sm text-white placeholder-neutral-500
              outline-none focus:border-green-500
            "
          />

          {/* Subtitle */}
          <input
            placeholder="Optional subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="
              w-full rounded-lg bg-neutral-800 border border-neutral-700
              px-3 py-2 text-sm text-white placeholder-neutral-500
              outline-none focus:border-green-500
            "
          />

          {/* Frequency */}
          <div className="flex gap-3">
            <select
              value={frequencyType}
              onChange={(e) => {
                const value = e.target.value as FrequencyType;
                setFrequencyType(value);

                // 👇 daily = fixed target
                if (value === "daily") {
                  setFrequencyTarget(1);
                }
              }}
              className="
                flex-1 rounded-lg bg-neutral-800 border border-neutral-700
                px-3 py-2 text-sm text-white outline-none
              "
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>

            <input
              type="number"
              min={1}
              disabled={frequencyType === "daily"}
              value={frequencyTarget}
              onChange={(e) => setFrequencyTarget(Number(e.target.value))}
              className={`
                w-24 rounded-lg px-3 py-2 text-sm outline-none
                ${
                  frequencyType === "daily"
                    ? "bg-neutral-900 text-neutral-600 border border-neutral-800 cursor-not-allowed"
                    : "bg-neutral-800 text-white border border-neutral-700"
                }
              `}
            />
          </div>

          {/* Emoji */}
          <input
            placeholder="Emoji"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            className="
              w-20 rounded-lg bg-neutral-800 border border-neutral-700
              px-3 py-2 text-center text-lg text-white outline-none
            "
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              px-4 py-2 text-sm text-neutral-400
              hover:text-neutral-200 transition
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="
              rounded-lg bg-green-500 px-4 py-2
              text-sm font-medium text-black
              hover:bg-green-400 transition
            "
          >
            Add Habit
          </button>
        </div>
      </div>
    </div>
  );
}
