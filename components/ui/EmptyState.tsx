interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-[24px] border border-dashed border-slate-200 bg-white p-8 md:p-12 text-center shadow-[0_8px_30px_rgba(47,43,34,0.01)] flex flex-col items-center justify-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 border border-slate-100 shadow-sm mb-4">
        🔎
      </div>
      <p className="text-lg font-bold tracking-tight text-slate-900">{title}</p>
      <p className="mt-2 text-sm text-slate-500 max-w-sm leading-relaxed">{description}</p>
    </div>
  );
}
