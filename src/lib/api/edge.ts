import { api } from './client';
import type { GraphEdge } from '$lib/types/graph';
import type { CreateEdgeRequest, UpdateEdgeRequest, DeleteEdgeRequest } from '$lib/types/api';

export async function createEdge(req: CreateEdgeRequest): Promise<GraphEdge> {
	return api.post<GraphEdge>('/graph/edge', req);
}

export async function updateEdge(req: UpdateEdgeRequest): Promise<GraphEdge> {
	return api.put<GraphEdge>('/graph/edge', req);
}

export async function deleteEdge(req: DeleteEdgeRequest): Promise<void> {
	return api.del('/graph/edge', req);
}
