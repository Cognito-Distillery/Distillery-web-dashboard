export type SidePanelMode = 'filter' | 'detail' | 'edit-node' | 'edit-edge' | 'add-edge' | 'settings';

function createUIStore() {
	let sidePanelOpen = $state(true);
	let sidePanelMode = $state<SidePanelMode>('filter');
	let isLoading = $state(false);
	let error = $state<string | null>(null);
	let confirmDialog = $state<{ message: string; onConfirm: () => void } | null>(null);
	let addEdgeSourceId = $state<string | null>(null);

	return {
		get sidePanelOpen() {
			return sidePanelOpen;
		},
		get sidePanelMode() {
			return sidePanelMode;
		},
		get isLoading() {
			return isLoading;
		},
		get error() {
			return error;
		},
		get confirmDialog() {
			return confirmDialog;
		},
		get addEdgeSourceId() {
			return addEdgeSourceId;
		},

		setSidePanelMode(mode: SidePanelMode) {
			sidePanelMode = mode;
			sidePanelOpen = true;
		},
		toggleSidePanel() {
			sidePanelOpen = !sidePanelOpen;
		},
		setLoading(val: boolean) {
			isLoading = val;
		},
		setError(msg: string | null) {
			error = msg;
		},
		showConfirm(message: string, onConfirm: () => void) {
			confirmDialog = { message, onConfirm };
		},
		dismissConfirm() {
			confirmDialog = null;
		},
		startAddEdge(sourceId: string) {
			addEdgeSourceId = sourceId;
			sidePanelMode = 'add-edge';
			sidePanelOpen = true;
		},
		cancelAddEdge() {
			addEdgeSourceId = null;
			sidePanelMode = 'filter';
		}
	};
}

export const uiStore = createUIStore();
