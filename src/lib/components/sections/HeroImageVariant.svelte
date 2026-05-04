<script lang="ts">
    import Image from '$lib/components/ui/Image.svelte'
    
    let {
        title,
        studentName,
        heroImage,
        image,
        variant = 'default'
    } = $props<{
        title: string;
        studentName: string;
        heroImage: { asset: any; alt: string; width: number; height: number };
        image: { asset: any; alt: string; width: number; height: number };
        variant?: 'default' | 'secondary';
    }>();
</script>

<section class="hero flex flex--items-end">
    <div class="hero__scrolling-text flex flex--justify-center">
        <div class="hero__scrolling-text__wrapper">
            {#if image}
                <div class="hero__bg-image">
                    <Image
                        image={image}
                        sizes="100vw 50vw"
                        breakpoints={[800, 1200, 1600]}
                        priority={true}
                        class="hero__bg-img"
                    />
                </div>
            {/if}
            {#if image}
                <div class="hero__bg-image">
                    <Image
                        image={image}
                        sizes="100vw 50vw"
                        breakpoints={[800, 1200, 1600]}
                        priority={true}
                        class="hero__bg-img"
                    />
                </div>
            {/if}
        </div>
        <div class="hero__scrolling-text__gradient">
        </div>
    </div>
    <div class="container">
        <div class="grid md:grid--cols-12 gap-0_5">
            <div class="hero__avatar">
                <Image
                    image={heroImage}
                    alt={heroImage.alt}
                    priority={true}
                    class="hero__image"
                />
            </div>
            <div class="hero__content">
                {#if variant === 'secondary'}
                    <p class="hero__title text-align-center md:text-align-left">{title}<br><span>Ours Can.<sup>TM</sup></span></p>
                {:else}
                    <h1 class="hero__title text-align-center md:text-align-left">{title}<br><span>Ours Can.<sup>TM</sup></span></h1>
                {/if}
                <p class="hero__student text-align-center">{studentName} - Actual Teddy's Ladder Student</p>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.hero {
    height: clamp(700px, 100dvh, 900px);

    @include a.min(md) {
        padding-bottom: 0;
    }

    &__avatar {
        --size: 21rem;
        --noggin: calc(var(--size) * 0.26);
        --height-with-noggin: calc(var(--size) + var(--noggin));
        --mask-size: calc(var(--size) / 2);
        --mask-image:
            linear-gradient(to bottom, orange 0%, orange 50%, transparent 50%),
            /* Circle cutout */
            radial-gradient(
                circle at center center,
                blue 0%,
                blue var(--mask-size),
                transparent var(--mask-size),
                transparent 100%
            );
        --mask-repeat: no-repeat, no-repeat;
        --mask-position: center center, center calc(var(--noggin) / 2);

        width: var(--size);
        height: var(--size);
        max-width: 100%;
        border-radius: 50%;
        background-color: a.$clr-secondary;
        display: flex;
        align-items: end;
        position: relative;
        margin-inline: auto;

        @include a.min(md) {
            background-color: transparent;
            width: 100%;
        }

        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: var(--height-with-noggin);
            background-image: var(--mask-image);
            background-repeat: var(--mask-repeat);
            background-position: var(--mask-position);
            opacity: 0.7;
            display: none;

            @include a.min(md) {
                display: none;
            }
        }

        @include a.min(md) {
            align-self: end;
            grid-column-start: 2;
            grid-column-end: 7;
        }

        :global(img.hero__image) {
            width: 100%;
            height: var(--height-with-noggin);
            object-fit: cover;
            mask-image: var(--mask-image);
            mask-repeat: var(--mask-repeat);
            mask-position: var(--mask-position);
            mask-mode: alpha;

            @include a.min(md) {
                height: auto;
                mask-image: none;
            }
        }
    }

    &__content {

        @include a.min(md) {
            align-self: end;
            grid-column-start: 7;
            grid-column-end: 12;
            margin-bottom: a.$sp-8;
        }
    }

    &__title {

        span {
            color: a.$clr-secondary;
        }
    }
    
    p.hero__title {
        font-size: a.$fs-h3;
        font-weight: a.$fw-700;
        line-height: a.$lh-sm;
        margin-bottom: .5em;
    }

    &__student {
        font-size: a.$fs-sm;
        line-height: a.$lh-sm;

        @include a.min(md) {
            position: absolute;
            bottom: 1rem;
        }
    }

    &__scrolling-text {
        position: absolute;
        inset: 0;
        overflow: hidden;

        &__wrapper {
            width: 40rem;
            max-width: 40rem;
            transform: rotate(-15deg) translateX(10%);

            @include a.min(sm) {
                transform: rotate(-15deg) translateX(12%);
            }

            @include a.min(md) {
                transform: rotate(-15deg) translateX(5%);
            }

            @include a.min(lg) {
                transform: rotate(-15deg) translateX(43%);
            }
        }

        .hero__bg-image {
            animation: scrollingText 20s linear infinite;

            :global(img.hero__bg-img) {
                height: auto;
                object-fit: contain;
            }

            @keyframes scrollingText {
                from {
                    transform: translateY(0%);
                }
                
                to {
                    transform: translateY(-100%);
                }
            }
        }

        &__gradient {
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, #FFF 5%, rgba(255, 255, 255, 0.00) 30%, #FFF 60%);

            @include a.min(lg) {
                background: linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.00) 50%, #FFF 70%);
            }
        }
    }
}
</style>