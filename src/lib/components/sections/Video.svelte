<script lang="ts">
    import Button from "../ui/Button.svelte";
    import { onMount } from "svelte";
    import { PortableText } from '@portabletext/svelte';

    let {
        title,
        description,
        vimeoUrl,
        playVideoButton,
        button,
    } = $props<{
        title: string;
        description?: any[];
        vimeoUrl?: string;
        playVideoButton?: { buttonText: string };
        button?: { buttonText: string; href: string };
    }>();

    let glightbox: any;
    let bgIframe: HTMLIFrameElement | undefined = $state();

    const vimeoId = "1172190789";
    const vimeoBgSrc = `https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1&byline=0&title=0`;

    function resumeBgVideo() {
        bgIframe?.contentWindow?.postMessage('{"method":"play"}', 'https://player.vimeo.com');
    }

    onMount(() => {
        import("glightbox").then(({ default: GLightbox }) => {
            const options: Parameters<typeof GLightbox>[0] = {
                selector: ".js-video-lightbox",
                touchNavigation: true,
                loop: false,
                autoplayVideos: true,
            };

            glightbox = GLightbox(options);
            glightbox.on("close", resumeBgVideo);
        });

        return () => {
            glightbox?.destroy();
        };
    });
</script>

<section class="video">
    <div class="container">
        <div class="video__wrapper flex flex--items-center flex--justify-center">
            <iframe
                bind:this={bgIframe}
                src={vimeoBgSrc}
                frameborder="0"
                allow="autoplay; fullscreen"
                title="Background video"
                aria-hidden="true"
            ></iframe>
            <div class="video__bg-overlay"></div>
            <div class="video__content text-align-center">
                <h2>{title}</h2>
                {#if description}
                    <div class="video__description">
                        <PortableText value={description} />
                    </div>
                {/if}
                <div class="button-wrapper flex gap-0_5 flex--justify-center">

                    {#if vimeoUrl && playVideoButton}
                        <Button
                            href={vimeoUrl}
                            text={playVideoButton.buttonText}
                            class="button--white js-video-lightbox"
                            variant="play"
                        />
                    {/if}

                    {#if button}
                        <Button
                            href={button.href}
                            text={button.buttonText}
                            class="button--white"
                        />
                    {/if}

                </div>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.video {

    &__wrapper {
        position: relative;
        overflow: hidden;
        border-radius: a.$br-2;
        padding: a.$sp-cta-vertical a.$sp-cta-horizontal;

        @include a.min(lg) {
            aspect-ratio: 16/9;
        }

        iframe {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            min-width: 177.78vh;
            min-height: 100%;
            border: none;
            pointer-events: none;
        }
    }

    &__bg-overlay {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 33, 87, 0.5);
    }

    &__content {
        position: relative;
        max-width: 49.375rem;

        * {
            color: a.$clr-white;
        }
    }
}
</style>