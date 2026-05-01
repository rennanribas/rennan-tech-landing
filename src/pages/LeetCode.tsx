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
import { useI18n } from "@/i18n";

type Status = "live" | "planned";

interface LessonMeta {
  to: string;
  icon: LucideIcon;
  status: Status;
}

const lessonMeta: LessonMeta[] = [
  { to: "/leetcode/provinces", icon: Network, status: "live" },
  { to: "/leetcode/smallest-missing-positive", icon: Hash, status: "live" },
  { to: "#", icon: ArrowUpDown, status: "planned" },
  { to: "#", icon: Compass, status: "planned" },
  { to: "#", icon: Sparkles, status: "planned" },
  { to: "#", icon: Lightbulb, status: "planned" },
];

interface Lesson extends LessonMeta {
  title: string;
  blurb: string;
  topics: string[];
}

function LessonCard({
  lesson,
  index,
  openLabel,
  plannedLabel,
}: {
  lesson: Lesson;
  index: number;
  openLabel: string;
  plannedLabel: string;
}) {
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
            {plannedLabel}
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
          {openLabel}
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
  const { messages } = useI18n();
  const t = messages.leetcode;

  const lessons: Lesson[] = lessonMeta.map((meta, i) => ({
    ...meta,
    title: t.lessons[i].title,
    blurb: t.lessons[i].blurb,
    topics: t.lessons[i].topics,
  }));

  const live = lessons.filter((l) => l.status === "live").length;
  const planned = lessons.length - live;
  const stats = t.lessonsSection.stats
    .replace("{live}", String(live))
    .replace("{planned}", String(planned));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section className="text-center py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-x-0 top-12 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10" />

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70 mb-4">
          {t.header.eyebrow}
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
          {t.header.title}
        </h1>
        <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
          {t.header.description}
        </p>
      </section>

      <section className="space-y-8 py-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/70 mb-3">
              {t.lessonsSection.eyebrow}
            </p>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              {t.lessonsSection.title}
            </h2>
            <p className="mt-3 text-foreground/75 leading-relaxed">
              {t.lessonsSection.description}
            </p>
          </div>
          <span className="text-sm font-mono text-foreground/55">{stats}</span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson, index) => (
            <LessonCard
              key={lesson.title}
              lesson={lesson}
              index={index}
              openLabel={t.openLesson}
              plannedLabel={t.planned}
            />
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="rounded-2xl border border-border/70 bg-muted/40 p-6 sm:p-8">
          <p className="text-foreground/75 leading-relaxed">
            {t.callout.before}
            <Link
              to="/contact"
              className="font-semibold text-primary hover:underline"
            >
              {t.callout.link}
            </Link>
            {t.callout.after}
          </p>
        </div>
      </section>
    </motion.div>
  );
}
