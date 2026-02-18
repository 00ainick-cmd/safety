import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* ── Sidebar ──────────────────────── */}
      <aside className="hidden md:flex flex-col w-60 bg-panel border-r border-panel-light">
        <div className="p-4 border-b border-panel-light">
          <Link href="/dashboard" className="font-heading text-neon-cyan text-[10px] tracking-wider animate-[title-glow_2s_ease-in-out_infinite]">
            ACE AI TUTOR
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <NavLink href="/dashboard" label="Dashboard" />
          <NavLink href="/tutor" label="AI Tutor" />
          <NavLink href="/practice" label="Practice" />
          <NavLink href="/modules" label="Modules" />
        </nav>
        <div className="p-4 border-t border-panel-light text-xs text-text-muted">
          <div>Free Tier</div>
          <Link href="/billing" className="text-neon-cyan hover:underline mt-1 inline-block">
            Upgrade to Pro
          </Link>
        </div>
      </aside>

      {/* ── Mobile header ─────────────────── */}
      <div className="flex flex-col flex-1">
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-panel-light bg-panel">
          <Link href="/dashboard" className="font-heading text-neon-cyan text-[10px]">
            ACE AI TUTOR
          </Link>
          <div className="flex gap-3 text-sm text-text-muted">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/tutor">Tutor</Link>
            <Link href="/practice">Practice</Link>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-md text-sm text-text-muted hover:text-text-light hover:bg-panel-light transition"
    >
      {label}
    </Link>
  );
}
