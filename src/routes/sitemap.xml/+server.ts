import type { RequestHandler } from "./$types";
import { client } from "$lib/sanity/client";
import { PUBLIC_SITE_URL } from "$env/static/public";

type SanityDoc = {
    slug: string;
    lastmod: string;
};

export const prerender = false;

export const GET: RequestHandler = async () => {
    let pages: SanityDoc[] = [];
    let programs: SanityDoc[] = [];
    let funAndCelebrations: SanityDoc[] = [];

    try {
        [pages, programs, funAndCelebrations] = await Promise.all([
            client.fetch<SanityDoc[]>(`
                *[_type == "page" && defined(slug.current)] | order(slug.current asc) {
                    "slug": slug.current,
                    "lastmod": _updatedAt
                }
            `),
            client.fetch<SanityDoc[]>(`
                *[_type == "program" && defined(slug.current)] | order(slug.current asc) {
                    "slug": slug.current,
                    "lastmod": _updatedAt
                }
            `),
            client.fetch<SanityDoc[]>(`
                *[_type == "funAndCelebrations" && defined(slug.current)] | order(slug.current asc) {
                    "slug": slug.current,
                    "lastmod": _updatedAt
                }
            `),
        ]);
    } catch (e) {
        console.error("Sitemap generation failed:", e);
        return new Response("Failed to generate sitemap", { status: 500 });
    }

    const homepage = pages.find((p) => p.slug === "/");
    const otherPages = pages
        .filter((p) => p.slug !== "/")
        .map((p) => ({ loc: `/${p.slug}`, lastmod: p.lastmod }));
    const mappedPrograms = programs.map((p) => ({
        loc: `/programs/${p.slug}`,
        lastmod: p.lastmod,
    }));
    const mappedEvents = funAndCelebrations.map((p) => ({
        loc: `/fun-and-celebrations/${p.slug}`,
        lastmod: p.lastmod,
    }));

    const allPages = [
        ...(homepage ? [{ loc: "/", lastmod: homepage.lastmod }] : []),
        ...otherPages,
        ...mappedPrograms,
        ...mappedEvents,
    ];

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allPages
        .map(
            (page) => `
    <url>
        <loc>${PUBLIC_SITE_URL}${page.loc}</loc>
        <lastmod>${page.lastmod}</lastmod>
    </url>`,
        )
        .join("")}
</urlset>`.trim();

    return new Response(body, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "max-age=0, s-maxage=3600",
        },
    });
};
