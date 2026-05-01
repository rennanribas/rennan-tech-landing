import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Shuffle,
  Minus,
  Plus,
  ArrowRightLeft,
  CheckCircle2,
} from "lucide-react";
import { useI18n, type Messages } from "@/i18n";

const MIN_LENGTH = 1;
const MAX_LENGTH = 10;
const MIN_VALUE = -5;
const MAX_VALUE = 12;

type CellState =
  | "idle"
  | "current"
  | "home"
  | "swap"
  | "correct"
  | "ignored"
  | "duplicate"
  | "missing"
  | "checking";

type Phase =
  | "start"
  | "look"
  | "ignore"
  | "home"
  | "duplicate"
  | "swap"
  | "scan"
  | "found"
  | "done";

type Stage = "organize" | "review";

type Snapshot = {
  numbers: number[];
  states: CellState[];
  index: number | null;
  value: number | null;
  homeIndex: number | null;
  answer: number | null;
  phase: Phase;
  stage: Stage;
  title: string;
  subtitle: string;
};

type SmpMessages = Messages["smallestMissingPositive"];
type SnapshotMessages = SmpMessages["snapshots"];

function format(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(vars, key)
      ? String(vars[key])
      : match,
  );
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function randomArray(length: number): number[] {
  return Array.from({ length }, () => {
    return Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE;
  });
}

function idleStates(length: number): CellState[] {
  return Array.from({ length }, () => "idle");
}

function buildSnapshots(input: number[], t: SnapshotMessages): Snapshot[] {
  const numbers = [...input];
  const total = numbers.length;
  const snapshots: Snapshot[] = [];

  snapshots.push({
    numbers: [...numbers],
    states: idleStates(total),
    index: null,
    value: null,
    homeIndex: null,
    answer: null,
    phase: "start",
    stage: "organize",
    title: t.startTitle,
    subtitle: t.startSubtitle,
  });

  for (let index = 0; index < total; index++) {
    let keepLooking = true;

    while (keepLooking) {
      const value = numbers[index];

      const lookStates = idleStates(total);
      lookStates[index] = "current";

      snapshots.push({
        numbers: [...numbers],
        states: lookStates,
        index,
        value,
        homeIndex: null,
        answer: null,
        phase: "look",
        stage: "organize",
        title: format(t.lookTitle, { value }),
        subtitle: t.lookSubtitle,
      });

      const isOutOfRange = value <= 0 || value > total;

      if (isOutOfRange) {
        const skipStates = idleStates(total);
        skipStates[index] = "ignored";

        snapshots.push({
          numbers: [...numbers],
          states: skipStates,
          index,
          value,
          homeIndex: null,
          answer: null,
          phase: "ignore",
          stage: "organize",
          title: format(t.skipTitle, { value }),
          subtitle: format(t.skipSubtitle, { total }),
        });

        keepLooking = false;
        continue;
      }

      const homeIndex = value - 1;
      const valueAtHome = numbers[homeIndex];

      const homeStates = idleStates(total);
      homeStates[index] = "current";
      homeStates[homeIndex] = index === homeIndex ? "correct" : "home";

      snapshots.push({
        numbers: [...numbers],
        states: homeStates,
        index,
        value,
        homeIndex,
        answer: null,
        phase: "home",
        stage: "organize",
        title: format(t.homeTitle, { value, homeIndex }),
        subtitle: t.homeSubtitle,
      });

      const alreadyHome = index === homeIndex;

      if (alreadyHome) {
        const correctStates = idleStates(total);
        correctStates[index] = "correct";

        snapshots.push({
          numbers: [...numbers],
          states: correctStates,
          index,
          value,
          homeIndex,
          answer: null,
          phase: "home",
          stage: "organize",
          title: format(t.alreadyHomeTitle, { value }),
          subtitle: t.alreadyHomeSubtitle,
        });

        keepLooking = false;
        continue;
      }

      const isDuplicate = value === valueAtHome;

      if (isDuplicate) {
        const duplicateStates = idleStates(total);
        duplicateStates[index] = "duplicate";
        duplicateStates[homeIndex] = "home";

        snapshots.push({
          numbers: [...numbers],
          states: duplicateStates,
          index,
          value,
          homeIndex,
          answer: null,
          phase: "duplicate",
          stage: "organize",
          title: format(t.duplicateTitle, { value }),
          subtitle: t.duplicateSubtitle,
        });

        keepLooking = false;
        continue;
      }

      const swapStates = idleStates(total);
      swapStates[index] = "swap";
      swapStates[homeIndex] = "swap";

      snapshots.push({
        numbers: [...numbers],
        states: swapStates,
        index,
        value,
        homeIndex,
        answer: null,
        phase: "swap",
        stage: "organize",
        title: format(t.swapTitle, { homeIndex }),
        subtitle: format(t.swapSubtitle, { value }),
      });

      numbers[index] = valueAtHome;
      numbers[homeIndex] = value;
    }
  }

  for (let index = 0; index < total; index++) {
    const expected = index + 1;
    const actual = numbers[index];

    const scanStates = idleStates(total);
    scanStates[index] = actual === expected ? "correct" : "checking";

    snapshots.push({
      numbers: [...numbers],
      states: scanStates,
      index,
      value: actual,
      homeIndex: null,
      answer: null,
      phase: "scan",
      stage: "review",
      title: format(t.reviewTitle, { index }),
      subtitle:
        actual === expected
          ? format(t.reviewSubtitleKeep, { expected, actual })
          : format(t.reviewSubtitleGap, { expected, actual }),
    });

    if (actual !== expected) {
      const foundStates = idleStates(total);
      foundStates[index] = "missing";

      snapshots.push({
        numbers: [...numbers],
        states: foundStates,
        index,
        value: actual,
        homeIndex: null,
        answer: expected,
        phase: "found",
        stage: "review",
        title: format(t.foundTitle, { expected }),
        subtitle: t.foundSubtitle,
      });

      return snapshots;
    }
  }

  snapshots.push({
    numbers: [...numbers],
    states: Array.from({ length: total }, () => "correct"),
    index: null,
    value: null,
    homeIndex: null,
    answer: total + 1,
    phase: "done",
    stage: "review",
    title: format(t.doneTitle, { value: total + 1 }),
    subtitle: format(t.doneSubtitle, { total }),
  });

  return snapshots;
}

function getStageClass(stage: Stage): string {
  if (stage === "organize") {
    return "border-cyan-400/20 bg-cyan-400/5 shadow-cyan-950/20";
  }

  return "border-violet-400/20 bg-violet-400/5 shadow-violet-950/20";
}

function getStagePillClass(stage: Stage): string {
  if (stage === "organize") {
    return "border-cyan-400/30 bg-cyan-400/10 text-cyan-200";
  }

  return "border-violet-400/30 bg-violet-400/10 text-violet-200";
}

function getCellClasses(state: CellState): {
  box: string;
  label: string;
  pulse: boolean;
} {
  if (state === "current") {
    return {
      box: "border-cyan-300/80 bg-cyan-400/20 text-cyan-50 shadow-cyan-950",
      label: "text-cyan-300",
      pulse: true,
    };
  }

  if (state === "home") {
    return {
      box: "border-fuchsia-300/80 bg-fuchsia-400/20 text-fuchsia-50 shadow-fuchsia-950",
      label: "text-fuchsia-300",
      pulse: false,
    };
  }

  if (state === "swap") {
    return {
      box: "border-amber-300/80 bg-amber-400/20 text-amber-50 shadow-amber-950",
      label: "text-amber-300",
      pulse: true,
    };
  }

  if (state === "correct") {
    return {
      box: "border-emerald-300/70 bg-emerald-400/15 text-emerald-50 shadow-emerald-950",
      label: "text-emerald-300",
      pulse: false,
    };
  }

  if (state === "ignored") {
    return {
      box: "border-slate-500/50 bg-slate-900 text-slate-500",
      label: "text-slate-600",
      pulse: false,
    };
  }

  if (state === "duplicate") {
    return {
      box: "border-rose-300/80 bg-rose-400/20 text-rose-50 shadow-rose-950",
      label: "text-rose-300",
      pulse: true,
    };
  }

  if (state === "missing") {
    return {
      box: "border-red-300/90 bg-red-400/25 text-red-50 shadow-red-950 ring-2 ring-red-300/40",
      label: "text-red-300",
      pulse: true,
    };
  }

  if (state === "checking") {
    return {
      box: "border-violet-300/80 bg-violet-400/20 text-violet-50 shadow-violet-950",
      label: "text-violet-300",
      pulse: true,
    };
  }

  return {
    box: "border-white/10 bg-slate-800/70 text-slate-100 shadow-black/20",
    label: "text-slate-500",
    pulse: false,
  };
}

function EditableCell({
  value,
  index,
  state,
  onChange,
}: {
  value: number;
  index: number;
  state: CellState;
  onChange: (index: number, value: number) => void;
}) {
  const { box, label, pulse } = getCellClasses(state);

  return (
    <motion.div
      layout
      initial={false}
      animate={{ scale: pulse ? [1, 1.08, 1] : 1 }}
      transition={{ duration: 0.45 }}
      className="flex flex-col items-center gap-1"
    >
      <div className={`font-mono text-[11px] ${label}`}>[{index}]</div>

      <motion.div
        layout
        className={`flex h-14 w-14 items-center justify-center rounded-xl border shadow-lg transition sm:h-16 sm:w-16 ${box}`}
      >
        <input
          type="number"
          min={MIN_VALUE}
          max={MAX_VALUE}
          value={value}
          onChange={(event) => onChange(index, Number(event.target.value))}
          className="h-full w-full rounded-xl bg-transparent text-center text-lg font-bold text-inherit outline-none"
        />
      </motion.div>
    </motion.div>
  );
}

function ArrayPanel({
  snapshot,
  numbers,
  onChangeNumber,
  onChangeArray,
  onReset,
  panel,
  stages,
  phases,
}: {
  snapshot: Snapshot;
  numbers: number[];
  onChangeNumber: (index: number, value: number) => void;
  onChangeArray: (numbers: number[]) => void;
  onReset: () => void;
  panel: SmpMessages["panel"];
  stages: SmpMessages["stages"];
  phases: SmpMessages["phases"];
}) {
  const stageClass = getStageClass(snapshot.stage);
  const stagePillClass = getStagePillClass(snapshot.stage);

  const setLength = (nextLength: number) => {
    const clampedLength = clamp(nextLength, MIN_LENGTH, MAX_LENGTH);

    if (clampedLength === numbers.length) {
      return;
    }

    if (clampedLength < numbers.length) {
      onChangeArray(numbers.slice(0, clampedLength));
      return;
    }

    const nextNumbers = [...numbers];

    while (nextNumbers.length < clampedLength) {
      nextNumbers.push(nextNumbers.length + 1);
    }

    onChangeArray(nextNumbers);
  };

  const button =
    "inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-slate-200 transition hover:bg-white/10 disabled:opacity-40";

  return (
    <div
      className={`overflow-hidden rounded-2xl border p-4 shadow-2xl transition-colors duration-300 ${stageClass}`}
    >
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-md border px-2 py-1 text-[11px] font-semibold uppercase tracking-wider ${stagePillClass}`}
          >
            {stages[snapshot.stage]}
          </span>

          <span className="rounded-md border border-white/10 bg-slate-950/40 px-2 py-1 font-mono text-[10px] text-slate-300">
            {phases[snapshot.phase]}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setLength(numbers.length - 1)}
            disabled={numbers.length <= MIN_LENGTH}
            className={button}
            aria-label={panel.decreaseLength}
          >
            <Minus className="h-3.5 w-3.5" />
          </button>

          <span className="w-6 text-center font-mono text-sm text-slate-100">
            {numbers.length}
          </span>

          <button
            onClick={() => setLength(numbers.length + 1)}
            disabled={numbers.length >= MAX_LENGTH}
            className={button}
            aria-label={panel.increaseLength}
          >
            <Plus className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => onChangeArray(randomArray(numbers.length))}
            className={button}
          >
            <Shuffle className="h-3.5 w-3.5" />
            {panel.random}
          </button>

          <button onClick={onReset} className={button}>
            <RotateCcw className="h-3.5 w-3.5" />
            {panel.reset}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950/30 p-4">
        <div className="flex min-w-max items-end gap-3">
          <AnimatePresence mode="popLayout">
            {snapshot.numbers.map((value, index) => (
              <EditableCell
                key={index}
                value={value}
                index={index}
                state={snapshot.states[index] ?? "idle"}
                onChange={onChangeNumber}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function MainRule({
  value,
  homeIndex,
  total,
  t,
}: {
  value: number | null;
  homeIndex: number | null;
  total: number;
  t: SmpMessages["rule"];
}) {
  const isPlaceable = value !== null && value >= 1 && value <= total;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        {t.label}
      </div>

      <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4 font-mono text-sm text-slate-100">
        {t.formula}
      </div>

      <div className="mt-3 min-h-8 font-mono text-xs text-slate-400">
        {value === null && t.noNumber}

        {value !== null && isPlaceable && (
          <div className="flex flex-wrap items-center gap-2">
            <span>{value}</span>
            <ArrowRightLeft className="h-3.5 w-3.5 text-cyan-300" />
            <span>{value} - 1</span>
            <ArrowRightLeft className="h-3.5 w-3.5 text-cyan-300" />
            <span className="text-cyan-200">{homeIndex}</span>
          </div>
        )}

        {value !== null && !isPlaceable && (
          <span>{format(t.noHome, { value, total })}</span>
        )}
      </div>
    </div>
  );
}

function HomesView({
  total,
  t,
}: {
  total: number;
  t: SmpMessages["homes"];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        {t.label}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {Array.from({ length: total }, (_, index) => {
          const number = index + 1;

          return (
            <div
              key={index}
              className="rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 font-mono text-xs"
            >
              <div className="text-slate-500">
                {format(t.indexLabel, { index })}
              </div>
              <div className="text-slate-100">
                {format(t.numberLabel, { number })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatusCard({
  snapshot,
  t,
}: {
  snapshot: Snapshot;
  t: SmpMessages["status"];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
      <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        <span>{t.label}</span>

        {snapshot.index !== null && (
          <span className="rounded-md border border-white/10 bg-slate-900/60 px-1.5 py-0.5 font-mono text-[10px] text-slate-300">
            {format(t.indexLabel, { index: snapshot.index })}
          </span>
        )}

        {snapshot.value !== null && (
          <span className="rounded-md border border-white/10 bg-slate-900/60 px-1.5 py-0.5 font-mono text-[10px] text-slate-300">
            {format(t.valueLabel, { value: snapshot.value })}
          </span>
        )}

        {snapshot.homeIndex !== null && (
          <span className="rounded-md border border-white/10 bg-slate-900/60 px-1.5 py-0.5 font-mono text-[10px] text-slate-300">
            {format(t.homeLabel, { homeIndex: snapshot.homeIndex })}
          </span>
        )}
      </div>

      <div className="text-lg font-semibold text-slate-50">
        {snapshot.title}
      </div>

      <div className="mt-1 text-sm leading-relaxed text-slate-300">
        {snapshot.subtitle}
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
  t,
}: {
  isPlaying: boolean;
  onPlayToggle: () => void;
  onReset: () => void;
  onPrev: () => void;
  onNext: () => void;
  step: number;
  total: number;
  t: SmpMessages["controls"];
}) {
  const button =
    "rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-200 transition hover:bg-white/10 disabled:opacity-40";

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900/70 p-1.5 backdrop-blur-md">
      <button onClick={onReset} className={button} aria-label={t.reset}>
        <RotateCcw className="h-3.5 w-3.5" />
      </button>

      <button
        onClick={onPrev}
        disabled={step === 0}
        className={button}
        aria-label={t.previous}
      >
        <SkipBack className="h-3.5 w-3.5" />
      </button>

      <button
        onClick={onPlayToggle}
        className="rounded-lg border border-cyan-400/30 bg-cyan-400/15 p-1.5 text-cyan-100 transition hover:bg-cyan-400/25"
        aria-label={isPlaying ? t.pause : t.play}
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
        className={button}
        aria-label={t.next}
      >
        <SkipForward className="h-3.5 w-3.5" />
      </button>

      <div className="ml-1 font-mono text-[11px] text-slate-400">
        {step + 1}/{total}
      </div>
    </div>
  );
}

function Legend({ t }: { t: SmpMessages["legend"] }) {
  const items: [string, string][] = [
    [t.current, "border-cyan-300/60 bg-cyan-400/15 text-cyan-50"],
    [t.home, "border-fuchsia-300/60 bg-fuchsia-400/15 text-fuchsia-50"],
    [t.swap, "border-amber-300/60 bg-amber-400/15 text-amber-50"],
    [t.correct, "border-emerald-300/60 bg-emerald-400/15 text-emerald-50"],
    [t.skip, "border-slate-500/50 bg-slate-800/70 text-slate-300"],
    [t.missing, "border-red-300/60 bg-red-400/15 text-red-50"],
  ];

  return (
    <div className="flex flex-wrap gap-2 text-[11px]">
      {items.map(([label, className]) => (
        <span
          key={label}
          className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono ${className}`}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

function AnswerView({
  answer,
  t,
}: {
  answer: number | null;
  t: SmpMessages["answer"];
}) {
  return (
    <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-300" />
      <span>
        {t.label}{" "}
        <span className="text-cyan-300">
          {answer === null ? t.notYet : answer}
        </span>
      </span>
    </div>
  );
}

function CodeView({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
        {label}
      </div>

      <pre className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950 p-4 text-xs leading-relaxed text-slate-300">
        <code>{`export function firstMissingPositive(orderNumbers: number[]): number {
  const total = orderNumbers.length;
  const numbers = orderNumbers.slice();

  for (let index = 0; index < total; index++) {
    let keepLooking = true;

    while (keepLooking) {
      const value = numbers[index]!;

      if (value <= 0 || value > total) {
        keepLooking = false;
        continue;
      }

      const homeIndex = value - 1;
      const valueAtHome = numbers[homeIndex]!;

      if (index === homeIndex || value === valueAtHome) {
        keepLooking = false;
        continue;
      }

      numbers[index] = valueAtHome;
      numbers[homeIndex] = value;
    }
  }

  for (let index = 0; index < total; index++) {
    const expected = index + 1;

    if (numbers[index] !== expected) {
      return expected;
    }
  }

  return total + 1;
}`}</code>
      </pre>
    </div>
  );
}

export default function SmallestMissingPositive() {
  const { messages } = useI18n();
  const t = messages.smallestMissingPositive;

  const defaultNumbers = [3, 4, -1, 1];

  const [numbers, setNumbers] = useState<number[]>(defaultNumbers);
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const snapshots = useMemo(
    () => buildSnapshots(numbers, t.snapshots),
    [numbers, t.snapshots],
  );
  const numbersKey = numbers.join("|");
  const current = snapshots[step] ?? snapshots[0];

  const changeNumber = (index: number, value: number) => {
    const nextNumbers = [...numbers];
    nextNumbers[index] = clamp(value, MIN_VALUE, MAX_VALUE);
    setNumbers(nextNumbers);
  };

  const changeArray = (nextNumbers: number[]) => {
    setNumbers(nextNumbers);
  };

  const resetToDefault = () => {
    setNumbers(defaultNumbers);
  };

  useEffect(() => {
    setStep(0);
    setIsPlaying(false);
  }, [numbersKey]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    if (step >= snapshots.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setStep((previousStep) =>
        Math.min(previousStep + 1, snapshots.length - 1),
      );
    }, 800);

    return () => window.clearTimeout(timer);
  }, [isPlaying, step, snapshots.length]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            {t.header.title}
          </h1>

          <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-400">
            {t.header.description}
          </p>
        </header>

        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
                {t.section.title}
              </h2>

              <p className="text-xs leading-relaxed text-slate-400 sm:text-sm">
                {t.section.description}
              </p>
            </div>

            <Controls
              isPlaying={isPlaying}
              onPlayToggle={() => setIsPlaying((previous) => !previous)}
              onReset={() => {
                setIsPlaying(false);
                setStep(0);
              }}
              onPrev={() => {
                setIsPlaying(false);
                setStep((previous) => Math.max(previous - 1, 0));
              }}
              onNext={() => {
                setIsPlaying(false);
                setStep((previous) =>
                  Math.min(previous + 1, snapshots.length - 1),
                );
              }}
              step={step}
              total={snapshots.length}
              t={t.controls}
            />
          </div>

          <ArrayPanel
            snapshot={current}
            numbers={numbers}
            onChangeNumber={changeNumber}
            onChangeArray={changeArray}
            onReset={resetToDefault}
            panel={t.panel}
            stages={t.stages}
            phases={t.phases}
          />

          <StatusCard snapshot={current} t={t.status} />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <MainRule
              value={current.value}
              homeIndex={current.homeIndex}
              total={current.numbers.length}
              t={t.rule}
            />

            <HomesView total={current.numbers.length} t={t.homes} />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Legend t={t.legend} />
            <AnswerView answer={current.answer} t={t.answer} />
          </div>
        </div>

        <div className="mt-5">
          <CodeView label={t.code.label} />
        </div>
      </div>
    </div>
  );
}
