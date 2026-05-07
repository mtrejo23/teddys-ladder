<script lang="ts">
    import Image from '$lib/components/ui/Image.svelte'

    let {
        bgImage,
        image
    } = $props<{
        bgImage: { asset: any; alt: string; width: number; height: number };
        image: { asset: any; alt: string; width: number; height: number };
    }>();
</script>

<section class="hero-alt">
    <div class="hero-alt__bg-image-wrapper">
        <div class="hero-alt__bg-track">
            <Image
                image={bgImage}
                breakpoints={[400, 800, 1200]}
                class="hero-alt__bg-image"
            />
            <Image
                image={bgImage}
                breakpoints={[400, 800, 1200]}
                class="hero-alt__bg-image"
            />
        </div>
        <div class="hero-alt__bg-image__gradient"></div>
    </div>

    <div class="hero-alt__image-wrapper flex flex--justify-center">
        <Image
            image={image}
            breakpoints={[600, 900, 1200]}
            class="hero-alt__image"
        />
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.hero-alt {
    height: clamp(700px, 100dvh, 900px);
    position: relative;
    overflow: hidden;

    &__image-wrapper {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
    }

    &__bg-image-wrapper {
        position: absolute;
        inset: 0;
        overflow: hidden;
        z-index: 1;

        width: 30rem;
        max-width: 30rem;

        transform: rotate(-15deg) translateX(-5%);

        @include a.min(sm) {
            transform: rotate(-15deg) translateX(35%);
        }

        @include a.min(md) {
            transform: rotate(-15deg) translateX(5%);
            width: 50rem;
            max-width: 50rem;
        }

        @include a.min(lg) {
            transform: rotate(-15deg) translateX(45%);
            width: 50rem;
            max-width: 50rem;
        }
    }

    &__bg-track {
        display: flex;
        flex-direction: column;

        animation: scrollBackground 20s linear infinite;
    }

    &__bg-image {
        &__gradient {
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, #FFF 5%, rgba(255, 255, 255, 0.00) 30%, #FFF 60%);

            @include a.min(lg) {
                background: linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.00) 50%, #FFF 70%);
            }
        }
    }

    @keyframes scrollBackground {
        from {
            transform: translateY(0);
        }

        to {
            transform: translateY(-50%);
        }
    }
}

:global(img.hero-alt__bg-image) {
    width: 100%;
    height: auto;
    flex-shrink: 0;
    display: block;
}

:global(img.hero-alt__image) {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 60%;
    width: auto;
    max-width: none;

    @include a.min(md) {
        height: 80%;
    }
}
</style>