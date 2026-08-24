"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
export default function MatchRoomPage() {
  const router = useRouter();
  const params = useParams();
  const matchId = params.id as string;

  const [leftScore, setLeftScore] = useState(18450);
  const [rightScore, setRightScore] = useState(16820);

  const [secondsLeft, setSecondsLeft] = useState(300);
  const [matchEnded, setMatchEnded] = useState(false);

  const [navOpen, setNavOpen] = useState(true);
  const [giftsOpen, setGiftsOpen] = useState(false);
  const [fullArena, setFullArena] = useState(false);

  useEffect(() => {
    if (matchEnded) return;

    const timer = setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          clearInterval(timer);
          setMatchEnded(true);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [matchEnded]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const timeDisplay = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  const leftQualificationPoints =
    !matchEnded
      ? 0
      : leftScore > rightScore
      ? 3
      : leftScore === rightScore
      ? 1
      : 0;

  const rightQualificationPoints =
    !matchEnded
      ? 0
      : rightScore > leftScore
      ? 3
      : leftScore === rightScore
      ? 1
      : 0;

  const totalScore = leftScore + rightScore;

  const leftMomentum =
    totalScore === 0 ? 50 : Math.round((leftScore / totalScore) * 100);

  const rightMomentum = 100 - leftMomentum;

  const gifts = [
    { icon: "🌹", name: "Rose", points: 10 },
    { icon: "⚡", name: "Spark", points: 50 },
    { icon: "🔥", name: "Fire", points: 100 },
    { icon: "🏆", name: "Champion", points: 500 },
    { icon: "🌌", name: "Galaxy", points: 1000 },
    { icon: "👑", name: "Legend", points: 5000 },
  ];

  const navItems = [
    ["⌂", "Home"],
    ["⚔", "Matches"],
    ["🏆", "Leagues"],
    ["⬡", "Clubs"],
    ["♙", "Creators"],
    ["▥", "Rankings"],
    ["🎁", "Gifts"],
    ["◫", "Wallet"],
    ["◉", "AI Hub"],
    ["⚙", "Settings"],
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#020306] text-white">
      {/* TOP HUD */}
      <header className="border-b border-cyan-400/20 bg-black/90">
        <div className="flex min-h-[76px] items-center gap-4 px-4 lg:px-6">
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="rounded-xl border border-cyan-400/30 bg-cyan-400/5 px-4 py-3 text-xl text-cyan-300 hover:bg-cyan-400/10"
          >
            ☰
          </button>

          <div className="min-w-fit">
            <div className="text-2xl font-black tracking-tight">
              AIM<span className="text-cyan-400">GOD</span>
            </div>

            <div className="text-[10px] font-black tracking-[0.35em] text-pink-500">
              WORLD CUP
            </div>
          </div>

          <div className="hidden rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-5 py-2 lg:block">
            <div className="text-xs font-black text-cyan-300">
              WORLD CUP QUALIFIER
            </div>
            <div className="text-[10px] text-white/40">
              GLOBAL REGION • GROUP A
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="rounded-xl border border-pink-500/30 bg-pink-500/10 px-4 py-2">
              <div className="text-[10px] font-black text-pink-400">● LIVE</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2 text-center">
              <div className="text-xl font-black">{timeDisplay}</div>
              <div className="text-[9px] uppercase tracking-widest text-white/40">
                remaining
              </div>
            </div>

            <div className="hidden rounded-xl border border-white/10 px-4 py-2 text-center md:block">
              <div className="text-xs text-white/40">VIEWERS</div>
              <div className="font-black">👁 3,842</div>
            </div>

            <button
              onClick={() => setFullArena(!fullArena)}
              className="hidden rounded-xl border border-cyan-400/30 px-4 py-3 text-xs font-black text-cyan-300 hover:bg-cyan-400/10 md:block"
            >
              {fullArena ? "EXIT ARENA" : "FULL ARENA"}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* LEFT NAVIGATION */}
        {navOpen && !fullArena && (
          <aside className="hidden min-h-[calc(100vh-76px)] w-52 shrink-0 border-r border-cyan-400/20 bg-black/80 p-3 lg:block">
            <div className="space-y-2">
              {navItems.map(([icon, label]) => (
                <button
                  key={label}
                  onClick={() => {
                    if (label === "Matches") router.push("/matches");
                    if (label === "Home") router.push("/");
                    if (label === "Leagues") router.push("/leagues");
                    if (label === "Clubs") router.push("/clubs");
                    if (label === "Gifts") router.push("/gifts");
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${
                    label === "Matches"

                      ? "border-pink-500/60 bg-pink-500/10 text-pink-300 shadow-[0_0_20px_rgba(255,0,100,0.15)]"
                      : "border-transparent text-white/60 hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-cyan-300"
                  }`}
                >
                  <span className="w-5 text-center">{icon}</span>
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-yellow-400/30 bg-yellow-400/5 p-4 text-center">
              <div className="text-4xl">👑</div>
              <div className="mt-2 font-black">AIMGOD</div>
              <div className="text-xs font-black text-yellow-400">
                PREMIUM PASS
              </div>
            </div>
          </aside>
        )}

        {/* MAIN ARENA */}
        <section className="min-w-0 flex-1 p-3 md:p-5">
          {/* MATCH INFO */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-white/40">
              MATCH ID:{" "}
              <span className="font-bold text-white/70">{matchId}</span>
            </div>

            <div className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-xs">
              Win Condition:{" "}
              <span className="font-black text-cyan-300">
                Most Gift Points in 5 Minutes
              </span>
            </div>

            <div className="text-xs font-black text-pink-400">
              WORLD CUP • WIN 3 • DRAW 1 • LOSS 0
            </div>
          </div>

          {/* MAIN BATTLE */}
          <div className="grid items-stretch gap-3 xl:grid-cols-[1fr_300px_1fr]">
            {/* THIRD EYE */}
            <div className="relative overflow-hidden rounded-3xl border border-cyan-400/50 bg-gradient-to-br from-cyan-400/[0.09] via-black to-black p-5 shadow-[0_0_35px_rgba(0,240,255,0.08)]">
              <div className="absolute right-4 top-4 rounded-full bg-cyan-400/10 px-3 py-1 text-[10px] font-black text-cyan-300">
                ● LIVE
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-cyan-400 bg-black text-4xl shadow-[0_0_25px_rgba(0,240,255,0.25)]">
                  👁
                </div>

                <div>
                  <h2 className="text-2xl font-black text-cyan-300">
                    THIRD EYE
                  </h2>
                  <p className="text-sm text-white/40">@thirdeye_official</p>
                  <p className="mt-2 text-xs">🇨🇦 CANADA • THIRD EYE FC</p>
                </div>

                <div className="ml-auto rounded-xl border border-cyan-400/30 p-3 text-center">
                  <div className="text-[9px] text-white/40">RANK</div>
                  <div className="text-xl font-black text-cyan-300">#12</div>
                </div>
              </div>

              {/* LIVE FEED */}
              <div className="mt-5 flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-950/40 via-zinc-950 to-purple-950/30">
                <div className="text-center">
                  <div className="text-5xl">📱</div>
                  <div className="mt-3 font-black text-cyan-300">
                    TIKTOK LIVE
                  </div>
                  <div className="text-xs text-white/30">
                    Creator feed connects here
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <div className="text-5xl font-black tracking-tight text-cyan-300">
                    {leftScore.toLocaleString()}
                  </div>
                  <div className="text-xs font-black tracking-widest text-cyan-400">
                    GIFT POINTS
                  </div>
                </div>

                {matchEnded && (
                  <div className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-center">
                    <div className="text-xs">WORLD CUP</div>
                    <div className="text-2xl font-black text-cyan-300">
                      +{leftQualificationPoints} PTS
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 h-4 overflow-hidden rounded-full border border-cyan-400/20 bg-black">
                <div
                  className="h-full bg-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.8)] transition-all"
                  style={{ width: `${leftMomentum}%` }}
                />
              </div>
            </div>

            {/* CENTER VS */}
            <div className="flex min-h-[430px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.12),transparent_35%),radial-gradient(circle_at_70%_50%,rgba(255,0,100,0.12),transparent_35%)] p-5 text-center">
              <div className="text-xs font-black tracking-[0.3em] text-white/40">
                ROUND 1
              </div>

              <div className="mt-5 bg-gradient-to-r from-cyan-300 via-white to-pink-500 bg-clip-text text-8xl font-black italic tracking-tighter text-transparent drop-shadow-[0_0_25px_rgba(0,240,255,0.3)]">
                VS
              </div>

              <div className="mt-5 rounded-full border border-white/10 bg-black/70 px-5 py-2 text-xs font-black">
                AIMGOD ARENA
              </div>

              <div className="mt-8 w-full rounded-2xl border border-white/10 bg-black/70 p-4">
                <div className="text-[10px] font-black tracking-widest text-white/40">
                  AIMGOD AI
                </div>

                <div className="mt-3 text-lg font-black">
                  BATTLE ANALYSIS
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-black text-cyan-300">
                      {leftMomentum}%
                    </div>
                    <div className="text-[9px] text-white/40">MOMENTUM</div>
                  </div>

                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-400/10 to-pink-500/10 text-2xl font-black">
                    AI
                  </div>

                  <div>
                    <div className="text-3xl font-black text-pink-400">
                      {rightMomentum}%
                    </div>
                    <div className="text-[9px] text-white/40">MOMENTUM</div>
                  </div>
                </div>

                <div className="mt-5 text-xs text-white/40">
                  Current leader
                </div>

                <div className="mt-1 font-black">
                  {leftScore === rightScore
                    ? "MATCH TIED"
                    : leftScore > rightScore
                    ? "THIRD EYE"
                    : "25/8 UNITED"}
                </div>
              </div>
            </div>

            {/* 25/8 */}
            <div className="relative overflow-hidden rounded-3xl border border-pink-500/50 bg-gradient-to-bl from-pink-500/[0.09] via-black to-black p-5 shadow-[0_0_35px_rgba(255,0,100,0.08)]">
              <div className="absolute right-4 top-4 rounded-full bg-pink-500/10 px-3 py-1 text-[10px] font-black text-pink-300">
                ● LIVE
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-pink-500 bg-black text-3xl font-black text-yellow-400 shadow-[0_0_25px_rgba(255,0,100,0.25)]">
                  25/8
                </div>

                <div>
                  <h2 className="text-2xl font-black text-pink-300">
                    25/8 UNITED
                  </h2>
                  <p className="text-sm text-white/40">@258united</p>
                  <p className="mt-2 text-xs">🇯🇲 JAMAICA • 25/8 UNITED</p>
                </div>

                <div className="ml-auto rounded-xl border border-pink-500/30 p-3 text-center">
                  <div className="text-[9px] text-white/40">RANK</div>
                  <div className="text-xl font-black text-pink-300">#18</div>
                </div>
              </div>

              <div className="mt-5 flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-pink-500/30 bg-gradient-to-bl from-pink-950/40 via-zinc-950 to-orange-950/20">
                <div className="text-center">
                  <div className="text-5xl">📱</div>
                  <div className="mt-3 font-black text-pink-300">
                    TIKTOK LIVE
                  </div>
                  <div className="text-xs text-white/30">
                    Creator feed connects here
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <div className="text-5xl font-black tracking-tight text-pink-300">
                    {rightScore.toLocaleString()}
                  </div>
                  <div className="text-xs font-black tracking-widest text-pink-400">
                    GIFT POINTS
                  </div>
                </div>

                {matchEnded && (
                  <div className="rounded-xl border border-pink-500/30 bg-pink-500/10 px-4 py-3 text-center">
                    <div className="text-xs">WORLD CUP</div>
                    <div className="text-2xl font-black text-pink-300">
                      +{rightQualificationPoints} PTS
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 h-4 overflow-hidden rounded-full border border-pink-500/20 bg-black">
                <div
                  className="h-full bg-pink-500 shadow-[0_0_20px_rgba(255,0,100,0.8)] transition-all"
                  style={{ width: `${rightMomentum}%` }}
                />
              </div>
            </div>
          </div>

          {/* BOTTOM INTERACTION AREA */}
          {!fullArena && (
            <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_1.5fr_1fr]">
              {/* CHAT */}
              <div className="rounded-2xl border border-cyan-400/20 bg-black/80 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-pink-400">💬 LIVE CHAT</h3>
                  <span className="text-[10px] text-emerald-400">
                    ● 2.3K ONLINE
                  </span>
                </div>

                <div className="mt-4 space-y-3 text-sm">
                  <p>
                    👑 <b>Kingdom:</b>{" "}
                    <span className="text-white/60">Let's go Third Eye! 🔥</span>
                  </p>
                  <p>
                    ⚡ <b>Slickas:</b>{" "}
                    <span className="text-white/60">25/8 all day!</span>
                  </p>
                  <p>
                    🤖 <b className="text-cyan-300">AIMGOD AI:</b>{" "}
                    <span className="text-white/60">
                      Momentum is shifting...
                    </span>
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  <input
                    placeholder="Say something..."
                    className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-400/40"
                  />

                  <button className="rounded-xl bg-cyan-400 px-4 font-black text-black">
                    ➤
                  </button>
                </div>
              </div>

              {/* GIFTS - MINIMIZED */}
              <div className="rounded-2xl border border-pink-500/20 bg-black/80 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black">🎁 GIFTS</h3>
                    <p className="text-[10px] text-white/30">
                      Gifts convert to battle points
                    </p>
                  </div>

                  <button
                    onClick={() => setGiftsOpen(!giftsOpen)}
                    className="rounded-lg border border-pink-500/30 px-3 py-2 text-xs font-black text-pink-300"
                  >
                    {giftsOpen ? "MINIMIZE" : "VIEW ALL"}
                  </button>
                </div>

                <div
                  className={`mt-4 grid gap-2 ${
                    giftsOpen ? "grid-cols-3 md:grid-cols-6" : "grid-cols-3"
                  }`}
                >
                  {(giftsOpen ? gifts : gifts.slice(0, 3)).map((gift) => (
                    <button
                      key={gift.name}
                      onClick={() =>
                        setLeftScore((score) => score + gift.points)
                      }
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center hover:border-cyan-400/40 hover:bg-cyan-400/5"
                    >
                      <div className="text-2xl">{gift.icon}</div>
                      <div className="mt-1 text-xs font-black">{gift.name}</div>
                      <div className="text-[10px] text-pink-400">
                        +{gift.points}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* SUPPORTERS */}
              <div className="rounded-2xl border border-pink-500/20 bg-black/80 p-4">
                <h3 className="font-black text-cyan-300">👑 TOP SUPPORTERS</h3>

                <div className="mt-4 space-y-3 text-sm">
                  {[
                    ["1", "Kingdom", "4,250"],
                    ["2", "Slickas", "2,850"],
                    ["3", "CreatorX", "1,940"],
                  ].map(([rank, name, score]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between border-b border-white/5 pb-2"
                    >
                      <span>
                        <span className="mr-3 text-yellow-400">{rank}</span>
                        {name}
                      </span>
                      <b>{score}</b>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TEST CONTROLS */}
          {!matchEnded && (
            <div className="mt-4 flex flex-wrap justify-center gap-2 opacity-40 hover:opacity-100">
              <span className="mr-2 self-center text-[10px] uppercase text-white/30">
                Development score test
              </span>

              <button
                onClick={() => setLeftScore((score) => score + 100)}
                className="rounded-lg bg-cyan-400 px-3 py-2 text-xs font-black text-black"
              >
                THIRD EYE +100
              </button>

              <button
                onClick={() => setRightScore((score) => score + 100)}
                className="rounded-lg bg-pink-500 px-3 py-2 text-xs font-black text-white"
              >
                25/8 +100
              </button>
            </div>
          )}

          {/* MATCH RESULT */}
          {matchEnded && (
            <div className="mt-5 rounded-3xl border border-yellow-400/40 bg-yellow-400/5 p-6 text-center">
              <div className="text-xs font-black tracking-[0.4em] text-yellow-400">
                MATCH COMPLETE
              </div>

              <div className="mt-3 text-4xl font-black">
                {leftScore === rightScore
                  ? "DRAW"
                  : leftScore > rightScore
                  ? "THIRD EYE WINS"
                  : "25/8 UNITED WINS"}
              </div>

              <div className="mt-3 text-white/50">
                World Cup Points — Third Eye: {leftQualificationPoints} • 25/8
                United: {rightQualificationPoints}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}