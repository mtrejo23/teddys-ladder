<script lang="ts">
    import Button from '$lib/components/ui/Button.svelte';
    import Image from '$lib/components/ui/Image.svelte';

    import { PortableText } from '@portabletext/svelte';
    import { onMount, tick } from 'svelte';
    import { gsap } from 'gsap';

    let {
        title,
        description,
        button,
        image,
        variant = 'default',
        as: Element = 'section',
        headingElement = 'h2',
        container = true,
    } = $props<{
        title: string;
        description?: any[];
        button?: { buttonText: string; href: string };
        image: { asset: any; alt: string; width: number; height: number };
        variant?: string;
        as?: string;
        headingElement?: string;
        container?: boolean;
    }>();

    const buttonClassMap: Record<string, string> = {
        'default': 'button--white',
        'intro': '',
        'teddys-ladder': 'button--white',
        'teddys-ladder-flush-top': 'button--white',
        'teddys-juniors': 'button--white button--white--hover-bg-primary',
        'teddys-juniors-flush-top': 'button--white button--white--hover-bg-primary',
    }

    const buttonClass = $derived(buttonClassMap[variant] ?? '');

    let gradientEl = $state<HTMLElement | null>(null);
    let wrapperEl = $state<HTMLElement | null>(null);

    onMount(() => {
        let triggers: ReturnType<typeof ScrollTrigger.getAll> = [];

        (async () => {
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            if (!gradientEl || !wrapperEl) return;

            await tick();
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

            triggers = ScrollTrigger.getAll();
        })();

        return () => triggers.forEach(t => t.kill());
    });
</script>

{#snippet content()}
    <div class="cta__wrapper" bind:this={wrapperEl}>
        {#if image}
            <div class="cta__bg-image">
                <Image
                    image={image}
                    breakpoints={[400, 800, 1200]}
                />
            </div>
        {/if}
        <div class="cta__bg-gradient" bind:this={gradientEl}></div>
        <div class="grid lg:grid--cols-10 gap-0_5">
            <div class="cta__content">
                <div>
                    <svelte:element this={headingElement} class="cta__title">{title}</svelte:element>
                    {#if description}
                        <div class="cta__description">
                            <PortableText value={description} />
                        </div>
                    {/if}
                </div>
                <div class="button-wrapper">

                    <Button
                        href={button.href}
                        text={button.buttonText}
                        class={buttonClass}
                    />
                    
                </div>
            </div>
        </div>
    </div>
{/snippet}

<svelte:element this={Element} class="cta cta--{variant}">
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
        background-color: a.$clr-primary;
        border-radius: a.$br-2;
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

        :global(img) {
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
        background: linear-gradient(0deg, a.$clr-primary 50%, rgba(0, 33, 87, calc(var(--gradient-alpha, 0))) 100%);

        @include a.min(md) {
            background: linear-gradient(90deg, a.$clr-primary 50%, rgba(0, 33, 87, calc(var(--gradient-alpha, 0))) 100%);
        }
    }

    &__content {
        position: relative;
        grid-column: span 7;
        color: a.$clr-white;
    }

    &__title {
        font-size: a.$fs-display;
        color: a.$clr-white;
    }
}
</style>