export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cacheKey = url.pathname;

    // Try to get data from KV cache first
    const cachedData = await env.CACHE.get(cacheKey);
    if (cachedData) {
      return new Response(`Cached: ${cachedData}`, {
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    // If not in cache, create response
    const responseData = `Hello World! Timestamp: ${new Date().toISOString()}`;

    // Store in KV cache for 1 hour (3600 seconds)
    await env.CACHE.put(cacheKey, responseData, {
      expirationTtl: 3600
    });

    return new Response(responseData, {
      headers: { 'Content-Type': 'text/plain' }
    });
  },
};
