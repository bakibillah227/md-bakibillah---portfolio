export async function handler(event) {
  const username = event.queryStringParameters?.username || 'nexorithm';

  const query = `
query userPublicProfile($username: String!, $limit: Int!) {
  matchedUser(username: $username) {
    profile { ranking reputation }
    submitStats { acSubmissionNum { difficulty count } }
  }
  allQuestionsCount { difficulty count }
  recentAcSubmissionList(username: $username, limit: $limit) {
    title titleSlug timestamp statusDisplay lang
  }
}`;

  try {
    const res = await globalThis.fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { username, limit: 5 } })
    });

    if (!res.ok) {
      return { statusCode: res.status, body: JSON.stringify({ error: `LeetCode API error: ${res.status}` }) };
    }

    const payload = await res.json();
    const root = payload?.data;

    const pick = (list, difficulty) => {
      if (!Array.isArray(list)) return 0;
      const entry = list.find((item) => item?.difficulty === difficulty);
      return typeof entry?.count === 'number' ? entry.count : 0;
    };

    const ac = root?.matchedUser?.submitStats?.acSubmissionNum;
    const totals = root?.allQuestionsCount || [];
    const recent = Array.isArray(root?.recentAcSubmissionList)
      ? root.recentAcSubmissionList.slice(0, 5)
      : [];

    const normalized = {
      totalSolved: pick(ac, 'All'),
      easySolved: pick(ac, 'Easy'),
      mediumSolved: pick(ac, 'Medium'),
      hardSolved: pick(ac, 'Hard'),
      totalQuestions: pick(totals, 'All'),
      totalEasy: pick(totals, 'Easy'),
      totalMedium: pick(totals, 'Medium'),
      totalHard: pick(totals, 'Hard'),
      ranking: root?.matchedUser?.profile?.ranking,
      reputation: root?.matchedUser?.profile?.reputation,
      recentSubmissions: recent
    };

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(normalized)
    };
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch LeetCode data' })
    };
  }
}