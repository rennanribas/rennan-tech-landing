import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Shuffle,
  ArrowDownUp,
  CheckCheck,
  Minus,
  Plus,
} from "lucide-react";

const MIN_SIZE = 2;
const MAX_SIZE = 12;
const MIN_VALUE = 0;
const MAX_VALUE = 99;

function randomArray(size: number): number[] {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * (MAX_VALUE + 1)),
  );
}

function clampValue(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.max(MIN_VALUE, Math.min(MAX_VALUE, Math.floor(n)));
}

type CellState = "idle" | "comparing" | "swapping" | "sorted" | "key";

type Snapshot = {
  array: number[];
  states: CellState[];
  leftPointer: number | null;
  rightPointer: number | null;
  comparisons: number;
  swaps: number;
  note: string;
  explanation: string;
};

function buildBubbleSortSnapshots(input: number[]): Snapshot[] {
  const arr = [...input];
  const n = arr.length;
  const snapshots: Snapshot[] = [];
  let comparisons = 0;
  let swaps = 0;

  const makeStates = (sortedFrom: number, j?: number, mode?: CellState): CellState[] =>
    arr.map((_, idx) => {
      if (idx >= sortedFrom) return "sorted";
      if (mode && (idx === j || idx === (j ?? -2) + 1)) return mode;
      return "idle";
    });

  snapshots.push({
    array: [...arr],
    states: arr.map(() => "idle"),
    leftPointer: null,
    rightPointer: null,
    comparisons,
    swaps,
    note: "Start.",
    explanation:
      "Bubble sort walks the array comparing neighbors. The largest value bubbles to the end on each pass, so the sorted region grows from the right.",
  });

  for (let i = 0; i < n - 1; i++) {
    const sortedFrom = n - i;
    for (let j = 0; j < n - 1 - i; j++) {
      comparisons++;
      snapshots.push({
        array: [...arr],
        states: makeStates(sortedFrom, j, "comparing"),
        leftPointer: j,
        rightPointer: j + 1,
        comparisons,
        swaps,
        note: `Compare [${j}]=${arr[j]} with [${j + 1}]=${arr[j + 1]}.`,
        explanation:
          arr[j] > arr[j + 1]
            ? `${arr[j]} > ${arr[j + 1]} — out of order, we'll swap.`
            : `${arr[j]} ≤ ${arr[j + 1]} — already in order, move on.`,
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
        snapshots.push({
          array: [...arr],
          states: makeStates(sortedFrom, j, "swapping"),
          leftPointer: j,
          rightPointer: j + 1,
          comparisons,
          swaps,
          note: `Swap [${j}] ↔ [${j + 1}].`,
          explanation: `After swap the larger value moves one step closer to its final spot at the end.`,
        });
      }
    }

    snapshots.push({
      array: [...arr],
      states: makeStates(sortedFrom - 1),
      leftPointer: null,
      rightPointer: null,
      comparisons,
      swaps,
      note: `Pass ${i + 1} done. Index ${sortedFrom - 1} is locked.`,
      explanation: `The largest unsorted value reached the right edge of the unsorted region. It's now part of the sorted tail (green).`,
    });
  }

  snapshots.push({
    array: [...arr],
    states: arr.map(() => "sorted"),
    leftPointer: null,
    rightPointer: null,
    comparisons,
    swaps,
    note: "Sorted.",
    explanation: "All passes done. The whole array is sorted.",
  });

  return snapshots;
}

function buildInsertionSortSnapshots(input: number[]): Snapshot[] {
  const arr = [...input];
  const n = arr.length;
  const snapshots: Snapshot[] = [];
  let comparisons = 0;
  let swaps = 0;

  snapshots.push({
    array: [...arr],
    states: arr.map((_, idx) => (idx === 0 ? "sorted" : "idle")),
    leftPointer: null,
    rightPointer: null,
    comparisons,
    swaps,
    note: "Start. First element is trivially sorted.",
    explanation:
      "Insertion sort keeps a growing sorted region on the left. Each step picks the next element (key) and inserts it at the right spot inside the sorted region.",
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    snapshots.push({
      array: [...arr],
      states: arr.map((_, idx) => {
        if (idx === i) return "key";
        if (idx < i) return "sorted";
        return "idle";
      }),
      leftPointer: null,
      rightPointer: i,
      comparisons,
      swaps,
      note: `Pick key = ${key} at index ${i}.`,
      explanation: `We'll slide ${key} left through the sorted region until it lands in the right place.`,
    });

    while (j >= 0 && arr[j] > key) {
      comparisons++;
      snapshots.push({
        array: [...arr],
        states: arr.map((_, idx) => {
          if (idx === j) return "comparing";
          if (idx === j + 1) return "key";
          if (idx < i) return "sorted";
          return "idle";
        }),
        leftPointer: j,
        rightPointer: j + 1,
        comparisons,
        swaps,
        note: `Compare ${arr[j]} with key ${key}.`,
        explanation: `${arr[j]} > ${key}, so shift ${arr[j]} one step to the right to make room.`,
      });

      arr[j + 1] = arr[j];
      swaps++;
      snapshots.push({
        array: [...arr],
        states: arr.map((_, idx) => {
          if (idx === j) return "key";
          if (idx < i) return "sorted";
          if (idx === i) return "idle";
          return "idle";
        }),
        leftPointer: null,
        rightPointer: j,
        comparisons,
        swaps,
        note: `Shift [${j}] → [${j + 1}].`,
        explanation: `The hole moves one step left — key ${key} will eventually fill it.`,
      });

      j--;
    }

    if (j >= 0) {
      comparisons++;
      snapshots.push({
        array: [...arr],
        states: arr.map((_, idx) => {
          if (idx === j) return "comparing";
          if (idx === j + 1) return "key";
          if (idx < i) return "sorted";
          return "idle";
        }),
        leftPointer: j,
        rightPointer: j + 1,
        comparisons,
        swaps,
        note: `Compare ${arr[j]} with key ${key}.`,
        explanation: `${arr[j]} ≤ ${key} — we found the right spot, insert here.`,
      });
    }

    arr[j + 1] = key;
    snapshots.push({
      array: [...arr],
      states: arr.map((_, idx) => (idx <= i ? "sorted" : "idle")),
      leftPointer: null,
      rightPointer: j + 1,
      comparisons,
      swaps,
      note: `Insert key ${key} at index ${j + 1}.`,
      explanation: `Sorted region now spans indices 0..${i}. Move to the next unsorted element.`,
    });
  }

  snapshots.push({
    array: [...arr],
    states: arr.map(() => "sorted"),
    leftPointer: null,
    rightPointer: null,
    comparisons,
    swaps,
    note: "Sorted.",
    explanation: "Every element has been inserted. Array is fully sorted.",
  });

  return snapshots;
}

const CELL_PALETTE: Record<CellState, { bg: string; border: string; text: string }> = {
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
  key: {
    bg: "bg-fuchsia-400/25",
    border: "border-fuchsia-300/90",
    text: "text-fuchsia-50",
  },
};

function Cell({
  value,
  index,
  state,
}: {
  value: number;
  index: number;
  state: CellState;
}) {
  const palette = CELL_PALETTE[state];
  return (
    <motion.div
      layout
      initial={false}
      animate={{ scale: state === "key" || state === "swapping" ? 1.06 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`flex aspect-square min-w-[38px] flex-1 flex-col items-center justify-center rounded-xl border ${palette.bg} ${palette.border} ${palette.text} shadow-inner`}
    >
      <span className="text-base font-bold sm:text-xl">{value}</span>
      <span className="text-[9px] font-mono text-slate-400 sm:text-[10px]">
        [{index}]
      </span>
    </motion.div>
  );
}

function Legend({ items }: { items: { state: CellState; label: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2 text-[11px]">
      {items.map(({ state, label }) => {
        const p = CELL_PALETTE[state];
        return (
          <span
            key={state}
            className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 ${p.bg} ${p.border} ${p.text}`}
          >
            <span className="font-mono font-semibold">{label}</span>
          </span>
        );
      })}
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
    "rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-200 transition hover:bg-white/10 disabled:opacity-40";
  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900/70 p-1.5 backdrop-blur-md">
      <button onClick={onReset} className={btn} aria-label="Reset">
        <RotateCcw className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={onPrev}
        disabled={step === 0}
        className={btn}
        aria-label="Previous"
      >
        <SkipBack className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={onPlayToggle}
        className="rounded-lg border border-cyan-400/30 bg-cyan-400/15 p-1.5 text-cyan-100 transition hover:bg-cyan-400/25"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="h-3.5 w-3.5" />
        ) : (
          <Play className="h-3.5 w-3.5" />
        )}
      </button>
      <button
        onClick={onNext}
        disabled={step >= total - 1}
        className={btn}
        aria-label="Next"
      >
        <SkipForward className="h-3.5 w-3.5" />
      </button>
      <div className="ml-1 font-mono text-[11px] text-slate-400">
        {step + 1}/{total}
      </div>
    </div>
  );
}

function Visualizer({
  title,
  tagline,
  description,
  legend,
  snapshots,
}: {
  title: string;
  tagline: string;
  description: string;
  legend: { state: CellState; label: string }[];
  snapshots: Snapshot[];
}) {
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
      setStep((p) => Math.min(p + 1, snapshots.length - 1));
    }, 800);
    return () => window.clearTimeout(timer);
  }, [isPlaying, step, snapshots.length]);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md sm:p-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
            {title}
          </h2>
          <p className="text-xs text-slate-400 sm:text-sm">{tagline}</p>
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

      <p className="rounded-lg border border-white/5 bg-slate-950/40 px-3 py-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
        {description}
      </p>

      <div>
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Array
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:gap-2">
          {current.array.map((value, index) => (
            <Cell
              key={index}
              value={value}
              index={index}
              state={current.states[index]}
            />
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3">
        <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
          What's happening
        </div>
        <div className="font-mono text-xs text-cyan-50 sm:text-sm">
          {current.note}
        </div>
        <div className="mt-1.5 text-xs leading-relaxed text-slate-300 sm:text-sm">
          {current.explanation}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Legend items={legend} />
        <div className="flex gap-3 font-mono text-[11px] text-slate-400">
          <span>
            comparisons:{" "}
            <span className="text-cyan-300">{current.comparisons}</span>
          </span>
          <span>
            swaps: <span className="text-orange-300">{current.swaps}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function InputEditor({
  input,
  onChange,
}: {
  input: number[];
  onChange: (next: number[]) => void;
}) {
  const setSize = (size: number) => {
    const clamped = Math.max(MIN_SIZE, Math.min(MAX_SIZE, size));
    if (clamped === input.length) return;
    if (clamped > input.length) {
      const extra = Array.from({ length: clamped - input.length }, () =>
        Math.floor(Math.random() * (MAX_VALUE + 1)),
      );
      onChange([...input, ...extra]);
    } else {
      onChange(input.slice(0, clamped));
    }
  };

  const setValue = (index: number, raw: string) => {
    const next = [...input];
    next[index] = clampValue(Number(raw));
    onChange(next);
  };

  const btn =
    "inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-slate-200 transition hover:bg-white/10";

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-md sm:p-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Size
          </span>
          <button
            onClick={() => setSize(input.length - 1)}
            disabled={input.length <= MIN_SIZE}
            className={`${btn} disabled:opacity-40`}
            aria-label="Decrease size"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-6 text-center font-mono text-sm text-slate-100">
            {input.length}
          </span>
          <button
            onClick={() => setSize(input.length + 1)}
            disabled={input.length >= MAX_SIZE}
            className={`${btn} disabled:opacity-40`}
            aria-label="Increase size"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
          <input
            type="range"
            min={MIN_SIZE}
            max={MAX_SIZE}
            value={input.length}
            onChange={(e) => setSize(Number(e.target.value))}
            className="ml-1 w-24 accent-cyan-400 sm:w-32"
            aria-label="Array size"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
          <button
            onClick={() => onChange(randomArray(input.length))}
            className={btn}
          >
            <Shuffle className="h-3.5 w-3.5" />
            Shuffle
          </button>
          <button
            onClick={() => onChange([...input].sort((a, b) => a - b))}
            className={btn}
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Sorted
          </button>
          <button
            onClick={() => onChange([...input].sort((a, b) => b - a))}
            className={btn}
          >
            <ArrowDownUp className="h-3.5 w-3.5" />
            Reversed
          </button>
        </div>
      </div>

      <div>
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Values (0–{MAX_VALUE})
        </div>
        <div className="flex flex-wrap gap-2">
          {input.map((value, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-1 rounded-lg border border-white/10 bg-slate-950/50 p-1.5"
            >
              <span className="font-mono text-[10px] text-slate-500">
                [{index}]
              </span>
              <input
                type="number"
                min={MIN_VALUE}
                max={MAX_VALUE}
                value={value}
                onChange={(e) => setValue(index, e.target.value)}
                className="w-12 rounded-md border border-white/10 bg-slate-900/70 px-1.5 py-1 text-center font-mono text-sm text-slate-100 outline-none transition focus:border-cyan-400/60 focus:bg-slate-900"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Sorting() {
  const [input, setInput] = useState<number[]>(() => [5, 2, 8, 1, 9, 3, 7, 4]);
  const bubbleSnapshots = useMemo(
    () => buildBubbleSortSnapshots(input),
    [input],
  );
  const insertionSnapshots = useMemo(
    () => buildInsertionSortSnapshots(input),
    [input],
  );
  const inputKey = input.join(",");

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Sorting side-by-side
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Choose the array size and values. Both algorithms run on the same
            input — watch how each one transforms it.
          </p>
        </header>

        <div className="mb-5">
          <InputEditor input={input} onChange={setInput} />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Visualizer
            key={`bubble-${inputKey}`}
            title="Bubble Sort"
            tagline="O(n²) — compares neighbors, largest bubbles to the end each pass."
            description="Walk left to right comparing each pair of neighbors. If out of order, swap. After pass k, the last k positions are locked as sorted (green). The sorted region grows from the RIGHT."
            legend={[
              { state: "idle", label: "unsorted" },
              { state: "comparing", label: "comparing" },
              { state: "swapping", label: "swapping" },
              { state: "sorted", label: "sorted" },
            ]}
            snapshots={bubbleSnapshots}
          />

          <Visualizer
            key={`insertion-${inputKey}`}
            title="Insertion Sort"
            tagline="O(n²) — build the sorted region one element at a time."
            description="Treat the left as a growing sorted list. Pick the next element (the key, pink) and slide it left, shifting larger values right, until it lands in the correct spot. The sorted region grows from the LEFT."
            legend={[
              { state: "idle", label: "unsorted" },
              { state: "key", label: "key (inserting)" },
              { state: "comparing", label: "comparing" },
              { state: "sorted", label: "sorted" },
            ]}
            snapshots={insertionSnapshots}
          />
        </div>
      </div>
    </div>
  );
}
