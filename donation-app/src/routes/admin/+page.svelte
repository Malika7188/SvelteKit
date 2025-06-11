<script lang="ts">
  import { projects } from '$lib/data/projects';
</script>

<h1 class="text-2xl font-bold mb-4">Support a Social Project</h1>

{#each projects as project}
  <div class="border p-4 rounded shadow mb-4">
    <h2 class="text-xl font-semibold">{project.title}</h2>
    <p class="mb-2">{project.description}</p>
    <a href={`/donate/${project.id}`} class="text-blue-500 underline">Donate</a>
  </div>
{/each}
