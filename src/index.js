export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname === '/' ? '/marketplace.html' : url.pathname;
    const cacheKey = path; // key in KV

    // 1. Try KV cache first
    let html = await env.CACHE.get(cacheKey);
    if (html) {
      return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    // 2. Not in cache → fetch from GitHub (raw file)
    const githubFileUrl =
      'https://raw.githubusercontent.com/simonwong6944/coappery/main/marketplace.html';

    let res;
    try {
      res = await fetch(githubFileUrl);
    } catch (e) {
      return new Response('Error fetching from GitHub: ' + e.message, {
        status: 502,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    if (!res.ok) {
      return new Response('GitHub returned ' + res.status, {
        status: 502,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    html = await res.text();

    // 3. Store in KV for 1 hour
    await env.CACHE.put(cacheKey, html, { expirationTtl: 3600 });

    // 4. Return HTML
    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  },
};
