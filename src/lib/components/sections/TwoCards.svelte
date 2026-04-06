<script lang="ts">
    let {
        title,
        cards,
    } = $props<{
        title: string;
        cards: {
            title: string;
            description: string;
        }[];
    }>();
</script>

<section class="two-cards">
    <div class="container flex flex--column gap-section">
        <div class="grid lg:grid--cols-12 gap-0_5">
            <div class="section__intro">
                <h2>{title}</h2>
            </div>
        </div>
        <div class="grid md:grid--cols-2 gap-0_5">
            {#each cards as card}
                <div class="two-cards__card">
                    <h2>{card.title}</h2>
                    <p>{card.description}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.two-cards {

    &__card {
        padding: a.$sp-large-card;
        border-radius: a.$br-2;

        &:nth-child(8n + 1) { background-color: a.$clr-pastel-light-green; }
        &:nth-child(8n + 2) { background-color: a.$clr-pastel-red-orange; }
        &:nth-child(8n + 3) { background-color: a.$clr-pastel-pink; }
        &:nth-child(8n + 4) { background-color: a.$clr-pastel-purple; }
        &:nth-child(8n + 5) { background-color: a.$clr-pastel-orange; }
        &:nth-child(8n + 6) { background-color: a.$clr-pastel-green; }
        &:nth-child(8n + 7) { background-color: a.$clr-pastel-primary; }
        &:nth-child(8n + 8) { background-color: a.$clr-pastel-secondary; }
    }
}
</style>