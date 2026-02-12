<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { authStore } from '$lib/stores/auth.svelte';

	onMount(() => {
		const a = page.url.searchParams.get('a');
		const r = page.url.searchParams.get('r');

		if (a && r) {
			authStore.setTokens(a, r, '');
			goto('/', { replaceState: true });
		} else {
			goto('/', { replaceState: true });
		}
	});
</script>

<div class="h-screen flex items-center justify-center bg-black">
	<span class="loading loading-spinner loading-lg text-primary"></span>
</div>
