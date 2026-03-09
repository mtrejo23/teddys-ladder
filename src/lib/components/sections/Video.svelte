<script>
  import Button from "../ui/Button.svelte";

</script>
<section class="video">
    <div class="container">
        <div class="video__wrapper flex flex--items-center flex--justify-center">
            <video src="https://res.cloudinary.com/dvrjnbjx2/video/upload/v1773090540/teddys-ladder_ktdjp8.mp4" autoplay muted loop></video>
            <div class="video__bg-overlay"></div>
            <div class="video__content text-align-center">
                <h2>Can Your Child Do This?<br>Ours Can</h2>
                <p>See our students read, write, and solve double-digit math through hands-on learning that prepares them for elementary school and beyond.</p>
                <div class="button-wrapper flex gap-0_5 flex--justify-center">

                    <Button
                        href="/"
                        text="Play Video"
                        class="button--white"
                        variant="play"
                    />

                    <Button
                        href="/"
                        text="Watch More Videos"
                        class="button--white"
                    />

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
        border-radius: a.$br-4;
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