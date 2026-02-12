<script lang="ts">
	import { searchStore } from '$lib/stores/search.svelte';
	import { graphStore } from '$lib/stores/graph.svelte';
	import { naturalSearch } from '$lib/api/search';
	import { debounce } from '$lib/utils/debounce';
	import { t } from '$lib/i18n/index.svelte';

	interface Props {
		onfocus?: (nodeId: string) => void;
	}

	let { onfocus }: Props = $props();
	let showDropdown = $state(false);

	const doKeywordSearch = debounce((q: string) => {
		if (!q.trim()) {
			searchStore.setResults([]);
			return;
		}
		const lower = q.toLowerCase();
		const matched = graphStore.nodes.filter(
			(n) =>
				n.summary.toLowerCase().includes(lower) ||
				n.context.toLowerCase().includes(lower) ||
				n.memo.toLowerCase().includes(lower)
		);
		searchStore.setResults(matched);
	}, 200);

	async function doNaturalSearch(q: string) {
		if (!q.trim()) {
			searchStore.setResults([]);
			return;
		}
		searchStore.setSearching(true);
		try {
			const res = await naturalSearch(q);
			searchStore.setResults(res.nodes);
			showDropdown = res.nodes.length > 0;
		} catch {
			searchStore.setResults([]);
		} finally {
			searchStore.setSearching(false);
		}
	}

	function handleInput(e: Event) {
		const val = (e.target as HTMLInputElement).value;
		searchStore.setQuery(val);
		showDropdown = true;
		if (searchStore.mode === 'keyword') {
			doKeywordSearch(val);
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (searchStore.mode === 'natural' && e.key === 'Enter') {
			e.preventDefault();
			doNaturalSearch(searchStore.query);
		}
	}

	function selectResult(nodeId: string) {
		graphStore.selectNode(nodeId);
		showDropdown = false;
		searchStore.clear();
		onfocus?.(nodeId);
	}

	function toggleMode() {
		searchStore.toggleMode();
		searchStore.clear();
		showDropdown = false;
	}

	let placeholder = $derived(
		searchStore.mode === 'keyword' ? t('topbar.search') : t('topbar.searchNatural')
	);
</script>

<div class="relative">
	<div class="flex items-center bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg focus-within:border-primary/50 transition-colors">
		<button
			class="shrink-0 px-2 py-1 text-[10px] font-mono font-bold transition-colors {searchStore.mode === 'natural' ? 'text-primary' : 'text-base-content/30'}"
			onclick={toggleMode}
			title={searchStore.mode === 'keyword' ? 'Switch to natural language' : 'Switch to keyword'}
		>
			{searchStore.mode === 'keyword' ? 'K' : 'N'}
		</button>
		<input
			type="text"
			{placeholder}
			class="bg-transparent border-none outline-none w-44 py-1 pr-2 text-xs placeholder:text-base-content/20"
			value={searchStore.query}
			oninput={handleInput}
			onkeydown={handleKeydown}
			onfocus={() => (showDropdown = searchStore.results.length > 0)}
			onblur={() => setTimeout(() => (showDropdown = false), 200)}
		/>
		{#if searchStore.isSearching}
			<span class="loading loading-spinner loading-xs text-primary mr-2"></span>
		{/if}
	</div>
	{#if showDropdown && searchStore.results.length > 0}
		<ul class="bg-black/80 backdrop-blur-md rounded-lg shadow-xl border border-white/[0.08] absolute top-full mt-1 w-full z-50 max-h-60 overflow-y-auto p-1">
			{#each searchStore.results as node}
				<li>
					<button
						class="w-full text-left text-xs px-2 py-1.5 rounded hover:bg-white/[0.08] flex items-center gap-1.5"
						onclick={() => selectResult(node.id)}
					>
						<span class="text-[10px] text-base-content/30">{node.type}</span>
						<span class="text-base-content/70">{node.summary}</span>
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
