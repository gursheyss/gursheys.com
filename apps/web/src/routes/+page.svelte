<script lang="ts">
	import { onMount } from 'svelte';
	import FloatingBlocks from '$lib/components/FloatingBlocks.svelte';
	import MobileNav from '$lib/components/MobileNav.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let isDesktop = $state(false);
	let mounted = $state(false);

	onMount(() => {
		const checkDesktop = () => {
			isDesktop = window.matchMedia('(min-width: 768px)').matches;
		};

		checkDesktop();
		mounted = true;

		const mediaQuery = window.matchMedia('(min-width: 768px)');
		mediaQuery.addEventListener('change', checkDesktop);

		return () => {
			mediaQuery.removeEventListener('change', checkDesktop);
		};
	});
</script>

{#if mounted}
	{#if isDesktop}
		<FloatingBlocks posts={data.posts} categories={data.categories} />
	{:else}
		<MobileNav posts={data.posts} categories={data.categories} />
	{/if}
{/if}
