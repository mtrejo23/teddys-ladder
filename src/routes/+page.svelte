<script lang="ts">
    import Hero from '$lib/components/sections/Hero.svelte';
    import Cta from '$lib/components/sections/Cta.svelte'
    import Programs from '$lib/components/sections/Programs.svelte'
    import Video from "$lib/components/sections/Video.svelte"
    import Facility from '$lib/components/sections/Facility.svelte';
    import Testimonials from '$lib/components/sections/Testimonials.svelte';
    import SEO from '$lib/components/SEO.svelte'

    import type { PageData } from './$types'

    const { data }: { data: PageData } = $props()
</script>

<SEO
    title={data.page.title}
    metaDescription={data.page.metaDescription}
/>

{#each data.page.pageBuilder as block (block._key)}
    {#if block._type === 'heroTextBlock'}
        <Hero {...block}/>
    {:else if block._type === 'ctaBlock'}
        <Cta {...block} />
    {:else if block._type === 'reference'}
        {#each block.blocks as sharedBlock (sharedBlock._key)}
            {#if sharedBlock._type === 'ctaBlock'}
                <Cta {...sharedBlock} />
            {:else if sharedBlock._type === 'programsBlock'}
                <Programs {...sharedBlock} />
            {:else if sharedBlock._type === 'videoBlock'}
                <Video {...sharedBlock} />
            {:else if sharedBlock._type === 'campusBlock'}
                <Facility {...sharedBlock} />
            {:else if sharedBlock._type === 'testimonialsBlock'}
                <Testimonials {...sharedBlock} />
            {/if}
        {/each}
    {/if}
{/each}