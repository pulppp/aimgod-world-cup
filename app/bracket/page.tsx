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

import {
  getKnockoutState,
} from "../data/knockout";

type BracketPlayer =
  | StandingRow
  | null;

export default function BracketPage() {
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

  const standings =
    calculateAllStandings(
      savedResults
    );

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

  const groupARows =
    groupA?.rows ?? [];

  const groupBRows =
    groupB?.rows ?? [];

  const knockout =
    getKnockoutState(
      groupARows,
      groupBRows,
      savedResults
    );

  const allPlayers = [
    ...groupARows,
    ...groupBRows,
  ];

  const findPlayer = (
    creatorId:
      | string
      | null
  ): BracketPlayer => {
    if (!creatorId) {
      return null;
    }

    return (
      allPlayers.find(
        (player) =>
          player.creatorId ===
          creatorId
      ) ?? null
    );
  };

  const a1 =
    groupARows[0] ?? null;

  const a2 =
    groupARows[1] ?? null;

  const b1 =
    groupBRows[0] ?? null;

  const b2 =
    groupBRows[1] ?? null;

  const semi1Left =
    findPlayer(
      knockout.semifinal1
        .leftCreatorId
    );

  const semi1Right =
    findPlayer(
      knockout.semifinal1
        .rightCreatorId
    );

  const semi2Left =
    findPlayer(
      knockout.semifinal2
        .leftCreatorId
    );

  const semi2Right =
    findPlayer(
      knockout.semifinal2
        .rightCreatorId
    );

  const finalist1 =
    findPlayer(
      knockout.final
        .leftCreatorId
    );

  const finalist2 =
    findPlayer(
      knockout.final
        .rightCreatorId
    );

  const champion =
    findPlayer(
      knockout.championId
    );

  const semi1Result =
    savedResults.find(
      (result) =>
        result.matchId ===
        knockout.semifinal1.id
    );

  const semi2Result =
    savedResults.find(
      (result) =>
        result.matchId ===
        knockout.semifinal2.id
    );

  const finalResult =
    savedResults.find(
      (result) =>
        result.matchId ===
        knockout.final.id
    );

  const navItems = [
    [
      "⌂",
      "Home",
      "/",
    ],
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
    [
      "⬡",
      "Clubs",
      "/clubs",
    ],
    [
      "▥",
      "Rankings",
      "/rankings",
    ],
    [
      "◈",
      "Bracket",
      "/bracket",
    ],
    [
      "🎁",
      "Gifts",
      "/gifts",
    ],
  ];

  return (
    <main className="min-h-screen bg-[#020306] text-white">
      {/* BACKGROUND */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-[10%] h-80 w-80 rounded-full bg-cyan-400/10 blur-[130px]" />

        <div className="absolute right-[8%] top-[18%] h-80 w-80 rounded-full bg-pink-500/10 blur-[130px]" />

        <div className="absolute bottom-[5%] left-[38%] h-72 w-72 rounded-full bg-yellow-400/5 blur-[130px]" />
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

          <div className="hidden rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-5 py-2 md:block">
            <div className="text-xs font-black text-yellow-300">
              KNOCKOUT STAGE
            </div>

            <div className="text-[9px] text-white/40">
              ROAD TO THE FINAL
            </div>
          </div>

          <div className="ml-auto flex gap-2">
            <button
              onClick={() =>
                router.push(
                  "/rankings"
                )
              }
              className="rounded-xl border border-cyan-400/30 bg-cyan-400/5 px-4 py-3 text-xs font-black text-cyan-300"
            >
              ▥ STANDINGS
            </button>

            <button
              onClick={() =>
                router.push(
                  "/matches"
                )
              }
              className="rounded-xl border border-pink-500/30 bg-pink-500/5 px-4 py-3 text-xs font-black text-pink-300"
            >
              ⚔ MATCHES
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex">
        {/* NAV */}

        <aside className="hidden min-h-[calc(100vh-76px)] w-52 shrink-0 border-r border-cyan-400/15 bg-black/65 p-3 lg:block">
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
                  onClick={() =>
                    router.push(
                      path
                    )
                  }
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${
                    path ===
                    "/bracket"
                      ? "border-yellow-400/40 bg-yellow-400/10 text-yellow-300"
                      : "border-transparent text-white/50 hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-cyan-300"
                  }`}
                >
                  <span>
                    {icon}
                  </span>

                  {label}
                </button>
              )
            )}
          </div>

          <div className="mt-8 rounded-2xl border border-yellow-400/30 bg-yellow-400/5 p-4 text-center">
            <div className="text-4xl">
              🏆
            </div>

            <div className="mt-2 font-black">
              AIMGOD
            </div>

            <div className="text-[10px] font-black tracking-widest text-yellow-400">
              WORLD CUP
            </div>
          </div>
        </aside>

        {/* MAIN */}

        <section className="min-w-0 flex-1 px-4 py-8 md:px-8">
          <div className="mx-auto max-w-7xl">
            {/* HEADING */}

            <div>
              <div className="text-xs font-black tracking-[0.3em] text-cyan-400">
                AIMGOD WORLD CUP
              </div>

              <h1 className="mt-2 text-4xl font-black uppercase md:text-5xl">
                Knockout Bracket
              </h1>

              <p className="mt-3 max-w-2xl text-sm text-white/40">
                Semifinal winners
                automatically advance
                to the World Cup Final.
                The Final winner becomes
                the AIMGOD World Cup
                Champion.
              </p>
            </div>

            {/* QUALIFIERS */}

            <div className="mt-6 grid gap-3 md:grid-cols-4">
              <QualifierCard
                label="GROUP A #1"
                player={a1}
              />

              <QualifierCard
                label="GROUP A #2"
                player={a2}
              />

              <QualifierCard
                label="GROUP B #1"
                player={b1}
              />

              <QualifierCard
                label="GROUP B #2"
                player={b2}
              />
            </div>

            {/* KNOCKOUT STATUS */}

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <StatusCard
                title="SEMIFINAL 1"
                complete={
                  Boolean(
                    semi1Result
                  )
                }
              />

              <StatusCard
                title="SEMIFINAL 2"
                complete={
                  Boolean(
                    semi2Result
                  )
                }
              />

              <StatusCard
                title="WORLD CUP FINAL"
                complete={
                  Boolean(
                    finalResult
                  )
                }
              />
            </div>

            {/* BRACKET */}

            <div className="mt-10 overflow-x-auto rounded-3xl border border-white/10 bg-black/60 p-5 md:p-8">
              <div className="min-w-[1000px]">
                <div className="grid grid-cols-[1fr_120px_1fr_120px_1fr] items-center gap-3">
                  {/* SEMIFINAL 1 */}

                  <div>
                    <div className="mb-3 text-center text-[10px] font-black tracking-[0.25em] text-cyan-300">
                      SEMIFINAL 1
                    </div>

                    <MatchCard
                      top={
                        semi1Left
                      }
                      bottom={
                        semi1Right
                      }
                      result={
                        semi1Result
                      }
                    />

                    <button
                      onClick={() =>
                        router.push(
                          `/matches/${knockout.semifinal1.id}`
                        )
                      }
                      disabled={
                        !semi1Left ||
                        !semi1Right
                      }
                      className="mt-3 w-full rounded-xl border border-cyan-400/30 bg-cyan-400/5 px-4 py-3 text-[10px] font-black text-cyan-300 transition hover:bg-cyan-400/10 disabled:opacity-30"
                    >
                      ⚔ ENTER ARENA
                    </button>
                  </div>

                  {/* CONNECTOR */}

                  <div className="flex items-center">
                    <div className="h-px flex-1 bg-cyan-400/30" />

                    <div className="h-24 w-px bg-cyan-400/30" />

                    <div className="h-px flex-1 bg-cyan-400/30" />
                  </div>

                  {/* FINAL */}

                  <div>
                    <div className="mb-3 text-center text-[10px] font-black tracking-[0.3em] text-yellow-300">
                      WORLD CUP FINAL
                    </div>

                    <div className="rounded-3xl border border-yellow-400/40 bg-gradient-to-br from-yellow-400/10 via-black to-pink-500/10 p-5 shadow-[0_0_40px_rgba(250,204,21,0.08)]">
                      <FinalPlayer
                        player={
                          finalist1
                        }
                        label="FINALIST 1"
                      />

                      <div className="my-4 text-center text-3xl font-black text-yellow-400">
                        VS
                      </div>

                      <FinalPlayer
                        player={
                          finalist2
                        }
                        label="FINALIST 2"
                      />

                      {finalResult && (
                        <div className="mt-4 rounded-xl border border-yellow-400/20 bg-yellow-400/5 p-3 text-center">
                          <div className="text-[9px] text-white/30">
                            FINAL SCORE
                          </div>

                          <div className="mt-1 font-black text-yellow-300">
                            {
                              finalResult.leftScore
                            }
                            {" — "}
                            {
                              finalResult.rightScore
                            }
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() =>
                        router.push(
                          `/matches/${knockout.final.id}`
                        )
                      }
                      disabled={
                        !finalist1 ||
                        !finalist2
                      }
                      className="mt-3 w-full rounded-xl border border-yellow-400/30 bg-yellow-400/5 px-4 py-3 text-[10px] font-black text-yellow-300 transition hover:bg-yellow-400/10 disabled:opacity-30"
                    >
                      🏆 ENTER FINAL
                    </button>
                  </div>

                  {/* CONNECTOR */}

                  <div className="flex items-center">
                    <div className="h-px flex-1 bg-pink-500/30" />

                    <div className="h-24 w-px bg-pink-500/30" />

                    <div className="h-px flex-1 bg-pink-500/30" />
                  </div>

                  {/* SEMIFINAL 2 */}

                  <div>
                    <div className="mb-3 text-center text-[10px] font-black tracking-[0.25em] text-pink-300">
                      SEMIFINAL 2
                    </div>

                    <MatchCard
                      top={
                        semi2Left
                      }
                      bottom={
                        semi2Right
                      }
                      result={
                        semi2Result
                      }
                    />

                    <button
                      onClick={() =>
                        router.push(
                          `/matches/${knockout.semifinal2.id}`
                        )
                      }
                      disabled={
                        !semi2Left ||
                        !semi2Right
                      }
                      className="mt-3 w-full rounded-xl border border-pink-500/30 bg-pink-500/5 px-4 py-3 text-[10px] font-black text-pink-300 transition hover:bg-pink-500/10 disabled:opacity-30"
                    >
                      ⚔ ENTER ARENA
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* CHAMPION */}

            <div
              className={`mx-auto mt-10 max-w-xl rounded-3xl border p-8 text-center transition ${
                champion
                  ? "border-yellow-400/60 bg-yellow-400/10 shadow-[0_0_60px_rgba(250,204,21,0.15)]"
                  : "border-yellow-400/30 bg-yellow-400/5"
              }`}
            >
              <div className="text-6xl">
                {champion
                  ? "🏆"
                  : "👑"}
              </div>

              <div className="mt-4 text-[10px] font-black tracking-[0.35em] text-yellow-400">
                AIMGOD WORLD CUP
              </div>

              {champion ? (
                <>
                  <div className="mt-3 flex items-center justify-center gap-3">
                    <span className="text-3xl">
                      {
                        champion.avatar
                      }
                    </span>

                    <span className="text-3xl">
                      {
                        champion.flag
                      }
                    </span>
                  </div>

                  <div className="mt-3 text-4xl font-black text-yellow-300">
                    {
                      champion.name
                    }
                  </div>

                  <div className="mt-2 text-sm font-black">
                    WORLD CUP
                    CHAMPION
                  </div>

                  <div className="mt-2 text-xs text-white/40">
                    {
                      champion.club
                    }
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-2 text-3xl font-black">
                    CHAMPION
                  </div>

                  <div className="mt-2 text-sm text-white/30">
                    Complete both
                    semifinals and
                    the Final to
                    crown the
                    champion.
                  </div>
                </>
              )}
            </div>

            {/* SYSTEM INFO */}

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <InfoCard
                title="GROUP QUALIFICATION"
                text="Top two creators from each group advance."
              />

              <InfoCard
                title="AUTOMATIC ADVANCEMENT"
                text="Semifinal winners are placed into the Final automatically."
              />

              <InfoCard
                title="CHAMPION ENGINE"
                text="The winner of the Final is automatically crowned AIMGOD World Cup Champion."
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function QualifierCard({
  label,
  player,
}: {
  label: string;
  player: BracketPlayer;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="text-[9px] font-black tracking-widest text-white/30">
        {label}
      </div>

      {player ? (
        <div className="mt-3 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/20 bg-black text-lg font-black">
            {
              player.avatar
            }
          </div>

          <div>
            <div className="font-black">
              {
                player.flag
              }{" "}
              {
                player.name
              }
            </div>

            <div className="text-[9px] text-white/30">
              {
                player.points
              }{" "}
              PTS
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-3 text-sm text-white/30">
          TBD
        </div>
      )}
    </div>
  );
}

function MatchCard({
  top,
  bottom,
  result,
}: {
  top: BracketPlayer;
  bottom: BracketPlayer;
  result?: SavedMatchResult;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#05070a]">
      <PlayerRow
        player={top}
        side="cyan"
        score={
          result?.leftScore
        }
      />

      <div className="border-y border-white/5 py-2 text-center text-[10px] font-black text-white/30">
        {result
          ? "FINAL"
          : "VS"}
      </div>

      <PlayerRow
        player={bottom}
        side="pink"
        score={
          result?.rightScore
        }
      />
    </div>
  );
}

function PlayerRow({
  player,
  side,
  score,
}: {
  player: BracketPlayer;
  side:
    | "cyan"
    | "pink";
  score?: number;
}) {
  const sideClass =
    side === "cyan"
      ? "text-cyan-300"
      : "text-pink-300";

  return (
    <div className="flex items-center gap-3 p-4">
      {player ? (
        <>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black font-black">
            {
              player.avatar
            }
          </div>

          <div className="min-w-0 flex-1">
            <div
              className={`truncate font-black ${sideClass}`}
            >
              {
                player.name
              }
            </div>

            <div className="truncate text-[9px] text-white/30">
              {
                player.flag
              }{" "}
              {
                player.club
              }
            </div>
          </div>

          {score !==
            undefined && (
            <div className="text-lg font-black">
              {score.toLocaleString()}
            </div>
          )}
        </>
      ) : (
        <div className="text-sm text-white/30">
          TBD
        </div>
      )}
    </div>
  );
}

function FinalPlayer({
  player,
  label,
}: {
  player: BracketPlayer;
  label: string;
}) {
  return (
    <div className="text-center">
      <div className="text-[9px] font-black tracking-widest text-white/30">
        {label}
      </div>

      {player ? (
        <>
          <div className="mt-2 text-3xl">
            {
              player.avatar
            }
          </div>

          <div className="mt-2 text-lg font-black">
            {
              player.flag
            }{" "}
            {
              player.name
            }
          </div>

          <div className="mt-1 text-[9px] text-white/30">
            {
              player.club
            }
          </div>
        </>
      ) : (
        <div className="mt-3 text-sm font-black text-white/30">
          WAITING FOR
          SEMIFINAL WINNER
        </div>
      )}
    </div>
  );
}

function StatusCard({
  title,
  complete,
}: {
  title: string;
  complete: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        complete
          ? "border-emerald-400/30 bg-emerald-400/5"
          : "border-white/10 bg-white/[0.02]"
      }`}
    >
      <div className="text-[9px] text-white/30">
        {title}
      </div>

      <div
        className={`mt-1 text-sm font-black ${
          complete
            ? "text-emerald-300"
            : "text-yellow-300"
        }`}
      >
        {complete
          ? "✓ COMPLETE"
          : "● WAITING"}
      </div>
    </div>
  );
}

function InfoCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div className="text-xs font-black text-cyan-300">
        {title}
      </div>

      <div className="mt-2 text-xs leading-5 text-white/40">
        {text}
      </div>
    </div>
  );
}