<script lang="ts">

    let {
        title,
    }   = $props<{
            title: string;
    }>();

</script>

<section class="page-title">
    <div class="container">
        <div class="page-title__wrapper">
            <h1 class="page-title__title">
                {title}
            </h1>
        </div>
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.page-title {
    padding-top: 7rem;

    &__wrapper {
        padding: a.$sp-section a.$sp-cta-horizontal;
        border-radius: a.$br-2;
        background: linear-gradient(180deg, rgba(214, 244, 255, 0.00) 0%, #D6F4FF 100%);
    }
}
</style>