<script lang="ts">
    const SITE_NAME = "Teddy's Ladder"

    let { title, metaDescription }: { title: string; metaDescription?: string } = $props()
</script>

<svelte:head>
    <title>{title} - {SITE_NAME}</title>
    {#if metaDescription}
        <meta name="description" content={metaDescription} />
    {/if}
</svelte:head>