import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Shuffle,
  Minus,
  Plus,
  Hash,
} from "lucide-react";

const MIN_SIZE = 1;
const MAX_SIZE = 10;
const MIN_VALUE = -9;
const MAX_VALUE = 12;

type CellState =
  | "idle"
  | "out-of-range"
  | "checking"
  | "marked"
  | "answer"
  | "skipped";

type SetSnapshot = {
  array: number[];
  cellStates: CellState[];
  setMembers: number[];
  probing: number | null;
  found: boolean | null;
  answer: number | null;
  phase: "init" | "build-set" | "scan" | "done";
  note: string;
  explanation: string;
};

type InPlaceSnapshot = {
  array: number[];
  cellStates: CellState[];
  pointer: number | null;
  targetIndex: number | null;
  answer: number | null;
  phase:
    | "init"
    | "neutralize"
    | "neutralized"
    | "mark"
    | "marked"
    | "scan"
    | "done";
  note: string;
  explanation: string;
};

function buildSetSnapshots(input: number[]): SetSnapshot[] {
  const arr = [...input];
  const n = arr.length;
  const snapshots: SetSnapshot[] = [];
  const seen = new Set<number>();

  snapshots.push({
    array: [...arr],
    cellStates: arr.map(() => "idle"),
    setMembers: [],
    probing: null,
    found: null,
    answer: null,
    phase: "init",
    note: "Start.",
    explanation:
      "The answer must lie in [1, n+1]. We'll dump the array into a Set so we can answer 'does k exist?' in O(1), then probe k = 1, 2, 3 ... until one is missing.",
  });

  for (let i = 0; i < n; i++) {
    const value = arr[i];
    seen.add(value);
    snapshots.push({
      array: [...arr],
      cellStates: arr.map((_, idx) => (idx === i ? "checking" : "idle")),
      setMembers: [...seen].sort((a, b) => a - b),
      probing: null,
      found: null,
      answer: null,
      phase: "build-set",
      note: `Add arr[${i}] = ${value} to the Set.`,
      explanation:
        value <= 0 || value > n
          ? `${value} is outside [1, n] (n=${n}), so it can't be the answer — but the Set keeps it anyway, harmless.`
          : `${value} is in range [1, n] — it's a valid candidate, the Set records it.`,
    });
  }

  for (let k = 1; k <= n + 1; k++) {
    const found = seen.has(k);
    const matchIdx = arr.findIndex((v) => v === k);

    if (k === n + 1) {
      snapshots.push({
        array: [...arr],
        cellStates: arr.map(() => "skipped"),
        setMembers: [...seen].sort((a, b) => a - b),
        probing: k,
        found: false,
        answer: k,
        phase: "done",
        note: `1..${n} all present → answer is n+1 = ${k}.`,
        explanation:
          "Every slot from 1 to n was found in the Set. The smallest missing positive must be n+1.",
      });
      break;
    }

    if (found) {
      snapshots.push({
        array: [...arr],
        cellStates: arr.map((_, idx) => (idx === matchIdx ? "checking" : "idle")),
        setMembers: [...seen].sort((a, b) => a - b),
        probing: k,
        found: true,
        answer: null,
        phase: "scan",
        note: `Probe k = ${k} → in Set, keep going.`,
        explanation: `${k} is present (found at index ${matchIdx}). Move on to ${k + 1}.`,
      });
    } else {
      snapshots.push({
        array: [...arr],
        cellStates: arr.map(() => "idle"),
        setMembers: [...seen].sort((a, b) => a - b),
        probing: k,
        found: false,
        answer: k,
        phase: "done",
        note: `Probe k = ${k} → not in Set. Answer = ${k}.`,
        explanation: `${k} is missing. Since we probed in order 1, 2, 3..., this is the smallest missing positive.`,
      });
      break;
    }
  }

  return snapshots;
}

function buildInPlaceSnapshots(input: number[]): InPlaceSnapshot[] {
  const arr = [...input];
  const n = arr.length;
  const snapshots: InPlaceSnapshot[] = [];

  snapshots.push({
    array: [...arr],
    cellStates: arr.map(() => "idle"),
    pointer: null,
    targetIndex: null,
    answer: null,
    phase: "init",
    note: "Start.",
    explanation:
      "Trick: the array itself is our scratch space. We'll use the SIGN of the value at index k-1 as a checkbox for 'k was seen' (negative = seen). First we neutralize anything that can't be a valid answer.",
  });

  for (let i = 0; i < n; i++) {
    const before = arr[i];
    const replaced = before <= 0 || before > n;
    if (replaced) arr[i] = n + 1;
    snapshots.push({
      array: [...arr],
      cellStates: arr.map((_, idx) =>
        idx === i ? (replaced ? "out-of-range" : "checking") : "idle",
      ),
      pointer: i,
      targetIndex: null,
      answer: null,
      phase: "neutralize",
      note: replaced
        ? `arr[${i}] = ${before} is out of [1, n] → replace with n+1 (${n + 1}).`
        : `arr[${i}] = ${before} is in [1, n] → keep.`,
      explanation: replaced
        ? `${before} can never be the answer and would mess up our marking trick. We park n+1 there — a value we promise to ignore later.`
        : `${before} is a valid candidate, we'll use it as an index in the next phase.`,
    });
  }

  snapshots.push({
    array: [...arr],
    cellStates: arr.map((v) => (v > n ? "out-of-range" : "idle")),
    pointer: null,
    targetIndex: null,
    answer: null,
    phase: "neutralized",
    note: "All values now in [1, n] or equal to n+1 (the 'ignore' sentinel).",
    explanation:
      "Now every value either points at a valid index (v - 1) or is n+1 and will be skipped. Time to mark.",
  });

  for (let i = 0; i < n; i++) {
    const value = Math.abs(arr[i]);
    if (value < 1 || value > n) {
      snapshots.push({
        array: [...arr],
        cellStates: arr.map((v, idx) =>
          idx === i ? "out-of-range" : v < 0 ? "marked" : "idle",
        ),
        pointer: i,
        targetIndex: null,
        answer: null,
        phase: "mark",
        note: `arr[${i}] = ${arr[i]} → out of range, skip.`,
        explanation: `n+1 (or any value > n) is our 'ignore' sentinel. Don't mark anything.`,
      });
      continue;
    }

    const targetIdx = value - 1;
    const beforeTarget = arr[targetIdx];
    arr[targetIdx] = -Math.abs(arr[targetIdx]);
    const wasAlreadyMarked = beforeTarget < 0;

    snapshots.push({
      array: [...arr],
      cellStates: arr.map((v, idx) => {
        if (idx === i) return "checking";
        if (idx === targetIdx) return "marked";
        if (v < 0) return "marked";
        return "idle";
      }),
      pointer: i,
      targetIndex: targetIdx,
      answer: null,
      phase: "mark",
      note: `arr[${i}] = ${arr[i] < 0 ? "(was -)" : ""}${value} → mark index ${targetIdx} as seen.`,
      explanation: wasAlreadyMarked
        ? `Index ${targetIdx} was already negative — duplicate of ${value}. Math.abs() ensures we still flip it negative without losing the mark.`
        : `Flip arr[${targetIdx}] to negative. Now its sign says 'value ${value} appeared somewhere'. The MAGNITUDE is still readable via Math.abs().`,
    });
  }

  snapshots.push({
    array: [...arr],
    cellStates: arr.map((v) => (v < 0 ? "marked" : v > n ? "out-of-range" : "idle")),
    pointer: null,
    targetIndex: null,
    answer: null,
    phase: "marked",
    note: "Marking phase done.",
    explanation:
      "Read the array as a row of checkboxes: index k-1 negative ⇒ k was seen. The first non-negative index is the smallest missing positive.",
  });

  let answer: number | null = null;
  for (let i = 0; i < n; i++) {
    if (arr[i] > 0) {
      answer = i + 1;
      snapshots.push({
        array: [...arr],
        cellStates: arr.map((v, idx) => {
          if (idx === i) return "answer";
          if (v < 0) return "marked";
          return "out-of-range";
        }),
        pointer: i,
        targetIndex: null,
        answer,
        phase: "done",
        note: `arr[${i}] is positive → ${i + 1} was never marked. Answer = ${i + 1}.`,
        explanation: `Walking left to right, this is the first index whose checkbox is unchecked. Therefore ${i + 1} is missing, and it's the smallest such positive.`,
      });
      break;
    }
    snapshots.push({
      array: [...arr],
      cellStates: arr.map((v, idx) => {
        if (idx === i) return "checking";
        if (v < 0) return "marked";
        return "idle";
      }),
      pointer: i,
      targetIndex: null,
      answer: null,
      phase: "scan",
      note: `arr[${i}] = ${arr[i]} (negative) → ${i + 1} was seen, keep scanning.`,
      explanation: `Negative ⇒ checkbox checked ⇒ ${i + 1} appears in the input. Move on.`,
    });
  }

  if (answer === null) {
    snapshots.push({
      array: [...arr],
      cellStates: arr.map(() => "marked"),
      pointer: null,
      targetIndex: null,
      answer: n + 1,
      phase: "done",
      note: `Every slot marked → answer is n+1 = ${n + 1}.`,
      explanation:
        "All indices were flipped negative, so 1..n are all present. The smallest missing must be n+1.",
    });
  }

  return snapshots;
}

const CELL_PALETTE: Record<CellState, { bg: string; border: string; text: string }> = {
  idle: {
    bg: "bg-slate-800/70",
    border: "border-white/10",
    text: "text-slate-100",
  },
  "out-of-range": {
    bg: "bg-slate-700/40",
    border: "border-slate-600/40",
    text: "text-slate-500",
  },
  checking: {
    bg: "bg-cyan-400/20",
    border: "border-cyan-300/80",
    text: "text-cyan-50",
  },
  marked: {
    bg: "bg-fuchsia-400/20",
    border: "border-fuchsia-300/70",
    text: "text-fuchsia-50",
  },
  answer: {
    bg: "bg-emerald-400/25",
    border: "border-emerald-300/90",
    text: "text-emerald-50",
  },
  skipped: {
    bg: "bg-slate-800/50",
    border: "border-white/5",
    text: "text-slate-400",
  },
};

function Cell({
  value,
  index,
  state,
  showSign = false,
}: {
  value: number;
  index: number;
  state: CellState;
  showSign?: boolean;
}) {
  const palette = CELL_PALETTE[state];
  const display = showSign ? value : value;
  const isNegative = value < 0;
  return (
    <motion.div
      layout
      initial={false}
      animate={{ scale: state === "checking" || state === "answer" ? 1.06 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`flex aspect-square min-w-[44px] flex-1 flex-col items-center justify-center rounded-xl border ${palette.bg} ${palette.border} ${palette.text} shadow-inner`}
    >
      <span
        className={`text-base font-bold sm:text-lg ${
          showSign && isNegative ? "text-fuchsia-200" : ""
        }`}
      >
        {display}
      </span>
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
            key={state + label}
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

function SetView({ members, probing }: { members: number[]; probing: number | null }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Set seen
        </span>
        <span className="font-mono text-[10px] text-slate-500">
          size {members.length}
        </span>
      </div>
      <div className="flex min-h-[40px] flex-wrap items-center gap-1.5">
        <AnimatePresence mode="popLayout">
          {members.length === 0 ? (
            <motion.span
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono text-xs text-slate-500"
            >
              empty
            </motion.span>
          ) : (
            members.map((value) => (
              <motion.div
                key={value}
                layout
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{
                  scale: probing === value ? 1.1 : 1,
                  opacity: 1,
                }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className={`flex h-8 min-w-[2rem] items-center justify-center rounded-md border px-1.5 font-mono text-xs ${
                  probing === value
                    ? "border-cyan-300/80 bg-cyan-400/25 text-cyan-50"
                    : "border-white/10 bg-slate-800/60 text-slate-200"
                }`}
              >
                {value}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProbeRuler({
  n,
  probing,
  found,
  answer,
}: {
  n: number;
  probing: number | null;
  found: boolean | null;
  answer: number | null;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        Probing k = 1, 2, ..., n+1
      </div>
      <div className="flex flex-wrap gap-1.5">
        {Array.from({ length: n + 1 }, (_, i) => i + 1).map((k) => {
          const isCurrent = probing === k;
          const isAnswer = answer === k;
          let cls =
            "flex h-8 min-w-[2rem] items-center justify-center rounded-md border px-1.5 font-mono text-xs ";
          if (isAnswer) {
            cls += "border-emerald-300/90 bg-emerald-400/25 text-emerald-50";
          } else if (isCurrent && found === true) {
            cls += "border-cyan-300/80 bg-cyan-400/20 text-cyan-50";
          } else if (isCurrent) {
            cls += "border-fuchsia-300/80 bg-fuchsia-400/20 text-fuchsia-50";
          } else if (probing !== null && k < probing) {
            cls += "border-white/5 bg-slate-800/40 text-slate-500";
          } else {
            cls += "border-white/10 bg-slate-900/60 text-slate-300";
          }
          return (
            <div key={k} className={cls}>
              {k}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SetVisualizer({ snapshots }: { snapshots: SetSnapshot[] }) {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const current = snapshots[step] ?? snapshots[0];
  const n = snapshots[0]?.array.length ?? 0;

  useEffect(() => {
    if (!isPlaying) return;
    if (step >= snapshots.length - 1) {
      setIsPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setStep((p) => Math.min(p + 1, snapshots.length - 1));
    }, 850);
    return () => window.clearTimeout(timer);
  }, [isPlaying, step, snapshots.length]);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md sm:p-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
            Set lookup — O(n) time, O(n) space
          </h2>
          <p className="text-xs text-slate-400 sm:text-sm">
            Dump everything into a Set, then probe 1, 2, 3 ... until one is missing.
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

      <p className="rounded-lg border border-white/5 bg-slate-950/40 px-3 py-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
        The answer is always in [1, n+1]. With a Set, &quot;does k exist?&quot; is O(1),
        so we just walk k upward and stop at the first miss. Simple, but uses
        O(n) extra memory.
      </p>

      <div>
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Input array
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:gap-2">
          {current.array.map((value, index) => (
            <Cell
              key={index}
              value={value}
              index={index}
              state={current.cellStates[index]}
            />
          ))}
        </div>
      </div>

      <SetView members={current.setMembers} probing={current.probing} />
      <ProbeRuler
        n={n}
        probing={current.probing}
        found={current.found}
        answer={current.answer}
      />

      <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3">
        <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
          <span>What&apos;s happening</span>
          {current.probing !== null && (
            <span className="rounded-md border border-white/10 bg-slate-900/60 px-1.5 py-0.5 font-mono text-[10px] text-slate-300">
              k = {current.probing}
            </span>
          )}
        </div>
        <div className="font-mono text-xs text-cyan-50 sm:text-sm">
          {current.note}
        </div>
        <div className="mt-1.5 text-xs leading-relaxed text-slate-300 sm:text-sm">
          {current.explanation}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Legend
          items={[
            { state: "idle", label: "value" },
            { state: "checking", label: "active" },
            { state: "skipped", label: "ignored" },
          ]}
        />
        <div className="flex gap-3 font-mono text-[11px] text-slate-400">
          <span>
            answer:{" "}
            <span className="text-emerald-300">
              {current.answer ?? "—"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

function InPlaceVisualizer({ snapshots }: { snapshots: InPlaceSnapshot[] }) {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const current = snapshots[step] ?? snapshots[0];

  useEffect(() => {
    if (!isPlaying) return;
    if (step >= snapshots.length - 1) {
      setIsPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setStep((p) => Math.min(p + 1, snapshots.length - 1));
    }, 850);
    return () => window.clearTimeout(timer);
  }, [isPlaying, step, snapshots.length]);

  const phaseLabel: Record<InPlaceSnapshot["phase"], string> = {
    init: "start",
    neutralize: "phase 1: neutralize",
    neutralized: "phase 1 done",
    mark: "phase 2: mark signs",
    marked: "phase 2 done",
    scan: "phase 3: scan",
    done: "done",
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md sm:p-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
            In-place sign marking — O(n) time, O(1) extra space
          </h2>
          <p className="text-xs text-slate-400 sm:text-sm">
            Use the array itself as a row of checkboxes. The sign at index k-1
            tells us whether k was seen.
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

      <p className="rounded-lg border border-white/5 bg-slate-950/40 px-3 py-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
        Three phases: (1) replace junk values (≤0 or &gt;n) with n+1 so they
        don&apos;t corrupt the marking, (2) for each value v in [1,n], flip
        arr[v-1] negative as a &quot;seen&quot; flag, (3) the first index whose
        value is still positive is the answer.
      </p>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Array (mutated in place)
          </span>
          <span className="rounded-md border border-fuchsia-400/30 bg-fuchsia-400/10 px-2 py-0.5 font-mono text-[10px] text-fuchsia-200">
            {phaseLabel[current.phase]}
          </span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:gap-2">
          {current.array.map((value, index) => (
            <Cell
              key={index}
              value={value}
              index={index}
              state={current.cellStates[index]}
              showSign
            />
          ))}
        </div>
        {(current.pointer !== null || current.targetIndex !== null) && (
          <div className="mt-2 flex flex-wrap gap-2 font-mono text-[11px] text-slate-400">
            {current.pointer !== null && (
              <span>
                i = <span className="text-cyan-300">{current.pointer}</span>
              </span>
            )}
            {current.targetIndex !== null && (
              <span>
                target index ={" "}
                <span className="text-fuchsia-300">{current.targetIndex}</span>
              </span>
            )}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3">
        <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
          What&apos;s happening
        </div>
        <div className="font-mono text-xs text-cyan-50 sm:text-sm">
          {current.note}
        </div>
        <div className="mt-1.5 text-xs leading-relaxed text-slate-300 sm:text-sm">
          {current.explanation}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Legend
          items={[
            { state: "idle", label: "untouched" },
            { state: "checking", label: "current i" },
            { state: "marked", label: "negative = seen" },
            { state: "out-of-range", label: "ignored / n+1" },
            { state: "answer", label: "answer" },
          ]}
        />
        <div className="flex gap-3 font-mono text-[11px] text-slate-400">
          <span>
            answer:{" "}
            <span className="text-emerald-300">
              {current.answer ?? "—"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

function clampValue(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.max(MIN_VALUE, Math.min(MAX_VALUE, Math.floor(n)));
}

function randomArray(size: number): number[] {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE,
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
        Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE,
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
            Random
          </button>
          <button
            onClick={() => onChange([3, 4, -1, 1])}
            className={btn}
          >
            <Hash className="h-3.5 w-3.5" />
            Example [3,4,-1,1]
          </button>
          <button
            onClick={() => onChange([1, 2, 0])}
            className={btn}
          >
            <Hash className="h-3.5 w-3.5" />
            [1,2,0]
          </button>
          <button
            onClick={() => onChange([7, 8, 9, 11, 12])}
            className={btn}
          >
            <Hash className="h-3.5 w-3.5" />
            All large
          </button>
        </div>
      </div>

      <div>
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Values ({MIN_VALUE} to {MAX_VALUE}) — negatives, zeros and duplicates allowed
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
                className="w-14 rounded-md border border-white/10 bg-slate-900/70 px-1.5 py-1 text-center font-mono text-sm text-slate-100 outline-none transition focus:border-cyan-400/60 focus:bg-slate-900"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SmallestMissingPositive() {
  const [input, setInput] = useState<number[]>(() => [3, 4, -1, 1]);
  const setSnapshots = useMemo(() => buildSetSnapshots(input), [input]);
  const inPlaceSnapshots = useMemo(
    () => buildInPlaceSnapshots(input),
    [input],
  );
  const inputKey = input.join(",");

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Smallest Missing Positive — two solutions side by side
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Given an unsorted array, find the smallest positive integer not in
            it. The answer is always in [1, n+1] — the trick is how you check
            membership without paying O(n) memory.
          </p>
        </header>

        <div className="mb-5">
          <InputEditor input={input} onChange={setInput} />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <SetVisualizer key={`set-${inputKey}`} snapshots={setSnapshots} />
          <InPlaceVisualizer
            key={`inplace-${inputKey}`}
            snapshots={inPlaceSnapshots}
          />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
              Why [1, n+1]?
            </div>
            <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
              An array of length n holds at most n distinct positive integers.
              If it happens to contain exactly{" "}
              <span className="font-mono text-cyan-200">1, 2, ..., n</span>, the
              smallest missing is{" "}
              <span className="font-mono text-cyan-200">n+1</span>. Otherwise
              some k in <span className="font-mono">[1, n]</span> is missing.
              Either way, the answer can never exceed n+1 — that&apos;s what
              lets us bound the search.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-fuchsia-300">
              Why the sign trick works
            </div>
            <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
              We need a boolean per index 0..n-1. A separate{" "}
              <span className="font-mono">boolean[n]</span> would cost O(n)
              extra space. The clever move: every cell already stores a number,
              and we only care about its <strong>magnitude</strong> (via{" "}
              <span className="font-mono">Math.abs</span>) — so the{" "}
              <strong>sign bit</strong> is free real estate. Negative = seen.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
              Trade-off
            </div>
            <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
              Both run in O(n) time. The Set version is{" "}
              <strong>obvious</strong> and easy to debug, but allocates. The
              in-place version meets the strict O(1) extra space constraint
              from the problem statement, at the cost of mutating the input and
              being trickier to read. In an interview, code the Set first, then
              say &quot;and here&apos;s the O(1) space version.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
