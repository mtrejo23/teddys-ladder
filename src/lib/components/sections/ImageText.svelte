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
            <Image
                image={image}
                breakpoints={[400, 800, 1200]}
                class="image-text__image"
            />
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
}

:global(img.image-text__image) {
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;
    overflow: hidden;
    object-fit: cover;
    border-radius: a.$br-2;
}
</style>