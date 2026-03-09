<script lang="ts">
    interface Props {
        href?: string;
        text?: string;
        onclick?: () => void;
        class?: string;
        variant?: 'default' | 'play';
    }

    let { href, text, onclick, class: className = '', variant = 'default' }: Props = $props();
</script>

{#if href}
    <a href={href} class="button {className}" class:play={variant === 'play'}>
        {text}
        {#if variant === 'play'}
            <span class="play-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                <path d="M12.1245 7.00002L0.000117644 14L0.000118256 -5.29974e-07L12.1245 7.00002Z" fill="currentColor"/>
                </svg>
            </span>
        {/if}
    </a>
{:else}
    <button class="button {className}" class:play={variant === 'play'} {onclick}>
        {text}
        {#if variant === 'play'}
            <span class="play-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                <path d="M12.1245 7.00002L0.000117644 14L0.000118256 -5.29974e-07L12.1245 7.00002Z" fill="currentColor"/>
                </svg>
            </span>
        {/if}
    </button>
{/if}

<style lang="scss">
@use '$lib//styles/abstracts' as a;

.button {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background-color: a.$clr-primary;
    color: a.$clr-white;
    font-size: a.$fs-button;
    font-weight: a.$fw-700;
    padding:
        clamp(1rem, 0.9559859154929577rem + 0.18779342723004694vw, 1.125rem)
        clamp(1.5rem, 1.323943661971831rem + 0.7511737089201878vw, 2rem)
    ;
    text-decoration: none;
    line-height: a.$lh-sm;
    border-radius: a.$br-100;
    transition: background-color .3s ease, color .3s ease;

    &:hover {
        background-color: a.$clr-secondary;
        color: a.$clr-white;
    }

    &.open {
        background-color: a.$clr-white;
        color: a.$clr-primary;
    }

    .play-icon {
        display: flex;
        align-items: center;

        svg {
            width: .75em;
            height: .75em;
        }
    }
}
</style>