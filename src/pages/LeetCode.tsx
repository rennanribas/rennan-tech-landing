import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  ArrowUpDown,
  Compass,
  Construction,
  Hash,
  Lightbulb,
  Network,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type Status = "live" | "planned";

interface Lesson {
  to: string;
  title: string;
  blurb: string;
  topics: string[];
  icon: LucideIcon;
  status: Status;
}

const lessons: Lesson[] = [
  {
    to: "/leetcode/sorting",
    title: "Sorting side-by-side",
    blurb:
      "Bubble sort and insertion sort animated on the same array, step by step. See where each one wastes work and where each one shines.",
    topics: ["arrays", "O(n²) sorting", "invariants"],
    icon: ArrowUpDown,
    status: "live",
  },
  {
    to: "/provinces",
    title: "Number of Provinces",
    blurb:
      "Iterative DFS over an adjacency matrix. Watch the stack fill, the visited set grow, and provinces light up one by one.",
    topics: ["graphs", "DFS", "connected components"],
    icon: Network,
    status: "live",
  },
  {
    to: "/smallest-missing-positive",
    title: "Smallest Missing Positive",
    blurb:
      "Two solutions for the same problem: the obvious Set lookup vs. the in-place sign-marking trick that hits O(1) extra space.",
    topics: ["arrays", "space complexity", "in-place tricks"],
    icon: Hash,
    status: "live",
  },
  {
    to: "#",
    title: "Two Pointers",
    blurb:
      'Moving cursors that meet in the middle, slide together, or chase each other. The shape behind a surprising number of "hard" problems.',
    topics: ["arrays", "strings", "sliding window"],
    icon: Compass,
    status: "planned",
  },
  {
    to: "#",
    title: "Recursion & the call stack",
    blurb:
      "A visual call stack so the recursion stops feeling like magic. See frames push, return, and unwind in real time.",
    topics: ["recursion", "stack", "tree traversal"],
    icon: Sparkles,
    status: "planned",
  },
  {
    to: "#",
    title: "Hash maps from scratch",
    blurb:
      'Buckets, hash functions, and collisions visualised. Why "average O(1)" is doing some heavy lifting.',
    topics: ["hashing", "collisions", "load factor"],
    icon: Lightbulb,
    status: "planned",
  },
];

function LessonCard({ lesson, index }: { lesson: Lesson; index: number }) {
  const { icon: Icon, status } = lesson;
  const isLive = status === "live";

  const card = (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.35 }}
      whileHover={isLive ? { y: -3 } : undefined}
      className={`group relative flex h-full flex-col rounded-2xl border p-6 sm:p-7 shadow-soft transition-colors ${
        isLive
          ? "border-border/70 bg-card/90 hover:border-primary/40"
          : "border-dashed border-border/60 bg-card/40"
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            isLive
              ? "bg-primary/10 text-primary"
              : "bg-muted/60 text-foreground/50"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        {!isLive && (
          <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-foreground/60">
            <Construction className="h-3 w-3" />
            planned
          </span>
        )}
      </div>

      <h3
        className={`mt-5 text-xl font-semibold ${
          isLive ? "text-card-foreground" : "text-foreground/70"
        }`}
      >
        {lesson.title}
      </h3>

      <p
        className={`mt-2 leading-relaxed ${
          isLive ? "text-foreground/80" : "text-foreground/55"
        }`}
      >
        {lesson.blurb}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {lesson.topics.map((topic) => (
          <span
            key={topic}
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              isLive
                ? "border border-primary/15 bg-primary/10 text-primary"
                : "border border-border/50 bg-muted/40 text-foreground/55"
            }`}
          >
            {topic}
          </span>
        ))}
      </div>

      {isLive && (
        <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Open lesson
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </div>
      )}
    </motion.article>
  );

  if (!isLive) return card;

  return (
    <Link to={lesson.to} className="block h-full">
      {card}
    </Link>
  );
}

export default function LeetCode() {
  const live = lessons.filter((l) => l.status === "live").length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section className="text-center py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-x-0 top-12 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10" />

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70 mb-4">
          LeetCode lab
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
          Algorithms and data structures.
        </h1>
        <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
          A growing collection of interactive lessons that turn algorithm and
          data-structure problems into something you can actually watch happen,
          one step at a time, with controls and clear narration.
        </p>
      </section>

      <section className="space-y-8 py-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/70 mb-3">
              Lessons
            </p>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              Pick one and play with it
            </h2>
            <p className="mt-3 text-foreground/75 leading-relaxed">
              Every lesson runs the same input through the algorithm and lets
              you step forward, step back, or just hit play. Tweak the input and
              watch the behaviour change.
            </p>
          </div>
          <span className="text-sm font-mono text-foreground/55">
            {live} live · {lessons.length - live} planned
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson, index) => (
            <LessonCard key={lesson.title} lesson={lesson} index={index} />
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="rounded-2xl border border-border/70 bg-muted/40 p-6 sm:p-8">
          <p className="text-foreground/75 leading-relaxed">
            Have a topic you wish someone had visualised when you were learning
            it?{" "}
            <Link
              to="/contact"
              className="font-semibold text-primary hover:underline"
            >
              Tell me about it
            </Link>{" "}
            — suggestions shape what gets built next.
          </p>
        </div>
      </section>
    </motion.div>
  );
}
