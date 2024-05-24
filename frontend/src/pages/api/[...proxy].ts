import type { APIRoute } from "astro";

const getProxyUrl = (request: Request) => {
  const proxyUrl = new URL("http://localhost:3000");
  const requestUrl = new URL(request.url);

  return new URL(requestUrl.pathname, proxyUrl);
};

export const ALL: APIRoute = async ({ request }) => {
  const proxyUrl = getProxyUrl(request);
  const response = await fetch(proxyUrl.href, request);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
};
