<script lang="ts">
	import type { Post, Track } from '$lib/types';
	import AboutBlock from './blocks/AboutBlock.svelte';
	import MusicBlock from './blocks/MusicBlock.svelte';
	import WritingsBlock from './blocks/WritingsBlock.svelte';
	import BeforeBlock from './blocks/BeforeBlock.svelte';
	import NowBlock from './blocks/NowBlock.svelte';

	type Props = {
		posts: Post[];
		categories: string[];
		tracks: Track[];
		musicError: string | null;
	};

	let { posts, categories, tracks, musicError }: Props = $props();
</script>

<div class="flex min-h-screen flex-col gap-6 p-6">
	<div class="border border-current p-4">
		<AboutBlock />
	</div>

	<div class="border border-current p-4">
		<MusicBlock {tracks} error={musicError} imageSize="md" maxHeight="max-h-64" />
	</div>

	<div class="border border-current p-4">
		<WritingsBlock {posts} />
	</div>

	<div class="border border-current p-4">
		<NowBlock />
	</div>

	<div class="border border-current p-4">
		<BeforeBlock />
	</div>
</div>
