export type Creator = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  country: string;
  countryCode: string;
  flag: string;
  region: string;
  club: string;
  rank: number;
};

export type MatchStatus =
  | "scheduled"
  | "live"
  | "completed";

export type Match = {
  id: string;
  tournament: string;
  stage: string;
  group: string;
  status: MatchStatus;
  durationSeconds: number;
  leftCreatorId: string;
  rightCreatorId: string;
  leftScore: number;
  rightScore: number;
  viewers: number;
  scheduledAt?: string;
};

export const creators: Creator[] = [
  {
    id: "third-eye",
    name: "Third Eye",
    handle: "@thirdeye",
    avatar: "👁️",
    country: "Canada",
    countryCode: "CA",
    flag: "🇨🇦",
    region: "North America",
    club: "Third Eye FC",
    rank: 12,
  },
  {
    id: "258-united",
    name: "25/8 United",
    handle: "@258united",
    avatar: "25/8",
    country: "Jamaica",
    countryCode: "JM",
    flag: "🇯🇲",
    region: "Caribbean",
    club: "25/8 United",
    rank: 18,
  },
  {
    id: "slickas-momentum",
    name: "Slickas Momentum",
    handle: "@slickas",
    avatar: "⚡",
    country: "Canada",
    countryCode: "CA",
    flag: "🇨🇦",
    region: "North America",
    club: "Slickas Momentum",
    rank: 24,
  },
  {
    id: "aimgod-elite",
    name: "AIMGOD Elite",
    handle: "@aimgodelite",
    avatar: "◉",
    country: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    region: "Europe",
    club: "AIMGOD Elite",
    rank: 31,
  },
  {
    id: "kingdom",
    name: "Kingdom",
    handle: "@kingdom",
    avatar: "👑",
    country: "Jamaica",
    countryCode: "JM",
    flag: "🇯🇲",
    region: "Caribbean",
    club: "Kingdom FC",
    rank: 9,
  },
  {
    id: "creator-x",
    name: "Creator X",
    handle: "@creatorx",
    avatar: "✕",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    region: "North America",
    club: "Creator X",
    rank: 15,
  },
];

export const matches: Match[] = [
  {
    id: "third-eye-vs-258",
    tournament: "AIMGOD World Cup",
    stage: "Group Stage",
    group: "Group A",
    status: "completed",
    durationSeconds: 300,
    leftCreatorId: "third-eye",
    rightCreatorId: "258-united",
    leftScore: 18450,
    rightScore: 16820,
    viewers: 3842,
  },
  {
    id: "slickas-vs-aimgod",
    tournament: "AIMGOD World Cup",
    stage: "Group Stage",
    group: "Group A",
    status: "scheduled",
    durationSeconds: 300,
    leftCreatorId: "slickas-momentum",
    rightCreatorId: "aimgod-elite",
    leftScore: 0,
    rightScore: 0,
    viewers: 0,
  },
  {
    id: "kingdom-vs-creator-x",
    tournament: "AIMGOD World Cup",
    stage: "Group Stage",
    group: "Group B",
    status: "scheduled",
    durationSeconds: 300,
    leftCreatorId: "kingdom",
    rightCreatorId: "creator-x",
    leftScore: 0,
    rightScore: 0,
    viewers: 0,
  },
];

export function getCreator(
  creatorId: string
) {
  return creators.find(
    (creator) => creator.id === creatorId
  );
}

export function getMatch(
  matchId: string
) {
  return matches.find(
    (match) => match.id === matchId
  );
}

export function getMatchWithCreators(
  matchId: string
) {
  const match = getMatch(matchId);

  if (!match) {
    return null;
  }

  const leftCreator = getCreator(
    match.leftCreatorId
  );

  const rightCreator = getCreator(
    match.rightCreatorId
  );

  if (!leftCreator || !rightCreator) {
    return null;
  }

  return {
    ...match,
    leftCreator,
    rightCreator,
  };
}