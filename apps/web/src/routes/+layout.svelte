<script lang="ts">
	import './layout.css';
	import '@fontsource-variable/eb-garamond';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';
	import GrainBackground from '$lib/components/GrainBackground.svelte';

	let { children } = $props();

	let isHomepage = $derived($page.url.pathname === '/');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if isHomepage}
	{@render children()}
{:else}
	<div class="flex min-h-screen justify-center pt-16">
		<div class="w-80">
			{@render children()}
		</div>
	</div>
{/if}

<GrainBackground />
