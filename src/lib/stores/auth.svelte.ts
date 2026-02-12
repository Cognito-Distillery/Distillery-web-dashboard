import { browser } from '$app/environment';

function createAuthStore() {
	let accessToken = $state<string | null>(
		browser ? localStorage.getItem('accessToken') : null
	);
	let refreshTokenValue = $state<string | null>(
		browser ? localStorage.getItem('refreshToken') : null
	);
	let email = $state<string | null>(
		browser ? localStorage.getItem('email') : null
	);

	const isAuthenticated = $derived(!!accessToken);

	return {
		get accessToken() {
			return accessToken;
		},
		get refreshToken() {
			return refreshTokenValue;
		},
		get email() {
			return email;
		},
		get isAuthenticated() {
			return isAuthenticated;
		},

		setTokens(access: string, refresh: string, userEmail: string) {
			accessToken = access;
			refreshTokenValue = refresh;
			email = userEmail;
			if (browser) {
				localStorage.setItem('accessToken', access);
				localStorage.setItem('refreshToken', refresh);
				localStorage.setItem('email', userEmail);
			}
		},
		updateAccessToken(access: string) {
			accessToken = access;
			if (browser) {
				localStorage.setItem('accessToken', access);
			}
		},
		logout() {
			accessToken = null;
			refreshTokenValue = null;
			email = null;
			if (browser) {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				localStorage.removeItem('email');
			}
		}
	};
}

export const authStore = createAuthStore();
