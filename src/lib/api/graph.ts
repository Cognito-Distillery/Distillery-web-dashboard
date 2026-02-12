import { api } from './client';
import type { GraphData, NodeDetailResponse } from '$lib/types/graph';
import type { GraphQueryParams } from '$lib/types/api';

export async function fetchGraph(params?: GraphQueryParams): Promise<GraphData> {
	const sp = new URLSearchParams();
	if (params?.limit) sp.set('limit', String(params.limit));
	if (params?.relationType?.length) {
		for (const rt of params.relationType) sp.append('relationType', rt);
	}
	if (params?.source) sp.set('source', params.source);
	const q = sp.toString();
	return api.get<GraphData>(`/graph${q ? '?' + q : ''}`);
}

export async function fetchNodeDetail(id: string): Promise<NodeDetailResponse> {
	return api.get<NodeDetailResponse>(`/graph/node/${id}`);
}

export async function expandNode(id: string, depth: number = 1): Promise<GraphData> {
	return api.get<GraphData>(`/graph/node/${id}/expand?depth=${depth}`);
}
