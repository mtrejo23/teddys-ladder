import { client } from "$lib/sanity/client";
import { PAGE_QUERY } from "$lib/sanity/queries";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const prerender = true;

export const load: PageServerLoad = async ({ params }) => {
    const page = await client.fetch(PAGE_QUERY, { slug: params.slug });
    if (!page) throw error(404, "Page not found");
    return { page };
};
