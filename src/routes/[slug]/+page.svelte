<script lang="ts">
    import PageTitle from '$lib/components/sections/PageTitle.svelte'
    import PageBuilder from '$lib/components/PageBuilder.svelte'
    import SEO from '$lib/components/SEO.svelte'
    import type { PageData, ActionData } from './$types'

    let { data, form }: { data: PageData; form?: ActionData } = $props()
</script>

<SEO
    title={data.page.title}
    metaDescription={data.page.metaDescription}
/>

<PageTitle title={data.page.title} />
<PageBuilder page={data.page} color={data.page.color} {form} />