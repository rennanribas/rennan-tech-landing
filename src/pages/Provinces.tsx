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
  Network,
} from "lucide-react";

const MIN_N = 2;
const MAX_N = 8;

type CityState =
  | "idle"
  | "start"
  | "current"
  | "stacked"
  | "visited"
  | "neighbor-check";

type EdgeState = "idle" | "scanning" | "follow" | "in-province";

type Snapshot = {
  visited: boolean[];
  stack: number[];
  cityStates: CityState[];
  edgeStates: Record<string, EdgeState>;
  province: number[];
  provinceColors: number[];
  outerI: number | null;
  currentCity: number | null;
  scanningJ: number | null;
  provincesCount: number;
  phase: "init" | "outer" | "pop" | "scan" | "done-province" | "done";
  note: string;
  explanation: string;
};

const PROVINCE_PALETTE = [
  { bg: "bg-cyan-400/20", border: "border-cyan-300/80", text: "text-cyan-50", dot: "#22d3ee" },
  { bg: "bg-fuchsia-400/20", border: "border-fuchsia-300/80", text: "text-fuchsia-50", dot: "#e879f9" },
  { bg: "bg-emerald-400/20", border: "border-emerald-300/80", text: "text-emerald-50", dot: "#34d399" },
  { bg: "bg-amber-400/20", border: "border-amber-300/80", text: "text-amber-50", dot: "#fbbf24" },
  { bg: "bg-rose-400/20", border: "border-rose-300/80", text: "text-rose-50", dot: "#fb7185" },
  { bg: "bg-violet-400/20", border: "border-violet-300/80", text: "text-violet-50", dot: "#a78bfa" },
];

function edgeKey(a: number, b: number) {
  return a < b ? `${a}-${b}` : `${b}-${a}`;
}

function buildSnapshots(matrix: number[][]): Snapshot[] {
  const n = matrix.length;
  const snapshots: Snapshot[] = [];
  const visited = new Array<boolean>(n).fill(false);
  const provinceColors = new Array<number>(n).fill(-1);
  let provinces = 0;

  const baseEdges = (): Record<string, EdgeState> => {
    const e: Record<string, EdgeState> = {};
    for (let a = 0; a < n; a++) {
      for (let b = a + 1; b < n; b++) {
        if (matrix[a][b] === 1) e[edgeKey(a, b)] = "idle";
      }
    }
    return e;
  };

  const cityStatesIdle = (): CityState[] =>
    Array.from({ length: n }, (_, k) => (visited[k] ? "visited" : "idle"));

  snapshots.push({
    visited: [...visited],
    stack: [],
    cityStates: cityStatesIdle(),
    edgeStates: baseEdges(),
    province: [],
    provinceColors: [...provinceColors],
    outerI: null,
    currentCity: null,
    scanningJ: null,
    provincesCount: 0,
    phase: "init",
    note: "Início — nenhuma cidade visitada.",
    explanation:
      "Temos um mapa de cidades e uma matriz que diz quem tem estrada direta com quem. O objetivo é contar quantos grupos isolados (províncias) existem.",
  });

  for (let i = 0; i < n; i++) {
    if (visited[i]) {
      snapshots.push({
        visited: [...visited],
        stack: [],
        cityStates: cityStatesIdle().map((s, k) =>
          k === i ? "neighbor-check" : s,
        ),
        edgeStates: baseEdges(),
        province: [],
        provinceColors: [...provinceColors],
        outerI: i,
        currentCity: null,
        scanningJ: null,
        provincesCount: provinces,
        phase: "outer",
        note: `Cidade ${i} já foi visitada — pula.`,
        explanation: `O laço externo passa pela cidade ${i}, mas ela já foi alcançada por uma busca anterior, então faz parte de uma província já contada.`,
      });
      continue;
    }

    provinces++;
    const colorIdx = provinces - 1;

    snapshots.push({
      visited: [...visited],
      stack: [i],
      cityStates: cityStatesIdle().map((s, k) =>
        k === i ? "start" : s,
      ),
      edgeStates: baseEdges(),
      province: [],
      provinceColors: [...provinceColors],
      outerI: i,
      currentCity: null,
      scanningJ: null,
      provincesCount: provinces,
      phase: "outer",
      note: `Nova província #${provinces}! Começa em ${i}.`,
      explanation: `Cidade ${i} ainda não foi visitada — encontramos um novo grupo. Empilhamos ${i} para começar a explorar tudo que está conectado a ela.`,
    });

    const stack = [i];
    const provinceMembers: number[] = [];

    while (stack.length > 0) {
      const city = stack.pop()!;

      if (visited[city]) {
        snapshots.push({
          visited: [...visited],
          stack: [...stack],
          cityStates: cityStatesIdle().map((s, k) => {
            if (provinceMembers.includes(k)) return "visited";
            if (stack.includes(k)) return "stacked";
            if (k === city) return "neighbor-check";
            return s;
          }),
          edgeStates: baseEdges(),
          province: [...provinceMembers],
          provinceColors: [...provinceColors],
          outerI: i,
          currentCity: city,
          scanningJ: null,
          provincesCount: provinces,
          phase: "pop",
          note: `Tirou ${city} da pilha — já estava visitada, ignora.`,
          explanation: `${city} foi empilhada por mais de um vizinho. Quando saiu da pilha, já tinha sido processada, então pulamos.`,
        });
        continue;
      }

      visited[city] = true;
      provinceColors[city] = colorIdx;
      provinceMembers.push(city);

      snapshots.push({
        visited: [...visited],
        stack: [...stack],
        cityStates: cityStatesIdle().map((s, k) => {
          if (provinceMembers.includes(k)) return k === city ? "current" : "visited";
          if (stack.includes(k)) return "stacked";
          return s;
        }),
        edgeStates: baseEdges(),
        province: [...provinceMembers],
        provinceColors: [...provinceColors],
        outerI: i,
        currentCity: city,
        scanningJ: null,
        provincesCount: provinces,
        phase: "pop",
        note: `Visita cidade ${city}.`,
        explanation: `Tirou ${city} do topo da pilha. Marca como visitada e adiciona à província #${provinces}. Agora vamos olhar a linha ${city} da matriz para achar vizinhos diretos.`,
      });

      const row = matrix[city]!;
      for (let j = 0; j < n; j++) {
        if (j === city) continue;
        const edges = baseEdges();
        const k = edgeKey(city, j);
        const hasEdge = matrix[city][j] === 1;

        if (hasEdge) {
          edges[k] = "scanning";
        }

        snapshots.push({
          visited: [...visited],
          stack: [...stack],
          cityStates: cityStatesIdle().map((s, kk) => {
            if (provinceMembers.includes(kk)) return kk === city ? "current" : "visited";
            if (stack.includes(kk)) return "stacked";
            if (kk === j) return "neighbor-check";
            return s;
          }),
          edgeStates: edges,
          province: [...provinceMembers],
          provinceColors: [...provinceColors],
          outerI: i,
          currentCity: city,
          scanningJ: j,
          provincesCount: provinces,
          phase: "scan",
          note: `Olhar matriz[${city}][${j}] = ${row[j]}.`,
          explanation: hasEdge
            ? visited[j]
              ? `Há estrada ${city}↔${j}, mas ${j} já foi visitada — não empilha de novo.`
              : `Há estrada ${city}↔${j} e ${j} ainda não foi visitada — empilha ${j} para visitar depois.`
            : `Sem estrada direta entre ${city} e ${j} — segue.`,
        });

        if (hasEdge && !visited[j]) {
          stack.push(j);
          const followEdges = baseEdges();
          followEdges[k] = "follow";

          snapshots.push({
            visited: [...visited],
            stack: [...stack],
            cityStates: cityStatesIdle().map((ss, kk) => {
              if (provinceMembers.includes(kk)) return kk === city ? "current" : "visited";
              if (stack.includes(kk)) return "stacked";
              return ss;
            }),
            edgeStates: followEdges,
            province: [...provinceMembers],
            provinceColors: [...provinceColors],
            outerI: i,
            currentCity: city,
            scanningJ: j,
            provincesCount: provinces,
            phase: "scan",
            note: `Empilha ${j}.`,
            explanation: `${j} entra no topo da pilha. Vamos visitá-la quando voltarmos ao while.`,
          });
        }
      }
    }

    const finalEdges = baseEdges();
    for (const a of provinceMembers) {
      for (const b of provinceMembers) {
        if (a < b && matrix[a][b] === 1) {
          finalEdges[edgeKey(a, b)] = "in-province";
        }
      }
    }

    snapshots.push({
      visited: [...visited],
      stack: [],
      cityStates: cityStatesIdle(),
      edgeStates: finalEdges,
      province: [...provinceMembers],
      provinceColors: [...provinceColors],
      outerI: i,
      currentCity: null,
      scanningJ: null,
      provincesCount: provinces,
      phase: "done-province",
      note: `Província #${provinces} fechada: {${provinceMembers.sort((a, b) => a - b).join(", ")}}.`,
      explanation: `A pilha esvaziou — toda cidade alcançável a partir de ${i} foi marcada. Voltamos ao laço externo para procurar a próxima cidade ainda não visitada.`,
    });
  }

  const allEdges = baseEdges();
  for (let a = 0; a < n; a++) {
    for (let b = a + 1; b < n; b++) {
      if (matrix[a][b] === 1) allEdges[edgeKey(a, b)] = "in-province";
    }
  }

  snapshots.push({
    visited: [...visited],
    stack: [],
    cityStates: Array.from({ length: n }, () => "visited"),
    edgeStates: allEdges,
    province: [],
    provinceColors: [...provinceColors],
    outerI: null,
    currentCity: null,
    scanningJ: null,
    provincesCount: provinces,
    phase: "done",
    note: `Fim — ${provinces} província${provinces === 1 ? "" : "s"}.`,
    explanation: `O laço externo terminou. Cada componente conexo foi descoberto exatamente uma vez, então a resposta é ${provinces}.`,
  });

  return snapshots;
}

function randomMatrix(n: number, density = 0.35): number[][] {
  const m: number[][] = Array.from({ length: n }, () =>
    new Array(n).fill(0),
  );
  for (let i = 0; i < n; i++) m[i][i] = 1;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (Math.random() < density) {
        m[i][j] = 1;
        m[j][i] = 1;
      }
    }
  }
  return m;
}

function presetThreeProvinces(n: number): number[][] {
  const m: number[][] = Array.from({ length: n }, () =>
    new Array(n).fill(0),
  );
  for (let i = 0; i < n; i++) m[i][i] = 1;
  if (n >= 2) {
    m[0][1] = 1;
    m[1][0] = 1;
  }
  if (n >= 4) {
    m[2][3] = 1;
    m[3][2] = 1;
  }
  if (n >= 6) {
    m[4][5] = 1;
    m[5][4] = 1;
  }
  return m;
}

function CityNode({
  index,
  state,
  position,
  colorIdx,
}: {
  index: number;
  state: CityState;
  position: { x: number; y: number };
  colorIdx: number;
}) {
  let ring = "stroke-white/15";
  let fill = "fill-slate-800";
  let textColor = "fill-slate-200";
  let pulse = false;

  if (state === "visited" && colorIdx >= 0) {
    const c = PROVINCE_PALETTE[colorIdx % PROVINCE_PALETTE.length];
    ring = c.border.replace("border-", "stroke-");
    fill = c.bg.replace("bg-", "fill-").replace("/20", "/40");
    textColor = "fill-white";
  } else if (state === "current") {
    ring = "stroke-cyan-300";
    fill = "fill-cyan-400/40";
    textColor = "fill-white";
    pulse = true;
  } else if (state === "stacked") {
    ring = "stroke-amber-300";
    fill = "fill-amber-400/30";
    textColor = "fill-white";
  } else if (state === "start") {
    ring = "stroke-cyan-300";
    fill = "fill-cyan-400/30";
    textColor = "fill-white";
    pulse = true;
  } else if (state === "neighbor-check") {
    ring = "stroke-fuchsia-300";
    fill = "fill-fuchsia-400/20";
    textColor = "fill-white";
  }

  return (
    <motion.g
      initial={false}
      animate={{ scale: pulse ? [1, 1.12, 1] : 1 }}
      transition={{ duration: 0.6, repeat: pulse ? Infinity : 0 }}
      style={{ transformOrigin: `${position.x}px ${position.y}px` }}
    >
      <motion.circle
        cx={position.x}
        cy={position.y}
        r={22}
        className={`${fill} ${ring}`}
        strokeWidth={2.5}
        initial={false}
        animate={{ r: state === "current" ? 24 : 22 }}
      />
      <text
        x={position.x}
        y={position.y + 5}
        textAnchor="middle"
        className={`${textColor} text-sm font-bold`}
        style={{ fontFamily: "ui-sans-serif, system-ui" }}
      >
        {index}
      </text>
    </motion.g>
  );
}

function GraphView({ snapshot, n }: { snapshot: Snapshot; n: number }) {
  const size = 320;
  const center = size / 2;
  const radius = size / 2 - 32;

  const positions = useMemo(() => {
    return Array.from({ length: n }, (_, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      return {
        x: center + Math.cos(angle) * radius,
        y: center + Math.sin(angle) * radius,
      };
    });
  }, [n, center, radius]);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="aspect-square w-full"
    >
      {Object.entries(snapshot.edgeStates).map(([key, state]) => {
        const [aStr, bStr] = key.split("-");
        const a = Number(aStr);
        const b = Number(bStr);
        const pa = positions[a];
        const pb = positions[b];
        if (!pa || !pb) return null;

        let stroke = "rgba(148,163,184,0.25)";
        let width = 1.5;
        let dash = "";

        if (state === "scanning") {
          stroke = "#e879f9";
          width = 2.5;
          dash = "4 3";
        } else if (state === "follow") {
          stroke = "#22d3ee";
          width = 3;
        } else if (state === "in-province") {
          const colorIdx = snapshot.provinceColors[a];
          if (colorIdx >= 0) {
            stroke = PROVINCE_PALETTE[colorIdx % PROVINCE_PALETTE.length].dot;
            width = 2.5;
          }
        }

        return (
          <motion.line
            key={key}
            x1={pa.x}
            y1={pa.y}
            x2={pb.x}
            y2={pb.y}
            stroke={stroke}
            strokeWidth={width}
            strokeDasharray={dash}
            initial={false}
            animate={{ stroke, strokeWidth: width }}
            transition={{ duration: 0.25 }}
          />
        );
      })}
      {positions.map((pos, i) => (
        <CityNode
          key={i}
          index={i}
          state={snapshot.cityStates[i]}
          position={pos}
          colorIdx={snapshot.provinceColors[i]}
        />
      ))}
    </svg>
  );
}

function MatrixView({
  matrix,
  snapshot,
}: {
  matrix: number[][];
  snapshot: Snapshot;
}) {
  const n = matrix.length;
  return (
    <div className="overflow-x-auto">
      <table className="border-separate border-spacing-1">
        <thead>
          <tr>
            <th className="w-7" />
            {Array.from({ length: n }, (_, j) => (
              <th
                key={j}
                className={`w-8 text-center font-mono text-[10px] ${
                  snapshot.scanningJ === j ? "text-fuchsia-300" : "text-slate-500"
                }`}
              >
                {j}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              <td
                className={`w-7 text-right font-mono text-[10px] ${
                  snapshot.currentCity === i ? "text-cyan-300" : "text-slate-500"
                }`}
              >
                {i}
              </td>
              {row.map((v, j) => {
                const isRowActive = snapshot.currentCity === i;
                const isCellActive =
                  snapshot.currentCity === i && snapshot.scanningJ === j;
                const isDiag = i === j;
                const colorIdx = snapshot.provinceColors[i];
                const otherColor = snapshot.provinceColors[j];
                const sameProvince =
                  v === 1 &&
                  colorIdx >= 0 &&
                  colorIdx === otherColor &&
                  !isCellActive;

                let cls =
                  "w-8 h-8 text-center font-mono text-xs rounded-md border ";

                if (isCellActive) {
                  cls += "bg-fuchsia-400/30 border-fuchsia-300 text-white";
                } else if (isRowActive && v === 1) {
                  cls += "bg-cyan-400/15 border-cyan-300/60 text-cyan-50";
                } else if (sameProvince) {
                  const c = PROVINCE_PALETTE[colorIdx % PROVINCE_PALETTE.length];
                  cls += `${c.bg} ${c.border} ${c.text}`;
                } else if (isDiag) {
                  cls += "bg-slate-800 border-white/10 text-slate-500";
                } else if (v === 1) {
                  cls += "bg-slate-700/60 border-white/10 text-slate-200";
                } else {
                  cls += "bg-slate-900/60 border-white/5 text-slate-600";
                }

                return (
                  <td key={j} className="p-0">
                    <div className={cls + " flex items-center justify-center"}>
                      {v}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StackView({ stack }: { stack: number[] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Pilha (topo →)
        </span>
        <span className="font-mono text-[10px] text-slate-500">
          tamanho {stack.length}
        </span>
      </div>
      <div className="flex min-h-[40px] flex-wrap items-center gap-1.5">
        <AnimatePresence mode="popLayout">
          {stack.length === 0 ? (
            <motion.span
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono text-xs text-slate-500"
            >
              vazia
            </motion.span>
          ) : (
            stack.map((city, idx) => (
              <motion.div
                key={`${idx}-${city}`}
                layout
                initial={{ scale: 0.6, opacity: 0, y: -8 }}
                animate={{
                  scale: idx === stack.length - 1 ? 1.1 : 1,
                  opacity: 1,
                  y: 0,
                }}
                exit={{ scale: 0.6, opacity: 0, y: 8 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className={`flex h-8 w-8 items-center justify-center rounded-md border font-mono text-xs ${
                  idx === stack.length - 1
                    ? "border-cyan-300/80 bg-cyan-400/25 text-cyan-50"
                    : "border-white/10 bg-slate-800/60 text-slate-200"
                }`}
              >
                {city}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function VisitedView({
  visited,
  provinceColors,
}: {
  visited: boolean[];
  provinceColors: number[];
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        visited[]
      </div>
      <div className="flex flex-wrap gap-1.5">
        {visited.map((v, i) => {
          const colorIdx = provinceColors[i];
          let cls =
            "flex h-8 w-8 flex-col items-center justify-center rounded-md border font-mono text-[10px] ";
          if (v && colorIdx >= 0) {
            const c = PROVINCE_PALETTE[colorIdx % PROVINCE_PALETTE.length];
            cls += `${c.bg} ${c.border} ${c.text}`;
          } else if (v) {
            cls += "bg-emerald-400/15 border-emerald-400/60 text-emerald-50";
          } else {
            cls += "bg-slate-800/70 border-white/10 text-slate-400";
          }
          return (
            <div key={i} className={cls}>
              <span className="text-slate-400 text-[9px]">[{i}]</span>
              <span className="font-bold text-sm">
                {v ? "T" : "F"}
              </span>
            </div>
          );
        })}
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

function MatrixEditor({
  matrix,
  onChange,
}: {
  matrix: number[][];
  onChange: (m: number[][]) => void;
}) {
  const n = matrix.length;
  const setSize = (next: number) => {
    const clamped = Math.max(MIN_N, Math.min(MAX_N, next));
    if (clamped === n) return;
    const m: number[][] = Array.from({ length: clamped }, (_, i) =>
      Array.from({ length: clamped }, (_, j) => {
        if (i === j) return 1;
        if (i < n && j < n) return matrix[i][j];
        return 0;
      }),
    );
    onChange(m);
  };

  const toggle = (i: number, j: number) => {
    if (i === j) return;
    const m = matrix.map((row) => [...row]);
    const next = m[i][j] === 1 ? 0 : 1;
    m[i][j] = next;
    m[j][i] = next;
    onChange(m);
  };

  const btn =
    "inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-slate-200 transition hover:bg-white/10";

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-md sm:p-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Cidades
          </span>
          <button
            onClick={() => setSize(n - 1)}
            disabled={n <= MIN_N}
            className={`${btn} disabled:opacity-40`}
            aria-label="Decrease"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-6 text-center font-mono text-sm text-slate-100">
            {n}
          </span>
          <button
            onClick={() => setSize(n + 1)}
            disabled={n >= MAX_N}
            className={`${btn} disabled:opacity-40`}
            aria-label="Increase"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
          <input
            type="range"
            min={MIN_N}
            max={MAX_N}
            value={n}
            onChange={(e) => setSize(Number(e.target.value))}
            className="ml-1 w-24 accent-cyan-400 sm:w-32"
            aria-label="Number of cities"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
          <button onClick={() => onChange(randomMatrix(n))} className={btn}>
            <Shuffle className="h-3.5 w-3.5" />
            Aleatório
          </button>
          <button
            onClick={() => onChange(presetThreeProvinces(n))}
            className={btn}
          >
            <Network className="h-3.5 w-3.5" />
            Pares isolados
          </button>
          <button
            onClick={() =>
              onChange(
                Array.from({ length: n }, (_, i) =>
                  Array.from({ length: n }, (_, j) => (i === j ? 1 : 1)),
                ),
              )
            }
            className={btn}
          >
            Todos conectados
          </button>
          <button
            onClick={() =>
              onChange(
                Array.from({ length: n }, (_, i) =>
                  Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
                ),
              )
            }
            className={btn}
          >
            Nenhum conectado
          </button>
        </div>
      </div>

      <div>
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Clique nas células para alternar estradas (a matriz é simétrica)
        </div>
        <div className="overflow-x-auto">
          <table className="border-separate border-spacing-1">
            <thead>
              <tr>
                <th className="w-7" />
                {Array.from({ length: n }, (_, j) => (
                  <th
                    key={j}
                    className="w-8 text-center font-mono text-[10px] text-slate-500"
                  >
                    {j}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, i) => (
                <tr key={i}>
                  <td className="w-7 text-right font-mono text-[10px] text-slate-500">
                    {i}
                  </td>
                  {row.map((v, j) => {
                    const isDiag = i === j;
                    let cls =
                      "h-8 w-8 rounded-md border font-mono text-xs flex items-center justify-center transition ";
                    if (isDiag) {
                      cls += "bg-slate-800 border-white/10 text-slate-500 cursor-not-allowed";
                    } else if (v === 1) {
                      cls +=
                        "bg-cyan-400/20 border-cyan-300/60 text-cyan-50 cursor-pointer hover:bg-cyan-400/30";
                    } else {
                      cls +=
                        "bg-slate-900/60 border-white/10 text-slate-500 cursor-pointer hover:bg-slate-800";
                    }
                    return (
                      <td key={j} className="p-0">
                        <button
                          disabled={isDiag}
                          onClick={() => toggle(i, j)}
                          className={cls}
                        >
                          {v}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const PHASE_LABEL: Record<Snapshot["phase"], string> = {
  init: "Início",
  outer: "for (i)",
  pop: "stack.pop()",
  scan: "varrer linha",
  "done-province": "província fechada",
  done: "fim",
};

export default function Provinces() {
  const [matrix, setMatrix] = useState<number[][]>(() =>
    presetThreeProvinces(6),
  );
  const snapshots = useMemo(() => buildSnapshots(matrix), [matrix]);
  const matrixKey = matrix.map((r) => r.join("")).join("|");

  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const current = snapshots[step] ?? snapshots[0];

  useEffect(() => {
    setStep(0);
    setIsPlaying(false);
  }, [matrixKey]);

  useEffect(() => {
    if (!isPlaying) return;
    if (step >= snapshots.length - 1) {
      setIsPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setStep((p) => Math.min(p + 1, snapshots.length - 1));
    }, 750);
    return () => window.clearTimeout(timer);
  }, [isPlaying, step, snapshots.length]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Number of Provinces — DFS iterativa com pilha
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Cada cidade é um ponto, cada 1 na matriz é uma estrada. Conte
            quantos grupos de cidades estão isolados — esses grupos são as
            províncias.
          </p>
        </header>

        <div className="mb-5">
          <MatrixEditor matrix={matrix} onChange={setMatrix} />
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
                Como o algoritmo caminha
              </h2>
              <p className="text-xs text-slate-400 sm:text-sm">
                O laço externo procura uma cidade nova. A pilha explora tudo
                que está conectado a ela. Quando esvazia, fechou uma província.
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
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-slate-950/30 p-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Mapa das cidades
                </span>
                <span className="rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 font-mono text-[10px] text-cyan-200">
                  {PHASE_LABEL[current.phase]}
                </span>
              </div>
              <GraphView snapshot={current} n={matrix.length} />
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-slate-950/30 p-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Matriz isConnected
              </span>
              <MatrixView matrix={matrix} snapshot={current} />
              <StackView stack={current.stack} />
              <VisitedView
                visited={current.visited}
                provinceColors={current.provinceColors}
              />
            </div>
          </div>

          <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3">
            <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
              <span>O que está acontecendo</span>
              {current.outerI !== null && (
                <span className="rounded-md border border-white/10 bg-slate-900/60 px-1.5 py-0.5 font-mono text-[10px] text-slate-300">
                  i = {current.outerI}
                </span>
              )}
              {current.currentCity !== null && (
                <span className="rounded-md border border-white/10 bg-slate-900/60 px-1.5 py-0.5 font-mono text-[10px] text-slate-300">
                  city = {current.currentCity}
                </span>
              )}
              {current.scanningJ !== null && (
                <span className="rounded-md border border-white/10 bg-slate-900/60 px-1.5 py-0.5 font-mono text-[10px] text-slate-300">
                  j = {current.scanningJ}
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
            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-cyan-300/60 bg-cyan-400/15 px-2 py-0.5 text-cyan-50">
                <span className="font-mono">cidade atual</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-amber-300/60 bg-amber-400/15 px-2 py-0.5 text-amber-50">
                <span className="font-mono">na pilha</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-fuchsia-300/60 bg-fuchsia-400/15 px-2 py-0.5 text-fuchsia-50">
                <span className="font-mono">olhando vizinho</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-slate-800/70 px-2 py-0.5 text-slate-300">
                <span className="font-mono">não visitada</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-400/60 bg-emerald-400/15 px-2 py-0.5 text-emerald-50">
                <span className="font-mono">visitada (cor = província)</span>
              </span>
            </div>
            <div className="flex gap-3 font-mono text-[11px] text-slate-400">
              <span>
                províncias:{" "}
                <span className="text-cyan-300">{current.provincesCount}</span>
              </span>
              <span>
                visitadas:{" "}
                <span className="text-emerald-300">
                  {current.visited.filter(Boolean).length}/{matrix.length}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
              Fase 1 — varredura externa
            </div>
            <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
              O <span className="font-mono text-cyan-200">for (i)</span> passa
              por cada cidade tentando achar uma que ainda não foi visitada. Se
              já estiver marcada, pula — ela é parte de uma província que
              alguém já contou. Se não, é uma <strong>nova</strong> província:
              incrementa o contador e parte para explorar.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-amber-300">
              Fase 2 — explorar com a pilha
            </div>
            <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
              Empilha a cidade inicial. Enquanto a pilha tiver gente, tira o
              topo, marca como visitada e olha a linha dela na matriz. Cada{" "}
              <span className="font-mono text-fuchsia-200">1</span> que aparece
              é uma estrada — se o vizinho ainda não foi visitado, empilha. A
              pilha funciona como um caderno de "visitar depois".
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
              Fase 3 — fechar e voltar
            </div>
            <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
              Quando a pilha esvazia, todo o componente conexo da cidade
              inicial está marcado. Voltamos ao laço externo, que vai pular
              todas as cidades já visitadas até achar a próxima ilha. No fim,
              o contador <span className="font-mono text-cyan-200">provinces</span>{" "}
              tem a resposta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
