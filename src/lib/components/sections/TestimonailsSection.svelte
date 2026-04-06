<script lang="ts">
    import { PortableText } from '@portabletext/svelte'

    let {
        title,
        description,
        testimonials,
    } = $props<{
        title: string;
        description?: string;
        testimonials: {
            quote: any[];
            byline: string;
        }[];
    }>();
</script>

<section class="testimonials">
    <div class="container flex flex--column gap-section">
        <div class="grid lg:grid--cols-12 gap-0_5">
            <div class="section__intro">
                <h2>{title}</h2>
                {#if description}
                    <p>{description}</p>
                {/if}
            </div>
        </div>
        <div class="testimonials__wrapper grid lg:grid--cols-2 gap-0_5">
            {#each testimonials as testimonial}
                <div class="testimonials__card">
                    <div class="testimonials__quote">
                        <PortableText value={testimonial.quote} />
                    </div>
                    <p class="testimonials__byline">- {testimonial.byline}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.testimonials {

    &__card {
        padding: a.$sp-large-card;
        border-radius: a.$br-2;
        font-size: a.$fs-lg;
        line-height: a.$lh-md;

        &:nth-child(8n + 1) { background-color: a.$clr-pastel-light-green; }
        &:nth-child(8n + 2) { background-color: a.$clr-pastel-red-orange; }
        &:nth-child(8n + 3) { background-color: a.$clr-pastel-pink; }
        &:nth-child(8n + 4) { background-color: a.$clr-pastel-purple; }
        &:nth-child(8n + 5) { background-color: a.$clr-pastel-orange; }
        &:nth-child(8n + 6) { background-color: a.$clr-pastel-green; }
        &:nth-child(8n + 7) { background-color: a.$clr-pastel-primary; }
        &:nth-child(8n + 8) { background-color: a.$clr-pastel-secondary; }
    }

    &__quote {
        font-weight: a.$fw-300;

        :global(p:first-child)::before {
            content: '"';
        }

        :global(p:last-child)::after {
            content: '"';
        }
    }

    &__byline {
        font-weight: a.$fw-700;
    }
}
</style>