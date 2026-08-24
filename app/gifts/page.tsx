"use client";

import { useMemo, useState } from "react";

type Gift = {
  tier: number;
  name: string;
  icon: string;
  category: string;
  color: string;
};

const icons = [
  "🌹",
  "🔥",
  "⭐",
  "💫",
  "✨",
  "💎",
  "⚡",
  "🌟",
  "🎯",
  "🚀",
];

const categories = [
  "Starter",
  "Community",
  "Supporter",
  "Premium",
  "Elite",
  "Champion",
  "Legendary",
];

const specialGifts: Record<number, Gift> = {
  91: {
    tier: 91,
    name: "AIMGOD Crown",
    icon: "👑",
    category: "Signature",
    color: "from-yellow-500 to-orange-500",
  },
  92: {
    tier: 92,
    name: "World Cup Trophy",
    icon: "🏆",
    category: "Signature",
    color: "from-yellow-400 to-amber-600",
  },
  93: {
    tier: 93,
    name: "AIMGOD Galaxy",
    icon: "🌌",
    category: "Signature",
    color: "from-purple-500 to-blue-600",
  },
  94: {
    tier: 94,
    name: "Creator's Throne",
    icon: "🪑",
    category: "Signature",
    color: "from-red-500 to-purple-600",
  },
  95: {
    tier: 95,
    name: "AIMGOD Golden Ball",
    icon: "⚽",
    category: "Signature",
    color: "from-yellow-400 to-yellow-700",
  },
  96: {
    tier: 96,
    name: "Third Eye Globe",
    icon: "👁️",
    category: "Sponsor",
    color: "from-cyan-400 to-blue-600",
  },
  97: {
    tier: 97,
    name: "25/8 Clock",
    icon: "⏰",
    category: "Sponsor",
    color: "from-green-400 to-emerald-600",
  },
  98: {
    tier: 98,
    name: "Slickas Momentum",
    icon: "🚛",
    category: "Sponsor",
    color: "from-orange-400 to-red-600",
  },
  99: {
    tier: 99,
    name: "AIMGOD Diamond",
    icon: "💎",
    category: "Legendary",
    color: "from-cyan-300 to-purple-500",
  },
  100: {
    tier: 100,
    name: "AIMGOD World Cup",
    icon: "🏆",
    category: "Ultimate",
    color: "from-red-500 via-yellow-400 to-red-600",
  },
};

function createGifts(): Gift[] {
  return Array.from({ length: 100 }, (_, index) => {
    const tier = index + 1;

    if (specialGifts[tier]) {
      return specialGifts[tier];
    }

    const categoryIndex = Math.min(
      Math.floor((tier - 1) / 10),
      categories.length - 1
    );

    return {
      tier,
      name: `AIMGOD ${categories[categoryIndex]} ${tier}`,
      icon: icons[index % icons.length],
      category: categories[categoryIndex],
      color:
        tier <= 20
          ? "from-white/10 to-white/5"
          : tier <= 40
            ? "from-blue-500/20 to-cyan-500/10"
            : tier <= 60
              ? "from-purple-500/20 to-pink-500/10"
              : tier <= 80
                ? "from-orange-500/20 to-red-500/10"
                : "from-red-500/20 to-yellow-500/10",
    };
  });
}

const allGifts = createGifts();

export default function GiftsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [search, setSearch] = useState("");

  const filteredGifts = useMemo(() => {
    return allGifts.filter((gift) => {
      const matchesCategory =
        selectedCategory === "All" ||
        gift.category === selectedCategory;

      const matchesSearch = gift.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="text-xl font-black">
            AIMGOD<span className="text-red-500">.</span>
          </a>

          <div className="flex gap-5 text-xs font-bold uppercase tracking-widest">
            <a href="/" className="text-white/50 hover:text-white">
              Home
            </a>

            <a href="/leagues" className="text-white/50 hover:text-white">
              Leagues
            </a>

            <a href="/gifts" className="text-red-500">
              Gifts
            </a>

            <a href="/#worldcup" className="text-white/50 hover:text-white">
              World Cup
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.22),transparent_45%)]">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <div className="text-xs font-black uppercase tracking-[0.4em] text-red-500">
            AIMGOD Supporter Economy
          </div>

          <h1 className="mt-5 text-6xl font-black uppercase tracking-tighter md:text-8xl">
            GIFT
            <br />
            <span className="text-red-500">ARENA</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/50">
            100 tiers of AIMGOD gifts designed for live matches, creator
            support and championship moments.
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-3xl font-black">100</div>
              <div className="mt-1 text-[9px] uppercase tracking-widest text-white/30">
                Gift Tiers
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-3xl font-black">7</div>
              <div className="mt-1 text-[9px] uppercase tracking-widest text-white/30">
                Categories
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-3xl font-black">10</div>
              <div className="mt-1 text-[9px] uppercase tracking-widest text-white/30">
                Special Gifts
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTROLS */}
      <section className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2 overflow-x-auto">
              {["All", ...categories, "Sponsor", "Ultimate"].map(
                (category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-widest ${
                      selectedCategory === category
                        ? "bg-red-600"
                        : "border border-white/10 bg-white/5 text-white/40"
                    }`}
                  >
                    {category}
                  </button>
                )
              )}
            </div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search gifts..."
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs outline-none placeholder:text-white/20 focus:border-red-500"
            />
          </div>
        </div>
      </section>

      {/* GIFT GRID */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black uppercase">
              Gift Inventory
            </h2>

            <p className="mt-1 text-xs text-white/30">
              {filteredGifts.length} gifts displayed
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredGifts.map((gift) => (
            <button
              key={gift.tier}
              onClick={() => setSelectedGift(gift)}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${gift.color} p-5 text-left transition hover:-translate-y-1 hover:border-white/30`}
            >
              <div className="absolute right-3 top-3 text-[9px] font-black text-white/30">
                #{gift.tier}
              </div>

              <div className="text-4xl transition group-hover:scale-110">
                {gift.icon}
              </div>

              <div className="mt-5 text-sm font-black">
                {gift.name}
              </div>

              <div className="mt-2 text-[9px] font-bold uppercase tracking-widest text-white/30">
                {gift.category}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* SELECTED GIFT MODAL */}
      {selectedGift && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-5 backdrop-blur-md"
          onClick={() => setSelectedGift(null)}
        >
          <div
            className={`w-full max-w-md rounded-3xl border border-white/10 bg-gradient-to-br ${selectedGift.color} p-8 shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="text-xs font-black uppercase tracking-widest text-white/40">
                Tier #{selectedGift.tier}
              </div>

              <button
                onClick={() => setSelectedGift(null)}
                className="text-white/40 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-8 text-center">
              <div className="text-7xl">{selectedGift.icon}</div>

              <h2 className="mt-6 text-3xl font-black">
                {selectedGift.name}
              </h2>

              <div className="mt-2 text-xs font-black uppercase tracking-widest text-white/40">
                {selectedGift.category}
              </div>

              <p className="mt-5 text-sm leading-6 text-white/50">
                Support a creator with this AIMGOD gift during a live
                competition.
              </p>

              <button
                className="mt-7 w-full rounded-xl bg-red-600 py-4 text-xs font-black uppercase tracking-widest hover:bg-red-500"
                onClick={() =>
                  alert(
                    "Demo mode: gift sending will be connected to the AIMGOD wallet system later."
                  )
                }
              >
                Send Gift — Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}