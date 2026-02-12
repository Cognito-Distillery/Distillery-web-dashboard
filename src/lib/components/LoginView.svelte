<script lang="ts">
	import { authStore } from '$lib/stores/auth.svelte';
	import { sendOtp, verifyOtp } from '$lib/api/auth';
	import { t } from '$lib/i18n/index.svelte';

	let email = $state('');
	let otp = $state('');
	let step = $state<'email' | 'otp'>('email');
	let loading = $state(false);
	let error = $state<string | null>(null);

	function friendlyError(e: unknown, fallbackKey: 'login.errorInvalidOtp' | 'login.errorGeneric'): string {
		if (e instanceof TypeError) return t('login.errorNetwork');
		const status = (e as { status?: number })?.status;
		if (status === 401 || status === 400) return t(fallbackKey);
		return t('login.errorGeneric');
	}

	async function handleSendOtp(e: Event) {
		e.preventDefault();
		if (!email.trim()) return;
		loading = true;
		error = null;
		try {
			await sendOtp(email.trim());
			step = 'otp';
		} catch (err: unknown) {
			error = friendlyError(err, 'login.errorGeneric');
		} finally {
			loading = false;
		}
	}

	async function handleVerifyOtp(e: Event) {
		e.preventDefault();
		if (!otp.trim()) return;
		loading = true;
		error = null;
		try {
			const res = await verifyOtp(email.trim(), otp.trim());
			authStore.setTokens(res.accessToken, res.refreshToken, email.trim());
		} catch (err: unknown) {
			error = friendlyError(err, 'login.errorInvalidOtp');
		} finally {
			loading = false;
		}
	}

	function handleBack() {
		otp = '';
		error = null;
		step = 'email';
	}
</script>

<div class="flex h-screen items-center justify-center">
	<div class="w-full max-w-sm flex flex-col gap-6 px-6">
		<div class="text-center">
			<img src="/favicon.svg" alt="Logo" class="w-24 h-24 mx-auto mb-3" />
			<h1 class="text-2xl font-bold tracking-tight">Cognito Distillery Blending Room</h1>
			<p class="text-sm text-base-content/40 mt-1">Distill your thoughts</p>
		</div>

		{#if step === 'email'}
			<form class="flex flex-col gap-3" onsubmit={handleSendOtp}>
				<input
					type="email"
					class="input w-full bg-white/[0.12] border-white/[0.18] focus:border-primary placeholder:text-base-content/30"
					placeholder={t('login.email')}
					bind:value={email}
					required
				/>
				<button
					type="submit"
					class="btn btn-primary w-full"
					disabled={loading || !email.trim()}
				>
					{#if loading}
						<span class="loading loading-spinner loading-sm"></span>
					{:else}
						{t('login.sendOtp')}
					{/if}
				</button>
			</form>
		{:else}
			<form class="flex flex-col gap-3" onsubmit={handleVerifyOtp}>
				<p class="text-sm text-base-content/50 text-center">
					{t('login.otpSent')}
				</p>
				<input
					type="text"
					class="input w-full bg-white/[0.12] border-white/[0.18] focus:border-primary placeholder:text-base-content/30 text-center tracking-[0.3em] text-lg"
					placeholder={t('login.otpPlaceholder')}
					bind:value={otp}
					maxlength={6}
					inputmode="numeric"
					autocomplete="one-time-code"
				/>
				<button
					type="submit"
					class="btn btn-primary w-full"
					disabled={loading || otp.trim().length < 6}
				>
					{#if loading}
						<span class="loading loading-spinner loading-sm"></span>
					{:else}
						{t('login.verify')}
					{/if}
				</button>
				<button type="button" class="btn btn-ghost btn-sm" onclick={handleBack}>
					{t('login.tryOther')}
				</button>
			</form>
		{/if}

		{#if error}
			<p class="text-sm text-error text-center">{error}</p>
		{/if}
	</div>
</div>
