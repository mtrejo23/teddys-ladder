<script lang="ts">
    import { urlFor } from '$lib/sanity/image'
    import type { SanityImageSource } from '@sanity/image-url'

    interface Props {
        image?: SanityImageSource & { alt?: string; width?: number; height?: number };
        src?: string;
        alt?: string;
        width?: number;
        height?: number;
        sizes?: string;
        quality?: number;
        breakpoints?: number[];
        priority?: boolean;
        class?: string;
    }

    let {
        image,
        src,
        alt = '',
        width,
        height,
        sizes = '(max-width: 768px) 100vw, 50vw',
        quality = 70,
        breakpoints = [400, 800, 1200],
        priority = false,
        class: className = '',
    }: Props = $props();

    const isSanity = $derived(!!image);
    const intrinsicWidth = $derived(width ?? image?.width ?? 0);
    const intrinsicHeight = $derived(height ?? image?.height ?? 0);

    const srcset = $derived(() => {
        if (!isSanity || !image) return '';
        return breakpoints
            .map(w =>
                `${urlFor(image)
                    .width(w)
                    .auto('format')
                    .quality(quality)
                    .url()} ${w}w`
            )
            .join(', ');
    });

    const imageUrl = $derived(() => {
        if (isSanity && image) {
            const maxWidth = Math.max(...breakpoints);
            return urlFor(image).width(maxWidth).auto('format').quality(quality).url();
        }
        return src ?? '';
    });

    const imgAlt = $derived(alt ?? image?.alt ?? '');
</script>

<img
    src={imageUrl()}
    srcset={srcset() || undefined}
    {sizes}
    width={intrinsicWidth || undefined}
    height={intrinsicHeight || undefined}
    alt={imgAlt}
    loading={priority ? 'eager' : 'lazy'}
    fetchpriority={priority ? 'high' : undefined}
    decoding={priority ? 'sync' : 'async'}
    class={className}
/>