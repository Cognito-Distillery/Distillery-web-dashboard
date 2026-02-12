<script lang="ts">
	import { toastStore } from '$lib/stores/toast.svelte';
</script>

{#if toastStore.current}
	<div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]">
		<button
			class="alert shadow-lg border px-4 py-2 text-sm max-w-sm
				{toastStore.current.type === 'error' ? 'alert-error border-error/30' : ''}
				{toastStore.current.type === 'success' ? 'alert-success border-success/30' : ''}
				{toastStore.current.type === 'info' ? 'alert-info border-info/30' : ''}"
			onclick={() => toastStore.dismiss()}
		>
			<span>{toastStore.current.message}</span>
		</button>
	</div>
{/if}
