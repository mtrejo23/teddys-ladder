<section class="hero flex flex--items-end">
    <div class="hero__scrolling-text flex flex--justify-center">
        <div class="hero__scrolling-text__wrapper">
            <p>Tip jumped up. Tup jumped down. Tup and Tip did stunts.
            Tup and Tip had fun. Lox, the fox, was hungry. "Have turnip, Tup. Have a carrot, Tip," said Lox.
            "The fox is cunning, The fox wants us for supper. Run!" said Tup. But the fox ran fast. "Jump up!" said Tup.
            Tip and Tup jumped on Lox. Lox Ran, but Tup and Tim hung on. "puff, puff, puff" went the fox. The fox was out of luck.
            At sunset, Tip and Tup had carrots and turnips for supper.</p>
            <p>Tip jumped up. Tup jumped down. Tup and Tip did stunts.
            Tup and Tip had fun. Lox, the fox, was hungry. "Have turnip, Tup. Have a carrot, Tip," said Lox.
            "The fox is cunning, The fox wants us for supper. Run!" said Tup. But the fox ran fast. "Jump up!" said Tup.
            Tip and Tup jumped on Lox. Lox Ran, but Tup and Tim hung on. "puff, puff, puff" went the fox. The fox was out of luck.
            At sunset, Tip and Tup had carrots and turnips for supper.</p>
        </div>
        <div class="hero__scrolling-text__gradient">
        </div>
    </div>
    <div class="container">
        <div class="grid md:grid--cols-12 gap-0_5">
            <div class="hero__avatar">
                <img src="/giuliana.png" alt="Giuliana" class="hero__image">
            </div>
            <div class="hero__content">
                <h1 class="hero__title text-align-center md:text-align-left">Can Your Four Year Old Read This?<br><span>Ours Can.<sup>TM</sup></span></h1>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.hero {
    height: clamp(700px, 100vh, 900px);

    @include a.min(md) {
        padding-bottom: 0;
    }

    &__avatar {
        --size: 21rem;
        --noggin: calc(var(--size) * 0.26);
        --height-with-noggin: calc(var(--size) + var(--noggin));
        --mask-size: calc(var(--size) / 2);
        --mask-image:
            linear-gradient(to bottom, orange 0%, orange 50%, transparent 50%),
            /* Circle cutout */
            radial-gradient(
                circle at center center,
                blue 0%,
                blue var(--mask-size),
                transparent var(--mask-size),
                transparent 100%
            );
        --mask-repeat: no-repeat, no-repeat;
        --mask-position: center center, center calc(var(--noggin) / 2);

        width: var(--size);
        height: var(--size);
        max-width: 100%;
        border-radius: 50%;
        background-color: a.$clr-secondary;
        display: flex;
        align-items: end;
        position: relative;
        margin-inline: auto;

        @include a.min(md) {
            background-color: transparent;
            width: 100%;
        }

        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: var(--height-with-noggin);
            background-image: var(--mask-image);
            background-repeat: var(--mask-repeat);
            background-position: var(--mask-position);
            opacity: 0.7;
            display: none;

            @include a.min(md) {
                display: none;
            }
        }

        img {
            width: 100%;
            height: var(--height-with-noggin);
            object-fit: cover;
            mask-image: var(--mask-image);
            mask-repeat: var(--mask-repeat);
            mask-position: var(--mask-position);
            mask-mode: alpha;

            @include a.min(md) {
                height: auto;
                mask-image: none;
            }
        }

        @include a.min(md) {
            align-self: end;
            grid-column-start: 2;
            grid-column-end: 7;
        }
    }

    &__content {

        @include a.min(md) {
            align-self: end;
            grid-column-start: 7;
            grid-column-end: 12;
            margin-bottom: a.$sp-8;
        }
    }

    &__title {

        span {
            color: a.$clr-secondary;
        }
    }

    &__scrolling-text {
        position: absolute;
        inset: 0;
        overflow: hidden;

        &__wrapper {
            width: 40rem;
            max-width: 40rem;
            transform: rotate(-15deg) translateX(10%);

            @include a.min(sm) {
                transform: rotate(-15deg) translateX(12%);
            }

            @include a.min(md) {
                transform: rotate(-15deg) translateX(5%);
            }

            @include a.min(lg) {
                transform: rotate(-15deg) translateX(43%);
            }
        }

        p {
            font-family: a.$font-secondary;
            font-size: a.$fs-xxl;
            line-height: a.$lh-md;
            color: a.$clr-light-grey;
            transform: translateX(15%);
            margin: 0;
            animation: scrollingText 20s linear infinite;

            @keyframes scrollingText {
                from {
                    transform: translateY(0%);
                }
                
                to {
                    transform: translateY(-100%);
                }
            }
        }

        &__gradient {
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, #FFF 5%, rgba(255, 255, 255, 0.00) 30%, #FFF 60%);

            @include a.min(lg) {
                background: linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.00) 50%, #FFF 70%);
            }
        }
    }
}
</style>
