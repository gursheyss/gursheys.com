<script lang="ts">
	import "./layout.css";
	import "@fontsource-variable/eb-garamond";
	import favicon from "$lib/assets/favicon.svg";

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="min-h-screen flex justify-center pt-16">
	<div class="w-80">
		{@render children()}
	</div>
</div>
