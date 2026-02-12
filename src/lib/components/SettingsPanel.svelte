<script lang="ts">
	import { t, getLocale, setLocale, type Locale } from '$lib/i18n/index.svelte';
	import { authStore } from '$lib/stores/auth.svelte';

	const languages: { value: Locale; label: string }[] = [
		{ value: 'ko', label: '한국어' },
		{ value: 'en', label: 'English' }
	];
</script>

<div class="space-y-4">
	<div>
		<h3 class="text-xs font-semibold uppercase tracking-wider text-base-content/40 mb-2">
			{t('settings.account')}
		</h3>
		{#if authStore.email}
			<div class="text-xs text-base-content/60">{authStore.email}</div>
		{/if}
	</div>

	<div class="divider my-1"></div>

	<div>
		<h3 class="text-xs font-semibold uppercase tracking-wider text-base-content/40 mb-2">
			{t('settings.language')}
		</h3>
		<div class="flex gap-1">
			{#each languages as lang}
				<button
					class="btn btn-xs {getLocale() === lang.value ? 'btn-primary' : 'btn-ghost'}"
					onclick={() => setLocale(lang.value)}
				>
					{lang.label}
				</button>
			{/each}
		</div>
	</div>
</div>
