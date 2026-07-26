interface ErrorStateProps {
  title?: string;
  description: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Unable to load data",
  description,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="rounded-[24px] border border-rose-200/80 bg-rose-50/40 p-6 md:p-8 shadow-[0_8px_30px_rgba(244,63,94,0.02)]">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-850 font-bold text-base shadow-sm">
          !
        </div>
        <div className="space-y-2">
          <p className="text-lg font-extrabold tracking-tight text-rose-950">{title}</p>
          <p className="text-sm leading-relaxed text-rose-800">{description}</p>
          
          {onRetry ? (
            <div className="pt-2">
              <button
                className="rounded-xl bg-rose-900 px-4.5 py-2 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-rose-850 hover:shadow-md active:scale-[0.98]"
                type="button"
                onClick={onRetry}
              >
                Try again
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
