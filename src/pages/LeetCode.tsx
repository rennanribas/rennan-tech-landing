import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from "lucide-react";

type Snapshot = {
  array: number[];
  i: number;
  j: number;
  comparing: boolean;
  swapping: boolean;
  sortedFrom: number;
  comparisons: number;
  swaps: number;
  note: string;
};

function buildBubbleSortSnapshots(input: number[]): Snapshot[] {
  const arr = [...input];
  const snapshots: Snapshot[] = [];
  let comparisons = 0;
  let swaps = 0;

  snapshots.push({
    array: [...arr],
    i: -1,
    j: -1,
    comparing: false,
    swapping: false,
    sortedFrom: arr.length,
    comparisons,
    swaps,
    note: "Initial array.",
  });

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      comparisons++;
      snapshots.push({
        array: [...arr],
        i,
        j,
        comparing: true,
        swapping: false,
        sortedFrom: arr.length - i,
        comparisons,
        swaps,
        note: `Compare arr[${j}]=${arr[j]} with arr[${j + 1}]=${arr[j + 1]}.`,
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
        snapshots.push({
          array: [...arr],
          i,
          j,
          comparing: false,
          swapping: true,
          sortedFrom: arr.length - i,
          comparisons,
          swaps,
          note: `Swap because ${arr[j + 1]} < ${arr[j]} (before swap).`,
        });
      }
    }
  }

  snapshots.push({
    array: [...arr],
    i: -1,
    j: -1,
    comparing: false,
    swapping: false,
    sortedFrom: 0,
    comparisons,
    swaps,
    note: "Sorted.",
  });

  return snapshots;
}

function Cell({
  value,
  index,
  state,
}: {
  value: number;
  index: number;
  state: "idle" | "comparing" | "swapping" | "sorted";
}) {
  const palette = {
    idle: {
      bg: "bg-slate-800/70",
      border: "border-white/10",
      text: "text-slate-100",
    },
    comparing: {
      bg: "bg-cyan-400/20",
      border: "border-cyan-300/80",
      text: "text-cyan-50",
    },
    swapping: {
      bg: "bg-orange-400/25",
      border: "border-orange-300/90",
      text: "text-orange-50",
    },
    sorted: {
      bg: "bg-emerald-400/15",
      border: "border-emerald-400/60",
      text: "text-emerald-50",
    },
  }[state];

  return (
    <motion.div
      layout
      layoutId={`cell-${value}-${index}-${Math.random()}`}
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={`flex aspect-square min-w-[44px] flex-1 flex-col items-center justify-center rounded-xl border ${palette.bg} ${palette.border} ${palette.text} shadow-inner`}
    >
      <span className="text-lg font-bold sm:text-2xl">{value}</span>
      <span className="text-[10px] font-mono text-slate-400 sm:text-xs">
        [{index}]
      </span>
    </motion.div>
  );
}

function StageRow({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-md">
      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </div>
      {children}
    </div>
  );
}

function DecisionBox({ snapshot }: { snapshot: Snapshot }) {
  const { array, j, comparing, swapping } = snapshot;
  const left = j >= 0 ? array[j] : null;
  const right = j >= 0 ? array[j + 1] : null;

  let verdict = "Waiting…";
  let tone = "text-slate-400";

  if (comparing && left !== null && right !== null) {
    if (left > right) {
      verdict = `${left} > ${right} → swap`;
      tone = "text-orange-300";
    } else {
      verdict = `${left} ≤ ${right} → keep`;
      tone = "text-emerald-300";
    }
  } else if (swapping && left !== null && right !== null) {
    verdict = `swapped (${left} ↔ ${right})`;
    tone = "text-orange-300";
  }

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-400/10 text-xl font-bold text-cyan-50 sm:h-16 sm:w-16">
          {left ?? "—"}
        </div>
        <div className="text-2xl text-slate-500">?</div>
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-400/10 text-xl font-bold text-cyan-50 sm:h-16 sm:w-16">
          {right ?? "—"}
        </div>
      </div>
      <div className={`font-mono text-sm font-semibold sm:text-base ${tone}`}>
        {verdict}
      </div>
    </div>
  );
}

function Controls({
  isPlaying,
  onPlayToggle,
  onReset,
  onPrev,
  onNext,
  step,
  total,
}: {
  isPlaying: boolean;
  onPlayToggle: () => void;
  onReset: () => void;
  onPrev: () => void;
  onNext: () => void;
  step: number;
  total: number;
}) {
  const btn =
    "rounded-lg border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:bg-white/10 disabled:opacity-40";
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 p-2 backdrop-blur-md">
      <button onClick={onReset} className={btn} aria-label="Reset">
        <RotateCcw className="h-4 w-4" />
      </button>
      <button
        onClick={onPrev}
        disabled={step === 0}
        className={btn}
        aria-label="Previous"
      >
        <SkipBack className="h-4 w-4" />
      </button>
      <button
        onClick={onPlayToggle}
        className="rounded-lg border border-cyan-400/30 bg-cyan-400/15 p-2 text-cyan-100 transition hover:bg-cyan-400/25"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </button>
      <button
        onClick={onNext}
        disabled={step >= total - 1}
        className={btn}
        aria-label="Next"
      >
        <SkipForward className="h-4 w-4" />
      </button>
      <div className="ml-1 font-mono text-xs text-slate-400 sm:text-sm">
        {step + 1} / {total}
      </div>
    </div>
  );
}

export default function LeetCode() {
  const input = useMemo(() => [5, 2, 8, 1, 9, 3, 7, 4], []);
  const snapshots = useMemo(() => buildBubbleSortSnapshots(input), [input]);

  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const current = snapshots[step];

  useEffect(() => {
    if (!isPlaying) return;
    if (step >= snapshots.length - 1) {
      setIsPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setStep((prev) => Math.min(prev + 1, snapshots.length - 1));
    }, 700);
    return () => window.clearTimeout(timer);
  }, [isPlaying, step, snapshots.length]);

  const cellState = (index: number): "idle" | "comparing" | "swapping" | "sorted" => {
    if (index >= current.sortedFrom) return "sorted";
    if (current.swapping && (index === current.j || index === current.j + 1))
      return "swapping";
    if (current.comparing && (index === current.j || index === current.j + 1))
      return "comparing";
    return "idle";
  };

  const sortedOutput = snapshots[snapshots.length - 1].array;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Bubble Sort
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Step-by-step visualization: input, comparison, output.
            </p>
          </div>
          <Controls
            isPlaying={isPlaying}
            onPlayToggle={() => setIsPlaying((p) => !p)}
            onReset={() => {
              setIsPlaying(false);
              setStep(0);
            }}
            onPrev={() => {
              setIsPlaying(false);
              setStep((p) => Math.max(p - 1, 0));
            }}
            onNext={() => {
              setIsPlaying(false);
              setStep((p) => Math.min(p + 1, snapshots.length - 1));
            }}
            step={step}
            total={snapshots.length}
          />
        </header>

        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-sm backdrop-blur-md">
          <span className="font-mono text-slate-300">{current.note}</span>
          <span className="ml-auto flex gap-3 font-mono text-xs text-slate-400">
            <span>
              comparisons:{" "}
              <span className="text-cyan-300">{current.comparisons}</span>
            </span>
            <span>
              swaps: <span className="text-orange-300">{current.swaps}</span>
            </span>
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <StageRow title="Input / Current state">
            <div className="flex gap-2 overflow-x-auto pb-1 sm:gap-3">
              <AnimatePresence>
                {current.array.map((value, index) => (
                  <Cell
                    key={`${index}-${value}`}
                    value={value}
                    index={index}
                    state={cellState(index)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </StageRow>

          <StageRow title="Decision">
            <DecisionBox snapshot={current} />
          </StageRow>

          <StageRow title="Output (final sorted array)">
            <div className="flex gap-2 overflow-x-auto pb-1 sm:gap-3">
              {sortedOutput.map((value, index) => {
                const revealed = step === snapshots.length - 1;
                return (
                  <div
                    key={`out-${index}`}
                    className={`flex aspect-square min-w-[44px] flex-1 flex-col items-center justify-center rounded-xl border transition ${
                      revealed
                        ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-50"
                        : "border-white/5 bg-slate-900/40 text-slate-600"
                    }`}
                  >
                    <span className="text-lg font-bold sm:text-2xl">
                      {revealed ? value : "?"}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 sm:text-xs">
                      [{index}]
                    </span>
                  </div>
                );
              })}
            </div>
          </StageRow>
        </div>
      </div>
    </div>
  );
}
