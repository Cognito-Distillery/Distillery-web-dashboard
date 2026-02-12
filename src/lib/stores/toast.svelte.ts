type ToastType = 'error' | 'success' | 'info';

interface Toast {
	message: string;
	type: ToastType;
}

function createToastStore() {
	let current = $state<Toast | null>(null);
	let timer: ReturnType<typeof setTimeout> | null = null;

	function show(message: string, type: ToastType = 'error', duration = 3000) {
		if (timer) clearTimeout(timer);
		current = { message, type };
		timer = setTimeout(() => {
			current = null;
			timer = null;
		}, duration);
	}

	function dismiss() {
		if (timer) clearTimeout(timer);
		timer = null;
		current = null;
	}

	return {
		get current() {
			return current;
		},
		show,
		dismiss
	};
}

export const toastStore = createToastStore();
