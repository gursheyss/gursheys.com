<script lang="ts">
	import type { Track } from '$lib/types';

	type Props = {
		tracks: Track[];
		error: string | null;
		imageSize?: 'sm' | 'md';
		maxHeight?: string;
		interactive?: boolean;
	};

	let { tracks, error, imageSize = 'sm', maxHeight = 'max-h-48', interactive = true }: Props = $props();

	let imgClass = $derived(imageSize === 'sm' ? 'w-8 h-8' : 'w-10 h-10');
</script>

<h2 class="mb-2 font-semibold">[music]</h2>
<p class="text-xs text-gray-500 mb-2">what i've listened to today</p>
{#if error}
	<p class="text-xs text-red-500">{error}</p>
{:else if tracks.length === 0}
	<p class="text-sm text-gray-600">no tracks played today yet</p>
{:else}
	<ul class="space-y-2 {maxHeight} overflow-y-auto">
		{#each tracks as track}
			<li class="flex gap-2 items-center">
				{#if track.image}
					<img src={track.image} alt="{track.album} cover" class="{imgClass} rounded" />
				{:else}
					<div class="{imgClass} rounded bg-gray-200"></div>
				{/if}
				<div class="flex-1 min-w-0">
					{#if interactive}
						<a href={track.url} target="_blank" rel="noopener noreferrer" class="text-sm font-medium block truncate hover:underline">{track.name}</a>
					{:else}
						<span class="text-sm font-medium block truncate">{track.name}</span>
					{/if}
					<span class="text-xs text-gray-500 block truncate">{track.artist}</span>
				</div>
				<div class="text-xs text-gray-400 shrink-0 text-right">
					{#if track.isNowPlaying}
						<span class="text-green-500">playing</span>
					{:else if track.playCount > 1}
						<span>x{track.playCount}</span>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
{/if}
