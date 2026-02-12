<script lang="ts">
	import { onMount } from 'svelte';
	import GraphCanvas from '$lib/components/GraphCanvas.svelte';
	import { graphStore } from '$lib/stores/graph.svelte';
	import { uiStore } from '$lib/stores/ui.svelte';
	import { mockGraphData } from '$lib/mock/graph-data';

	let graphCanvas: ReturnType<typeof GraphCanvas> | undefined = $state();

	onMount(() => {
		uiStore.setLoading(true);
		try {
			// Use mock data for development
			graphStore.setGraphData(mockGraphData);
		} catch {
			uiStore.setError('Failed to load graph data');
		} finally {
			uiStore.setLoading(false);
		}
	});
</script>

{#if uiStore.isLoading}
	<div class="flex items-center justify-center h-full">
		<span class="loading loading-spinner loading-lg text-primary"></span>
	</div>
{:else if uiStore.error}
	<div class="flex items-center justify-center h-full">
		<div class="alert alert-error max-w-md">
			<span>{uiStore.error}</span>
			<button class="btn btn-sm" onclick={() => uiStore.setError(null)}>Dismiss</button>
		</div>
	</div>
{:else}
	<GraphCanvas bind:this={graphCanvas} />
{/if}
