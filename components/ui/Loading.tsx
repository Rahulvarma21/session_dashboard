interface LoadingProps {
  title?: string;
  description?: string;
}

export function Loading({
  title = "Loading sessions",
  description = "Fetching the latest session data.",
}: LoadingProps) {
  return (
    <div className="rounded-[24px] border border-slate-200/50 bg-white p-8 shadow-[0_8px_30px_rgba(47,43,34,0.01)]">
      <div className="flex items-center gap-3">
        <div className="relative flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-sky-500"></span>
        </div>
        <p className="text-base font-semibold text-slate-900">{title}</p>
      </div>
      <p className="mt-2 text-sm text-slate-500">{description}</p>

      <div className="mt-8 space-y-5 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-slate-100" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-100 rounded-lg w-1/4" />
            <div className="h-3 bg-slate-100 rounded-lg w-1/3" />
          </div>
        </div>
        <div className="space-y-2.5">
          <div className="h-3 bg-slate-100 rounded-lg w-full" />
          <div className="h-3 bg-slate-100 rounded-lg w-5/6" />
        </div>
      </div>
    </div>
  );
}
