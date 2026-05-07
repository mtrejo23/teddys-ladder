<script lang="ts">
    let {
        videos
    } = $props<{
        videos: { url: string }[];
    }>();

    function getVimeoEmbedUrl(url: string) {
        const id = url.match(/vimeo\.com\/(\d+)/)?.[1];
        return id ? `https://player.vimeo.com/video/${id}` : null;
    }

    async function getVimeoOrientation(url: string): Promise<'landscape' | 'portrait'> {
        const res = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`);
        const data = await res.json();
        return data.height > data.width ? 'portrait' : 'landscape';
    }
</script>

<section class="videos">
    <div class="container">
        <div class="grid gap-section">
            {#each videos as video}
                {@const embedUrl = getVimeoEmbedUrl(video.url)}
                {#if embedUrl}
                    {#await getVimeoOrientation(video.url)}
                        <div class="videos__video-wrapper"></div>
                    {:then orientation}
                        <div class="videos__video-wrapper videos__video-wrapper--{orientation}">
                            <iframe
                                src={embedUrl}
                                class="videos__video"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowfullscreen
                                title="Vimeo video"
                                frameborder="0"
                            ></iframe>
                        </div>
                    {/await}
                {/if}
            {/each}
        </div>
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.videos {
    &__video-wrapper {
        position: relative;
        aspect-ratio: 16/9;
        border-radius: a.$br-2;
        overflow: hidden;

        &--portrait {
            aspect-ratio: 9/16;
            
            @include a.min(md) {
                aspect-ratio: 16/9;
            }
        }
    }

    &__video {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        border: none;
    }
}
</style>