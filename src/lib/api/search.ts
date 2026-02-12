import { api } from './client';
import type { GraphNode } from '$lib/types/graph';

export async function keywordSearch(query: string): Promise<{ nodes: GraphNode[] }> {
	return api.get(`/search/keyword?q=${encodeURIComponent(query)}`);
}

export async function naturalSearch(query: string): Promise<{ nodes: GraphNode[] }> {
	return api.post('/search/natural', { query });
}
