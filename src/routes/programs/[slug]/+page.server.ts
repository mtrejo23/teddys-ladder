import { client } from "$lib/sanity/client";
import { PROGRAM_QUERY } from "$lib/sanity/queries";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const page = await client.fetch(PROGRAM_QUERY, { slug: params.slug });

    if (!page) throw error(404, "Page not found");

    if (page.pageReference?.slug) {
        redirect(301, `/${page.pageReference.slug}`);
    }

    return { page };
};
