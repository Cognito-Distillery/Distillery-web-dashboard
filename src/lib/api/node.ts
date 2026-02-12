import { api } from './client';
import type { GraphNode } from '$lib/types/graph';
import type { UpdateNodeRequest } from '$lib/types/api';

export async function updateNode(id: string, req: UpdateNodeRequest): Promise<GraphNode> {
	return api.put<GraphNode>(`/graph/node/${id}`, req);
}
