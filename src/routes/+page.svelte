<script lang="ts">
	import { onMount } from 'svelte';
	import GraphCanvas from '$lib/components/GraphCanvas.svelte';
	import { graphStore } from '$lib/stores/graph.svelte';
	import { uiStore } from '$lib/stores/ui.svelte';
	import { toastStore } from '$lib/stores/toast.svelte';
	import { mockGraphData } from '$lib/mock/graph-data';
	import { fetchGraph } from '$lib/api/graph';
	import { t } from '$lib/i18n/index.svelte';

	const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';
	let graphCanvas: ReturnType<typeof GraphCanvas> | undefined = $state();

	onMount(async () => {
		uiStore.setLoading(true);
		try {
			if (USE_MOCK) {
				graphStore.setGraphData(mockGraphData);
			} else {
				const data = await fetchGraph();
				graphStore.setGraphData(data);
			}
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
