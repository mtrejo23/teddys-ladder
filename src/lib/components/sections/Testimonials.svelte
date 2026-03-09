<script lang="ts">
    import Button from '$lib/components/ui/Button.svelte'
    import { onMount } from 'svelte';

    const testimonials = [
        {
            quote: "Love this school, the staff and curriculum. My son is learning so much and thriving. Beth is on top of everything, Ms. Shannon is amazing, Ms Dani is attentive, Ashley is always so professional and sweet, the entire staff is great! I highly recommend this school.",
            byline: "Araina Jefferson"
        },
        {
            quote: "Our daughters attended Teddy's Ladder since 2018 and we've been very pleased with the school. Our oldest attended Kindergarten there and was well-prepared for elementary school. Everyone compliments her on how well she can read. The staff and teachers take great care of the kids. The school is well maintained and provides great in-house activities for the children. We toured many schools in the area and are happy that we chose Teddy's Ladder.",
            byline: "Jamal and Evanna"
        },
        {
            quote: "The teachers here are incredible. My daughter looks forward to going to school every single day, which says everything. The learning environment is warm, structured, and truly nurturing.",
            byline: "Monica R."
        },
        {
            quote: "Teddy's Ladder gave my son the confidence he needed going into kindergarten. He could already read simple sentences and knew basic math. The foundation they built was invaluable.",
            byline: "David & Keisha T."
        }
    ];

    let currentIndex = $state(0);
    let isDesktop = $state(false);

    const slidesPerView = $derived(isDesktop ? 2 : 1);
    const step = $derived(isDesktop ? 2 : 1);
    const maxIndex = $derived(testimonials.length - slidesPerView);

    function prev() {
        currentIndex = Math.max(0, currentIndex - step);
    }

    function next() {
        currentIndex = Math.min(maxIndex, currentIndex + step);
    }

    onMount(() => {
        const mq = window.matchMedia('(min-width: 1024px)');
        isDesktop = mq.matches;

        const handler = (e: MediaQueryListEvent) => {
            isDesktop = e.matches;
            currentIndex = 0;
        };

        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    });
</script>

<section class="testimonials">
    <div class="container flex flex--column gap-section">
        <div class="grid lg:grid--cols-12 gap-0_5">
            <div class="section__intro">
                <h2>What Parents Say</h2>
                <p>Hear directly from families who have watched their children grow academically and socially through Teddy's Ladder's structured, supportive learning environment.</p>
            </div>
        </div>
        <div class="testimonials__wrapper">
            <div class="testimonials__slider">
                <div
                    class="testimonials__track"
                    style="transform: translateX(calc(-{currentIndex} * (100% / {slidesPerView} + var(--gap) / {slidesPerView})))"
                >
                    {#each testimonials as testimonial, i}
                        <div class="testimonials__card" style="--slides: {slidesPerView}">
                            <p class="testimonials__quote">"{testimonial.quote}"</p>
                            <p class="testimonials__byline">- {testimonial.byline}</p>
                        </div>
                    {/each}
                </div>
            </div>
            <div class="testimonials__controls flex flex--items-start flex--justify-between">
                <Button href="/" text="Hear From More Parents" />
                <div class="testimonials__nav">
                    <button
                        class="testimonials__nav__prev"
                        aria-label="Previous"
                        onclick={prev}
                        disabled={currentIndex === 0}
                    >
                        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="52" height="52" rx="26" fill="#1DA1F2"/>
                            <path d="M29.6689 33.3379L22.3313 26.0002L29.6689 18.6625" stroke="white" stroke-width="2"/>
                        </svg>
                    </button>
                    <button
                        class="testimonials__nav__next"
                        aria-label="Next"
                        onclick={next}
                        disabled={currentIndex >= maxIndex}
                    >
                        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="52" height="52" rx="26" fill="#1DA1F2"/>
                            <path d="M22.3311 18.6621L29.6687 25.9998L22.3311 33.3375" stroke="white" stroke-width="2"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.testimonials {
    --gap: 0.5rem;

    &__slider {
        overflow: hidden;
    }

    &__track {
        display: flex;
        gap: var(--gap);
        transition: transform 0.4s ease;
    }

    &__card {
        padding: a.$sp-testimonials;
        border-radius: a.$br-2;
        font-size: a.$fs-lg;
        line-height: a.$lh-md;
        flex-shrink: 0;
        width: calc((100% - var(--gap) * (var(--slides) - 1)) / var(--slides));

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
    }

    &__byline {
        font-weight: a.$fw-700;
    }

    &__controls {
        margin-top: 1rem;
    }

    &__nav {
        display: flex;
        gap: 0.5rem;

        &__next, &__prev {
            cursor: pointer;
            transition: opacity 0.2s ease;

            &:disabled {
                opacity: 0.3;
                cursor: default;
            }
        }
    }
}
</style>