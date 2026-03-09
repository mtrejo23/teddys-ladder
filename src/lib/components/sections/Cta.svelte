<script lang="ts">
    import Button from '$lib/components/ui/Button.svelte';
    import { onMount, tick } from 'svelte';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    gsap.registerPlugin(ScrollTrigger);

    let {
        ctaTitle,
        ctaDescription,
        ctaButtonText,
        ctaHref,
        as: Element = 'section', headingElement = 'h2',
        container = true,
        ctaClass: className = '',
        ctaButtonClass: ctaButtonClass = '',
        ctaBgImage = ''
    } = $props<{
        ctaTitle: string;
        ctaDescription: string;
        ctaButtonText: string;
        ctaHref: string;
        as?: string,
        headingElement?: string,
        container?: boolean,
        ctaClass?: string,
        ctaButtonClass?: string,
        ctaBgImage?: string
    }>();

    let gradientEl = $state<HTMLElement | null>(null);
    let wrapperEl = $state<HTMLElement | null>(null);

    onMount(() => {
        if (!gradientEl || !wrapperEl) return;

        tick().then(() => {
            ScrollTrigger.refresh();

            gsap.fromTo(
                gradientEl,
                { '--gradient-alpha': 1 },
                {
                    '--gradient-alpha': 0,
                    duration: 1.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: wrapperEl,
                        start: 'top 50%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        return () => ScrollTrigger.getAll().forEach(t => t.kill());
    });
</script>

{#snippet content()}
    <div class="cta__wrapper" bind:this={wrapperEl}>
        <div class="cta__bg-image">
            <img src={ctaBgImage} alt="">
        </div>
        <div class="cta__bg-gradient" bind:this={gradientEl}></div>
        <div class="grid lg:grid--cols-10 gap-0_5">
            <div class="cta__content">
                <div>
                    <svelte:element this={headingElement} class="cta__title">{ctaTitle}</svelte:element>
                    <p class="cta__description">{ctaDescription}</p>
                </div>
                <div class="button-wrapper">
                    <Button
                        href={ctaHref}
                        text={ctaButtonText}
                        class={ctaButtonClass}
                    />
                </div>
            </div>
        </div>
    </div>
{/snippet}

<svelte:element this={Element} class="cta {className}">
    {#if container}
        <div class="container">
            {@render content()}
        </div>
    {:else}
        {@render content()}
    {/if}
</svelte:element>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.cta {

    &__wrapper {
        position: relative;
        padding: a.$sp-cta-top a.$sp-cta-horizontal a.$sp-cta-vertical;
        background-color: a.$clr-pastel-secondary;
        border-radius: a.$br-4;
        overflow: hidden;

        @include a.min(md) {
            padding-top: a.$sp-cta-vertical;
        }
    }

    &__bg-image {
        position: absolute;
        inset: 0 0 auto 0;
        width: 100%;
        height: 50%;
        opacity: 25%;

        @include a.min(md) {
            inset: 0 0 0 auto;
            width: 50%;
            height: 100%;
        }

        img {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__bg-gradient {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg, #D6F4FF 50%, rgba(214, 244, 255, calc(var(--gradient-alpha, 0))) 100%);

        @include a.min(md) {
            background: linear-gradient(90deg, #D6F4FF 50%, rgba(214, 244, 255, calc(var(--gradient-alpha, 0))) 100%);
        }
    }

    &__content {
        position: relative;
        grid-column: span 7;
    }

    &__title {
        font-size: a.$fs-display;
    }
}
</style>