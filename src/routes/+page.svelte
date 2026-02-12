<script lang="ts">
	import { onMount } from 'svelte';
	import GraphCanvas from '$lib/components/GraphCanvas.svelte';
	import { graphStore } from '$lib/stores/graph.svelte';
	import { uiStore } from '$lib/stores/ui.svelte';
	import { toastStore } from '$lib/stores/toast.svelte';
	import { mockGraphData } from '$lib/mock/graph-data';
	import { t } from '$lib/i18n/index.svelte';

	let graphCanvas: ReturnType<typeof GraphCanvas> | undefined = $state();

	onMount(() => {
		uiStore.setLoading(true);
		try {
			// Use mock data for development
			graphStore.setGraphData(mockGraphData);
		} catch {
			toastStore.show(t('error.loadGraph'));
		} finally {
			uiStore.setLoading(false);
		}
	});
</script>

{#if uiStore.isLoading}
	<div class="flex items-center justify-center h-full">
		<span class="loading loading-spinner loading-lg text-primary"></span>
	</div>
{:else}
	<GraphCanvas bind:this={graphCanvas} />
{/if}
