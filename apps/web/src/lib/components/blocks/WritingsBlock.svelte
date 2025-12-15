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

<div class="mb-2 font-semibold">[writings]</div>
<ul class="space-y-2">
	{#each displayPosts as post}
		<li>
			{#if interactive}
				<a href="/writings/{post.slug}" class="block hover:underline">
					<span class="text-sm font-medium">{post.title}</span>
					<span class="block text-xs text-gray-500">{post.date.toLocaleDateString()}</span>
				</a>
			{:else}
				<span class="text-sm font-medium">{post.title}</span>
				<span class="block text-xs text-gray-500">{post.date.toLocaleDateString()}</span>
			{/if}
		</li>
	{/each}
</ul>
{#if remaining > 0}
	<p class="mt-2 text-sm text-gray-600">+{remaining} more</p>
{/if}
