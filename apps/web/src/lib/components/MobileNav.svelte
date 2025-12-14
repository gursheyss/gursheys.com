<script lang="ts">
	type Post = {
		title: string;
		slug: string;
		date: Date;
		summary: string;
		categories: string[];
	};

	type Props = {
		posts: Post[];
		categories: string[];
	};

	let { posts, categories }: Props = $props();
</script>

<div class="flex min-h-screen flex-col gap-6 p-6">
	<!-- About -->
	<div class="border border-current p-4">
		<h2 class="mb-2 font-semibold">[about]</h2>
		<p>hi! i'm gursh. welcome to my corner of the internet.</p>
	</div>

	<!-- Music -->
	<div class="border border-current p-4">
		<h2 class="mb-2 font-semibold">[music]</h2>
		<p class="text-sm text-gray-600">coming soon...</p>
	</div>

	<!-- Writings -->
	<div class="border border-current p-4">
		<a href="/writings" class="mb-2 block font-semibold hover:underline">[writings]</a>
		<ul class="space-y-2">
			{#each posts as post}
				<li>
					<a href="/writings/{post.slug}" class="block hover:underline">
						<span class="text-sm font-medium">{post.title}</span>
						<span class="block text-xs text-gray-500">{post.date.toLocaleDateString()}</span>
					</a>
				</li>
			{/each}
		</ul>
		{#if posts.length > 0}
			<a href="/writings" class="mt-2 block text-sm text-gray-600 hover:underline">view all →</a>
		{/if}
	</div>

	<!-- History -->
	<div class="border border-current p-4">
		<h2 class="mb-2 font-semibold">[history]</h2>
		<p class="text-sm text-gray-600">coming soon...</p>
	</div>
</div>
