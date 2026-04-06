<script lang="ts">
    import { PortableText } from '@portabletext/svelte'

    let {
        title,
        content,
    } = $props<{
        title?: string;
        content: any[];
    }>();
</script>

<section class="rich-text">
    <div class="container">
        <div class="grid lg:grid--cols-12 gap-0_5">
            <div class="rich-text__content">
                {#if title}
                    <h2>{title}</h2>
                {/if}
                <div class="rich-text__portable-text">
                    <PortableText value={content} />
                </div>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.rich-text {

    &__content {

        @include a.min(lg) {
            grid-column-start: 2;
            grid-column-end: 12;
        }
    }

    &__portable-text {
        :global(h1),
        :global(h2),
        :global(h3),
        :global(h4),
        :global(h5),
        :global(h6) {
            margin-top: 1em;
            line-height: a.$lh-md;
        }

        :global(h2) {
            font-size: clamp(1.5rem, 1.323943661971831rem + 0.7511737089201878vw, 2rem);
        }
    }
}
</style>