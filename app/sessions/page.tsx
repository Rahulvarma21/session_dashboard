"use client";

import { useCallback, useEffect, useState } from "react";
import { SessionFilters } from "@/components/sessions/SessionFilters";
import { SessionList } from "@/components/sessions/SessionList";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Loading } from "@/components/ui/Loading";
import { getSessions } from "@/lib/api";
import type { Session } from "@/types/session";

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [studentFilter, setStudentFilter] = useState("");
  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadSessions = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await getSessions({
        student: studentFilter,
        from: fromFilter,
        to: toFilter,
      });
      setSessions(response.data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while loading sessions.";

      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }, [studentFilter, fromFilter, toFilter]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadSessions();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [loadSessions]);

  const handleResetFilters = () => {
    setStudentFilter("");
    setFromFilter("");
    setToFilter("");
  };

  const hasActiveFilters = Boolean(studentFilter || fromFilter || toFilter);

  const totalSessions = sessions.length;
  const avgEngagement = sessions.length
    ? Math.round(sessions.reduce((acc, s) => acc + s.summary.engagement, 0) / sessions.length)
    : 0;
  const avgClarity = sessions.length
    ? Math.round(sessions.reduce((acc, s) => acc + s.summary.clarity, 0) / sessions.length)
    : 0;
  const avgPacing = sessions.length
    ? Math.round(sessions.reduce((acc, s) => acc + s.summary.pacing, 0) / sessions.length)
    : 0;

  return (
    <main className="px-6 py-8 bg-[#f7f5f0]">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* KPI CARDS DECK */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Total Sessions */}
          <div className="group rounded-[24px] border border-slate-200/50 bg-white p-5 shadow-[0_4px_20px_rgba(47,43,34,0.01)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(47,43,34,0.03)] flex flex-col justify-between h-32">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Sessions</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-600 border border-slate-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold tracking-tight text-slate-900">{totalSessions}</span>
              <span className="text-[9px] font-bold text-emerald-650 bg-emerald-50/70 border border-emerald-100/50 px-1.5 py-0.5 rounded-lg">
                +8%
              </span>
            </div>
          </div>

          {/* Card 2: Avg Engagement */}
          <div className="group rounded-[24px] border border-slate-200/50 bg-white p-5 shadow-[0_4px_20px_rgba(47,43,34,0.01)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(47,43,34,0.03)] flex flex-col justify-between h-32">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Avg Engagement</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 text-sky-750 border border-sky-100/50">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold tracking-tight text-slate-900">{avgEngagement}%</span>
              <span className="text-[9px] font-bold text-emerald-650 bg-emerald-50/70 border border-emerald-100/50 px-1.5 py-0.5 rounded-lg">
                +2.4%
              </span>
            </div>
          </div>

          {/* Card 3: Avg Clarity */}
          <div className="group rounded-[24px] border border-slate-200/50 bg-white p-5 shadow-[0_4px_20px_rgba(47,43,34,0.01)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(47,43,34,0.03)] flex flex-col justify-between h-32">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Avg Clarity</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-705 border border-emerald-100/50">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold tracking-tight text-slate-900">{avgClarity}%</span>
              <span className="text-[9px] font-bold text-rose-600 bg-rose-50 border border-rose-100/50 px-1.5 py-0.5 rounded-lg">
                -0.8%
              </span>
            </div>
          </div>

          {/* Card 4: Avg Pacing */}
          <div className="group rounded-[24px] border border-slate-200/50 bg-white p-5 shadow-[0_4px_20px_rgba(47,43,34,0.01)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(47,43,34,0.03)] flex flex-col justify-between h-32">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Avg Pacing</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-705 border border-amber-100/50">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold tracking-tight text-slate-900">{avgPacing}%</span>
              <span className="text-[9px] font-bold text-emerald-650 bg-emerald-50/70 border border-emerald-100/50 px-1.5 py-0.5 rounded-lg">
                +1.2%
              </span>
            </div>
          </div>
        </div>

        {/* FILTERS WRAPPER */}
        <SessionFilters
          student={studentFilter}
          from={fromFilter}
          to={toFilter}
          onStudentChange={setStudentFilter}
          onFromChange={setFromFilter}
          onToChange={setToFilter}
          onReset={handleResetFilters}
        />

        {isLoading ? <Loading /> : null}

        {!isLoading && errorMessage ? (
          <ErrorState description={errorMessage} onRetry={loadSessions} />
        ) : null}

        {!isLoading && !errorMessage && sessions.length === 0 ? (
          <EmptyState
            title={hasActiveFilters ? "No matching sessions" : "No sessions found"}
            description={
              hasActiveFilters
                ? "Try adjusting the student or date filters to broaden the results."
                : "There are no mock sessions available right now."
            }
          />
        ) : null}

        {!isLoading && !errorMessage && sessions.length > 0 ? (
          <div className="space-y-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between pb-1 pt-2">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-slate-900">
                  Recent Sessions ({sessions.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Select any coaching entry below to drill down into timeline metrics.
                </p>
              </div>
            </div>

            <SessionList sessions={sessions} />
          </div>
        ) : null}
      </div>
    </main>
  );
}
