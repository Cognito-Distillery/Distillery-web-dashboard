<script lang="ts">
	import { uiStore } from '$lib/stores/ui.svelte';
	import { graphStore } from '$lib/stores/graph.svelte';
	import { authStore } from '$lib/stores/auth.svelte';
	import { t } from '$lib/i18n/index.svelte';
	import FilterPanel from './FilterPanel.svelte';
	import NodeDetail from './NodeDetail.svelte';
	import NodeEditor from './NodeEditor.svelte';
	import EdgeDetail from './EdgeDetail.svelte';
	import EdgeEditor from './EdgeEditor.svelte';
	import SettingsPanel from './SettingsPanel.svelte';
</script>

<aside
	class="absolute top-12 left-3 bottom-8 z-30 w-56 flex flex-col overflow-hidden rounded-lg bg-black/60 backdrop-blur-md border border-white/[0.08] transition-all duration-300 ease-out origin-top"
	class:scale-y-100={uiStore.sidePanelOpen}
	class:opacity-100={uiStore.sidePanelOpen}
	class:scale-y-0={!uiStore.sidePanelOpen}
	class:opacity-0={!uiStore.sidePanelOpen}
	class:pointer-events-none={!uiStore.sidePanelOpen}
>
	<div class="px-3 py-2 border-b border-white/[0.06] flex items-center justify-between">
		<span class="text-[10px] font-semibold uppercase tracking-wider text-base-content/40">
			{#if uiStore.sidePanelMode === 'filter'}
				{t('panel.filters')}
			{:else if uiStore.sidePanelMode === 'detail'}
				{t('panel.details')}
			{:else if uiStore.sidePanelMode === 'edit-node'}
				{t('panel.editNode')}
			{:else if uiStore.sidePanelMode === 'edit-edge'}
				{t('panel.editEdge')}
			{:else if uiStore.sidePanelMode === 'add-edge'}
				{t('panel.addEdge')}
			{:else if uiStore.sidePanelMode === 'settings'}
				{t('settings.title')}
			{/if}
		</span>
		{#if uiStore.sidePanelMode !== 'filter' && uiStore.sidePanelMode !== 'settings'}
			<button
				class="btn btn-ghost btn-xs text-base-content/40"
				onclick={() => {
					graphStore.clearSelection();
					uiStore.setSidePanelMode('filter');
				}}
			>
				{t('panel.back')}
			</button>
		{:else if uiStore.sidePanelMode === 'settings'}
			<button
				class="btn btn-ghost btn-xs text-base-content/40"
				onclick={() => uiStore.setSidePanelMode('filter')}
			>
				{t('panel.back')}
			</button>
		{/if}
	</div>

	<div class="flex-1 overflow-y-auto p-3">
		{#if uiStore.sidePanelMode === 'filter'}
			<FilterPanel />
		{:else if uiStore.sidePanelMode === 'detail'}
			{#if graphStore.selectedNode}
				<NodeDetail />
			{:else if graphStore.selectedEdge}
				<EdgeDetail />
			{:else}
				<p class="text-xs text-base-content/30">{t('panel.clickToView')}</p>
			{/if}
		{:else if uiStore.sidePanelMode === 'edit-node'}
			<NodeEditor />
		{:else if uiStore.sidePanelMode === 'edit-edge' || uiStore.sidePanelMode === 'add-edge'}
			<EdgeEditor />
		{:else if uiStore.sidePanelMode === 'settings'}
			<SettingsPanel />
		{/if}
	</div>

	<!-- Bottom actions -->
	<div class="border-t border-white/[0.06] px-3 py-1.5 flex items-center justify-between">
		<button
			class="btn btn-ghost btn-xs gap-1 text-base-content/30 hover:text-base-content/60"
			onclick={() => uiStore.setSidePanelMode(uiStore.sidePanelMode === 'settings' ? 'filter' : 'settings')}
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
			</svg>
			<span class="text-[10px]">{t('settings.title')}</span>
		</button>
		<button
			class="btn btn-ghost btn-xs text-base-content/20 hover:text-error/60"
			onclick={() => authStore.logout()}
			title={t('settings.logout')}
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3-3h-9m9 0-3-3m3 3-3 3" />
			</svg>
		</button>
	</div>
</aside>
