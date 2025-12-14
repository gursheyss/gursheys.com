<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div>
	<nav>
		<a href="/">[about]</a>
		<a href="/music">[music]</a>
		<a href="/writings">[writings]</a>
		<a href="/history">[history]</a>
	</nav>

	<h1>writings</h1>

	<div class="flex flex-wrap gap-2 mt-4">
		{#each data.categories as cat}
			<a
				href="/writings/category/{cat}"
				class="text-sm hover:underline"
				class:text-gray-600={cat !== data.category}
				class:font-semibold={cat === data.category}
			>[{cat}]</a>
		{/each}
		<a href="/writings" class="text-sm text-gray-600 hover:underline">[all]</a>
	</div>

	<ul class="space-y-6 mt-6">
		{#each data.posts as post}
			<li>
				<a href="/writings/{post.slug}" class="block hover:underline">
					<h2 class="font-semibold">{post.title}</h2>
					<p class="text-sm text-gray-600">{post.date.toLocaleDateString()}</p>
					<p class="mt-1">{post.summary}</p>
				</a>
				<div class="flex gap-2 mt-2">
					{#each post.categories as category}
						<a href="/writings/category/{category}" class="text-xs text-gray-500 hover:underline">[{category}]</a>
					{/each}
				</div>
			</li>
		{/each}
	</ul>
</div>
