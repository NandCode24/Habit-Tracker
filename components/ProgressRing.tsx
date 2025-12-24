interface Props {
  progress: number;
  completed: number;
  total: number;
}

export default function ProgressRing({ progress, completed, total }: Props) {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (Math.min(progress, 100) / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width="140"
        height="140"
        viewBox="0 0 140 140"
        className="rotate-[-90deg]"
        aria-hidden="true"
      >
        {/* Background ring */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke="#1f2933" /* very dark neutral */
          strokeWidth="10"
          fill="none"
        />

        {/* Progress ring (muted, calm) */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke="#16a34a" /* muted green (not neon) */
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
          style={{
            opacity: progress === 0 ? 0.35 : 0.9,
          }}
        />
      </svg>

      {/* Center text */}
      <div className="absolute text-center">
        <p className="text-3xl font-semibold text-white">{progress}%</p>
        <p className="mt-1 text-sm text-white">
          {completed} / {total} done
        </p>
      </div>
    </div>
  );
}
