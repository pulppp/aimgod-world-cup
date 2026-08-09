"use client";

import { useParams } from "next/navigation";

export default function LeaguePage() {
  const params = useParams();
  const slug = params.slug as string;

  const leagueName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <nav className="border-b border-white/10 bg-black/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="text-xl font-black">
            AIMGOD<span className="text-red-500">.</span>
          </a>

          <a
            href="/leagues"
            className="text-xs font-black uppercase tracking-widest text-white/50 hover:text-white"
          >
            ← All Leagues
          </a>
        </div>
      </nav>

      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.2),transparent_45%)]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-xs font-black uppercase tracking-[0.35em] text-red-500">
            AIMGOD League
          </div>

          <h1 className="mt-4 text-6xl font-black uppercase tracking-tighter md:text-8xl">
            {leagueName}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/50">
            Welcome to the {leagueName}. Creators compete through matches,
            rankings and group competition on the road to the AIMGOD World Cup.
          </p>

          <div className="mt-10 flex gap-4">
            <button className="rounded-full bg-red-600 px-7 py-3 text-xs font-black uppercase tracking-widest">
              Join League
            </button>

            <button className="rounded-full border border-white/10 px-7 py-3 text-xs font-black uppercase tracking-widest">
              View Standings
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
            <div className="text-3xl">👥</div>
            <div className="mt-5 text-3xl font-black">1,000+</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-white/30">
              Creators
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
            <div className="text-3xl">⚔️</div>
            <div className="mt-5 text-3xl font-black">256</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-white/30">
              Active Matches
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
            <div className="text-3xl">🏆</div>
            <div className="mt-5 text-3xl font-black">World Cup</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-white/30">
              Qualification Path
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-3xl font-black uppercase">
            League Standings
          </h2>

          <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
            {[
              ["Third Eye", "🇨🇦", "9,980"],
              ["Creator X", "🇺🇸", "9,740"],
              ["Kingdom", "🇯🇲", "9,510"],
              ["Slickas", "🇨🇦", "9,280"],
            ].map(([name, country, ars], index) => (
              <div
                key={name}
                className="grid grid-cols-[60px_1fr_auto] items-center border-b border-white/10 bg-black/50 px-6 py-5 last:border-0"
              >
                <div className="font-black text-white/30">
                  #{index + 1}
                </div>

                <div className="font-black">
                  {country} {name}
                </div>

                <div className="text-right">
                  <div className="font-black text-red-500">
                    {ars}
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-white/30">
                    ARS
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}