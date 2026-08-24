export type SavedMatchResult = {
  matchId: string;
  leftScore: number;
  rightScore: number;
  completedAt: string;
};

const STORAGE_KEY = "aimgod-match-results";

export function getSavedResults(): SavedMatchResult[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return [];
    }

    return JSON.parse(saved) as SavedMatchResult[];
  } catch {
    return [];
  }
}

export function getSavedResult(matchId: string) {
  return getSavedResults().find(
    (result) => result.matchId === matchId
  );
}

export function saveMatchResult(result: SavedMatchResult) {
  if (typeof window === "undefined") {
    return;
  }

  const current = getSavedResults();

  const updated = [
    ...current.filter(
      (item) => item.matchId !== result.matchId
    ),
    result,
  ];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );

  window.dispatchEvent(
    new Event("aimgod-results-updated")
  );
}

export function clearMatchResult(matchId: string) {
  if (typeof window === "undefined") {
    return;
  }

  const updated = getSavedResults().filter(
    (item) => item.matchId !== matchId
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );

  window.dispatchEvent(
    new Event("aimgod-results-updated")
  );
}

export function clearAllMatchResults() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);

  window.dispatchEvent(
    new Event("aimgod-results-updated")
  );
}