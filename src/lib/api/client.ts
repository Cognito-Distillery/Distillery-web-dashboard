import type { ApiError } from '$lib/types/api';
import { authStore } from '$lib/stores/auth.svelte';

const BASE_URL = import.meta.env.VITE_API_URL ?? '';

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function tryRefresh(): Promise<boolean> {
	if (!authStore.refreshToken) return false;
	if (isRefreshing) return refreshPromise!;

	isRefreshing = true;
	refreshPromise = (async () => {
		try {
			const res = await fetch(`${BASE_URL}/auth/refresh`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ refreshToken: authStore.refreshToken })
			});
			if (!res.ok) {
				authStore.logout();
				return false;
			}
			const data = await res.json();
			authStore.updateAccessToken(data.accessToken);
			return true;
		} catch {
			authStore.logout();
			return false;
		} finally {
			isRefreshing = false;
			refreshPromise = null;
		}
	})();

	return refreshPromise;
}

async function request<T>(path: string, options: RequestInit = {}, retry = true): Promise<T> {
	const url = `${BASE_URL}${path}`;
	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		...(options.headers as Record<string, string>)
	};

	if (authStore.accessToken && !path.startsWith('/auth/')) {
		headers['Authorization'] = `Bearer ${authStore.accessToken}`;
	}

	const res = await fetch(url, { ...options, headers });

	if (res.status === 401 && retry && !path.startsWith('/auth/')) {
		const refreshed = await tryRefresh();
		if (refreshed) {
			return request<T>(path, options, false);
		}
		authStore.logout();
	}

	if (!res.ok) {
		const error = await res.json().catch(() => ({ message: res.statusText }));
		throw { message: error.message, status: res.status } satisfies ApiError;
	}
	return res.json();
}

export const api = {
	get: <T>(path: string) => request<T>(path),
	post: <T>(path: string, body: unknown) =>
		request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
	put: <T>(path: string, body: unknown) =>
		request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
	del: <T>(path: string, body?: unknown) =>
		request<T>(path, {
			method: 'DELETE',
			body: body ? JSON.stringify(body) : undefined
		})
};
