import type { StandingRow } from "./standings";
import type { SavedMatchResult } from "./results";

export type KnockoutMatch = {
  id: string;
  round: "semifinal" | "final";
  leftCreatorId: string | null;
  rightCreatorId: string | null;
};

export type KnockoutState = {
  semifinal1: KnockoutMatch;
  semifinal2: KnockoutMatch;
  final: KnockoutMatch;
  championId: string | null;
};

export function getKnockoutState(
  groupA: StandingRow[],
  groupB: StandingRow[],
  savedResults: SavedMatchResult[]
): KnockoutState {
  const a1 = groupA[0] ?? null;
  const a2 = groupA[1] ?? null;
  const b1 = groupB[0] ?? null;
  const b2 = groupB[1] ?? null;

  const semifinal1: KnockoutMatch = {
    id: "world-cup-semifinal-1",
    round: "semifinal",
    leftCreatorId: a1?.creatorId ?? null,
    rightCreatorId: b2?.creatorId ?? null,
  };

  const semifinal2: KnockoutMatch = {
    id: "world-cup-semifinal-2",
    round: "semifinal",
    leftCreatorId: b1?.creatorId ?? null,
    rightCreatorId: a2?.creatorId ?? null,
  };

  const semi1Result = savedResults.find(
    (result) => result.matchId === semifinal1.id
  );

  const semi2Result = savedResults.find(
    (result) => result.matchId === semifinal2.id
  );

  const semi1WinnerId = getWinnerId(
    semifinal1,
    semi1Result
  );

  const semi2WinnerId = getWinnerId(
    semifinal2,
    semi2Result
  );

  const final: KnockoutMatch = {
    id: "world-cup-final",
    round: "final",
    leftCreatorId: semi1WinnerId,
    rightCreatorId: semi2WinnerId,
  };

  const finalResult = savedResults.find(
    (result) => result.matchId === final.id
  );

  const championId = getWinnerId(
    final,
    finalResult
  );

  return {
    semifinal1,
    semifinal2,
    final,
    championId,
  };
}

export function getWinnerId(
  match: KnockoutMatch,
  result?: SavedMatchResult
) {
  if (
    !result ||
    !match.leftCreatorId ||
    !match.rightCreatorId
  ) {
    return null;
  }

  if (result.leftScore === result.rightScore) {
    return null;
  }

  return result.leftScore > result.rightScore
    ? match.leftCreatorId
    : match.rightCreatorId;
}