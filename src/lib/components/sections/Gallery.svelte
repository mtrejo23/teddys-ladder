<script lang="ts">
    import Image from '$lib/components/ui/Image.svelte'
    import { urlFor } from '$lib/sanity/image'
    import { onMount } from 'svelte'

    let {
        title,
        description,
        images,
        id,
    } = $props<{
        title: string;
        description?: string;
        id: string;
        images: {
            asset: any;
            alt: string;
            width: number;
            height: number;
        }[];
    }>();

    let glightbox: { destroy: () => void } | undefined;

    onMount(() => {
        import('glightbox').then(({ default: GLightbox }) => {
            glightbox = GLightbox({
                selector: '.js-gallery-lightbox',
                touchNavigation: true,
                loop: true,
            });
        });

        return () => glightbox?.destroy();
    });
</script>

<section class="gallery">
    <div class="container flex flex--column gap-section">
        {#if title}
            <div class="grid lg:grid--cols-12 gap-0_5">
                <div class="section__intro">
                    <h2>{title}</h2>
                    {#if description}
                        <p>{description}</p>
                    {/if}
                </div>
            </div>
        {/if}
        <div class="grid sm:grid--cols-2 lg:grid--cols-3 xl:grid--cols-4 gap-0_5">
            {#each images.filter((img: { asset: any }) => img.asset) as image}
                <a
                    href={urlFor(image).auto('format').quality(90).url()}
                    class="js-gallery-lightbox gallery__image-wrapper"
                    data-gallery={id}
                    data-description={image.alt}
                >
                    <Image
                        image={image}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        breakpoints={[400, 800]}
                        class="gallery__image"
                    />
                </a>
            {/each}
        </div>
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.gallery {

    &__image-wrapper {
        aspect-ratio: 1/1;
        border-radius: a.$br-2;
        overflow: hidden;
    }
}

:global(img.gallery__image) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .3s ease;

    &:hover {
        transform: scale(110%);
    }
}
</style>