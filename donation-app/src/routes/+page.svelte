<script lang="ts">
	// Example dummy projects, later replace with data from a DB or API
	const projects = [
		{ id: 1, name: 'Clean Water Initiative', description: 'Help build wells in rural Kenya.' },
		{ id: 2, name: 'School Fund Drive', description: 'Support children’s education in Kisumu.' }
	];
</script>

<h1 class="text-2xl font-bold mb-4">Support a Social Project</h1>

<div class="grid gap-4">
	{#each projects as project}
		<a href={`/donate/${project.id}`} class="block p-4 bg-white rounded shadow hover:bg-gray-100">
			<h2 class="text-xl font-semibold">{project.name}</h2>
			<p class="text-sm text-gray-600">{project.description}</p>
		</a>
	{/each}
</div>
