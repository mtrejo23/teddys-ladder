<script lang="ts">
    import Button from '$lib/components/ui/Button.svelte';
    import { onMount, tick } from 'svelte';
    import { gsap } from 'gsap';

    let wrapperEl = $state<HTMLElement | null>(null);
    let trackEl = $state<HTMLElement | null>(null);

    onMount(() => {
        let ctx: gsap.Context | null = null;

        (async () => {
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            if (!wrapperEl || !trackEl) return;

            await tick();

            ctx = gsap.context(() => {
                ScrollTrigger.matchMedia({
                    '(min-width: 768px)': () => {
                        const maxScroll = trackEl!.scrollWidth - wrapperEl!.offsetWidth;

                        gsap.to(trackEl, {
                            x: -maxScroll,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: wrapperEl,
                                start: 'top 50%',
                                end: () => `+=${maxScroll}`,
                                scrub: 1,
                                anticipatePin: 1
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
                <h2>Facility</h2>
                <p>Teddy's Ladder, Sienna Plantation's premiere preschool, is gearing up for the fall semester. We are looking forward to the new school year and would be happy to show you around. We welcome families to tour our facility year-round so please come by and experience Teddy's Ladder, a prep school for elementary. Here's a sneak peek of our campus.</p>
                <div class="button-wrapper">
                    <Button href="/" text="Explore Our Facility" />
                </div>
            </div>
        </div>
        <div class="facility__images-wrapper" bind:this={wrapperEl}>
            <div class="facility__images-track flex gap-0_5" bind:this={trackEl}>
                <img src="/facility-01.jpg" alt="" class="facility__image">
                <img src="/facility-02.jpg" alt="" class="facility__image">
                <img src="/facility-03.jpg" alt="" class="facility__image">
                <img src="/facility-04.jpg" alt="" class="facility__image">
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

    &__image {
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
}
</style>