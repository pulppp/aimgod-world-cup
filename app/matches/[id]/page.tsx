"use client";
import {
  getSavedResult,
  getSavedResults,
  saveMatchResult,
  clearMatchResult,
  SavedMatchResult,
} from "../../data/results";
import {
  calculateAllStandings,
} from "../../data/standings";

import {
  getKnockoutState,
} from "../../data/knockout";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "../../LanguageContext";
import { languages, Language } from "../../i18n";

import {
  getMatchWithCreators,
  getCreator,
} from "../../data/matches";
type GiftTarget = "left" | "right";

export default function MatchRoomPage() {
  const router = useRouter();
  const params = useParams();

  const { language, setLanguage, t } = useLanguage();

  const rawId = params.id;

  const matchId = Array.isArray(rawId)
    ? rawId[0]
    : String(rawId ?? "");

const [savedResults, setSavedResults] =
  useState<SavedMatchResult[]>([]);

const [hydrated, setHydrated] =
  useState(false);

useEffect(() => {
  setSavedResults(
    getSavedResults()
  );

  setHydrated(true);
}, []);

const standings =
  calculateAllStandings(savedResults);

const groupA =
  standings.find(
    (group) =>
      group.group === "Group A"
  );

const groupB =
  standings.find(
    (group) =>
      group.group === "Group B"
  );

const knockout =
  getKnockoutState(
    groupA?.rows ?? [],
    groupB?.rows ?? [],
    savedResults
  );

const knockoutMatch =
  matchId ===
  knockout.semifinal1.id
    ? knockout.semifinal1
    : matchId ===
      knockout.semifinal2.id
    ? knockout.semifinal2
    : matchId ===
      knockout.final.id
    ? knockout.final
    : null;

const knockoutLeftCreator =
  knockoutMatch?.leftCreatorId
    ? getCreator(
        knockoutMatch.leftCreatorId
      )
    : null;

const knockoutRightCreator =
  knockoutMatch?.rightCreatorId
    ? getCreator(
        knockoutMatch.rightCreatorId
      )
    : null;

const regularMatch =
  getMatchWithCreators(matchId);

const matchData =
  regularMatch ??
  (knockoutMatch &&
  knockoutLeftCreator &&
  knockoutRightCreator
    ? {
        id: knockoutMatch.id,
        tournament:
          "AIMGOD World Cup",
        stage:
          knockoutMatch.round ===
          "final"
            ? "World Cup Final"
            : "Semifinal",
        group:
          knockoutMatch.round ===
          "final"
            ? "Final"
            : "Knockout",
        status: "scheduled" as const,
        durationSeconds: 300,
        leftCreatorId:
          knockoutLeftCreator.id,
        rightCreatorId:
          knockoutRightCreator.id,
        leftScore: 0,
        rightScore: 0,
        viewers: 0,
        leftCreator:
          knockoutLeftCreator,
        rightCreator:
          knockoutRightCreator,
      }
    : null);

  const initialLeftScore = matchData?.leftScore ?? 0;
  const initialRightScore = matchData?.rightScore ?? 0;
  const matchDuration = matchData?.durationSeconds ?? 300;

  const [leftScore, setLeftScore] = useState(initialLeftScore);
  const [rightScore, setRightScore] = useState(initialRightScore);

  const [secondsLeft, setSecondsLeft] =
    useState(matchDuration);

  const [matchStarted, setMatchStarted] =
    useState(false);

  const [matchEnded, setMatchEnded] =
    useState(false);

  const [navOpen, setNavOpen] =
    useState(true);

  const [giftsOpen, setGiftsOpen] =
    useState(false);

  const [languageOpen, setLanguageOpen] =
    useState(false);

  const [fullArena, setFullArena] =
    useState(false);

  const [giftTarget, setGiftTarget] =
    useState<GiftTarget>("left");

  useEffect(() => {
    const saved = getSavedResult(matchId);

    if (saved) {
      setLeftScore(saved.leftScore);
      setRightScore(saved.rightScore);
      setSecondsLeft(0);
      setMatchStarted(false);
      setMatchEnded(true);
      setGiftTarget("left");
      return;
    }

    setLeftScore(initialLeftScore);
    setRightScore(initialRightScore);
    setSecondsLeft(matchDuration);
    setMatchStarted(false);
    setMatchEnded(false);
    setGiftTarget("left");
  }, [
    matchId,
    initialLeftScore,
    initialRightScore,
    matchDuration,
  ]);

  useEffect(() => {
    if (!matchStarted || matchEnded) {
      return;
    }

    if (secondsLeft <= 0) {
      setMatchEnded(true);
      setMatchStarted(false);
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((current) =>
        Math.max(0, current - 1)
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft, matchStarted, matchEnded]);

  useEffect(() => {
    if (!matchEnded) {
      return;
    }

    saveMatchResult({
      matchId,
      leftScore,
      rightScore,
      completedAt: new Date().toISOString(),
    });
  }, [
    matchEnded,
    matchId,
    leftScore,
    rightScore,
  ]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const timeDisplay =
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;

  const totalScore = leftScore + rightScore;

  const leftMomentum =
    totalScore === 0
      ? 50
      : Math.round(
          (leftScore / totalScore) * 100
        );

  const rightMomentum =
    100 - leftMomentum;

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

  const addLeftScore = (points: number) => {
    if (!matchStarted || matchEnded) {
      return;
    }

    setLeftScore(
      (current) => current + points
    );
  };

  const addRightScore = (points: number) => {
    if (!matchStarted || matchEnded) {
      return;
    }

    setRightScore(
      (current) => current + points
    );
  };

  const addGiftScore = (points: number) => {
    if (giftTarget === "left") {
      addLeftScore(points);
      return;
    }

    addRightScore(points);
  };

  const startMatch = () => {
    if (matchEnded) {
      return;
    }

    setMatchStarted(true);
  };

  const resetMatch = () => {
    clearMatchResult(matchId);

    setLeftScore(initialLeftScore);
    setRightScore(initialRightScore);
    setSecondsLeft(matchDuration);
    setMatchStarted(false);
    setMatchEnded(false);
    setGiftTarget("left");
  };

  const endMatchNow = () => {
    if (!matchStarted || matchEnded) {
      return;
    }

    setSecondsLeft(0);
    setMatchStarted(false);
    setMatchEnded(true);
  };

  const gifts = [
    {
      icon: "🌹",
      name: "Rose",
      points: 10,
    },
    {
      icon: "⚡",
      name: "Spark",
      points: 50,
    },
    {
      icon: "🔥",
      name: "Power",
      points: 100,
    },
    {
      icon: "👁️",
      name: "Third Eye",
      points: 250,
    },
    {
      icon: "⏱️",
      name: "25/8 Clock",
      points: 500,
    },
    {
      icon: "🏆",
      name: "Champion",
      points: 1000,
    },
  ];

  const navItems = [
    {
      icon: "⌂",
      label: "Home",
      path: "/",
    },
    {
      icon: "⚔",
      label: t("matches"),
      path: "/matches",
    },
    {
      icon: "🏆",
      label: t("leagues"),
      path: "/leagues",
    },
    {
      icon: "⬡",
      label: t("clubs"),
      path: "/clubs",
    },
    {
      icon: "♙",
      label: t("creators"),
      path: "#",
    },
    {
      icon: "▥",
      label: t("rankings"),
      path: "/rankings",
    },
    {
      icon: "🎁",
      label: t("gifts"),
      path: "/gifts",
    },
    {
      icon: "◫",
      label: t("wallet"),
      path: "#",
    },
    {
      icon: "◉",
      label: t("aiHub"),
      path: "#",
    },
    {
      icon: "⚙",
      label: t("settings"),
      path: "#",
    },
  ];
if (!hydrated) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#020306] text-white">
      <div className="text-center">
        <div className="text-xl font-black text-cyan-300">
          AIMGOD
        </div>

        <div className="mt-2 text-xs tracking-[0.3em] text-white/30">
          LOADING ARENA...
        </div>
      </div>
    </main>
  );
}
  if (!matchData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#020306] px-6 text-white">
        <div className="rounded-3xl border border-pink-500/30 bg-pink-500/5 p-10 text-center">
          <div className="text-4xl font-black text-pink-400">
            MATCH NOT FOUND
          </div>

          <div className="mt-3 text-sm text-white/40">
            No AIMGOD match exists for:
          </div>

          <div className="mt-1 font-mono text-cyan-300">
            {matchId}
          </div>

          <button
            onClick={() =>
              router.push("/matches")
            }
            className="mt-7 rounded-xl border border-cyan-400/30 bg-cyan-400/5 px-6 py-3 text-sm font-black text-cyan-300 transition hover:bg-cyan-400/10"
          >
            ← BACK TO MATCHES
          </button>
        </div>
      </main>
    );
  }

  const {
    leftCreator,
    rightCreator,
  } = matchData;

  const winner =
    leftScore === rightScore
      ? "DRAW"
      : leftScore > rightScore
      ? leftCreator.name
      : rightCreator.name;

  const currentLeader =
    leftScore === rightScore
      ? "MATCH TIED"
      : leftScore > rightScore
      ? leftCreator.name
      : rightCreator.name;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#020306] text-white">
      {/* FUTURISTIC BACKGROUND */}

      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute left-[8%] top-[10%] h-72 w-72 rounded-full bg-cyan-400/10 blur-[120px]" />

        <div className="absolute right-[8%] top-[18%] h-72 w-72 rounded-full bg-pink-500/10 blur-[120px]" />

        <div className="absolute bottom-[5%] left-[40%] h-64 w-64 rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      {/* TOP HUD */}

      <header className="relative z-40 border-b border-cyan-400/20 bg-black/85 backdrop-blur-xl">
        <div className="flex min-h-[76px] items-center gap-3 px-3 md:px-5">
          <button
            onClick={() =>
              setNavOpen(!navOpen)
            }
            className="rounded-xl border border-cyan-400/30 bg-cyan-400/5 px-4 py-3 text-xl text-cyan-300 transition hover:bg-cyan-400/10"
          >
            ☰
          </button>

          <div className="min-w-fit">
            <div className="text-xl font-black tracking-tight md:text-2xl">
              AIM
              <span className="text-cyan-400">
                GOD
              </span>
            </div>

            <div className="text-[9px] font-black tracking-[0.35em] text-pink-500">
              {t("worldCup")}
            </div>
          </div>

          <div className="hidden rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-5 py-2 lg:block">
            <div className="text-xs font-black text-cyan-300">
              {t("qualifier")}
            </div>

            <div className="text-[10px] text-white/40">
              {matchData.stage.toUpperCase()}
              {" • "}
              {matchData.group.toUpperCase()}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* LANGUAGE */}

            <div className="relative">
              <button
                onClick={() =>
                  setLanguageOpen(
                    !languageOpen
                  )
                }
                className="rounded-xl border border-cyan-400/30 bg-cyan-400/5 px-3 py-2 text-xs font-black text-cyan-300 transition hover:bg-cyan-400/10"
              >
                🌐 {language.toUpperCase()}
              </button>

              {languageOpen && (
                <div className="absolute right-0 top-12 z-[100] w-52 overflow-hidden rounded-xl border border-cyan-400/30 bg-[#05070b]/95 shadow-[0_0_40px_rgba(0,240,255,0.18)] backdrop-blur-xl">
                  {languages.map(
                    (item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          setLanguage(
                            item.code as Language
                          );

                          setLanguageOpen(
                            false
                          );
                        }}
                        className="flex w-full items-center gap-3 border-b border-white/5 px-4 py-3 text-left text-sm transition hover:bg-cyan-400/10"
                      >
                        <span className="text-lg">
                          {item.flag}
                        </span>

                        <span
                          className={
                            language ===
                            item.code
                              ? "font-black text-cyan-300"
                              : "text-white/70"
                          }
                        >
                          {item.label}
                        </span>
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* LIVE */}

            <div className="hidden rounded-xl border border-pink-500/30 bg-pink-500/10 px-3 py-2 sm:block">
              <div className="text-[10px] font-black text-pink-400">
                ● {t("live")}
              </div>
            </div>

            {/* TIMER */}

            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-center">
              <div className="font-black md:text-xl">
                {timeDisplay}
              </div>

              <div className="hidden text-[8px] uppercase tracking-widest text-white/40 sm:block">
                {t("remaining")}
              </div>
            </div>

            {/* VIEWERS */}

            <div className="hidden rounded-xl border border-white/10 px-4 py-2 text-center xl:block">
              <div className="text-[9px] text-white/40">
                {t("viewers")}
              </div>

              <div className="font-black">
                👁{" "}
                {matchData.viewers.toLocaleString()}
              </div>
            </div>

            {/* FULL ARENA */}

            <button
              onClick={() =>
                setFullArena(
                  !fullArena
                )
              }
              className="hidden rounded-xl border border-pink-500/30 px-4 py-3 text-[10px] font-black text-pink-300 transition hover:bg-pink-500/10 md:block"
            >
              {fullArena
                ? "EXIT ARENA"
                : "FULL ARENA"}
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex">
        {/* LEFT NAV */}

        {navOpen && !fullArena && (
          <aside className="hidden min-h-[calc(100vh-76px)] w-52 shrink-0 border-r border-cyan-400/15 bg-black/65 p-3 backdrop-blur-xl lg:block">
            <div className="mb-4 px-3 py-2 text-[9px] font-black tracking-[0.3em] text-cyan-400/50">
              AIMGOD SYSTEM
            </div>

            <div className="space-y-1">
              {navItems.map(
                (item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (
                        item.path !== "#"
                      ) {
                        router.push(
                          item.path
                        );
                      }
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${
                      item.path ===
                      "/matches"
                        ? "border-pink-500/50 bg-pink-500/10 text-pink-300 shadow-[0_0_20px_rgba(255,0,100,0.12)]"
                        : "border-transparent text-white/50 hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-cyan-300"
                    }`}
                  >
                    <span className="w-5 text-center">
                      {item.icon}
                    </span>

                    {item.label}
                  </button>
                )
              )}
            </div>

            <div className="mt-8 rounded-2xl border border-yellow-400/30 bg-yellow-400/5 p-4 text-center">
              <div className="text-3xl">
                👑
              </div>

              <div className="mt-2 font-black">
                AIMGOD
              </div>

              <div className="text-[10px] font-black tracking-wider text-yellow-400">
                WORLD CUP
              </div>
            </div>
          </aside>
        )}

        {/* MAIN ARENA */}

        <section className="min-w-0 flex-1 p-3 md:p-5">
          {/* MATCH STATUS */}

          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
            <div className="text-[10px] text-white/40">
              MATCH ID:{" "}
              <span className="font-black text-white/70">
                {matchId}
              </span>
            </div>

           <div className="text-[10px] font-black text-cyan-300">
  {matchData.stage === "World Cup Final"
    ? "WORLD CUP FINAL • WINNER TAKES THE CROWN"
    : matchData.stage === "Semifinal"
    ? "WORLD CUP • SEMIFINAL • WINNER ADVANCES"
    : "WORLD CUP • WIN 3 • DRAW 1 • LOSS 0"}
</div>
            <div className="text-[10px] text-white/40">
              {Math.round(
                matchDuration / 60
              )}{" "}
              MIN • HIGHEST GIFT SCORE WINS
            </div>
          </div>

          {/* START / RESET */}

          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div
                className={`text-xs font-black uppercase tracking-[0.25em] ${
                  matchEnded
                    ? "text-yellow-400"
                    : matchStarted
                    ? "text-pink-400"
                    : "text-cyan-300"
                }`}
              >
                {matchEnded
                  ? "● MATCH COMPLETE"
                  : matchStarted
                  ? "● LIVE BATTLE"
                  : "● MATCH READY"}
              </div>

              <h1 className="mt-1 text-2xl font-black uppercase md:text-3xl">
                AIMGOD CREATOR ARENA
              </h1>
            </div>

            <div className="flex gap-2">
              {!matchStarted &&
                !matchEnded && (
                  <button
                    onClick={
                      startMatch
                    }
                    className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-6 py-3 text-xs font-black uppercase tracking-wider text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.12)] transition hover:bg-emerald-400/20"
                  >
                    ▶ START MATCH
                  </button>
                )}

              {matchEnded && (
                <button
                  onClick={
                    resetMatch
                  }
                  className="rounded-xl border border-cyan-400/30 bg-cyan-400/5 px-6 py-3 text-xs font-black text-cyan-300"
                >
                  ↻ RESET
                </button>
              )}
            </div>
          </div>

          {/* PLAYER VS PLAYER */}

          <div className="grid items-stretch gap-3 xl:grid-cols-[1fr_280px_1fr]">
            {/* LEFT CREATOR */}

            <div className="relative overflow-hidden rounded-3xl border border-cyan-400/40 bg-gradient-to-br from-cyan-400/[0.08] via-[#06080d] to-black p-4 shadow-[0_0_40px_rgba(0,240,255,0.06)] md:p-5">
              <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative flex items-center gap-3">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-cyan-400 bg-black text-2xl font-black shadow-[0_0_25px_rgba(0,240,255,0.25)]">
                  {leftCreator.avatar}
                </div>

                <div>
                  <div className="text-[9px] font-black tracking-[0.2em] text-cyan-400">
                    COMPETITOR 01
                  </div>

                  <h2 className="text-xl font-black text-cyan-200 md:text-2xl">
                    {leftCreator.name}
                  </h2>

                  <p className="text-xs text-white/40">
                    {leftCreator.handle}
                  </p>
                </div>

                <div className="ml-auto text-right">
                  <div className="text-[9px] text-white/30">
                    GLOBAL RANK
                  </div>

                  <div className="text-xl font-black text-cyan-300">
                    #{leftCreator.rank}
                  </div>
                </div>
              </div>

              {/* LEFT LIVE FEED */}

              <div className="relative mt-4 flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-cyan-400/20 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08),transparent_50%)]">
                <div className="absolute left-3 top-3 rounded-lg border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-[9px] font-black text-pink-400">
                  ● LIVE
                </div>

                <div className="text-center text-white/35">
                  <div className="text-5xl">
                    📱
                  </div>

                  <div className="mt-3 text-sm font-black text-cyan-300">
                    TIKTOK LIVE
                  </div>

                  <div className="mt-1 text-[10px]">
                    {leftCreator.handle}
                  </div>
                </div>
              </div>

              {/* LEFT SCORE */}

              <div className="relative mt-4 flex items-end justify-between">
                <div>
                  <div className="text-4xl font-black text-cyan-300 md:text-5xl">
                    {leftScore.toLocaleString()}
                  </div>

                  <div className="text-[10px] font-black tracking-[0.2em] text-cyan-400">
                    {t("giftPoints")}
                  </div>
                </div>

                <div className="text-right text-xs">
                  <div className="text-white/30">
                    {leftCreator.flag}{" "}
                    {leftCreator.country.toUpperCase()}
                  </div>

                  <div className="mt-1 font-black">
                    {leftCreator.club}
                  </div>
                </div>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full border border-cyan-400/20 bg-black">
                <div
                  className="h-full bg-cyan-400 shadow-[0_0_18px_rgba(0,240,255,0.8)] transition-all duration-500"
                  style={{
                    width: `${leftMomentum}%`,
                  }}
                />
              </div>
            </div>

            {/* VS + AIMGOD AI */}

            <div className="relative flex min-h-[400px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#05070a] p-4 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.12),transparent_34%),radial-gradient(circle_at_70%_50%,rgba(255,0,100,0.10),transparent_40%)]" />

              <div className="relative w-full">
                <div className="text-[9px] font-black tracking-[0.3em] text-white/40">
                  AIMGOD //{" "}
                  {matchData.group.toUpperCase()}
                </div>

                <div className="mt-4 bg-gradient-to-r from-cyan-300 via-white to-pink-500 bg-clip-text text-7xl font-black italic tracking-tighter text-transparent md:text-8xl">
                  VS
                </div>

                <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-cyan-400 via-white to-pink-500" />

                <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-black/60 p-4">
                  <div className="text-[9px] font-black tracking-[0.25em] text-cyan-300">
                    AIMGOD AI
                  </div>

                  <div className="mt-1 text-sm font-black">
                    {t("battleAnalysis")}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-3xl font-black text-cyan-300">
                        {leftMomentum}%
                      </div>

                      <div className="text-[8px] text-white/30">
                        {t("momentum")}
                      </div>
                    </div>

                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-cyan-400/10 to-pink-500/10 text-xl font-black shadow-[0_0_25px_rgba(0,240,255,0.12)]">
                      AI
                    </div>

                    <div>
                      <div className="text-3xl font-black text-pink-400">
                        {rightMomentum}%
                      </div>

                      <div className="text-[8px] text-white/30">
                        {t("momentum")}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-white/5 pt-4">
                    <div className="text-[8px] uppercase tracking-widest text-white/30">
                      {t("currentLeader")}
                    </div>

                    <div className="mt-1 font-black">
                      {currentLeader}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-cyan-400/15 bg-cyan-400/5 p-2">
                      <div className="text-[8px] text-white/30">
                        LEFT
                      </div>

                      <div className="truncate text-xs font-black text-cyan-300">
                        {leftCreator.name}
                      </div>
                    </div>

                    <div className="rounded-xl border border-pink-500/15 bg-pink-500/5 p-2">
                      <div className="text-[8px] text-white/30">
                        RIGHT
                      </div>

                      <div className="truncate text-xs font-black text-pink-300">
                        {rightCreator.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT CREATOR */}

            <div className="relative overflow-hidden rounded-3xl border border-pink-500/40 bg-gradient-to-bl from-pink-500/[0.08] via-[#06080d] to-black p-4 shadow-[0_0_40px_rgba(255,0,100,0.06)] md:p-5">
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-pink-500/10 blur-3xl" />

              <div className="relative flex items-center gap-3">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-pink-500 bg-black text-xl font-black text-yellow-400 shadow-[0_0_25px_rgba(255,0,100,0.25)]">
                  {rightCreator.avatar}
                </div>

                <div>
                  <div className="text-[9px] font-black tracking-[0.2em] text-pink-400">
                    COMPETITOR 02
                  </div>

                  <h2 className="text-xl font-black text-pink-200 md:text-2xl">
                    {rightCreator.name}
                  </h2>

                  <p className="text-xs text-white/40">
                    {rightCreator.handle}
                  </p>
                </div>

                <div className="ml-auto text-right">
                  <div className="text-[9px] text-white/30">
                    GLOBAL RANK
                  </div>

                  <div className="text-xl font-black text-pink-300">
                    #{rightCreator.rank}
                  </div>
                </div>
              </div>

              {/* RIGHT LIVE FEED */}

              <div className="relative mt-4 flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-pink-500/20 bg-[radial-gradient(circle_at_center,rgba(255,0,100,0.08),transparent_50%)]">
                <div className="absolute left-3 top-3 rounded-lg border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-[9px] font-black text-pink-400">
                  ● LIVE
                </div>

                <div className="text-center text-white/35">
                  <div className="text-5xl">
                    📱
                  </div>

                  <div className="mt-3 text-sm font-black text-pink-300">
                    TIKTOK LIVE
                  </div>

                  <div className="mt-1 text-[10px]">
                    {rightCreator.handle}
                  </div>
                </div>
              </div>

              {/* RIGHT SCORE */}

              <div className="relative mt-4 flex items-end justify-between">
                <div>
                  <div className="text-4xl font-black text-pink-300 md:text-5xl">
                    {rightScore.toLocaleString()}
                  </div>

                  <div className="text-[10px] font-black tracking-[0.2em] text-pink-400">
                    {t("giftPoints")}
                  </div>
                </div>

                <div className="text-right text-xs">
                  <div className="text-white/30">
                    {rightCreator.flag}{" "}
                    {rightCreator.country.toUpperCase()}
                  </div>

                  <div className="mt-1 font-black">
                    {rightCreator.club}
                  </div>
                </div>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full border border-pink-500/20 bg-black">
                <div
                  className="h-full bg-pink-500 shadow-[0_0_18px_rgba(255,0,100,0.8)] transition-all duration-500"
                  style={{
                    width: `${rightMomentum}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* BOTTOM PANELS */}

          {!fullArena && (
            <div className="mt-4 grid gap-3 xl:grid-cols-[1.25fr_1.5fr_1fr]">
              {/* LIVE COMMENTS */}

              <div className="rounded-2xl border border-cyan-400/15 bg-black/70 p-4 backdrop-blur">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-pink-400">
                    💬 {t("liveChat")}
                  </h3>

                  <span className="text-[9px] text-emerald-400">
                    ● 2.3K ONLINE
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <div>
                    👑 <b>Kingdom:</b>{" "}
                    <span className="text-white/50">
                      {leftCreator.name} let's go 🔥
                    </span>
                  </div>

                  <div>
                    ⚡ <b>Slickas:</b>{" "}
                    <span className="text-white/50">
                      {rightCreator.name} strong!
                    </span>
                  </div>

                  <div>
                    🤖{" "}
                    <b className="text-cyan-300">
                      AIMGOD AI:
                    </b>{" "}
                    <span className="text-white/50">
                      Battle momentum updating...
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <input
                    placeholder="Say something..."
                    className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs outline-none focus:border-cyan-400/40"
                  />

                  <button className="rounded-xl bg-cyan-400 px-4 font-black text-black">
                    ➤
                  </button>
                </div>
              </div>

              {/* MINIMIZED GIFTS */}

              <div className="rounded-2xl border border-pink-500/15 bg-black/70 p-4 backdrop-blur">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-black">
                      🎁 {t("gifts")}
                    </h3>

                    <div className="text-[9px] text-white/30">
                      SELECT WHO RECEIVES THE GIFT
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setGiftsOpen(
                        !giftsOpen
                      )
                    }
                    className="rounded-lg border border-pink-500/30 px-3 py-2 text-[9px] font-black text-pink-300"
                  >
                    {giftsOpen
                      ? "MINIMIZE"
                      : "VIEW ALL"}
                  </button>
                </div>

                {/* GIFT TARGET */}

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    onClick={() =>
                      setGiftTarget(
                        "left"
                      )
                    }
                    className={`truncate rounded-lg border px-3 py-2 text-[9px] font-black ${
                      giftTarget ===
                      "left"
                        ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-300"
                        : "border-white/10 text-white/40"
                    }`}
                  >
                    {leftCreator.name}
                  </button>

                  <button
                    onClick={() =>
                      setGiftTarget(
                        "right"
                      )
                    }
                    className={`truncate rounded-lg border px-3 py-2 text-[9px] font-black ${
                      giftTarget ===
                      "right"
                        ? "border-pink-500/50 bg-pink-500/10 text-pink-300"
                        : "border-white/10 text-white/40"
                    }`}
                  >
                    {rightCreator.name}
                  </button>
                </div>

                <div
                  className={`mt-4 grid gap-2 ${
                    giftsOpen
                      ? "grid-cols-3 md:grid-cols-6"
                      : "grid-cols-3"
                  }`}
                >
                  {(giftsOpen
                    ? gifts
                    : gifts.slice(
                        0,
                        3
                      )
                  ).map((gift) => (
                    <button
                      key={gift.name}
                      disabled={
                        !matchStarted ||
                        matchEnded
                      }
                      onClick={() =>
                        addGiftScore(
                          gift.points
                        )
                      }
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center transition hover:border-cyan-400/40 hover:bg-cyan-400/5 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <div className="text-xl">
                        {gift.icon}
                      </div>

                      <div className="mt-1 text-[10px] font-black">
                        {gift.name}
                      </div>

                      <div className="text-[9px] text-pink-400">
                        +{gift.points}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* TOP SUPPORTERS */}

              <div className="rounded-2xl border border-cyan-400/15 bg-black/70 p-4 backdrop-blur">
                <h3 className="font-black text-cyan-300">
                  👑 {t("topSupporters")}
                </h3>

                <div className="mt-4 space-y-3 text-xs">
                  {[
                    [
                      "01",
                      "Kingdom",
                      "4,250",
                    ],
                    [
                      "02",
                      "Slickas",
                      "2,850",
                    ],
                    [
                      "03",
                      "Creator X",
                      "1,940",
                    ],
                  ].map(
                    ([
                      rank,
                      name,
                      score,
                    ]) => (
                      <div
                        key={name}
                        className="flex items-center justify-between border-b border-white/5 pb-2"
                      >
                        <div>
                          <span className="mr-2 text-yellow-400">
                            {rank}
                          </span>

                          {name}
                        </div>

                        <b>{score}</b>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* DEVELOPMENT CONTROLS */}

         {process.env.NODE_ENV === "development" && !matchEnded && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/[0.015] p-3">
              <span className="mr-2 text-[8px] uppercase tracking-widest text-white/25">
                DEV SCORE TEST
              </span>

              <button
                disabled={!matchStarted}
                onClick={endMatchNow}
                className="rounded-lg border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-[9px] font-black text-yellow-300 transition hover:bg-yellow-400/20 disabled:cursor-not-allowed disabled:opacity-20"
              >
                ■ END MATCH NOW
              </button>

              {[100, 500, 1000].map(
                (points) => (
                  <button
                    key={`left-${points}`}
                    disabled={
                      !matchStarted
                    }
                    onClick={() =>
                      addLeftScore(
                        points
                      )
                    }
                    className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-3 py-2 text-[9px] font-black text-cyan-300 disabled:opacity-20"
                  >
                    {leftCreator.name} +
                    {points}
                  </button>
                )
              )}

              {[100, 500, 1000].map(
                (points) => (
                  <button
                    key={`right-${points}`}
                    disabled={
                      !matchStarted
                    }
                    onClick={() =>
                      addRightScore(
                        points
                      )
                    }
                    className="rounded-lg border border-pink-500/20 bg-pink-500/5 px-3 py-2 text-[9px] font-black text-pink-300 disabled:opacity-20"
                  >
                    {rightCreator.name} +
                    {points}
                  </button>
                )
              )}
            </div>
          )}

                </section>
{/* MATCH RESULT */}

{matchEnded && (
  <div className="mt-5 overflow-hidden rounded-3xl border border-yellow-400/30 bg-gradient-to-r from-yellow-400/5 via-black to-yellow-400/5 p-6 text-center shadow-[0_0_40px_rgba(250,204,21,0.08)]">
    <div className="text-[10px] font-black tracking-[0.4em] text-yellow-400">
      {t("matchComplete")}
    </div>

    <div className="mt-3 text-4xl font-black md:text-5xl">
      {winner === "DRAW"
        ? "🤝 DRAW"
        : `🏆 ${winner} WINS`}
    </div>

    {/* GROUP STAGE RESULT */}
    {matchData.stage === "Group Stage" && (
      <div className="mx-auto mt-6 grid max-w-xl grid-cols-2 gap-3">
        <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">
          <div className="truncate text-xs text-cyan-300">
            {leftCreator.name}
          </div>

          <div className="mt-1 text-3xl font-black">
            +{leftQualificationPoints}
          </div>

          <div className="text-[8px] text-white/30">
            WORLD CUP PTS
          </div>
        </div>

        <div className="rounded-xl border border-pink-500/20 bg-pink-500/5 p-4">
          <div className="truncate text-xs text-pink-300">
            {rightCreator.name}
          </div>

          <div className="mt-1 text-3xl font-black">
            +{rightQualificationPoints}
          </div>

          <div className="text-[8px] text-white/30">
            WORLD CUP PTS
          </div>
        </div>
      </div>
    )}

    {/* SEMIFINAL RESULT */}
    {matchData.stage === "Semifinal" && winner !== "DRAW" && (
      <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-5">
        <div className="text-[9px] font-black tracking-[0.25em] text-cyan-300">
          KNOCKOUT RESULT
        </div>

        <div className="mt-2 text-2xl font-black">
          {winner}
        </div>

        <div className="mt-2 text-sm font-black text-yellow-300">
          ADVANCES TO WORLD CUP FINAL
        </div>
      </div>
    )}

    {/* WORLD CUP FINAL RESULT */}
    {matchData.stage === "World Cup Final" && winner !== "DRAW" && (
      <div className="mx-auto mt-6 max-w-xl rounded-3xl border border-yellow-400/50 bg-yellow-400/10 p-6 shadow-[0_0_40px_rgba(250,204,21,0.12)]">
        <div className="text-5xl">
          🏆
        </div>

        <div className="mt-3 text-[10px] font-black tracking-[0.35em] text-yellow-400">
          AIMGOD WORLD CUP
        </div>

        <div className="mt-2 text-3xl font-black text-yellow-300">
          {winner}
        </div>

        <div className="mt-2 text-sm font-black">
          WORLD CUP CHAMPION
        </div>
      </div>
    )}

    <div className="mt-5 text-xs text-white/40">
      FINAL SCORE:{" "}
      {leftScore.toLocaleString()}
      {" — "}
      {rightScore.toLocaleString()}
    </div>
{(matchData.stage === "Semifinal" ||
  matchData.stage === "World Cup Final") && (
  <button
    onClick={() => router.push("/bracket")}
    className="mt-6 rounded-xl border border-yellow-400/40 bg-yellow-400/10 px-6 py-3 text-xs font-black text-yellow-300 transition hover:bg-yellow-400/20"
  >
    ← BACK TO BRACKET
  </button>
)}
  </div>
)}
      </div>
    </main>
  );
}