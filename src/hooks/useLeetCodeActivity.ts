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

        // Fetch from reliable public CORS-friendly endpoint
        const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`, {
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          throw new Error(`LeetCode API error: ${res.status}`);
        }

        const json = await res.json();

        if (isMounted) {
          if (json && typeof json.totalSolved === 'number') {
            const normalized: LeetCodeProfileData = {
              totalSolved: json.totalSolved,
              easySolved: json.easySolved ?? 0,
              mediumSolved: json.mediumSolved ?? 0,
              hardSolved: json.hardSolved ?? 0,
              totalQuestions: json.totalQuestions,
              totalEasy: json.totalEasy,
              totalMedium: json.totalMedium,
              totalHard: json.totalHard,
              ranking: json.ranking,
              contributionPoint: json.contributionPoint,
              reputation: json.reputation,
              submissionCalendar: json.submissionCalendar,
              recentSubmissions: Array.isArray(json.recentSubmissions) ? json.recentSubmissions : []
            };

            cachedLeetCodeData = normalized;
            lastFetchTime = Date.now();
            setData(normalized);
          } else {
            setHasError(true);
          }
          setLoading(false);
        }
      } catch (err: any) {
        if (isMounted && err.name !== 'AbortError') {
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
    recentSubmissions: data?.recentSubmissions ?? [],
    ranking: data?.ranking ?? null
  };
}
