<script lang="ts">
    import ProgramCard from '$lib/components/ui/ProgramCard.svelte';
    import Cta from '$lib/components/sections/Cta.svelte'

    type Program = {
        programTitle: string;
        programAges: string;
        programDescription: string;
        programHref: string;
        programButtonText: string;
    }

    let { programsTitle, programsDescription, programsCtaTitle, programsCtaDescription, programsCtaButtonText, programsCtaButtonHref, programsCtaClass, programsCtaButtonClass, programsCtaBgImage, programsTeddysLadder, programsTeddysJuniors } = $props<{
        programsTitle?: string;
        programsDescription?: string;
        programsCtaTitle?: string;
        programsCtaDescription?: string;
        programsCtaButtonText?: string;
        programsCtaButtonHref?: string;
        programsCtaClass?: string;
        programsCtaButtonClass?: string;
        programsCtaBgImage?: string;
        programsTeddysLadder?: Program[];
        programsTeddysJuniors?: Program[];
    }>();

    let programs = $derived([...(programsTeddysLadder ?? []), ...(programsTeddysJuniors ?? [])]);
</script>

<section class="programs">
    <div class="container flex flex--column gap-section">
        <div class="grid lg:grid--cols-12 gap-0_5">
            <div class="section__intro">
                <h2>{programsTitle}</h2>
                <p>{@html programsDescription}</p>
            </div>
        </div>
        <div class="programs__grid grid sm:grid--cols-2 lg:grid--cols-3 xl:grid--cols-4 gap-0_5">

            {#each programs as program}
                <ProgramCard
                    programTitle={program.programTitle}
                    programAges={program.programAges}
                    programDescription={program.programDescription}
                    programHref={program.programHref}
                    programButtonText={program.programButtonText}
                />
            {/each}

        </div>

        <Cta
            as="div"
            headingElement="h3"
            container={false}
            ctaTitle={programsCtaTitle}
            ctaDescription={programsCtaDescription}
            ctaButtonText={programsCtaButtonText} 
            ctaHref={programsCtaButtonHref}
            ctaClass={programsCtaClass}
            ctaButtonClass={programsCtaButtonClass}
            ctaBgImage={programsCtaBgImage}
        />

    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;
</style>