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

    let glightbox: { destroy: () => void } | undefined;
    let videoEl: HTMLVideoElement | undefined = $state();

    const videoSrc = "https://res.cloudinary.com/dvrjnbjx2/video/upload/v1773090540/teddys-ladder_ktdjp8.mp4";

    onMount(() => {
        import("glightbox").then(({ default: GLightbox }) => {
            glightbox = GLightbox({
                selector: ".js-video-lightbox",
                touchNavigation: true,
                loop: false,
                autoplayVideos: true,
            });
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && videoEl && !videoEl.src) {
                    videoEl.src = videoSrc;
                    videoEl.play();
                    observer.unobserve(videoEl);
                }
            });
        }, { threshold: 0.1 });

        if (videoEl) {
            observer.observe(videoEl);
        }

        return () => {
            glightbox?.destroy();
            observer.disconnect();
        };
    });
</script>

<section class="video">
    <div class="container">
        <div class="video__wrapper flex flex--items-center flex--justify-center">
            <video bind:this={videoEl} autoplay muted loop preload="none"></video>
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

.video{
    
    &__wrapper {
        position: relative;
        overflow: hidden;
        border-radius: a.$br-2;
        padding: a.$sp-cta-vertical a.$sp-cta-horizontal;

        @include a.min(lg) {
            aspect-ratio: 16/9;
        }

        video {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
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