<script lang="ts">
	import SearchInput from './SearchInput.svelte';
	import { uiStore } from '$lib/stores/ui.svelte';
	import { t } from '$lib/i18n/index.svelte';

	interface Props {
		onfocusNode?: (nodeId: string) => void;
	}

	let { onfocusNode }: Props = $props();
</script>

<header class="navbar bg-base-300 border-b border-base-300 px-4 min-h-12">
	<div class="flex-1 gap-2">
		<button
			class="btn btn-ghost btn-sm btn-square"
			onclick={() => uiStore.toggleSidePanel()}
			title="Toggle side panel"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</button>
		<span class="text-lg font-bold tracking-tight">{t('topbar.title')}</span>
	</div>
	<div class="flex-none">
		<SearchInput onfocus={onfocusNode} />
	</div>
</header>
