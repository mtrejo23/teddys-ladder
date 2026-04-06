<script lang="ts">
    let { programTitle, programAges, programDescription, programHref, programButtonText, programColor } = $props<{
        programTitle: string;
        programAges: string;
        programDescription: string;
        programHref: string;
        programButtonText: string;
        programColor?: string;
    }>();

    let cardWidth = $state(0);
    let minHeight = $derived(cardWidth);
</script>

<a 
    href={programHref} 
    class="program-card flex flex--column flex--justify-between gap-1"
    data-color={programColor}
    bind:clientWidth={cardWidth}
    style:min-height="{minHeight}px"
>
    <div class="flex flex--column gap-1">
        <div>
            <h3 class="program-card__title" class:mb-0={!programAges}>
                {programTitle}
            </h3>
            {#if programAges}
                <p class="program-card__ages">
                    {programAges}
                </p>
            {/if}
        </div>
        <p class="program-card__description">
            {programDescription}
        </p>
    </div>
    <div class="program-card__link flex gap-0_5 flex--items-center">
        <p>{programButtonText}</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="13" viewBox="0 0 9 13" fill="none">
            <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
        </svg>
    </div>
</a>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.program-card {
    padding: a.$sp-tile;
    border-radius: a.$br-2;
    text-decoration: none;
    color: a.$clr-black;
    transition: background-color .3s ease;

    &[data-color="pastel-light-green"] { background-color: a.$clr-pastel-light-green; }
    &[data-color="pastel-red-orange"] { background-color: a.$clr-pastel-red-orange; }
    &[data-color="pastel-pink"] { background-color: a.$clr-pastel-pink; }
    &[data-color="pastel-purple"] { background-color: a.$clr-pastel-purple; }
    &[data-color="pastel-orange"] { background-color: a.$clr-pastel-orange; }
    &[data-color="pastel-green"] { background-color: a.$clr-pastel-green; }
    &[data-color="pastel-primary"] { background-color: a.$clr-pastel-primary; }
    &[data-color="pastel-secondary"] { background-color: a.$clr-pastel-secondary; }

    &:hover {
        background-color: a.$clr-secondary;
        color: a.$clr-white;

        * {
            color: a.$clr-white;
            transition: color .3s ease;
        }
    }

    &__title {
        margin-bottom: a.$sp-0_5;

        &.mb-0 {
            margin-bottom: 0;
        }
    }

    &__ages, &__description {
        font-size: a.$fs-sm;
        line-height: a.$lh-md;
    }

    &__ages {
        font-weight: a.$fw-700;
    }

    &__link {
        color: a.$clr-primary;

        p {
            font-weight: a.$fw-700;
            margin-bottom: 0;
        }
    }
}
</style>