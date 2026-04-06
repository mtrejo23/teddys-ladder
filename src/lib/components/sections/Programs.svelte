<script lang="ts">
    import ProgramCard from '$lib/components/ui/ProgramCard.svelte';
    import Cta from '$lib/components/sections/Cta.svelte';
    import { PortableText } from '@portabletext/svelte';

    type Program = {
        _id: string;
        title: string;
        ages: string;
        summary: string;
        slug: string;
        color?: string;
    }

    type Image = {
        asset: any;
        alt: string;
        width: number;
        height: number;
    }

    let {
        title,
        description,
        programs = [],
        ctaTitle,
        button,
        image,
        ctaVariant
    } = $props<{
        title?: string;
        description?: any[];
        programs?: Program[];
        ctaTitle?: string;
        button?: { buttonText: string; href: string };
        image?: Image;
        ctaVariant: string;
    }>();
</script>

<section class="programs">
    <div class="container flex flex--column gap-section">
        <div class="grid lg:grid--cols-12 gap-0_5">
            <div class="section__intro">
                <h2>{title}</h2>
                {#if description}
                    <div class="section__description">
                        <PortableText value={description} />
                    </div>
                {/if}
            </div>
        </div>
        <div class="programs__grid grid sm:grid--cols-2 lg:grid--cols-3 xl:grid--cols-4 gap-0_5">
            {#each programs as program (program._id)}
                <ProgramCard
                    programTitle={program.title}
                    programAges={program.ages}
                    programDescription={program.summary}
                    programHref= "/programs/{program.slug}"
                    programButtonText="Learn More"
                    programColor={program.color}
                />
            {/each}
        </div>

        {#if ctaTitle}
            <Cta
                as="div"
                headingElement="h3"
                container={false}
                title={ctaTitle}
                button={button}
                variant={ctaVariant}
                image={image}
            />
        {/if}
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;
</style>