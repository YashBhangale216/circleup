"use client";
import { useTheme } from "@/components/ThemeProvider";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const unreadCount = 3; // later this will come from Supabase

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const pathname = usePathname();

  // Don't show navbar on login page
  if (pathname === "/") return null;

  const navLinks = [
    { label: "🏠 Feed", href: "/feed" },
    { label: "💬 Messages", href: "/messages" },
    { label: "🔔 Notifications", href: "/notifications" },
    { label: "📅 Events", href: "/events" },
  ];

  const exploreLinks = [
    { icon: "👥", label: "Communities", href: "/communities" },
    { icon: "🌐", label: "Explore", href: "/explore" },
    { icon: "➕", label: "Create Circle", href: "/create-circle" },
    { icon: "📅", label: "Events", href: "/events" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-xl border-b border-orange-500/15">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo - clicks go back to feed */}
          <Link
            href="/feed"
            className="flex items-center gap-2.5 flex-shrink-0"
          >
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle
                  cx="8"
                  cy="8"
                  r="5"
                  stroke="white"
                  strokeWidth="1.8"
                  fill="none"
                />
                <circle cx="8" cy="8" r="2" fill="white" />
              </svg>
            </div>
            <span className="text-white text-lg font-bold">
              Circle<span className="text-orange-500">Up</span>
            </span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex relative flex-1 max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search communities, people..."
              className="w-full bg-[#1e1e1e] border border-[#2c2c2c] rounded-full py-2 pl-9 pr-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm px-3 py-2 rounded-lg transition-all ${pathname === link.href ? "text-orange-400 bg-orange-500/10" : "text-white/55 hover:bg-white/5 hover:text-white"}`}
              >
                {link.label}
              </Link>
            ))}

            {/* Explore dropdown */}
            <div className="relative">
              <button
                onClick={() => setExploreOpen(!exploreOpen)}
                className={`text-sm px-3 py-2 rounded-lg transition-all flex items-center gap-1 ${exploreOpen ? "text-orange-400 bg-orange-500/10" : "text-white/55 hover:bg-white/5 hover:text-white"}`}
              >
                🌐 Explore{" "}
                <span className="text-xs">{exploreOpen ? "▴" : "▾"}</span>
              </button>
              {exploreOpen && (
                <div className="absolute top-full mt-2 left-0 bg-[#1a1a1a] border border-[#2c2c2c] rounded-xl p-1.5 min-w-[180px] shadow-xl z-50">
                  {exploreLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setExploreOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-orange-500/10 transition-all"
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full bg-[#1e1e1e] border border-[#2c2c2c] hover:border-orange-500 flex items-center justify-center cursor-pointer transition-colors text-sm"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <Link
              href="/notifications"
              className="relative w-9 h-9 rounded-full bg-[#1e1e1e] border border-[#2c2c2c] hover:border-orange-500 flex items-center justify-center cursor-pointer transition-colors text-sm"
            >
              🔔
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500 border-2 border-[#0d0d0d]" />
              )}
            </Link>
            <Link
              href="/profile"
              className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold hover:brightness-110 transition-all"
            >
              YO
            </Link>
            <Link
              href="/settings"
              className="w-9 h-9 rounded-full bg-[#1e1e1e] border border-[#2c2c2c] hover:border-orange-500 flex items-center justify-center cursor-pointer transition-colors text-sm"
            >
              ⚙️
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white text-xl p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#141414] border-t border-[#2c2c2c] px-6 py-4">
            <div className="relative mb-4">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-[#1e1e1e] border border-[#2c2c2c] rounded-full py-2 pl-9 pr-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-orange-500"
              />
            </div>
            <div className="flex flex-col gap-1 mb-4">
              {[...navLinks, ...exploreLinks].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 py-2.5 px-3 rounded-xl text-sm border-b border-[#1e1e1e] transition-all ${pathname === link.href ? "text-orange-400" : "text-white/60 hover:text-white"}`}
                >
                  {link.icon && <span>{link.icon}</span>}
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex gap-3">
              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="flex-1 py-2.5 border border-[#2c2c2c] rounded-xl text-sm text-white text-center hover:border-orange-500 transition-colors"
              >
                👤 Profile
              </Link>
              <Link
                href="/settings"
                onClick={() => setMobileOpen(false)}
                className="flex-1 py-2.5 border border-[#2c2c2c] rounded-xl text-sm text-white text-center hover:border-orange-500 transition-colors"
              >
                ⚙️ Settings
              </Link>
            </div>
          </div>
        )}
      </nav>
      <div className="h-16" />
    </>
  );
}
