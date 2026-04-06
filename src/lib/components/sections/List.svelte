<script lang="ts">
    import Button from '$lib/components/ui/Button.svelte';

    let {
        title,
        description,
        button,
        listGroups,
    } = $props<{
        title: string;
        description?: string;
        button?: { buttonText: string; href: string };
        listGroups: {
            groupTitle: string;
            note?: string;
            items: {
                text: string;
                href?: string | null;
                linkType?: string | null;
            }[];
        }[];
    }>();
</script>

<section class="list-section">
    <div class="container">
        <div class="grid lg:grid--cols-12 gap-0_5">
            <div class="list-section__content flex flex--column gap-section">
                <div>
                    <h2>{title}</h2>
                    {#if description}
                        <p>{description}</p>
                    {/if}
                    {#if button}
                        <Button
                            href={button.href}
                            text={button.buttonText}
                        />
                    {/if}
                </div>
                {#each listGroups as group}
                    <div class="flex flex--column gap-section">
                        <div class="flex flex--column gap-1_5">
                            {#if group.groupTitle}
                                <div>
                                    <h3>{group.groupTitle}</h3>
                                </div>
                            {/if}
                            <ul class="list-section__list">
                                {#each group.items as item}
                                    <li class="list-section__list-item">
                                        {#if item.href}
                                            <a
                                                href={item.href}
                                                target={item.linkType === 'file' || item.linkType === 'external' ? '_blank' : undefined}
                                                rel={item.linkType === 'file' || item.linkType === 'external' ? 'noopener noreferrer' : undefined}
                                            >{item.text}</a>
                                        {:else}
                                            {item.text}
                                        {/if}
                                    </li>
                                {/each}
                            </ul>
                        </div>
                        {#if group.note}
                            <div class="list-section__note">
                                <p>{group.note}</p>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.list-section {
    
    &__content {

        @include a.min(md) {
            grid-column-start: 2;
            grid-column-end: 12;
        }
    }

    &__list {
        padding-left: .5em;
        margin: 0;
        list-style-type: none;
    }

    &__list-item {
        font-size: a.$fs-lg;
        font-weight: a.$fw-300;
        padding-block: a.$sp-0_75;
        border-bottom: 1px solid a.$clr-light-grey;

        a {
            color: a.$clr-black;
        }

        &::before {
            content: "•";
            display: inline-block;
            width: .5em;
            margin-left: -.5em;
        }

        &:first-child {
            padding-top: 0;
        }

        &:last-child {
            padding-bottom: 0;
            border-bottom: 0;
        }
    }

    &__note {
        padding: a.$sp-container;
        background-color: a.$clr-pastel-secondary;
        font-size: a.$fs-sm;
        line-height: a.$lh-md;
        border-radius: a.$br-2;
    }
}
</style>