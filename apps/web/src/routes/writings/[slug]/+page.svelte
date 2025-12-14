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

	<a href="/writings" class="block mt-8">&larr; back to writings</a>
</div>
