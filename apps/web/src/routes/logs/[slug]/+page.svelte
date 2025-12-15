<script lang="ts">
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<div>
	<a href="/" class="text-sm text-gray-600 hover:underline">&larr; back</a>

	<article class="mt-6">
		<header>
			<h1>{data.post.title}</h1>
			<p class="text-sm text-gray-600 mt-2">
				{data.post.date.toLocaleDateString()} &middot; {data.post.author}
			</p>
		</header>
		<div class="prose mt-6">
			{@html data.post.html}
		</div>
	</article>
</div>

