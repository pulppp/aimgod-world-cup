"use client";

import { useState } from "react";

const leagues = [
  {
    name: "Global League",
    icon: "🌎",
    desc: "The world's creators competing on one global stage.",
  },
  {
    name: "Caribbean League",
    icon: "🌴",
    desc: "Creators representing the Caribbean.",
  },
  {
    name: "North America",
    icon: "🇨🇦",
    desc: "Canada, USA, Mexico and beyond.",
  },
  {
    name: "Europe League",
    icon: "🏰",
    desc: "Creators from across Europe.",
  },
  {
    name: "Africa League",
    icon: "🌍",
    desc: "The next generation of African creators.",
  },
  {
    name: "Asia League",
    icon: "🌏",
    desc: "Creators competing across Asia.",
  },
];

const clubs = [
  { name: "Third Eye FC", icon: "👁️", rank: 1, players: 18 },
  { name: "25/8 United", icon: "⏰", rank: 2, players: 21 },
  { name: "Slickas Momentum", icon: "🚛", rank: 3, players: 16 },
  { name: "AIMGOD Elite", icon: "👑", rank: 4, players: 24 },
];

const matches = [
  {
    left: "Third Eye",
    right: "25/8 United",
    leftScore: 18450,
    rightScore: 16820,
    status: "LIVE",
  },
  {
    left: "Slickas",
    right: "AIMGOD Elite",
    leftScore: 12480,
    rightScore: 13720,
    status: "UP NEXT",
  },
];

const gifts = [
  { name: "Rose", icon: "🌹", tier: "Community" },
  { name: "Spark", icon: "🔥", tier: "Community" },
  { name: "Power Surge", icon: "⚡", tier: "Elite" },
  { name: "Champion", icon: "👑", tier: "Elite" },
  { name: "Third Eye Globe", icon: "👁️", tier: "Signature" },
  { name: "25/8 Clock", icon: "⏰", tier: "Signature" },
  { name: "Slickas Momentum", icon: "🚛", tier: "Signature" },
  { name: "AIMGOD World Cup", icon: "🏆", tier: "Ultimate" },
];

const rankings = [
  { rank: 1, name: "Third Eye", country: "🇨🇦", ars: 9980 },
  { rank: 2, name: "Creator X", country: "🇺🇸", ars: 9740 },
  { rank: 3, name: "Kingdom", country: "🇯🇲", ars: 9510 },
  { rank: 4, name: "Slickas", country: "🇨🇦", ars: 9280 },
  { rank: 5, name: "AIMGOD Elite", country: "🇬🇧", ars: 9040 },
];

export default function Home() {
  const [activeGift, setActiveGift] = useState("AIMGOD World Cup");

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-xl font-black tracking-tight">
              AIMGOD<span className="text-red-500">.</span>
            </div>
            <div className="text-[9px] uppercase tracking-[0.35em] text-white/40">
              Creator World Cup
            </div>
          </div>

          <div className="hidden gap-7 text-xs font-bold uppercase tracking-wider md:flex">
            <a href="#leagues" className="text-white/70 hover:text-white">
              Leagues
            </a>
            <a href="#clubs" className="text-white/70 hover:text-white">
              Clubs
            </a>
            <a href="#matches" className="text-white/70 hover:text-white">
              Matches
            </a>
            <a href="#ars" className="text-white/70 hover:text-white">
              ARS
            </a>
            <a href="#gifts" className="text-white/70 hover:text-white">
              Gifts
            </a>
            <a href="#worldcup" className="text-white/70 hover:text-white">
              World Cup
            </a>
          </div>

          <button className="rounded-full bg-white px-5 py-2 text-xs font-black text-black transition hover:bg-red-500 hover:text-white">
            ENTER AIMGOD
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(220,38,38,0.22),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-24 text-center md:pt-32">
          <div className="mb-6 inline-flex rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-red-400">
            The Creator's World Cup
          </div>

          <h1 className="mx-auto max-w-5xl text-6xl font-black uppercase leading-[0.9] tracking-tighter md:text-8xl">
            COMPETE.
            <br />
            <span className="text-red-500">EARN.</span>
            <br />
            BECOME AIMGOD.
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/60">
            A global competitive ecosystem for creators. Build your ranking,
            join a club, compete in leagues, earn through matches and qualify
            for the AIMGOD World Cup.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-full bg-red-600 px-8 py-4 text-sm font-black uppercase tracking-wider transition hover:bg-red-500">
              Join the Competition
            </button>

            <button className="rounded-full border border-white/20 px-8 py-4 text-sm font-black uppercase tracking-wider transition hover:border-white/50">
              Explore the World Cup
            </button>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {[
              ["10,000+", "Creators"],
              ["100", "Gift Tiers"],
              ["∞", "Clubs"],
              ["1", "World Champion"],
            ].map(([number, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="text-3xl font-black">{number}</div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/40">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE MATCH */}
      <section id="matches" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.3em] text-red-500">
              Live Competition
            </div>
            <h2 className="mt-2 text-4xl font-black uppercase tracking-tight">
              Matches
            </h2>
          </div>

          <div className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-400">
            ● LIVE
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {matches.map((match) => (
            <div
              key={match.left}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="mb-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/40">
                <span>{match.status}</span>
                <span>AIMGOD MATCH</span>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-center">
                <div>
                  <div className="text-2xl font-black">{match.left}</div>
                  <div className="mt-2 text-4xl font-black text-red-500">
                    {match.leftScore.toLocaleString()}
                  </div>
                </div>

                <div className="text-xs font-black text-white/30">VS</div>

                <div>
                  <div className="text-2xl font-black">{match.right}</div>
                  <div className="mt-2 text-4xl font-black">
                    {match.rightScore.toLocaleString()}
                  </div>
                </div>
              </div>

              <button className="mt-7 w-full rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-black uppercase tracking-widest transition hover:bg-white/10">
                View Match
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* LEAGUES */}
      <section id="leagues" className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10">
            <div className="text-xs font-black uppercase tracking-[0.3em] text-red-500">
              Competition System
            </div>
            <h2 className="mt-2 text-4xl font-black uppercase">
              The Leagues
            </h2>
            <p className="mt-4 max-w-2xl text-white/50">
              Regional leagues, group competitions and global competition feed
              creators toward the biggest stage.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {leagues.map((league) => (
              <div
                key={league.name}
                className="group rounded-3xl border border-white/10 bg-black p-6 transition hover:-translate-y-1 hover:border-red-500/40"
              >
                <div className="text-4xl">{league.icon}</div>
                <h3 className="mt-5 text-xl font-black">{league.name}</h3>
                <p className="mt-2 text-sm leading-6 text-white/40">
                  {league.desc}
                </p>
                <button className="mt-6 text-xs font-black uppercase tracking-widest text-red-500">
                  Explore →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLUBS */}
      <section id="clubs" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.3em] text-red-500">
              Build Your Team
            </div>
            <h2 className="mt-2 text-4xl font-black uppercase">
              25/8 Club League
            </h2>
            <p className="mt-4 max-w-2xl text-white/50">
              Create a club. Recruit creators from anywhere. Build a roster.
              Compete for the Club Championship.
            </p>
          </div>

          <button className="rounded-full bg-white px-6 py-3 text-xs font-black uppercase text-black">
            Create a Club
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {clubs.map((club) => (
            <div
              key={club.name}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="flex items-center justify-between">
                <div className="text-4xl">{club.icon}</div>
                <div className="text-xs font-black text-white/30">
                  #{club.rank}
                </div>
              </div>

              <h3 className="mt-6 font-black">{club.name}</h3>
              <div className="mt-2 text-xs text-white/40">
                {club.players} creators
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ARS */}
      <section id="ars" className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10">
            <div className="text-xs font-black uppercase tracking-[0.3em] text-red-500">
              AIMGOD Ranking System
            </div>
            <h2 className="mt-2 text-4xl font-black uppercase">
              Global Rankings
            </h2>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10">
            {rankings.map((player) => (
              <div
                key={player.name}
                className="grid grid-cols-[50px_1fr_auto] items-center border-b border-white/10 bg-black/50 px-6 py-5 last:border-0"
              >
                <div className="font-black text-white/30">
                  #{player.rank}
                </div>

                <div>
                  <div className="font-black">
                    {player.country} {player.name}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-white/30">
                    Global Creator
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-black text-red-500">
                    {player.ars.toLocaleString()}
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

      {/* GIFTS */}
      <section id="gifts" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10">
          <div className="text-xs font-black uppercase tracking-[0.3em] text-red-500">
            AIMGOD Gift System
          </div>
          <h2 className="mt-2 text-4xl font-black uppercase">
            The Gift Arena
          </h2>
          <p className="mt-4 max-w-2xl text-white/50">
            100 tiers. Community gifts. Signature sponsor gifts. One ultimate
            championship gift.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {gifts.map((gift) => (
            <button
              key={gift.name}
              onClick={() => setActiveGift(gift.name)}
              className={`rounded-2xl border p-5 text-left transition ${
                activeGift === gift.name
                  ? "border-red-500 bg-red-500/10"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20"
              }`}
            >
              <div className="text-3xl">{gift.icon}</div>
              <div className="mt-4 font-black">{gift.name}</div>
              <div className="mt-1 text-[9px] font-bold uppercase tracking-widest text-white/30">
                {gift.tier}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-red-500/20 bg-red-500/5 p-8">
          <div className="text-xs font-black uppercase tracking-widest text-red-400">
            Selected Gift
          </div>
          <div className="mt-2 text-3xl font-black">{activeGift}</div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
            AIMGOD gifts are designed to create interaction, match activity,
            supporter recognition and championship moments.
          </p>
          <button className="mt-6 rounded-full bg-red-600 px-7 py-3 text-xs font-black uppercase tracking-widest">
            Send Gift
          </button>
        </div>
      </section>

      {/* WORLD CUP */}
      <section id="worldcup" className="relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.18),transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-28 text-center">
          <div className="text-7xl">🏆</div>

          <div className="mt-6 text-xs font-black uppercase tracking-[0.4em] text-red-500">
            The Ultimate Stage
          </div>

          <h2 className="mt-4 text-5xl font-black uppercase tracking-tighter md:text-7xl">
            AIMGOD
            <br />
            WORLD CUP
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/50">
            Every match. Every league. Every ranking. Every creator.
            Everything leads here.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-3 text-xs font-black uppercase tracking-widest">
            {["64", "32", "16", "8", "4", "2", "1"].map((stage, index) => (
              <div
                key={stage}
                className="flex items-center gap-3"
              >
                <div
                  className={`rounded-full border px-5 py-3 ${
                    index === 6
                      ? "border-red-500 bg-red-600"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  {stage}
                </div>
                {index < 6 && <span className="text-white/20">→</span>}
              </div>
            ))}
          </div>

          <div className="mt-14 text-2xl font-black uppercase">
            One Creator.
            <span className="text-red-500"> One World Champion.</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-6 py-10 text-xs text-white/30 md:flex-row">
          <div>
            <div className="font-black text-white">AIMGOD WORLD CUP</div>
            <div className="mt-1">The Creator's World Cup.</div>
          </div>

          <div className="flex gap-5 uppercase tracking-widest">
            <span>25/8</span>
            <span>AIMGOD</span>
            <span>Creator Sport</span>
          </div>
        </div>
      </footer>
    </main>
  );
}