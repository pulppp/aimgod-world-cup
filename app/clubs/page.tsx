"use client";

import { useRouter } from "next/navigation";

const clubs = [
{
name: "Third Eye FC",
icon: "👁️",
rank: 1,
players: 18,
region: "Global",
},
{
name: "25/8 United",
icon: "⏰",
rank: 2,
players: 21,
region: "Caribbean",
},
{
name: "Slickas Momentum",
icon: "🚛",
rank: 3,
players: 16,
region: "North America",
},
{
name: "AIMGOD Elite",
icon: "👑",
rank: 4,
players: 24,
region: "Global",
},
];

export default function ClubsPage() {
const router = useRouter();

return ( <main className="min-h-screen bg-[#050505] text-white">

```
  <nav className="border-b border-white/10 bg-black">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

      <button
        onClick={() => router.push("/")}
        className="text-xl font-black"
      >
        AIMGOD<span className="text-red-500">.</span>
      </button>

      <button
        onClick={() => router.push("/")}
        className="text-xs font-black uppercase tracking-widest text-white/50 hover:text-white"
      >
        ← Home
      </button>

    </div>
  </nav>

  <section className="mx-auto max-w-7xl px-6 py-20">

    <div className="mb-10">
      <div className="text-xs font-black uppercase tracking-[0.3em] text-red-500">
        Club Competition
      </div>

      <h1 className="mt-3 text-5xl font-black uppercase tracking-tighter md:text-7xl">
        25/8
        <br />
        <span className="text-red-500">Club League</span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-white/50">
        Create a club, recruit creators from anywhere in the world,
        build your roster and compete for the Club Championship.
      </p>

    </div>

    <div className="mb-10 flex flex-col gap-4 sm:flex-row">

      <button
        onClick={() =>
          alert("Club creation will be connected in the next phase.")
        }
        className="rounded-full bg-red-600 px-7 py-4 text-xs font-black uppercase tracking-widest transition hover:bg-red-500"
      >
        + Create a Club
      </button>

      <button
        onClick={() => router.push("/join")}
        className="rounded-full border border-white/20 px-7 py-4 text-xs font-black uppercase tracking-widest transition hover:border-white/50"
      >
        Join AIMGOD
      </button>

    </div>

    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

      {clubs.map((club) => (

        <div
          key={club.name}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-red-500/40"
        >

          <div className="flex items-center justify-between">

            <div className="text-5xl">
              {club.icon}
            </div>

            <div className="text-xs font-black text-white/30">
              #{club.rank}
            </div>

          </div>

          <h2 className="mt-7 text-xl font-black">
            {club.name}
          </h2>

          <div className="mt-2 text-xs uppercase tracking-widest text-white/30">
            {club.region}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">

            <div>
              <div className="text-2xl font-black">
                {club.players}
              </div>

              <div className="text-[9px] uppercase tracking-widest text-white/30">
                Creators
              </div>
            </div>

            <button
              onClick={() =>
                alert(`${club.name} club profile will open here.`)
              }
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white/10"
            >
              View Club
            </button>

          </div>

        </div>

      ))}

    </div>

    <div className="mt-12 rounded-3xl border border-red-500/20 bg-red-500/5 p-8">

      <div className="text-xs font-black uppercase tracking-widest text-red-400">
        Club Championship
      </div>

      <h2 className="mt-3 text-3xl font-black uppercase">
        Build Your Legacy
      </h2>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/50">
        Clubs can recruit creators globally, compete in club matches,
        build club rankings and qualify for major AIMGOD competitions.
      </p>

    </div>

  </section>

  <footer className="border-t border-white/10 bg-black">

    <div className="mx-auto max-w-7xl px-6 py-8 text-xs text-white/30">
      AIMGOD WORLD CUP · 25/8 CLUB LEAGUE
    </div>

  </footer>

</main>
);
}