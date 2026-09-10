import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  Library,
  Menu,
  Package,
  Shield,
  X,
} from "lucide-react";
import { Mark } from "@/components/mark";
import { CLUB } from "@/data/club";
import { useProgress } from "@/store/progress";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Plan", icon: BookOpen, exact: true },
  { to: "/takvim", label: "Takvim", icon: CalendarDays },
  { to: "/malzeme", label: "Malzeme", icon: Package },
  { to: "/guvenlik", label: "Güvenlik", icon: Shield },
  { to: "/olcme", label: "Ölçme", icon: ClipboardCheck },
  { to: "/kaynaklar", label: "Kaynaklar", icon: Library },
];

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const done = useProgress((s) => s.done);
  const doneCount = Object.values(done).filter(Boolean).length;

  return (
    <div className="min-h-dvh bg-bg text-ink">
      <a
        href="#icerik"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        İçeriğe geç
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-md no-print">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:h-16 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5 min-w-0">
            <span className="flex size-9 items-center justify-center rounded-md bg-accent text-accent-fg">
              <Mark className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold tracking-tight">{CLUB.name}</span>
              <span className="hidden text-xs text-muted sm:block">{CLUB.year} · 36 hafta</span>
            </span>
          </Link>
          <nav className="ml-4 hidden items-center gap-0.5 lg:flex" aria-label="Ana">
            {NAV.map((item) => {
              const active = item.exact ? pathname === "/" : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex h-10 items-center gap-2 rounded-sm px-3 text-sm transition-colors",
                    active ? "bg-accent-soft text-accent" : "text-muted hover:bg-sunken hover:text-ink",
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <p className="hidden text-xs tabular-nums text-muted sm:block">
              {doneCount}/72 saat
            </p>
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-md lg:hidden"
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open ? (
          <nav className="border-t border-line bg-paper px-4 py-3 lg:hidden" aria-label="Mobil">
            <ul className="grid gap-1">
              {NAV.map((item) => {
                const Icon = item.icon;
                const active = item.exact ? pathname === "/" : pathname.startsWith(item.to);
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex h-12 items-center gap-3 rounded-md px-3 text-sm",
                        active ? "bg-accent-soft text-accent" : "text-ink",
                      )}
                    >
                      <Icon className="size-4" strokeWidth={1.75} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}
      </header>
      <div id="icerik">{children}</div>
    </div>
  );
}
