<script lang="ts">
    import Button from '$lib/components/ui/Button.svelte'
    import Image from '$lib/components/ui/Image.svelte'
    import { onMount, tick } from 'svelte';
    import { gsap } from 'gsap';

    let {
        title,
        description,
        slug,
        images,
    } = $props<{
        title: string;
        description?: string;
        slug: string;
        images: {
            asset: any;
            alt: string;
            width: number;
            height: number;
        }[];
    }>();

    let wrapperEl = $state<HTMLElement | null>(null);
    let trackEl = $state<HTMLElement | null>(null);

    onMount(() => {
        let ctx: gsap.Context | null = null;

        (async () => {
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            if (!wrapperEl || !trackEl) return;

            await tick();

            await Promise.all(
                Array.from(trackEl!.querySelectorAll('img')).map(img =>
                    img.complete ? Promise.resolve() : new Promise(res => img.addEventListener('load', res, { once: true }))
                )
            );

            ctx = gsap.context(() => {
                ScrollTrigger.matchMedia({
                    '(min-width: 768px)': () => {
                        const maxScroll = trackEl!.scrollWidth - wrapperEl!.offsetWidth;

                        gsap.to(trackEl, {
                            x: -maxScroll,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: wrapperEl,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 1,
                            }
                        });
                    },

                    '(max-width: 767px)': () => {
                        let startX = 0;
                        let currentX = 0;
                        let isDragging = false;
                        let trackX = 0;

                        const getMaxScroll = () => -(trackEl!.scrollWidth - wrapperEl!.offsetWidth);

                        const onTouchStart = (e: TouchEvent) => {
                            startX = e.touches[0].clientX;
                            isDragging = true;
                            gsap.killTweensOf(trackEl);
                        };

                        const onTouchMove = (e: TouchEvent) => {
                            if (!isDragging) return;
                            const deltaX = e.touches[0].clientX - startX;
                            currentX = Math.max(getMaxScroll(), Math.min(0, trackX + deltaX));
                            gsap.set(trackEl, { x: currentX });
                        };

                        const onTouchEnd = () => {
                            isDragging = false;
                            trackX = currentX;

                            const imageWidth = trackEl!.querySelector('img')!.offsetWidth;
                            const gap = 8;
                            const snapIndex = Math.round(-trackX / (imageWidth + gap));
                            const snappedX = Math.max(getMaxScroll(), Math.min(0, -(snapIndex * (imageWidth + gap))));

                            gsap.to(trackEl, {
                                x: snappedX,
                                duration: 0.4,
                                ease: 'power2.out',
                                onComplete: () => { trackX = snappedX; }
                            });
                        };

                        trackEl!.addEventListener('touchstart', onTouchStart, { passive: true });
                        trackEl!.addEventListener('touchmove', onTouchMove, { passive: true });
                        trackEl!.addEventListener('touchend', onTouchEnd);

                        return () => {
                            trackEl!.removeEventListener('touchstart', onTouchStart);
                            trackEl!.removeEventListener('touchmove', onTouchMove);
                            trackEl!.removeEventListener('touchend', onTouchEnd);
                        };
                    }
                });
            });
        })();

        return () => ctx?.revert();
    });
</script>

<section class="facility">
    <div class="container flex flex--column gap-section">
        <div class="grid lg:grid--cols-12 gap-0_5">
            <div class="section__intro">
                <h2>{title}</h2>
                {#if description}
                    <p>{description}</p>
                {/if}

                <Button
                    href="/fun-and-celebrations/{slug}"
                    text="View Gallery"
                />
                
            </div>
        </div>
        <div class="facility__images-wrapper" bind:this={wrapperEl}>
            <div class="facility__images-track flex gap-0_5" bind:this={trackEl}>
                {#each (images ?? []).filter((img: { asset: any }) => img.asset) as image}
                    <Image
                        image={image}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        breakpoints={[400, 800, 1200]}
                        class="facility__image"
                    />
                {/each}
            </div>
        </div>
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.facility {
    overflow: hidden;

    &__images-wrapper {
        max-width: 100%;
    }

    &__images-track {
        width: max-content;
        display: flex;
    }
}

:global(img.facility__image) {
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;
    overflow: hidden;
    object-fit: cover;
    border-radius: a.$br-2;
    max-width: 90vw;
    flex-shrink: 0;

    @include a.min(md) {
        max-width: 28.3125rem;
    }
}
</style>