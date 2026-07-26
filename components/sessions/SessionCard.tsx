import Link from "next/link";
import type { Session } from "@/types/session";

interface SessionCardProps {
  session: Session;
}

export function SessionCard({ session }: SessionCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Link
      className="group block relative overflow-hidden rounded-[24px] border border-slate-200/60 bg-white p-6 pl-7 shadow-[0_4px_20px_rgba(47,43,34,0.01)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-350/70 hover:shadow-[0_20px_40px_rgba(47,43,34,0.04)]"
      href={`/sessions/${session.id}`}
    >
      {/* Left accent color strip */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-slate-200/80 transition-all duration-300 group-hover:bg-gradient-to-b group-hover:from-sky-500 group-hover:to-sky-600" />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 font-extrabold text-slate-700 border border-slate-100 shadow-sm group-hover:bg-sky-50/60 group-hover:text-sky-700 group-hover:border-sky-100/60 transition-all duration-300">
            {getInitials(session.student)}
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-sky-700">
                <svg className="h-3 w-3 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{session.date}</span>
              </div>
              <h3 className="mt-1.5 text-lg font-extrabold tracking-tight text-slate-900 transition duration-300 group-hover:text-sky-950">
                {session.student}
              </h3>
              <p className="text-sm font-semibold text-slate-500 mt-0.5">{session.topic}</p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-500 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-1">
                <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Coach: {session.coach}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-1">
                <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {session.durationMinutes} mins
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5 lg:min-w-[280px]">
          <MetricPill label="Engagement" value={session.summary.engagement} tone="sky" />
          <MetricPill label="Clarity" value={session.summary.clarity} tone="emerald" />
          <MetricPill label="Pacing" value={session.summary.pacing} tone="amber" />
        </div>
      </div>

      <p className="mt-5 border-t border-slate-100/70 pt-4 text-sm leading-relaxed text-slate-600 line-clamp-2 italic">
        &ldquo;{session.notes}&rdquo;
      </p>
    </Link>
  );
}

interface MetricPillProps {
  label: string;
  value: number;
  tone: "sky" | "emerald" | "amber";
}

function MetricPill({ label, value, tone }: MetricPillProps) {
  const styles = {
    sky: "bg-sky-50/70 text-sky-950 border border-sky-100/70",
    emerald: "bg-emerald-50/70 text-emerald-900 border border-emerald-100/70",
    amber: "bg-amber-50/70 text-amber-900 border border-amber-100/70",
  };

  return (
    <div className={`rounded-2xl p-3 text-center transition-all ${styles[tone]}`}>
      <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">
        {label}
      </p>
      <p className="mt-1.5 text-lg font-bold tracking-tight">{value}</p>
    </div>
  );
}
