<script lang="ts">
    import PageBuilder from '$lib/components/PageBuilder.svelte'
    import SEO from '$lib/components/SEO.svelte'
    import type { PageData, ActionData } from './$types'

    let { data, form }: { data: PageData; form?: ActionData } = $props()
</script>

<SEO
    title={data.page.title}
    metaDescription={data.page.metaDescription}
/>

<PageBuilder page={data.page} color={data.page.color} {form} />