"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: "📊" },
  { href: "/dashboard/create", label: "Create Video", icon: "🎬" },
  { href: "/dashboard/videos", label: "My Videos", icon: "🎥" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-stone-50">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-full border-r border-stone-200 bg-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-stone-100 px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            {sidebarOpen && (
              <span className="font-display text-lg font-bold tracking-tight text-stone-900">
                Viral Video AI
              </span>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-600"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <nav className="mt-6 space-y-1 px-3">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-stone-900 text-white"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-stone-100 p-4">
          <div className="flex items-center gap-3 rounded-2xl px-3 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-200 text-sm font-bold text-stone-600">
              T
            </div>
            {sidebarOpen && (
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-stone-900">tarat</p>
                <p className="truncate text-xs text-stone-500">Pro Plan</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Top header */}
        <header className="glass sticky top-0 right-0 z-30 flex h-20 items-center justify-between border-b border-stone-200/50 px-8">
          <div>
            <h2 className="font-display text-lg font-bold text-stone-900">
              {NAV_ITEMS.find((i) => i.href === pathname)?.label || "Dashboard"}
            </h2>
            <p className="text-xs text-stone-500">
              {pathname === "/viral-video-ai/dashboard" && "Your content at a glance"}
              {pathname === "/dashboard/create" && "Generate a new UGC video from your SaaS URL"}
              {pathname?.includes("videos") && "Manage your generated videos"}
              {pathname?.includes("settings") && "Manage your account"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs font-medium text-stone-600">120 credits</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-sm font-bold text-white">
              T
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
