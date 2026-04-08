<script lang="ts">
    import Image from '$lib/components/ui/Image.svelte'

    let {
        title,
        description,
        columns,
        items,
    } = $props<{
        title: string;
        description?: string;
        columns: '2' | '3';
        items: {
            thumbnail: { asset: any; alt: string; width: number; height: number };
            itemDescription: string;
            file: string;
        }[];
    }>();
</script>

<section class="pdf-downloads">
    <div class="container flex flex--column gap-section">
        <div class="grid lg:grid--cols-12 gap-0_5">
            <div class="section__intro">
                <h2>{title}</h2>
                {#if description}
                    <div class="section__description">
                        <p>{description}</p>
                    </div>
                {/if}
            </div>
        </div>
        <div class="grid md:grid--cols-{columns} gap-3">
            {#each items as item}
                <div class="flex flex--column gap-1">
                    <a href={item.file} target="_blank">
                        <Image
                            image={item.thumbnail}
                            alt={item.thumbnail.alt}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </a>
                    {#if item.itemDescription}
                        <p class="text-align-center">Teddy's Tribune - {item.itemDescription}</p>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</section>

<style lang="scss">

</style>