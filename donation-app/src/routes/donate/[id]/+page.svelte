<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { getProjectById, type Project } from '$lib/data/projects';

  let projectId = '';
  let project: Project | undefined;
  let donationAmount = '';
  let phone = '';

  // Get project from mock data
  $: projectId = $page.params.id;
  $: project = getProjectById(projectId);

  async function handleDonate() {
    if (!donationAmount || !phone || !project) {
      alert('Enter a valid amount and phone number.');
      return;
    }

    const formattedPhone = phone.startsWith('254') ? phone : `254${phone.replace(/^0/, '')}`;

    try {
      const res = await fetch('/api/mpesa/stkpush', {
        method: 'POST',
        body: JSON.stringify({
          phone: formattedPhone,
          amount: Number(donationAmount)
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await res.json();

      if (res.ok) {
        alert('STK Push sent. Check your phone to complete the donation.');
        goto(`/donate/${project.id}?thankyou=1`);
      } else {
        alert(`Failed: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong while initiating M-Pesa payment.');
    }
  }
</script>

{#if project}
  <h1 class="text-2xl font-bold mb-4">Donate to {project.title}</h1>
  <p class="mb-2">{project.description}</p>

  <form on:submit|preventDefault={handleDonate} class="space-y-4">
    <input
      type="text"
      bind:value={phone}
      placeholder="Enter M-Pesa Phone (e.g. 712345678)"
      class="border px-3 py-2 rounded w-full"
      required
    />

    <input
      type="number"
      bind:value={donationAmount}
      min="1"
      placeholder="Enter amount (KES)"
      class="border px-3 py-2 rounded w-full"
      required
    />

    <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded">
      Donate
    </button>
  </form>

  {#if $page.url.searchParams.get('thankyou')}
    <p class="mt-4 text-green-600 font-semibold">Thank you for your donation!</p>
  {/if}
{:else}
  <p>Project not found.</p>
{/if}
