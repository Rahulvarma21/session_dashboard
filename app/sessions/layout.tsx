"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function SessionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-12 bg-[#f7f5f0]">
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-5 text-sm text-slate-650 shadow-sm animate-pulse">
          Checking access...
        </div>
      </main>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const menuItems = [
    { name: "Dashboard", href: "#", icon: "dashboard", active: false, disabled: true },
    { name: "Sessions", href: "/sessions", icon: "sessions", active: true, disabled: false },
    { name: "Analytics", href: "#", icon: "analytics", active: false, disabled: true },
    { name: "Settings", href: "#", icon: "settings", active: false, disabled: true },
  ];

  const renderIcon = (type: string) => {
    switch (type) {
      case "dashboard":
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
          </svg>
        );
      case "sessions":
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case "analytics":
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
          </svg>
        );
      case "settings":
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f7f5f0] text-slate-800 antialiased font-sans">
      {/* 1. FIXED LEFT SIDEBAR (Desktop / Tablet) */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[80px] lg:w-[240px] bg-white border-r border-slate-200/60 flex-col justify-between p-4 z-30 transition-all duration-300">
        <div className="space-y-8">
          {/* Logo Section */}
          <div className="flex items-center gap-3 px-2 py-1.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white font-bold text-sm shadow-sm">
              B
            </div>
            <span className="hidden lg:inline text-base font-extrabold tracking-tight text-slate-900">
              Bodhrik Dashboard
            </span>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  if (!item.disabled) router.push(item.href);
                }}
                disabled={item.disabled}
                className={`w-full flex items-center gap-3.5 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
                  item.active
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-500"
                }`}
              >
                {renderIcon(item.icon)}
                <span className="hidden lg:inline">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 px-3 py-3 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50/50 hover:text-rose-700 transition-all duration-200 active:scale-[0.98]"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="hidden lg:inline">Logout</span>
        </button>
      </aside>

      {/* 2. MOBILE DRAWER SIDEBAR */}
      {isMobileMenuOpen ? (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Overlay backdrop */}
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />

          <aside className="relative flex w-[260px] max-w-xs flex-col bg-white p-5 shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white font-bold text-sm">
                  B
                </div>
                <span className="text-base font-extrabold tracking-tight text-slate-900">
                  Bodhrik
                </span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="rounded-lg p-1.5 hover:bg-slate-100">
                <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="mt-6 flex-1 space-y-1.5">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (!item.disabled) router.push(item.href);
                  }}
                  disabled={item.disabled}
                  className={`w-full flex items-center gap-3.5 px-3 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    item.active
                      ? "bg-slate-900 text-white shadow-md"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed"
                  }`}
                >
                  {renderIcon(item.icon)}
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>

            <button
              onClick={handleLogout}
              className="mt-auto w-full flex items-center gap-3.5 px-3 py-3.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50/50 hover:text-rose-700 transition-all duration-200"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </aside>
        </div>
      ) : null}

      {/* 3. MAIN INDEPENDENT SCROLL CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col md:pl-[80px] lg:pl-[240px] transition-all duration-300">
        {/* Dynamic Top Header */}
        <header className="sticky top-0 z-20 border-b border-slate-200/50 bg-white/70 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Hamburger button on mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden rounded-lg p-2 border border-slate-200 bg-white shadow-sm hover:bg-slate-50 active:scale-95"
            >
              <svg className="h-5 w-5 text-slate-650" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.25}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                {getGreeting()}
              </p>
              <h2 className="text-lg font-bold tracking-tight text-slate-900">
                Coaching Analytics
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">

            {/* Profile Avatar & Actions */}
            <div className="flex items-center gap-3 border-l border-slate-200/60 pl-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100 font-extrabold text-sky-800 text-xs shadow-sm">
                RE
              </div>
              <button
                onClick={handleLogout}
                className="hidden sm:inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-600 shadow-sm transition-all hover:border-slate-350 hover:bg-slate-50 hover:text-slate-900"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic children pages viewport */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
