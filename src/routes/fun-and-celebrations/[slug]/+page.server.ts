import { client } from "$lib/sanity/client";
import { FUN_AND_CELEBRATIONS_QUERY } from "$lib/sanity/queries";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const page = await client.fetch(FUN_AND_CELEBRATIONS_QUERY, {
        slug: params.slug,
    });

    if (!page) throw error(404, "Page not found");

    return { page };
};
