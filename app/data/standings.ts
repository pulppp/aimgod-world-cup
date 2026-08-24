import {
  matches,
  getCreator,
} from "./matches";

import type {
  SavedMatchResult,
} from "./results";

export type StandingRow = {
  creatorId: string;
  name: string;
  handle: string;
  avatar: string;
  flag: string;
  country: string;
  club: string;
  group: string;

  played: number;
  wins: number;
  draws: number;
  losses: number;

  giftFor: number;
  giftAgainst: number;
  giftDifference: number;

  points: number;
};

export type GroupStandings = {
  group: string;
  rows: StandingRow[];
};

function createEmptyRow(
  creatorId: string,
  group: string
): StandingRow | null {
  const creator =
    getCreator(creatorId);

  if (!creator) {
    return null;
  }

  return {
    creatorId: creator.id,
    name: creator.name,
    handle: creator.handle,
    avatar: creator.avatar,
    flag: creator.flag,
    country: creator.country,
    club: creator.club,
    group,

    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,

    giftFor: 0,
    giftAgainst: 0,
    giftDifference: 0,

    points: 0,
  };
}

function sortStandings(
  rows: StandingRow[]
) {
  return [...rows].sort(
    (a, b) => {
      if (
        b.points !== a.points
      ) {
        return (
          b.points - a.points
        );
      }

      if (
        b.giftDifference !==
        a.giftDifference
      ) {
        return (
          b.giftDifference -
          a.giftDifference
        );
      }

      if (
        b.giftFor !==
        a.giftFor
      ) {
        return (
          b.giftFor -
          a.giftFor
        );
      }

      return a.name.localeCompare(
        b.name
      );
    }
  );
}

export function calculateGroupStandings(
  groupName: string,
  savedResults:
    SavedMatchResult[] = []
): StandingRow[] {
  const groupMatches =
    matches.filter(
      (match) =>
        match.group ===
        groupName
    );

  const creatorIds =
    Array.from(
      new Set(
        groupMatches.flatMap(
          (match) => [
            match.leftCreatorId,
            match.rightCreatorId,
          ]
        )
      )
    );

  const table = new Map<
    string,
    StandingRow
  >();

  creatorIds.forEach(
    (creatorId) => {
      const row =
        createEmptyRow(
          creatorId,
          groupName
        );

      if (row) {
        table.set(
          creatorId,
          row
        );
      }
    }
  );

  groupMatches.forEach(
    (match) => {
      const savedResult =
        savedResults.find(
          (result) =>
            result.matchId ===
            match.id
        );

      const completed =
        Boolean(savedResult) ||
        match.status ===
          "completed";

      if (!completed) {
        return;
      }

      const leftScore =
        savedResult?.leftScore ??
        match.leftScore;

      const rightScore =
        savedResult?.rightScore ??
        match.rightScore;

      const left = table.get(
        match.leftCreatorId
      );

      const right = table.get(
        match.rightCreatorId
      );

      if (!left || !right) {
        return;
      }

      left.played += 1;
      right.played += 1;

      left.giftFor +=
        leftScore;

      left.giftAgainst +=
        rightScore;

      right.giftFor +=
        rightScore;

      right.giftAgainst +=
        leftScore;

      if (
        leftScore >
        rightScore
      ) {
        left.wins += 1;
        right.losses += 1;

        left.points += 3;
      } else if (
        rightScore >
        leftScore
      ) {
        right.wins += 1;
        left.losses += 1;

        right.points += 3;
      } else {
        left.draws += 1;
        right.draws += 1;

        left.points += 1;
        right.points += 1;
      }
    }
  );

  const rows =
    Array.from(
      table.values()
    ).map((row) => ({
      ...row,

      giftDifference:
        row.giftFor -
        row.giftAgainst,
    }));

  return sortStandings(rows);
}

export function getAllGroups() {
  return Array.from(
    new Set(
      matches.map(
        (match) =>
          match.group
      )
    )
  ).sort();
}

export function calculateAllStandings(
  savedResults:
    SavedMatchResult[] = []
): GroupStandings[] {
  return getAllGroups().map(
    (group) => ({
      group,

      rows:
        calculateGroupStandings(
          group,
          savedResults
        ),
    })
  );
}

export function getQualifiedCreators(
  groupName: string,
  numberToQualify = 2,
  savedResults:
    SavedMatchResult[] = []
) {
  return calculateGroupStandings(
    groupName,
    savedResults
  ).slice(
    0,
    numberToQualify
  );
}