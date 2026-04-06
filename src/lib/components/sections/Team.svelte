<script lang="ts">
    import Image from '$lib/components/ui/Image.svelte'
    import { PortableText } from '@portabletext/svelte'

    interface Member {
        image: { asset: any; alt: string; width: number; height: number };
        name: string;
        role: string;
        shortBio: string;
        fullBio: any[];
    }

    let { title, description, members } = $props<{
        title: string;
        description?: any[];
        members: Member[];
    }>();

    let flipped = $state<Record<number, boolean>>({});

    function toggle(index: number) {
        flipped[index] = !flipped[index];
    }
</script>

<section class="team">
    <div class="container flex flex--column gap-section">
        <div class="grid lg:grid--cols-12 gap-0_5">
            <div class="section__intro">
                <h2>{title}</h2>
                {#if description}
                    <div class="section__description">
                        <PortableText value={description} />
                    </div>
                {/if}
            </div>
        </div>
        <div class="grid md:grid--cols-2 gap-0_5">
            {#each members as member, i}
                <div class="team__card" class:team__card--flipped={flipped[i]}>
                    <div class="team__card__front flex flex--column gap-1_5">
                        <Image
                            image={member.image}
                            breakpoints={[400, 800]}
                            class="team__card__image"
                        />
                        <div>
                            <h3 class="team__card__name">{member.name}</h3>
                            <p class="team__card__role">{member.role}</p>
                        </div>
                        <div class="team__card__short-bio">
                            <p>{member.shortBio} ...</p>
                        </div>
                        <button class="flex gap-0_5 flex--items-center" onclick={() => toggle(i)}>
                            <p>Read Full Bio</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="13" viewBox="0 0 9 13" fill="none">
                                <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                            </svg>
                        </button>
                    </div>
                    <div class="team__card__back flex flex--column gap-1_5">
                        <div>
                            <h3 class="team__card__name">{member.name}</h3>
                            <p class="team__card__role">{member.role}</p>
                        </div>
                        <div class="team__card__full-bio">
                            <PortableText value={member.fullBio} />
                        </div>
                        <button class="flex gap-0_5 flex--items-center" onclick={() => toggle(i)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="13" viewBox="0 0 9 13" fill="none">
                                <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke="currentColor" stroke-width="3" stroke-linecap="round" transform="rotate(180 4.5 6.5)"/>
                            </svg>
                            <p>Back</p>
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.team {

    &__card {
        position: relative;
        padding: a.$sp-large-card;
        border-radius: a.$br-2;
        transform-style: preserve-3d;
        transition: transform 0.6s ease;

        &:nth-child(8n + 1) { --card-bg: #{a.$clr-pastel-light-green}; }
        &:nth-child(8n + 2) { --card-bg: #{a.$clr-pastel-red-orange}; }
        &:nth-child(8n + 3) { --card-bg: #{a.$clr-pastel-pink}; }
        &:nth-child(8n + 4) { --card-bg: #{a.$clr-pastel-purple}; }
        &:nth-child(8n + 5) { --card-bg: #{a.$clr-pastel-orange}; }
        &:nth-child(8n + 6) { --card-bg: #{a.$clr-pastel-green}; }
        &:nth-child(8n + 7) { --card-bg: #{a.$clr-pastel-primary}; }
        &:nth-child(8n + 8) { --card-bg: #{a.$clr-pastel-secondary}; }

        background-color: var(--card-bg);

        &--flipped {
            transform: rotateY(180deg);
        }

        &__front,
        &__back {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
        }

        &__back {
            position: absolute;
            inset: 0;
            transform: rotateY(180deg);
            overflow-y: auto;
            padding: a.$sp-large-card;
            border-radius: a.$br-2;
            background-color: var(--card-bg);
        }

        &__name {
            margin-bottom: 0;
        }

        &__role {
            font-weight: a.$fw-700;
        }

        button {
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;
            margin-top: a.$sp-1;

            p {
                font-weight: a.$fw-700;
                margin-bottom: 0;
            }
        }

        &__full-bio {
            overflow-y: auto;
        }
    }
}

:global(img.team__card__image) {
    width: clamp(6rem, 4.591549295774648rem + 6.009389671361502vw, 10rem);
    height: auto;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: a.$br-2;
}
</style>