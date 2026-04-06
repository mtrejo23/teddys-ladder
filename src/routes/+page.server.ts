import { client } from "$lib/sanity/client";
import { HOMEPAGE_QUERY } from "$lib/sanity/queries";

export async function load() {
    const page = await client.fetch(HOMEPAGE_QUERY);
    return { page };
}
