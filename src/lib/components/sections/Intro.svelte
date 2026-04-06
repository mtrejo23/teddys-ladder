<script lang="ts">
    import { PortableText } from '@portabletext/svelte'
    import Image from '$lib/components/ui/Image.svelte'

    let {
        title,
        ages,
        description,
        variant = 'default',
    } = $props<{
        title: string;
        ages?: string;
        description: any[];
        variant?: string;
    }>();
</script>

<section class="intro-section">
    <div class="container">
        <div class="intro-section__wrapper">
            <div class="grid lg:grid--cols-10 gap-0_5">
                {#if variant === 'teddys-ladder'}
                    <Image src="/taaps-logo.png" width={147} height={147} alt="" class="intro-section__logo" />
                {/if}
                <div class="intro-section__content">
                    <h1 class="intro-section__title">{title}</h1>
                    {#if ages}
                        <p class="intro-section__ages">{ages}</p>
                    {/if}
                    <PortableText value={description} />
                </div>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.intro-section {
    padding-top: 0;

    &__wrapper {
        background-color: a.$clr-pastel-pink;
        padding: a.$sp-section a.$sp-cta-horizontal;
        border-radius: a.$br-2;
    }
    &__content {
        position: relative;

        @include a.min(md) {
            grid-column: span 7;
        }
    }
    &__title {
        margin-bottom: 0;
    }
}

:global(img.intro-section__logo) {
    margin-bottom: a.$sp-1;

    @include a.min(md) {
        position: absolute;
        max-width: 9.1875rem;
        height: auto;
        margin-bottom: 0;
        top: a.$sp-section;
        right: a.$sp-cta-horizontal;
    }
}
</style>