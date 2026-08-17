import { useState, useEffect, useMemo } from 'react';

export interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0, 1, 2, 3, 4
}

export interface GitHubContributionsResponse {
  total: {
    [key: string]: number;
  };
  contributions: ContributionDay[];
}

// Memory cache to avoid repeated requests across re-renders
let cachedGitHubData: GitHubContributionsResponse | null = null;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes

export function useGithubActivity(username = 'bakibillah227') {
  const [data, setData] = useState<GitHubContributionsResponse | null>(cachedGitHubData);
  const [loading, setLoading] = useState<boolean>(!cachedGitHubData);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    // If cache is fresh, reuse it
    const now = Date.now();
    if (cachedGitHubData && now - lastFetchTime < CACHE_DURATION_MS) {
      setData(cachedGitHubData);
      setLoading(false);
      return;
    }

    let isMounted = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    async function fetchGitHub() {
      try {
        setLoading(true);
        setHasError(false);

        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
          { signal: controller.signal }
        );

        clearTimeout(timeoutId);

        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status}`);
        }

        const json: GitHubContributionsResponse = await res.json();

        if (isMounted) {
          if (json && Array.isArray(json.contributions) && json.contributions.length > 0) {
            cachedGitHubData = json;
            lastFetchTime = Date.now();
            setData(json);
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

    fetchGitHub();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [username]);

  // Compute total contributions from data
  const totalContributions = useMemo(() => {
    if (!data) return null;
    if (data.total) {
      if (typeof data.total.lastYear === 'number') {
        return data.total.lastYear;
      }
      const sum = Object.values(data.total).reduce<number>(
        (acc, curr) => acc + (typeof curr === 'number' ? curr : 0),
        0
      );
      if (sum > 0) return sum;
    }
    return data.contributions.reduce((acc, day) => acc + (day.count || 0), 0);
  }, [data]);

  // Organize days into weeks (columns of 7) for calendar grid visualization
  const weeks = useMemo(() => {
    if (!data || !data.contributions) return [];
    const days = data.contributions;
    const weeksList: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    days.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || index === days.length - 1) {
        weeksList.push(currentWeek);
        currentWeek = [];
      }
    });

    return weeksList;
  }, [data]);

  // Month markers for grid header
  const monthLabels = useMemo(() => {
    if (weeks.length === 0) return [];
    const labels: { name: string; index: number }[] = [];
    let lastMonth = '';

    weeks.forEach((week, index) => {
      const firstDay = week[0];
      if (firstDay && firstDay.date) {
        const month = new Date(firstDay.date).toLocaleDateString('en-US', {
          month: 'short'
        });
        if (month !== lastMonth && index % 4 === 0) {
          labels.push({ name: month, index });
          lastMonth = month;
        }
      }
    });

    return labels;
  }, [weeks]);

  return {
    data,
    loading,
    hasError,
    totalContributions,
    weeks,
    monthLabels
  };
}
