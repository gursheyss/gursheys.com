<script lang="ts">
	import type { Post } from '$lib/types';

	type Props = {
		posts: Post[];
		interactive?: boolean;
	};

	let { posts, interactive = true }: Props = $props();

	let displayPosts = $derived(posts.slice(0, 3));
	let remaining = $derived(posts.length - 3);
</script>

<div class="mb-2 font-semibold">[log]</div>
<div class="space-y-4">
	{#each displayPosts as post}
		<div>
			<div class="text-sm font-medium mb-1">{post.title}</div>
			<div class="text-xs prose prose-sm prose-ul:my-1 prose-li:my-0">
				{@html post.html}
			</div>
		</div>
	{/each}
</div>
{#if remaining > 0}
	<p class="mt-2 text-sm text-gray-600">+{remaining} more</p>
{/if}

