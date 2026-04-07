<script lang="ts">
	import "glightbox/dist/css/glightbox.min.css";
	
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	import '$lib/styles/app.scss';
	import 'modern-normalize';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="any" />
	<link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
	<link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
	<link rel="icon" href="/favicon-48x48.png" sizes="48x48" type="image/png" />
	<link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<meta name="theme-color" content="#002B57" />
</svelte:head>

<Header />
<main>
	{@render children()}
</main>
<Footer />