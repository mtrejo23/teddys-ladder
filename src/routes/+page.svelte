<script lang="ts">
    import Hero from '$lib/components/sections/Hero.svelte';
    import Cta from '$lib/components/sections/Cta.svelte'
    import Programs from '$lib/components/sections/Programs.svelte'
    import Video from "$lib/components/sections/Video.svelte"
    import Facility from '$lib/components/sections/Facility.svelte';
    import Testimonials from '$lib/components/sections/Testimonials.svelte';

    const programTeddysLadder = [
        {
            programTitle: "Pre-K 3",
            programAges: "3 - 4 Years",
            programDescription: "Teddy's Ladder's Pre-K 3 program strengthens academic readiness by introducing reading, writing, math, science, and social studies through engaging, age-appropriate learning.",
            programHref: "/",
            programButtonText: "View Program"
        },
        {
            programTitle: "Pre-K 4",
            programAges: "4 - 5 Years",
            programDescription: "Teddy's Ladder's Pre-K 4 program prepares children for kindergarten by developing early reading, writing, math, and problem-solving skills through a hands-on, structured curriculum.",
            programHref: "/",
            programButtonText: "View Program"
        },
        {
            programTitle: "Kindergarten",
            programAges: "5 - 6 Years",
            programDescription: "Teddy's Ladder's Kindergarten program builds confident learners through phonics, reading, math, science, and social development, preparing children for long-term academic success.",
            programHref: "/",
            programButtonText: "View Program"
        },
        {
            programTitle: "1st Grade",
            programAges: "6 - 7 Years",
            programDescription: "Teddy's Ladder's 1st Grade program strengthens reading, writing, and math skills while fostering critical thinking, independence, and a love of learning.",
            programHref: "/",
            programButtonText: "View Program"
        },
        {
            programTitle: "Teddy's Readers",
            programAges: "",
            programDescription: "Teddy's Readers is a focused literacy program designed to build confident readers through phonics, sight words, comprehension, and early writing skills.",
            programHref: "/",
            programButtonText: "View Program"
        },
        {
            programTitle: "Teddy's Math",
            programAges: "",
            programDescription: "Teddy's Readers is a focused literacy program designed to build confident readers through phonics, sight words, comprehension, and early writing skills.",
            programHref: "/",
            programButtonText: "View Program"
        },
        {
            programTitle: "Teddy's Projects",
            programAges: "",
            programDescription: "Teddy's Ladder's 1st Grade program strengthens reading, writing, and math skills while fostering critical thinking, independence, and a love of learning.",
            programHref: "/",
            programButtonText: "View Program"
        },
        {
            programTitle: "Fun & Celebrations",
            programAges: "",
            programDescription: "Teddy's Readers is a focused literacy program designed to build confident readers through phonics, sight words, comprehension, and early writing skills.",
            programHref: "/",
            programButtonText: "View Program"
        }
    ];

    const programsTeddysJuniors = [
        {
            programTitle: "Cubs",
            programAges: "13 - 17 Months",
            programDescription: "Teddy's Juniors Cubs program strengthens academic readiness by introducing reading, writing, math, science, and social studies through engaging, age-appropriate learning.",
            programHref: "/",
            programButtonText: "View Program"
        },
        {
            programTitle: "Teddies",
            programAges: "18 - 23 Months",
            programDescription: "Teddy's Juniors Cubs program strengthens academic readiness by introducing reading, writing, math, science, and social studies through engaging, age-appropriate learning.",
            programHref: "/",
            programButtonText: "View Program"
        },
        {
            programTitle: "Pandas",
            programAges: "2 - 3 Years",
            programDescription: "Teddy's Juniors Cubs program strengthens academic readiness by introducing reading, writing, math, science, and social studies through engaging, age-appropriate learning.",
            programHref: "/",
            programButtonText: "View Program"
        },
        {
            programTitle: "Fun & Celebrations",
            programAges: "",
            programDescription: "Teddy's Juniors Cubs program strengthens academic readiness by introducing reading, writing, math, science, and social studies through engaging, age-appropriate learning.",
            programHref: "/",
            programButtonText: "View Program"
        }
    ];
</script>

<Hero />
<Cta
    ctaTitle= "Why Choose Teddy's Ladder"
    ctaDescription= "Teddy's Ladder is a boutique preschool nestled in the heart of Sienna Plantation whose sole objective is to have students reading, writing and doing double digit math by the time they graduate our program."
    ctaButtonText= "Our Approach"
    ctaHref= "/"
    ctaClass= "cta--intro"
    ctaBgImage= "/cta-bg-01.jpg"
/>
<Programs
    programsTitle= "Teddy's Ladder Programs"
    programsDescription= "Teddy's Ladder provides a carefully designed learning journey from infancy through 1st grade, combining hands-on instruction, creativity, and age-appropriate academics. As a true prep school for elementary, our students graduate able to read, write, and master double-digit math."
    programsCtaTitle= "Join The Teddy's Ladder Family"
    programsCtaButtonText= "Schedule A Tour"
    programsCtaButtonHref= "/"
    programsCtaClass= "cta--teddys-ladder"
    programsCtaBgImage= "/cta-bg-02.jpg"
    programsCtaButtonClass= "button--white"
    programsTeddysLadder={programTeddysLadder}
/>
<Programs
    programsTitle= "Teddy's Juniors Programs"
    programsDescription= "<strong>A Sienna Kids Academy Company</strong><br>Teddy's Ladder provides a carefully designed learning journey from infancy through 1st grade, combining hands-on instruction, creativity, and age-appropriate academics. As a true prep school for elementary, our students graduate able to read, write, and master double-digit math."
    programsCtaTitle= "Join The Teddy's Juniors Family"
    programsCtaDescription= "A Sienna Kids Academy Company"
    programsCtaButtonText= "Schedule A Tour"
    programsCtaButtonHref= "/"
    programsCtaClass="cta--teddys-juniors"
    programsCtaBgImage= "/cta-bg-03.jpg"
    programsCtaButtonClass= "button--white button--white--hover-bg-primary"
    programsTeddysJuniors={programsTeddysJuniors}
/>
<Video />
<Facility />
<Testimonials />