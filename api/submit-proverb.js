export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const proverb = String(body.proverb || '').trim();
  const translation = String(body.translation || '').trim();
  const source = String(body.source || '').trim();

  if (!proverb) {
    return res.status(400).json({ error: 'Proverb is required.' });
  }

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY || 'samgfour/thimo_cia_gikuyu';

  if (!token) {
    return res.status(500).json({ error: 'Missing GITHUB_TOKEN environment variable.' });
  }

  const issueBody = [
    '## Proverb contribution',
    '',
    '**Proverb**',
    proverb,
    '',
    '**Translation / explanation**',
    translation || 'Not provided',
    '',
    '**Source / attribution**',
    source || 'Not provided',
    '',
    '---',
    'Submitted via project form.'
  ].join('\n');

  const response = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: `Proverb contribution: ${proverb.slice(0, 60)}`,
      body: issueBody,
      labels: ['proverb', 'contribution']
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    return res.status(response.status).json({
      error: 'Failed to create GitHub issue.',
      details: errorText
    });
  }

  const data = await response.json();

  return res.status(200).json({
    ok: true,
    issueNumber: data.number,
    issueUrl: data.html_url
  });
}
