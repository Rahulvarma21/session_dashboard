import Link from "next/link";
import type { Session } from "@/types/session";
import { MetricsChart } from "./MetricsChart";

interface SessionDetailProps {
  session: Session;
}

export function SessionDetail({ session }: SessionDetailProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-8">
      <div>
        <Link
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-500 shadow-sm transition-all hover:border-slate-350 hover:bg-slate-50 hover:text-slate-800"
          href="/sessions"
        >
          <span className="text-sm">←</span> Back to sessions
        </Link>
      </div>

      <section className="rounded-[24px] border border-slate-200/50 bg-white p-6 md:p-8 shadow-[0_8px_30px_rgba(47,43,34,0.02)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4 md:gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-xl font-bold text-white shadow-md">
              {getInitials(session.student)}
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
                Coaching Session • {session.date}
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                {session.student}
              </h2>
              <p className="text-sm font-semibold text-slate-600">
                Focus: <span className="text-slate-800">{session.topic}</span>
              </p>
            </div>
          </div>

          <div className="grid gap-3 grid-cols-2 lg:w-[320px] lg:grid-cols-2">
            <InfoPill label="Assigned Coach" value={session.coach} />
            <InfoPill
              label="Session Length"
              value={`${session.durationMinutes} minutes`}
            />
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Coaching Feedback & Session Notes
          </h4>
          <div className="mt-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-5 text-sm leading-relaxed text-slate-700 italic">
            &ldquo;{session.notes}&rdquo;
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border border-slate-200/50 bg-white p-6 md:p-8 shadow-[0_8px_30px_rgba(47,43,34,0.02)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-700">
              Session Summary
            </p>
            <h3 className="mt-1.5 text-xl font-extrabold tracking-tight text-slate-900">
              Performance snapshot
            </h3>
          </div>
          <p className="max-w-2xl text-xs font-medium text-slate-500 leading-relaxed">
            Summary metric scores provide a quick overview of engagement, clarity, and pacing.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <MetricCard
            label="Engagement"
            value={session.summary.engagement}
            tone="sky"
          />
          <MetricCard
            label="Clarity"
            value={session.summary.clarity}
            tone="emerald"
          />
          <MetricCard
            label="Pacing"
            value={session.summary.pacing}
            tone="amber"
          />
        </div>
      </section>

      <section className="rounded-[24px] border border-slate-200/50 bg-white p-6 md:p-8 shadow-[0_8px_30px_rgba(47,43,34,0.02)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-700">
              Timeline Trends
            </p>
            <h3 className="mt-1.5 text-xl font-extrabold tracking-tight text-slate-900">
              Session progression
            </h3>
          </div>
          <p className="max-w-2xl text-xs font-medium text-slate-500 leading-relaxed">
            Analyze timeline metrics tracked across different stages of the student coaching session.
          </p>
        </div>
        <div className="mt-8 h-[360px] w-full">
          <MetricsChart metrics={session.metrics} />
        </div>
      </section>
    </div>
  );
}

interface InfoPillProps {
  label: string;
  value: string;
}

function InfoPill({ label, value }: InfoPillProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold text-slate-800 tracking-tight">{value}</p>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: number;
  tone: "sky" | "emerald" | "amber";
}

function MetricCard({ label, value, tone }: MetricCardProps) {
  const toneStyles = {
    sky: {
      card: "bg-sky-50/60 border border-sky-100/70 text-sky-950",
      bar: "bg-sky-500",
      track: "bg-sky-100",
      status: value >= 80 ? "Highly interactive" : value >= 70 ? "Active participation" : "Needs encouragement",
      icon: (
        <svg className="h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    emerald: {
      card: "bg-emerald-50/60 border border-emerald-100/70 text-emerald-950",
      bar: "bg-emerald-500",
      track: "bg-emerald-100",
      status: value >= 80 ? "Clear comprehension" : value >= 70 ? "Good understanding" : "Requires review",
      icon: (
        <svg className="h-5 w-5 text-emerald-650" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    amber: {
      card: "bg-amber-50/60 border border-amber-100/70 text-amber-950",
      bar: "bg-amber-500",
      track: "bg-amber-100",
      status: value >= 80 ? "Optimal lesson rate" : value >= 70 ? "Consistent flow" : "Needs pacing check",
      icon: (
        <svg className="h-5 w-5 text-amber-650" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  };

  const style = toneStyles[tone];

  return (
    <div className={`rounded-[20px] p-6 transition-all duration-300 hover:scale-[1.01] ${style.card}`}>
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">
          {label}
        </p>
        <div className="opacity-90">{style.icon}</div>
      </div>
      
      <p className="mt-4 text-4xl font-extrabold tracking-tight">{value}</p>
      
      <div className="mt-5 space-y-1.5">
        <div className={`h-2 w-full rounded-full ${style.track}`}>
          <div
            className={`h-full rounded-full transition-all duration-1000 ${style.bar}`}
            style={{ width: `${value}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[9px] font-bold opacity-60">
          <span>0</span>
          <span>100</span>
        </div>
      </div>

      <p className="mt-4 text-[10px] font-bold uppercase tracking-wider opacity-70">
        Status: <span className="opacity-105 font-extrabold">{style.status}</span>
      </p>
    </div>
  );
}
