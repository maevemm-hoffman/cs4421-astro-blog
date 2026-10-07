import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const startedAt = performance.now();
  let status = 500;

  try {
    const response = await next();
    status = response.status;
    return response;
  } finally {
    console.log(JSON.stringify({
      level: status >= 500 ? 'error' : 'info',
      message: 'http_request',
      method: context.request.method,
      path: context.url.pathname,
      status,
      durationMs: Math.round(performance.now() - startedAt),
      timestamp: new Date().toISOString(),
    }));
  }
});