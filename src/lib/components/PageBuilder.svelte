<script lang="ts">
    import Hero from '$lib/components/sections/Hero.svelte';
    import HeroImageVariant from '$lib/components/sections/HeroImageVariant.svelte';
    import Cta from '$lib/components/sections/Cta.svelte'
    import Programs from '$lib/components/sections/Programs.svelte'
    import Video from "$lib/components/sections/Video.svelte"
    import Facility from '$lib/components/sections/Facility.svelte';
    import Testimonials from '$lib/components/sections/Testimonials.svelte';
    import TextimonialsSection from '$lib/components/sections/TestimonailsSection.svelte';
    import Intro from '$lib/components/sections/Intro.svelte';
    import List from '$lib/components/sections/List.svelte';
    import Highlights from '$lib/components/sections/Highlights.svelte';
    import TwoCards from '$lib/components/sections/TwoCards.svelte';
    import Gallery from '$lib/components/sections/Gallery.svelte';
    import GalleryScrollingImages from '$lib/components/sections/GalleryScrollingImages.svelte';
    import ImageText from '$lib/components/sections/ImageText.svelte';
    import Team from '$lib/components/sections/Team.svelte';
    import RichText from '$lib/components/sections/RichText.svelte';
    import ScheduleATour from '$lib/components/sections/ScheduleATour.svelte';
    import PdfDownloads from '$lib/components/sections/PdfDownloads.svelte';

    let { page, color, form }: { page: any; color?: any; form?: any } = $props();
</script>

{#each page.pageBuilder as block (block._key)}
    {#if block._type === 'heroTextBlock'}
        <Hero {...block}/>
    {:else if block._type === 'heroImageBlock'}
        <HeroImageVariant {...block}/>
    {:else if block._type === 'ctaBlock'}
        <Cta {...block} />
    {:else if block._type === 'introBlock'}
        <Intro {...block} {color} />
    {:else if block._type === 'listBlock'}
        <List {...block} />
    {:else if block._type === 'highlightsBlock'}
        <Highlights {...block} {color} />
    {:else if block._type === 'testimonialsFullBlock'}
        <TextimonialsSection {...block} />
    {:else if block._type === 'twoCardsBlock'}
        <TwoCards {...block} />
    {:else if block._type === 'galleryBlock'}
        <Gallery {...block} id={block._key} />
    {:else if block._type === 'galleryScrollingImagesBlock'}
        <GalleryScrollingImages {...block} />
    {:else if block._type === 'scheduleATourBlock'}
        <ScheduleATour {...block} {form} />
    {:else if block._type === 'imageTextBlock'}
        <ImageText {...block} />
    {:else if block._type === 'teamBlock'}
        <Team {...block} />
    {:else if block._type === 'pdfDownloadsBlock'}
        <PdfDownloads {...block} />
    {:else if block._type === 'richTextBlock'}
        <RichText {...block} />
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