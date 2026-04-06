<script lang="ts">
    let {
        title,
        color,
        cards,
    } = $props<{
        title: string;
        color: string;
        cards: {
            title: string;
            description: string;
        }[];
    }>();
</script>

<section class="highlights-section">
    <div class="container flex flex--column gap-section">
        <div class="grid lg:grid--cols-12 gap-0_5">
            <div class="section__intro">
                <h2>{title}</h2>
            </div>
        </div>
        <div class="grid lg:grid--cols-4 gap-0_5">
            {#each cards as card}
                <div class="highlights-section__card highlights-section__card--{color}">
                    <h3>{card.title}</h3>
                    <p class="highlights-section__card__description">{card.description}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.highlights-section {
    &__card {
        padding: a.$sp-1_5;
        border-radius: a.$br-2;
        aspect-ratio: 1/1;

        &--pastel-light-green { background-color: a.$clr-pastel-light-green; }
        &--pastel-red-orange { background-color: a.$clr-pastel-red-orange; }
        &--pastel-pink { background-color: a.$clr-pastel-pink; }
        &--pastel-purple { background-color: a.$clr-pastel-purple; }
        &--pastel-orange { background-color: a.$clr-pastel-orange; }
        &--pastel-green { background-color: a.$clr-pastel-green; }
        &--pastel-primary { background-color: a.$clr-pastel-primary; }
        &--pastel-secondary { background-color: a.$clr-pastel-secondary; }

        &__description {
            font-size: a.$fs-sm;
            line-height: a.$lh-md;
        }
    }
}
</style>