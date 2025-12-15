<script lang="ts">
	import { onMount, tick } from 'svelte';
	import type { Post, Track } from '$lib/types';
	import AboutBlock from './blocks/AboutBlock.svelte';
	import MusicBlock from './blocks/MusicBlock.svelte';
	import WritingsBlock from './blocks/WritingsBlock.svelte';
	import HistoryBlock from './blocks/HistoryBlock.svelte';

	type Props = {
		posts: Post[];
		categories: string[];
		tracks: Track[];
		musicError: string | null;
	};

	let { posts, categories, tracks, musicError }: Props = $props();

	const MAX_WIDTH = 320;

	const blockConfigs = [
		{ id: 'about', label: 'about' },
		{ id: 'music', label: 'music' },
		{ id: 'writings', label: 'writings' },
		{ id: 'history', label: 'history' }
	];

	let positions = $state<{ x: number; y: number }[]>([]);
	let sizes = $state<{ width: number; height: number }[]>([]);
	let measureRefs: HTMLDivElement[] = [];
	let ready = $state(false);

	function overlaps(x: number, y: number, w: number, h: number, placed: { x: number; y: number; w: number; h: number }[]) {
		return placed.some((p) => {
			return Math.abs(p.x - x) < (p.w + w) / 2 + 20 && Math.abs(p.y - y) < (p.h + h) / 2 + 20;
		});
	}

	async function init() {
		await tick();

		const vw = window.innerWidth;
		const vh = window.innerHeight;

		const measured = measureRefs.map((el) => {
			if (el) {
				const rect = el.getBoundingClientRect();
				return { width: rect.width, height: rect.height };
			}
			return { width: 200, height: 100 };
		});
		sizes = measured;

		const padding = 40;
		const placed: { x: number; y: number; w: number; h: number }[] = [];

		positions = measured.map((size) => {
			let x: number, y: number, attempts = 0;
			do {
				x = padding + size.width / 2 + Math.random() * (vw - size.width - padding * 2);
				y = padding + size.height / 2 + Math.random() * (vh - size.height - padding * 2);
				attempts++;
			} while (overlaps(x, y, size.width, size.height, placed) && attempts < 100);

			placed.push({ x, y, w: size.width, h: size.height });
			return { x, y };
		});

		ready = true;
	}

	onMount(() => {
		init();

		let resizeTimeout: ReturnType<typeof setTimeout>;
		const onResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				ready = false;
				init();
			}, 250);
		};
		window.addEventListener('resize', onResize);

		return () => {
			clearTimeout(resizeTimeout);
			window.removeEventListener('resize', onResize);
		};
	});
</script>

<!-- Hidden measurement -->
<div class="fixed left-0 top-0 -z-50 opacity-0 pointer-events-none">
	{#each blockConfigs as config, i}
		<div bind:this={measureRefs[i]} class="border border-current bg-white p-4 inline-block" style="max-width: {MAX_WIDTH}px;">
			{#if config.id === 'about'}
				<AboutBlock />
			{:else if config.id === 'music'}
				<MusicBlock {tracks} error={musicError} interactive={false} />
			{:else if config.id === 'writings'}
				<WritingsBlock {posts} interactive={false} />
			{:else if config.id === 'history'}
				<HistoryBlock />
			{/if}
		</div>
	{/each}
</div>

<!-- Floating blocks -->
<div class="fixed inset-0 overflow-hidden">
	{#each blockConfigs as config, i}
		{@const pos = positions[i] ?? { x: 0, y: 0 }}
		{@const size = sizes[i] ?? { width: 0, height: 0 }}
		<div
			class="absolute left-0 top-0 border border-current bg-white p-4"
			class:invisible={!ready}
			style="max-width: {MAX_WIDTH}px; transform: translate({pos.x - size.width / 2}px, {pos.y - size.height / 2}px);"
			role="region"
			aria-label={config.label}
		>
			{#if config.id === 'about'}
				<AboutBlock />
			{:else if config.id === 'music'}
				<MusicBlock {tracks} error={musicError} />
			{:else if config.id === 'writings'}
				<WritingsBlock {posts} />
			{:else if config.id === 'history'}
				<HistoryBlock />
			{/if}
		</div>
	{/each}
</div>
