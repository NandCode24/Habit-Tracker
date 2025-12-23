interface Props {
  completedCount: number;
  totalCount: number;
  progress: number;
}

export default function StatsCards({
  completedCount,
  totalCount,
  progress,
}: Props) {
  return (
    <section className="mt-10 grid grid-cols-3 gap-4">
      {/* Completed */}
      <div className="rounded-xl bg-neutral-900 p-4 border border-neutral-800">
        <p className="text-xs uppercase tracking-wide text-neutral-600">
          Completed
        </p>
        <p className="mt-2 text-2xl font-semibold text-white">
          {completedCount}
          <span className="text-neutral-500"> / {totalCount}</span>
        </p>
      </div>

      {/* Today Progress */}
      <div className="rounded-xl bg-neutral-900 p-4 border border-neutral-800">
        <p className="text-xs uppercase tracking-wide text-neutral-600">
          Today
        </p>
        <p className="mt-2 text-2xl font-semibold text-green-400">
          {progress}%
        </p>
      </div>

      {/* Daily Goal */}
      <div className="rounded-xl bg-neutral-900 p-4 border border-neutral-800">
        <p className="text-xs uppercase tracking-wide text-neutral-400 mb-3">
          Daily Goal
        </p>

        <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
          <div
            className="h-2 rounded-full bg-green-500 transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}