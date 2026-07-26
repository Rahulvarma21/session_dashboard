interface SessionFiltersProps {
  student: string;
  from: string;
  to: string;
  onStudentChange: (value: string) => void;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  onReset: () => void;
}

export function SessionFilters({
  student,
  from,
  to,
  onStudentChange,
  onFromChange,
  onToChange,
  onReset,
}: SessionFiltersProps) {
  const hasActiveFilters = student || from || to;

  return (
    <section className="rounded-[24px] border border-slate-200/50 bg-white p-6 md:p-8 shadow-[0_8px_30px_rgba(47,43,34,0.02)]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid gap-4 sm:grid-cols-2 lg:flex-1 lg:grid-cols-3">
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Student Name
            </span>
            <div className="relative">
              <span className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/30 pl-11 pr-4 py-3.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
                type="text"
                value={student}
                onChange={(event) => onStudentChange(event.target.value)}
                placeholder="Search by student name..."
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              From Date
            </span>
            <div className="relative">
              <span className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              <input
                className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/30 pl-11 pr-4 py-3.5 text-sm text-slate-900 outline-none transition-all focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
                type="date"
                value={from}
                onChange={(event) => onFromChange(event.target.value)}
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              To Date
            </span>
            <div className="relative">
              <span className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              <input
                className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/30 pl-11 pr-4 py-3.5 text-sm text-slate-900 outline-none transition-all focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
                type="date"
                value={to}
                onChange={(event) => onToChange(event.target.value)}
              />
            </div>
          </label>
        </div>

        <button
          className="rounded-2xl border border-slate-200/80 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30"
          type="button"
          onClick={onReset}
          disabled={!hasActiveFilters}
        >
          Reset filters
        </button>
      </div>
    </section>
  );
}
