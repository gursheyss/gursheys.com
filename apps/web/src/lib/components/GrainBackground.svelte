<script lang="ts">
	import { onMount } from 'svelte';

	let transform = $state('translateX(0%) translateY(0%)');

	const keyframesX = ['0%', '-5%', '-15%', '7%', '-5%', '-15%', '15%', '0%', '3%', '-10%'];
	const keyframesY = ['0%', '-10%', '5%', '-25%', '25%', '10%', '0%', '15%', '35%', '10%'];

	onMount(() => {
		let i = 0;

		const interval = setInterval(() => {
			transform = `translateX(${keyframesX[i % keyframesX.length]}) translateY(${keyframesY[i % keyframesY.length]})`;
			i++;
		}, 50);

		return () => clearInterval(interval);
	});
</script>

<div class="pointer-events-none fixed inset-0 z-40 h-full w-full overflow-hidden">
	<div
		class="absolute inset-[-200%] h-[400%] w-[400%] bg-[length:256px] bg-left-top opacity-[3%]"
		style:background-image="url('/noise.png')"
		style:transform={transform}
	></div>
</div>
