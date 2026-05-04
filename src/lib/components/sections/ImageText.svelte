<script lang="ts">
    import Image from '$lib/components/ui/Image.svelte'
    import { PortableText } from '@portabletext/svelte'

    let {
        imagePosition,
        image,
        title,
        description,
    } = $props<{
        imagePosition: 'left' | 'right';
        image: { asset: any; alt: string; width: number; height: number };
        title: string;
        description: any[];
    }>();
</script>

<section class="image-text">
    <div class="container">
        <div class="grid md:grid--cols-2 gap-section image-text--{imagePosition}">
            <div class="image-text__image-wrapper">
                <Image
                    image={image}
                    breakpoints={[400, 800, 1200]}
                    class="image-text__image"
                />
            </div>
            <div class="image-text__content">
                <h2>{title}</h2>
                <PortableText value={description} />
            </div>
        </div>
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.image-text {

    &--right {
        :global(img.image-text__image) {
            order: 2;
        }

        .image-text__content {
            order: 1;
        }
    }

    &__content {
        align-self: center;
    }

    &__image-wrapper {
    position: relative;
    overflow: hidden;
    aspect-ratio: 1/1;
    border-radius: a.$br-2;

        &::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: a.$br-2;
            box-shadow: inset 0 0 2rem rgba(0, 0, 0, 0.1);
            pointer-events: none;
            z-index: 1;
        }
    }
}

:global(img.image-text__image) {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>