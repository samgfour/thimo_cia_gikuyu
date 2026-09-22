export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const proverb = String(body.proverb || '').trim();
    const description = String(body.description || '').trim();
    const translation = String(body.translation || '').trim();
    const source = String(body.source || '').trim();
    const contributionType = String(body.contributionType || 'New proverb').trim();

    if (!proverb || !description) {
      return Response.json(
        { error: 'Proverb and detailed description are required.' },
        { status: 400 }
      );
    }

    if (!env.GITHUB_TOKEN) {
      return Response.json(
        { error: 'GITHUB_TOKEN is not configured.' },
        { status: 500 }
      );
    }

    const repository = env.GITHUB_REPOSITORY || 'samgfour/thimo_cia_gikuyu';

    const issueBody = [
      '## Proverb review request',
      '',
      `**Contribution type**\n${contributionType}`,
      '',
      `**Proverb**\n${proverb}`,
      '',
      `**Detailed description**\n${description}`,
      '',
      `**Translation / explanation**\n${translation || 'Not provided'}`,
      '',
      `**Source / attribution**\n${source || 'Not provided'}`,
      '',
      '---',
      'Please review this submission for accuracy, cultural context, duplication, and suitability before accepting it.'
    ].join('\n');

    const response = await fetch(`https://api.github.com/repos/${repository}/issues`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
        'User-Agent': 'thimo-cia-gikuyu-pages-function'
      },
      body: JSON.stringify({
        title: `Proverb review: ${proverb.slice(0, 60)}`,
        body: issueBody,
        labels: ['proverb', 'pending-review']
      })
    });

    if (!response.ok) {
      const details = await response.text();
      return Response.json(
        { error: 'GitHub could not create the issue.', details },
        { status: response.status }
      );
    }

    const issue = await response.json();

    return Response.json({
      ok: true,
      issueNumber: issue.number,
      issueUrl: issue.html_url
    });
  } catch (error) {
    return Response.json(
      { error: 'Invalid submission.' },
      { status: 400 }
    );
  }
}
