<script lang="ts">
	import "glightbox/dist/css/glightbox.min.css";
	
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	import '$lib/styles/app.scss';
	import favicon from '$lib/assets/favicon.svg';
	import 'modern-normalize';

	let { children } = $props();
</script>

<svelte:head>
	<title>Teddy's Ladder</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />
<main>
	{@render children()}
</main>
<Footer />