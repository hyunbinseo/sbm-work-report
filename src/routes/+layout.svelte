<script lang="ts">
	const { VITE_TITLE, VITE_DESCRIPTION } = import.meta.env;

	import './app.css';
</script>

<svelte:head>
	<title>{VITE_TITLE}</title>
	<meta property="og:title" content={VITE_TITLE} />
	<meta name="description" content={VITE_DESCRIPTION} />
	<meta property="og:description" content={VITE_DESCRIPTION} />
	<meta property="og:type" content="website" />
</svelte:head>

<slot />
