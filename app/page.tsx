"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const leagues = [
["🌎", "Global League", "Creators from around the world."],
["🌴", "Caribbean League", "The Caribbean creator competition."],
["🇨🇦", "North America", "Canada, USA, Mexico and beyond."],
["🏰", "Europe League", "Creators competing across Europe."],
["🌍", "Africa League", "Africa's creator competition."],
["🌏", "Asia League", "Creators competing across Asia."],
];

const clubs = [
["👁️", "Third Eye FC", 1, 18],
["⏰", "25/8 United", 2, 21],
["🚛", "Slickas Momentum", 3, 16],
["👑", "AIMGOD Elite", 4, 24],
];

const matches = [
["Third Eye", "25/8 United", "18,450", "16,820", "LIVE"],
["Slickas", "AIMGOD Elite", "12,480", "13,720", "UP NEXT"],
];

const gifts = [
["🌹", "Rose", "Community"],
["🔥", "Fire", "Community"],
["⚡", "Power Surge", "Elite"],
["👑", "Champion", "Elite"],
["👁️", "Third Eye Globe", "Signature"],
["⏰", "25/8 Clock", "Signature"],
["🚛", "Slickas Momentum", "Signature"],
["🏆", "AIMGOD World Cup", "Ultimate"],
];

const rankings = [
[1, "🇨🇦", "Third Eye", "9,980"],
[2, "🇺🇸", "Creator X", "9,740"],
[3, "🇯🇲", "Kingdom", "9,510"],
[4, "🇨🇦", "Slickas", "9,280"],
[5, "🇬🇧", "AIMGOD Elite", "9,040"],
];

export default function Home() {
const router = useRouter();
const [activeGift, setActiveGift] = useState("AIMGOD World Cup");

return ( <main className="min-h-screen bg-[#050505] text-white">

```
  <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

      <button
        onClick={() => router.push("/")}
        className="text-xl font-black tracking-tight"
      >
        AIMGOD<span className="text-red-500">.</span>
      </button>

      <div className="hidden gap-7 text-xs font-bold uppercase tracking-widest md:flex">
        <button onClick={() => router.push("/leagues")} className="text-white/60 hover:text-white">
          Leagues
        </button>

        <button onClick={() => router.push("/clubs")} className="text-white/60 hover:text-white">
          Clubs
        </button>

        <button onClick={() => router.push("/matches")} className="text-white/60 hover:text-white">
          Matches
        </button>

        <button onClick={() => router.push("/ars")} className="text-white/60 hover:text-white">
          ARS
        </button>

        <button onClick={() => router.push("/gifts")} className="text-white/60 hover:text-white">
          Gifts
        </button>

        <button onClick={() => router.push("/world-cup")} className="text-white/60 hover:text-white">
          World Cup
        </button>
      </div>

      <button
        onClick={() => router.push("/join")}
        className="rounded-full bg-white px-5 py-2 text-xs font-black text-black transition hover:bg-red-500 hover:text-white"
      >
        ENTER AIMGOD
      </button>

    </div>
  </nav>

  <section className="relative overflow-hidden border-b border-white/10">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(220,38,38,0.22),transparent_45%)]" />

    <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-28 text-center">

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

      <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/50">
        A global competitive ecosystem for creators. Join leagues,
        build clubs, compete in live matches, climb the ARS rankings
        and qualify for the AIMGOD World Cup.
      </p>

      <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

        <button
          onClick={() => router.push("/join")}
          className="rounded-full bg-red-600 px-8 py-4 text-sm font-black uppercase tracking-wider transition hover:bg-red-500"
        >
          Join the Competition
        </button>

        <button
          onClick={() => router.push("/world-cup")}
          className="rounded-full border border-white/20 px-8 py-4 text-sm font-black uppercase tracking-wider transition hover:border-white/50"
        >
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
            <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/30">
              {label}
            </div>
          </div>

        ))}

      </div>
    </div>
  </section>

  <section className="mx-auto max-w-7xl px-6 py-20">

    <div className="mb-8 flex items-end justify-between">
      <div>
        <div className="text-xs font-black uppercase tracking-[0.3em] text-red-500">
          Live Competition
        </div>
        <h2 className="mt-2 text-4xl font-black uppercase">
          Matches
        </h2>
      </div>

      <div className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-400">
        ● LIVE
      </div>
    </div>

    <div className="grid gap-5 md:grid-cols-2">

      {matches.map(([left, right, leftScore, rightScore, status]) => (

        <div
          key={left}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
        >

          <div className="mb-6 flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/40">
            <span>{status}</span>
            <span>AIMGOD MATCH</span>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-center">

            <div>
              <div className="text-2xl font-black">{left}</div>
              <div className="mt-2 text-4xl font-black text-red-500">
                {leftScore}
              </div>
            </div>

            <div className="text-xs font-black text-white/30">
              VS
            </div>

            <div>
              <div className="text-2xl font-black">{right}</div>
              <div className="mt-2 text-4xl font-black">
                {rightScore}
              </div>
            </div>

          </div>

          <button
            onClick={() => router.push("/matches")}
            className="mt-7 w-full rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-black uppercase tracking-widest hover:bg-white/10"
          >
            View Match
          </button>

        </div>

      ))}

    </div>
  </section>

  <section className="border-y border-white/10 bg-white/[0.02]">

    <div className="mx-auto max-w-7xl px-6 py-20">

      <div className="mb-10">
        <div className="text-xs font-black uppercase tracking-[0.3em] text-red-500">
          Competition System
        </div>

        <h2 className="mt-2 text-4xl font-black uppercase">
          The Leagues
        </h2>

        <p className="mt-4 max-w-2xl text-white/50">
          Regional leagues, group competitions and global competition
          feed creators toward the biggest stage.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {leagues.map(([icon, name, description]) => (

          <button
            key={name}
            onClick={() => router.push("/leagues")}
            className="group rounded-3xl border border-white/10 bg-black p-6 text-left transition hover:-translate-y-1 hover:border-red-500/40"
          >

            <div className="text-4xl">{icon}</div>

            <h3 className="mt-5 text-xl font-black">
              {name}
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/40">
              {description}
            </p>

            <div className="mt-6 text-xs font-black uppercase tracking-widest text-red-500">
              Explore →
            </div>

          </button>

        ))}

      </div>
    </div>
  </section>

  <section className="mx-auto max-w-7xl px-6 py-20">

    <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">

      <div>
        <div className="text-xs font-black uppercase tracking-[0.3em] text-red-500">
          Build Your Team
        </div>

        <h2 className="mt-2 text-4xl font-black uppercase">
          25/8 Club League
        </h2>

        <p className="mt-4 max-w-2xl text-white/50">
          Create a club. Recruit creators from anywhere.
          Build your roster and compete for the Club Championship.
        </p>
      </div>

      <button
        onClick={() => router.push("/clubs/create")}
        className="rounded-full bg-white px-6 py-3 text-xs font-black uppercase text-black"
      >
        Create a Club
      </button>

    </div>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

      {clubs.map(([icon, name, rank, players]) => (

        <button
          key={name}
          onClick={() => router.push("/clubs")}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-left transition hover:border-red-500/30"
        >

          <div className="flex items-center justify-between">
            <div className="text-4xl">{icon}</div>

            <div className="text-xs font-black text-white/30">
              #{rank}
            </div>
          </div>

          <h3 className="mt-6 font-black">
            {name}
          </h3>

          <div className="mt-2 text-xs text-white/40">
            {players} creators
          </div>

        </button>

      ))}

    </div>
  </section>

  <section className="border-y border-white/10 bg-white/[0.02]">

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

        {rankings.map(([rank, country, name, ars]) => (

          <button
            key={name}
            onClick={() => router.push("/ars")}
            className="grid w-full grid-cols-[50px_1fr_auto] items-center border-b border-white/10 bg-black/50 px-6 py-5 text-left last:border-0 hover:bg-white/[0.03]"
          >

            <div className="font-black text-white/30">
              #{rank}
            </div>

            <div>
              <div className="font-black">
                {country} {name}
              </div>

              <div className="mt-1 text-[10px] uppercase tracking-widest text-white/30">
                Global Creator
              </div>
            </div>

            <div className="text-right">
              <div className="font-black text-red-500">
                {ars}
              </div>

              <div className="text-[9px] uppercase tracking-widest text-white/30">
                ARS
              </div>
            </div>

          </button>

        ))}

      </div>
    </div>
  </section>

  <section className="mx-auto max-w-7xl px-6 py-20">

    <div className="mb-10">

      <div className="text-xs font-black uppercase tracking-[0.3em] text-red-500">
        AIMGOD Gift System
      </div>

      <h2 className="mt-2 text-4xl font-black uppercase">
        The Gift Arena
      </h2>

      <p className="mt-4 max-w-2xl text-white/50">
        100 tiers. Community gifts. Signature sponsor gifts.
        One ultimate championship gift.
      </p>

    </div>

    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">

      {gifts.map(([icon, name, tier]) => (

        <button
          key={name}
          onClick={() => setActiveGift(name)}
          className={
            activeGift === name
              ? "rounded-2xl border border-red-500 bg-red-500/10 p-5 text-left transition"
              : "rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-white/20"
          }
        >

          <div className="text-3xl">
            {icon}
          </div>

          <div className="mt-4 font-black">
            {name}
          </div>

          <div className="mt-1 text-[9px] font-bold uppercase tracking-widest text-white/30">
            {tier}
          </div>

        </button>

      ))}

    </div>

    <div className="mt-8 rounded-3xl border border-red-500/20 bg-red-500/5 p-8">

      <div className="text-xs font-black uppercase tracking-widest text-red-400">
        Selected Gift
      </div>

      <div className="mt-2 text-3xl font-black">
        {activeGift}
      </div>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
        Support a creator during a live AIMGOD competition.
      </p>

      <button
        onClick={() => router.push("/gifts")}
        className="mt-6 rounded-full bg-red-600 px-7 py-3 text-xs font-black uppercase tracking-widest transition hover:bg-red-500"
      >
        Open Gift Arena
      </button>

    </div>
  </section>

  <section className="relative overflow-hidden border-t border-white/10">

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.18),transparent_50%)]" />

    <div className="relative mx-auto max-w-7xl px-6 py-28 text-center">

      <div className="text-7xl">
        🏆
      </div>

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

      <button
        onClick={() => router.push("/world-cup")}
        className="mt-10 rounded-full bg-red-600 px-8 py-4 text-sm font-black uppercase tracking-widest hover:bg-red-500"
      >
        Enter World Cup
      </button>

      <div className="mt-14 text-2xl font-black uppercase">
        One Creator.
        <span className="text-red-500">
          {" "}One World Champion.
        </span>
      </div>

    </div>
  </section>

  <footer className="border-t border-white/10 bg-black">

    <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-6 py-10 text-xs text-white/30 md:flex-row">

      <div>
        <div className="font-black text-white">
          AIMGOD WORLD CUP
        </div>

        <div className="mt-1">
          The Creator's World Cup.
        </div>
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