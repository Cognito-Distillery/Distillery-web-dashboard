import type { RelationType, EdgeSource } from './graph';

export interface CreateEdgeRequest {
	sourceId: string;
	targetId: string;
	relationType: RelationType;
}

export interface UpdateEdgeRequest {
	sourceId: string;
	targetId: string;
	relationType: RelationType;
}

export interface DeleteEdgeRequest {
	sourceId: string;
	targetId: string;
}

export interface UpdateNodeRequest {
	summary?: string;
	context?: string;
	memo?: string;
}

export interface GraphQueryParams {
	limit?: number;
	relationType?: RelationType[];
	source?: EdgeSource;
}

export interface ApiError {
	message: string;
	status: number;
}
