<script lang="ts">
  const birthday = new Date("2004-11-30");
  let age = $state(0);

  function calculateAge() {
    return (Date.now() - birthday.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  }

  $effect(() => {
    age = calculateAge();
    const interval = setInterval(() => {
      age = calculateAge();
    }, 315); // ~0.00000001 years in ms

    return () => clearInterval(interval);
  });
</script>

<h2 class="mb-2 font-semibold">[now]</h2>
<p class="text-sm text-gray-600">i'm currently {age.toFixed(8)} years old</p>
<p class="text-sm text-gray-600">
  going into my last semester of college at sjsu
</p>
<p class="text-sm text-gray-600">working on halo after a series of failures</p>
