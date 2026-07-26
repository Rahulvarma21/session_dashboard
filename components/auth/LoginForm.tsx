"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function LoginForm() {
  const router = useRouter();
  const { isLoggedIn, login } = useAuth();
  const [email, setEmail] = useState("reviewer@demo.com");
  const [password, setPassword] = useState("password123");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/sessions");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => {
      window.setTimeout(resolve, 300);
    });

    login();
    router.push("/sessions");
  };

  return (
    <div className="w-full max-w-md rounded-[28px] border border-slate-200/60 bg-white p-8 md:p-10 shadow-[0_20px_50px_rgba(47,43,34,0.06)] transition-all">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md shadow-slate-950/10">
          <span className="text-xl font-bold tracking-wider">B</span>
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
          Session Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Use the prefilled mock credentials to access your dashboard.
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600">
              Email Address
            </span>
            <input
              className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/30 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="reviewer@demo.com"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600">
              Password
            </span>
            <input
              className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/30 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="password123"
              required
            />
          </label>
        </div>

        <button
          className="relative w-full overflow-hidden rounded-2xl bg-slate-900 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/15 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-400"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Sign in to Dashboard"}
        </button>
      </form>

      <div className="mt-8 rounded-2xl border border-sky-100/80 bg-sky-50/40 p-4 text-sm text-sky-900">
        <div className="flex gap-3">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold">
            i
          </div>
          <div>
            <p className="font-semibold text-sky-950">Reviewer Mode Enabled</p>
            <p className="mt-1 text-xs text-sky-800 leading-relaxed">
              Any email address and password format will bypass this verification gate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
