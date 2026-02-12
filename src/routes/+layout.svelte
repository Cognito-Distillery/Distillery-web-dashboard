<script lang="ts">
	import '../app.css';
	import SidePanel from '$lib/components/SidePanel.svelte';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
	import LoginView from '$lib/components/LoginView.svelte';
	import { authStore } from '$lib/stores/auth.svelte';

	let { children } = $props();
</script>

{#if !authStore.isAuthenticated}
	<LoginView />
{:else}
	<div class="h-screen w-screen overflow-hidden bg-black relative">
		<main class="w-full h-full">
			{@render children()}
		</main>
		<SidePanel />
	</div>

	<ConfirmDialog />
{/if}
