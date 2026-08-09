"use client";

import { useState } from "react";

const regions = [
  {
    name: "Global League",
    flag: "🌎",
    description: "The global stage for creators from everywhere.",
    creators: "10,000+",
  },
  {
    name: "Caribbean League",
    flag: "🌴",
    description: "Creators representing the Caribbean.",
    creators: "1,200+",
  },
  {
    name: "North America",
    flag: "🇨🇦",
    description: "Canada, USA, Mexico and surrounding regions.",
    creators: "2,500+",
  },
  {
    name: "Europe League",
    flag: "🇪🇺",
    description: "Creators competing throughout Europe.",
    creators: "2,100+",
  },
  {
    name: "Africa League",
    flag: "🌍",
    description: "Africa's creator competition.",
    creators: "1,800+",
  },
  {
    name: "Asia League",
    flag: "🌏",
    description: "Creators competing across Asia.",
    creators: "2,400+",
  },
];

const groups = [
  ["Group A", "32 creators", "Top 8 qualify"],
  ["Group B", "32 creators", "Top 8 qualify"],
  ["Group C", "32 creators", "Top 8 qualify"],
  ["Group D", "32 creators", "Top 8 qualify"],
];

const clubLeague = [
  ["Third Eye FC", "🇨🇦", 1, "18"],
  ["25/8 United", "🌎", 2, "21"],
  ["Slickas Momentum", "🇨🇦", 3, "16"],
  ["AIMGOD Elite", "🇬🇧", 4, "24"],
];

export default function LeaguesPage() {
  const [selected, setSelected] = useState("Regional");

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* NAV */}
      <nav className="border-b border-white/10 bg-black/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="text-xl font-black">
            AIMGOD<span className="text-red-500">.</span>
          </a>

          <div className="flex gap-5 text-xs font-bold uppercase tracking-widest">
            <a href="/" className="text-white/50 hover:text-white">
              Home
            </a>
            <a href="/leagues" className="text-red-500">
              Leagues
            </a>
            <a href="/#clubs" className="text-white/50 hover:text-white">
              Clubs
            </a>
            <a href="/#ars" className="text-white/50 hover:text-white">
              ARS
            </a>
            <a href="/#worldcup" className="text-white/50 hover:text-white">
              World Cup
            </a>
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.2),transparent_45%)]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-xs font-black uppercase tracking-[0.35em] text-red-500">
            AIMGOD Competition System
          </div>

          <h1 className="mt-4 text-6xl font-black uppercase tracking-tighter md:text-8xl">
            LEAGUES
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/50">
            Multiple paths. One destination. Creators compete through regional
            leagues, group stages and the 25/8 Club League on the road to the
            AIMGOD World Cup.
          </p>
        </div>
      </section>

      {/* TABS */}
      <section className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-4">
          {["Regional", "Groups", "Club League"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelected(tab)}
              className={`whitespace-nowrap rounded-full px-6 py-3 text-xs font-black uppercase tracking-widest transition ${
                selected === tab
                  ? "bg-red-600 text-white"
                  : "border border-white/10 bg-white/5 text-white/50 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* REGIONAL */}
      {selected === "Regional" && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8">
            <h2 className="text-3xl font-black uppercase">
              Regional Leagues
            </h2>
            <p className="mt-2 text-white/40">
              Your regional path toward global competition.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {regions.map((region) => (
              <div
                key={region.name}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-red-500/40"
              >
                <div className="text-5xl">{region.flag}</div>

                <h3 className="mt-6 text-xl font-black">
                  {region.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/40">
                  {region.description}
                </p>

                <div className="mt-7 flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-black">
                      {region.creators}
                    </div>
                    <div className="text-[9px] uppercase tracking-widest text-white/30">
                      Creators
                    </div>
                  </div>

                  <a
  href={`/leagues/${encodeURIComponent(region.name.toLowerCase().replace(/\s+/g, "-"))}`}
  className="text-xs font-black uppercase tracking-widest text-red-500 hover:text-red-400"
>
  Enter →
</a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* GROUPS */}
      {selected === "Groups" && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8">
            <h2 className="text-3xl font-black uppercase">
              Group Competition
            </h2>

            <p className="mt-2 max-w-2xl text-white/40">
              Creators are placed into competitive groups. Perform well,
              climb the table and qualify for the knockout stage.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {groups.map(([group, creators, qualification]) => (
              <div
                key={group}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black">{group}</h3>

                  <span className="rounded-full bg-red-500/10 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-red-400">
                    Active
                  </span>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-black p-4">
                    <div className="font-black">{creators}</div>
                    <div className="mt-1 text-[9px] uppercase tracking-widest text-white/30">
                      Participants
                    </div>
                  </div>

                  <div className="rounded-2xl bg-black p-4">
                    <div className="font-black">{qualification}</div>
                    <div className="mt-1 text-[9px] uppercase tracking-widest text-white/30">
                      Qualification
                    </div>
                  </div>
                </div>

                <button className="mt-6 w-full rounded-xl border border-white/10 py-3 text-xs font-black uppercase tracking-widest hover:bg-white/5">
                  View Standings
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CLUB LEAGUE */}
      {selected === "Club League" && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8">
            <div className="text-xs font-black uppercase tracking-[0.3em] text-red-500">
              Global Club Competition
            </div>

            <h2 className="mt-2 text-3xl font-black uppercase">
              25/8 Club League
            </h2>

            <p className="mt-3 max-w-2xl text-white/40">
              Create a club, recruit creators from anywhere and compete for
              the Club Championship.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10">
            <div className="grid grid-cols-[60px_1fr_100px_100px] bg-white/5 px-6 py-4 text-[9px] font-black uppercase tracking-widest text-white/30">
              <div>Rank</div>
              <div>Club</div>
              <div>Players</div>
              <div>Form</div>
            </div>

            {clubLeague.map(([club, flag, rank, players]) => (
              <div
                key={club}
                className="grid grid-cols-[60px_1fr_100px_100px] items-center border-t border-white/10 px-6 py-5"
              >
                <div className="font-black text-white/30">
                  #{rank}
                </div>

                <div className="font-black">
                  {flag} {club}
                </div>

                <div className="text-sm text-white/50">
                  {players}
                </div>

                <div className="text-xs font-black text-green-400">
                  ACTIVE
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-red-500/20 bg-red-500/5 p-8">
            <h3 className="text-2xl font-black uppercase">
              Create Your Own Club
            </h3>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
              Any eligible creator can eventually build a club, recruit
              players, establish a brand and compete globally.
            </p>

            <button className="mt-6 rounded-full bg-red-600 px-7 py-3 text-xs font-black uppercase tracking-widest">
              Create Club
            </button>
          </div>
        </section>
      )}

      {/* WORLD CUP PIPELINE */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <div className="text-6xl">🏆</div>

          <h2 className="mt-6 text-4xl font-black uppercase">
            Every League Leads Here
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-white/40">
            Regional competition, group performance, club success and ARS
            rankings all contribute toward the road to the AIMGOD World Cup.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3 text-xs font-black uppercase tracking-widest">
            <span className="rounded-full border border-white/10 px-5 py-3">
              League
            </span>
            <span>→</span>
            <span className="rounded-full border border-white/10 px-5 py-3">
              Groups
            </span>
            <span>→</span>
            <span className="rounded-full border border-white/10 px-5 py-3">
              ARS
            </span>
            <span>→</span>
            <span className="rounded-full border border-white/10 px-5 py-3">
              Qualification
            </span>
            <span>→</span>
            <span className="rounded-full border border-red-500 bg-red-600 px-5 py-3">
              World Cup
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-6 py-10 text-xs text-white/30">
          <div className="font-black text-white">AIMGOD WORLD CUP</div>
          <div className="mt-1">
            The Creator's World Cup • 25/8 Competition System
          </div>
        </div>
      </footer>
    </main>
  );
}