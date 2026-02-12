<script lang="ts">
	import { graphStore } from '$lib/stores/graph.svelte';
	import { t } from '$lib/i18n/index.svelte';

	const relCounts = $derived({
		RELATED_TO: graphStore.edges.filter((e) => e.relationType === 'RELATED_TO').length,
		SUPPORTS: graphStore.edges.filter((e) => e.relationType === 'SUPPORTS').length,
		CONFLICTS_WITH: graphStore.edges.filter((e) => e.relationType === 'CONFLICTS_WITH').length
	});

	const sourceCounts = $derived({
		ai: graphStore.edges.filter((e) => e.source === 'ai').length,
		human: graphStore.edges.filter((e) => e.source === 'human').length
	});
</script>

<footer class="bg-black/50 backdrop-blur-sm px-4 py-1 flex items-center gap-3 text-[10px] text-base-content/40">
	<span>{t('bottom.nodes')}: <strong class="text-base-content/60">{graphStore.nodes.length}</strong></span>
	<span class="text-base-content/15">|</span>
	<span>{t('bottom.edges')}: <strong class="text-base-content/60">{graphStore.edges.length}</strong></span>
	<span class="text-base-content/15">|</span>
	<span class="flex items-center gap-1">
		<span class="w-1.5 h-1.5 rounded-full bg-[#57534e] inline-block"></span>
		{relCounts.RELATED_TO}
	</span>
	<span class="flex items-center gap-1">
		<span class="w-1.5 h-1.5 rounded-full bg-[#4d7c0f] inline-block"></span>
		{relCounts.SUPPORTS}
	</span>
	<span class="flex items-center gap-1">
		<span class="w-1.5 h-1.5 rounded-full bg-[#b91c1c] inline-block"></span>
		{relCounts.CONFLICTS_WITH}
	</span>
	<span class="text-base-content/15">|</span>
	<span>AI {sourceCounts.ai} / Human {sourceCounts.human}</span>
</footer>
