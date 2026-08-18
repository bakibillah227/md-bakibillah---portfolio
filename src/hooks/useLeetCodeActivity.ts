import { useState, useEffect } from 'react';

export interface LeetCodeSubmission {
  title: string;
  titleSlug?: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
}

export interface LeetCodeProfileData {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalQuestions?: number;
  totalEasy?: number;
  totalMedium?: number;
  totalHard?: number;
  ranking?: number;
  contributionPoint?: number;
  reputation?: number;
  submissionCalendar?: Record<string, number>;
  recentSubmissions?: LeetCodeSubmission[];
}

let cachedLeetCodeData: LeetCodeProfileData | null = null;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes

const LEETCODE_GRAPHQL_URL = 'https://leetcode.com/graphql';

const PROFILE_QUERY = `
query userPublicProfile($username: String!, $limit: Int!) {
  matchedUser(username: $username) {
    profile {
      ranking
      reputation
    }
    submitStats {
      acSubmissionNum { difficulty count }
    }
  }
  allQuestionsCount { difficulty count }
  recentAcSubmissionList(username: $username, limit: $limit) {
    title
    titleSlug
    timestamp
    statusDisplay
    lang
  }
}`;

function pickCount(list: { difficulty: string; count: number }[] | undefined, difficulty: string): number {
  if (!Array.isArray(list)) return 0;
  const entry = list.find((item) => item.difficulty === difficulty);
  return typeof entry?.count === 'number' ? entry.count : 0;
}

function normalizeLeetCodeData(payload: unknown): LeetCodeProfileData | null {
  const root = (payload as { data?: Record<string, unknown> } | null)?.data;

  // Legacy flat response shape (e.g. some third-party endpoints return this)
  const flat = payload as Partial<LeetCodeProfileData> | null;
  if (flat && typeof flat.totalSolved === 'number' && !root?.matchedUser) {
    return {
      totalSolved: flat.totalSolved,
      easySolved: flat.easySolved ?? 0,
      mediumSolved: flat.mediumSolved ?? 0,
      hardSolved: flat.hardSolved ?? 0,
      totalQuestions: flat.totalQuestions,
      totalEasy: flat.totalEasy,
      totalMedium: flat.totalMedium,
      totalHard: flat.totalHard,
      ranking: flat.ranking,
      contributionPoint: flat.contributionPoint,
      reputation: flat.reputation,
      submissionCalendar: flat.submissionCalendar,
      recentSubmissions: Array.isArray(flat.recentSubmissions) ? flat.recentSubmissions : []
    };
  }

  const matchedUser = (root?.matchedUser ?? null) as {
    profile?: { ranking?: number; reputation?: number };
    submitStats?: { acSubmissionNum?: { difficulty: string; count: number }[] };
  } | null;
  const allQuestionsCount = (root?.allQuestionsCount ?? []) as {
    difficulty: string;
    count: number;
  }[];
  const recent = (root?.recentAcSubmissionList ?? []) as LeetCodeSubmission[];

  const ac = matchedUser?.submitStats?.acSubmissionNum;

  const normalized: LeetCodeProfileData = {
    totalSolved: pickCount(ac, 'All'),
    easySolved: pickCount(ac, 'Easy'),
    mediumSolved: pickCount(ac, 'Medium'),
    hardSolved: pickCount(ac, 'Hard'),
    totalQuestions: pickCount(allQuestionsCount, 'All'),
    totalEasy: pickCount(allQuestionsCount, 'Easy'),
    totalMedium: pickCount(allQuestionsCount, 'Medium'),
    totalHard: pickCount(allQuestionsCount, 'Hard'),
    ranking: matchedUser?.profile?.ranking,
    reputation: matchedUser?.profile?.reputation,
    recentSubmissions: Array.isArray(recent) ? recent.slice(0, 5) : []
  };

  if (typeof normalized.totalSolved === 'number') {
    return normalized;
  }
  return null;
}

export function useLeetCodeActivity(username = 'nexorithm') {
  const [data, setData] = useState<LeetCodeProfileData | null>(cachedLeetCodeData);
  const [loading, setLoading] = useState<boolean>(!cachedLeetCodeData);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const now = Date.now();
    if (cachedLeetCodeData && now - lastFetchTime < CACHE_DURATION_MS) {
      setData(cachedLeetCodeData);
      setLoading(false);
      return;
    }

    let isMounted = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    async function fetchLeetCode() {
      try {
        setLoading(true);
        setHasError(false);

        const res = await fetch(LEETCODE_GRAPHQL_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: PROFILE_QUERY,
            variables: { username, limit: 5 }
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          throw new Error(`LeetCode API error: ${res.status}`);
        }

        const json = normalizeLeetCodeData(await res.json());

        if (isMounted) {
          if (json && typeof json.totalSolved === 'number') {
            cachedLeetCodeData = json;
            lastFetchTime = Date.now();
            setData(json);
          } else {
            setHasError(true);
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted && err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        if (isMounted) {
          setHasError(true);
          setLoading(false);
        }
      }
    }

    fetchLeetCode();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [username]);

  return {
    data,
    loading,
    hasError,
    totalSolved: data?.totalSolved ?? null,
    easySolved: data?.easySolved ?? null,
    mediumSolved: data?.mediumSolved ?? null,
    hardSolved: data?.hardSolved ?? null,
    recentSubmissions: data?.recentSubmissions ?? []
  };
}