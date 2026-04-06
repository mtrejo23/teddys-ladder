<script lang="ts">
    import PageTitle from '$lib/components/sections/PageTitle.svelte';
    import PageBuilder from '$lib/components/PageBuilder.svelte'
    import type { PageData, ActionData } from './$types'

    let { data, form }: { data: PageData; form?: ActionData } = $props()
</script>

<svelte:head>
    <title>{data.page.title} - Teddy's Ladder</title>
</svelte:head>

<PageTitle title={data.page.title} />
<PageBuilder page={data.page} {form} />