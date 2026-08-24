"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  calculateAllStandings,
  StandingRow,
} from "../data/standings";

import {
  getSavedResults,
  SavedMatchResult,
} from "../data/results";

export default function RankingsPage() {
  const router = useRouter();

  const [
    savedResults,
    setSavedResults,
  ] = useState<
    SavedMatchResult[]
  >([]);

  useEffect(() => {
    const refreshResults = () => {
      setSavedResults(
        getSavedResults()
      );
    };

    refreshResults();

    window.addEventListener(
      "aimgod-results-updated",
      refreshResults
    );

    window.addEventListener(
      "storage",
      refreshResults
    );

    return () => {
      window.removeEventListener(
        "aimgod-results-updated",
        refreshResults
      );

      window.removeEventListener(
        "storage",
        refreshResults
      );
    };
  }, []);

  const groups =
    calculateAllStandings(
      savedResults
    );

  const navItems = [
    ["⌂", "Home", "/"],
    [
      "⚔",
      "Matches",
      "/matches",
    ],
    [
      "🏆",
      "Leagues",
      "/leagues",
    ],
    ["⬡", "Clubs", "/clubs"],
    ["♙", "Creators", "#"],
    [
      "▥",
      "Rankings",
      "/rankings",
    ],
    ["🎁", "Gifts", "/gifts"],
    ["◫", "Wallet", "#"],
    ["◉", "AI Hub", "#"],
    ["⚙", "Settings", "#"],
  ];

  return (
    <main className="min-h-screen bg-[#020306] text-white">
      {/* BACKGROUND GLOW */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[15%] h-80 w-80 rounded-full bg-cyan-400/10 blur-[130px]" />

        <div className="absolute right-[10%] top-[20%] h-80 w-80 rounded-full bg-pink-500/10 blur-[130px]" />

        <div className="absolute bottom-[5%] left-[40%] h-72 w-72 rounded-full bg-purple-500/10 blur-[130px]" />
      </div>

      {/* TOP HUD */}

      <header className="relative z-30 border-b border-cyan-400/20 bg-black/85 backdrop-blur-xl">
        <div className="flex min-h-[76px] items-center gap-4 px-5">
          <div>
            <div className="text-2xl font-black">
              AIM
              <span className="text-cyan-400">
                GOD
              </span>
            </div>

            <div className="text-[9px] font-black tracking-[0.35em] text-pink-500">
              WORLD CUP
            </div>
          </div>

          <div className="hidden rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-5 py-2 md:block">
            <div className="text-xs font-black text-cyan-300">
              GLOBAL TOURNAMENT
            </div>

            <div className="text-[9px] text-white/40">
              GROUP STAGE • LIVE
              STANDINGS
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-center sm:block">
              <div className="text-[8px] uppercase tracking-wider text-white/30">
                SAVED RESULTS
              </div>

              <div className="font-black text-cyan-300">
                {savedResults.length}
              </div>
            </div>

            <div className="rounded-xl border border-pink-500/30 bg-pink-500/10 px-4 py-2">
              <div className="text-[10px] font-black text-pink-400">
                ● WORLD CUP
              </div>
            </div>

            <button
              onClick={() =>
                router.push(
                  "/matches"
                )
              }
              className="rounded-xl border border-cyan-400/30 bg-cyan-400/5 px-4 py-3 text-xs font-black text-cyan-300 transition hover:bg-cyan-400/10"
            >
              ⚔ MATCHES
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex">
        {/* LEFT NAV */}

        <aside className="hidden min-h-[calc(100vh-76px)] w-52 shrink-0 border-r border-cyan-400/15 bg-black/65 p-3 backdrop-blur-xl lg:block">
          <div className="mb-4 px-3 py-2 text-[9px] font-black tracking-[0.3em] text-cyan-400/50">
            AIMGOD SYSTEM
          </div>

          <div className="space-y-1">
            {navItems.map(
              ([
                icon,
                label,
                path,
              ]) => (
                <button
                  key={label}
                  onClick={() => {
                    if (
                      path !== "#"
                    ) {
                      router.push(
                        path
                      );
                    }
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${
                    path ===
                    "/rankings"
                      ? "border-pink-500/50 bg-pink-500/10 text-pink-300 shadow-[0_0_20px_rgba(255,0,100,0.12)]"
                      : "border-transparent text-white/50 hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-cyan-300"
                  }`}
                >
                  <span className="w-5 text-center">
                    {icon}
                  </span>

                  {label}
                </button>
              )
            )}
          </div>

          <div className="mt-8 rounded-2xl border border-yellow-400/30 bg-yellow-400/5 p-4 text-center">
            <div className="text-3xl">
              🏆
            </div>

            <div className="mt-2 font-black">
              ROAD TO
            </div>

            <div className="text-[10px] font-black tracking-wider text-yellow-400">
              AIMGOD CHAMPION
            </div>
          </div>
        </aside>

        {/* MAIN */}

        <section className="min-w-0 flex-1 px-4 py-8 md:px-8">
          <div className="mx-auto max-w-7xl">
            {/* PAGE HEADING */}

            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
                  AIMGOD WORLD CUP
                </div>

                <h1 className="mt-2 text-4xl font-black uppercase md:text-5xl">
                  Group Standings
                </h1>

                <p className="mt-3 max-w-2xl text-sm text-white/40">
                  Completed Arena
                  matches automatically
                  update the World Cup
                  table. The top
                  creators advance to
                  the knockout stage.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                <div className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                  SCORING SYSTEM
                </div>

                <div className="mt-2 flex gap-4 text-xs font-black">
                  <span className="text-emerald-400">
                    WIN +3
                  </span>

                  <span className="text-yellow-400">
                    DRAW +1
                  </span>

                  <span className="text-pink-400">
                    LOSS +0
                  </span>
                </div>
              </div>
            </div>

            {/* LIVE SYSTEM STATUS */}

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
                <div className="text-[9px] font-black tracking-widest text-cyan-300">
                  ◉ RESULT ENGINE
                </div>

                <div className="mt-2 text-sm font-black">
                  ACTIVE
                </div>

                <div className="mt-1 text-[10px] text-white/30">
                  Arena results feed
                  standings automatically
                </div>
              </div>

              <div className="rounded-2xl border border-pink-500/20 bg-pink-500/5 p-4">
                <div className="text-[9px] font-black tracking-widest text-pink-300">
                  ⚔ COMPLETED
                </div>

                <div className="mt-2 text-2xl font-black">
                  {
                    savedResults.length
                  }
                </div>

                <div className="mt-1 text-[10px] text-white/30">
                  Browser-saved match
                  results
                </div>
              </div>

              <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-4">
                <div className="text-[9px] font-black tracking-widest text-yellow-300">
                  🏆 QUALIFICATION
                </div>

                <div className="mt-2 text-sm font-black">
                  TOP 2 / GROUP
                </div>

                <div className="mt-1 text-[10px] text-white/30">
                  Advances to knockout
                  stage
                </div>
              </div>
            </div>

            {/* GROUP TABLES */}

            <div className="mt-8 space-y-8">
              {groups.map(
                (group) => (
                  <GroupTable
                    key={
                      group.group
                    }
                    group={
                      group.group
                    }
                    rows={
                      group.rows
                    }
                  />
                )
              )}
            </div>

            {/* LEGEND */}

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
                <div className="text-xs font-black text-cyan-300">
                  🏆 QUALIFICATION
                </div>

                <p className="mt-2 text-xs leading-5 text-white/40">
                  The top two
                  creators in each
                  group occupy the
                  qualifying
                  positions.
                </p>
              </div>

              <div className="rounded-2xl border border-pink-500/20 bg-pink-500/5 p-5">
                <div className="text-xs font-black text-pink-300">
                  ⚔ TIEBREAKERS
                </div>

                <p className="mt-2 text-xs leading-5 text-white/40">
                  Points rank first,
                  followed by gift
                  difference, then
                  total gift points
                  scored.
                </p>
              </div>

              <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-5">
                <div className="text-xs font-black text-yellow-300">
                  ◉ AIMGOD SYSTEM
                </div>

                <p className="mt-2 text-xs leading-5 text-white/40">
                  During development,
                  results are stored
                  locally. Later the
                  same system will
                  connect to the
                  AIMGOD database.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function GroupTable({
  group,
  rows,
}: {
  group: string;
  rows: StandingRow[];
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-[0_0_50px_rgba(0,240,255,0.04)] backdrop-blur-xl">
      {/* GROUP HEADER */}

      <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-cyan-400/[0.08] via-transparent to-pink-500/[0.08] px-5 py-4">
        <div>
          <div className="text-[9px] font-black tracking-[0.3em] text-cyan-400">
            WORLD CUP
          </div>

          <h2 className="mt-1 text-2xl font-black uppercase">
            {group}
          </h2>
        </div>

        <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-[9px] font-black text-cyan-300">
          TOP 2 ADVANCE
        </div>
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left">
          <thead>
            <tr className="border-b border-white/10 text-[9px] uppercase tracking-wider text-white/30">
              <th className="px-5 py-4">
                #
              </th>

              <th className="px-3 py-4">
                Creator
              </th>

              <th className="px-3 py-4 text-center">
                P
              </th>

              <th className="px-3 py-4 text-center">
                W
              </th>

              <th className="px-3 py-4 text-center">
                D
              </th>

              <th className="px-3 py-4 text-center">
                L
              </th>

              <th className="px-3 py-4 text-right">
                GF
              </th>

              <th className="px-3 py-4 text-right">
                GA
              </th>

              <th className="px-3 py-4 text-right">
                GD
              </th>

              <th className="px-5 py-4 text-right">
                PTS
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map(
              (row, index) => {
                const qualifying =
                  index < 2;

                return (
                  <tr
                    key={
                      row.creatorId
                    }
                    className="border-b border-white/5 transition hover:bg-white/[0.03]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-7 w-1 rounded-full ${
                            qualifying
                              ? "bg-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.8)]"
                              : "bg-white/10"
                          }`}
                        />

                        <span
                          className={
                            qualifying
                              ? "font-black text-cyan-300"
                              : "font-black text-white/40"
                          }
                        >
                          {String(
                            index +
                              1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>
                      </div>
                    </td>

                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-400/20 bg-black text-lg font-black">
                          {
                            row.avatar
                          }
                        </div>

                        <div>
                          <div className="flex items-center gap-2 font-black">
                            <span>
                              {
                                row.flag
                              }
                            </span>

                            {
                              row.name
                            }

                            {qualifying && (
                              <span className="rounded bg-cyan-400/10 px-2 py-1 text-[7px] font-black text-cyan-300">
                                Q
                              </span>
                            )}
                          </div>

                          <div className="mt-1 text-[9px] text-white/30">
                            {
                              row.handle
                            }
                            {" • "}
                            {
                              row.club
                            }
                          </div>
                        </div>
                      </div>
                    </td>

                    <Stat>
                      {
                        row.played
                      }
                    </Stat>

                    <Stat className="text-emerald-400">
                      {
                        row.wins
                      }
                    </Stat>

                    <Stat className="text-yellow-400">
                      {
                        row.draws
                      }
                    </Stat>

                    <Stat className="text-pink-400">
                      {
                        row.losses
                      }
                    </Stat>

                    <NumberStat>
                      {
                        row.giftFor
                      }
                    </NumberStat>

                    <NumberStat>
                      {
                        row.giftAgainst
                      }
                    </NumberStat>

                    <td className="px-3 py-4 text-right text-sm font-black">
                      <span
                        className={
                          row.giftDifference >
                          0
                            ? "text-emerald-400"
                            : row.giftDifference <
                              0
                            ? "text-pink-400"
                            : "text-white/50"
                        }
                      >
                        {row.giftDifference >
                        0
                          ? "+"
                          : ""}

                        {row.giftDifference.toLocaleString()}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="text-xl font-black text-cyan-300">
                        {
                          row.points
                        }
                      </div>
                    </td>
                  </tr>
                );
              }
            )}

            {rows.length ===
              0 && (
              <tr>
                <td
                  colSpan={10}
                  className="px-6 py-10 text-center text-sm text-white/30"
                >
                  No creators have
                  been assigned to
                  this group yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* TABLE FOOTER */}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 px-5 py-4 text-[9px] text-white/30">
        <span>
          P = Played • W =
          Wins • D = Draws • L
          = Losses
        </span>

        <span>
          GF = Gift Points For •
          GA = Against • GD =
          Difference
        </span>
      </div>
    </div>
  );
}

function Stat({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td
      className={`px-3 py-4 text-center text-sm font-black ${className}`}
    >
      {children}
    </td>
  );
}

function NumberStat({
  children,
}: {
  children: number;
}) {
  return (
    <td className="px-3 py-4 text-right text-xs font-bold text-white/60">
      {children.toLocaleString()}
    </td>
  );
}