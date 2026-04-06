import type { RequestEvent } from "./$types";

export const prerender = false;

export const GET = async ({ params, url }: RequestEvent) => {
    const sanityUrl = `https://cdn.sanity.io/${params.path}${url.search}`;
    const response = await fetch(sanityUrl);

    return new Response(response.body, {
        headers: {
            "Content-Type":
                response.headers.get("Content-Type") ?? "image/jpeg",
            "Cache-Control":
                response.headers.get("Cache-Control") ??
                "public, max-age=31536000",
        },
    });
};
