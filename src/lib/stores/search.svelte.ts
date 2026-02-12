import type { GraphNode } from '$lib/types/graph';

export type SearchMode = 'keyword' | 'natural';

function createSearchStore() {
	let query = $state('');
	let results = $state<GraphNode[]>([]);
	let isSearching = $state(false);
	let mode = $state<SearchMode>('keyword');

	return {
		get query() {
			return query;
		},
		get results() {
			return results;
		},
		get isSearching() {
			return isSearching;
		},
		get mode() {
			return mode;
		},

		setQuery(q: string) {
			query = q;
		},
		setResults(r: GraphNode[]) {
			results = r;
		},
		setSearching(val: boolean) {
			isSearching = val;
		},
		setMode(m: SearchMode) {
			mode = m;
		},
		toggleMode() {
			mode = mode === 'keyword' ? 'natural' : 'keyword';
		},
		clear() {
			query = '';
			results = [];
		}
	};
}

export const searchStore = createSearchStore();
