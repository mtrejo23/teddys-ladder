<script lang="ts">
    import Image from '$lib/components/ui/Image.svelte'

    let {
        images
    } = $props<{
        images: { asset: any; alt: string; width: number; height: number }[];
    }>();
</script>

<section class="images">
    <div class="container">
        {#each images as image}
            <div class="images__image-wrapper">
                <Image
                    image={image}
                    breakpoints={[400, 800, 1200]}
                    class="images__image"
                />
            </div>
        {/each}
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.images {
    &__image-wrapper {
        position: relative;
        aspect-ratio: 2/1;
        border-radius: a.$br-2;
        overflow: hidden;
    }
    :global(img.images__image) {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>