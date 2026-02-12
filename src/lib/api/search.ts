import { api } from './client';
import type { GraphNode, GraphEdge, GraphData } from '$lib/types/graph';

/** Server response types (match backend schema) */
interface ServerSearchEdge {
	sourceId: string;
	targetId: string;
	relType: 'RELATED_TO' | 'SUPPORTS' | 'CONFLICTS_WITH';
	confidence: number | null;
}

interface KeywordSearchNode extends GraphNode {
	score: number;
}

interface ServerKeywordSearchResponse {
	nodes: KeywordSearchNode[];
	edges: ServerSearchEdge[];
}

interface ServerNaturalSearchResponse {
	queryType: 'structural' | 'exploratory';
	nodes: GraphNode[];
	edges: ServerSearchEdge[];
}

/** Frontend response types */
export interface KeywordSearchResult extends GraphData {
	nodes: (GraphNode & { score: number })[];
}

export interface NaturalSearchResult extends GraphData {
	queryType: 'structural' | 'exploratory';
}

/** Map server edge → frontend edge */
function mapEdge(e: ServerSearchEdge): GraphEdge {
	return {
		sourceId: e.sourceId,
		targetId: e.targetId,
		relationType: e.relType,
		confidence: e.confidence
	};
}

export async function keywordSearch(query: string): Promise<KeywordSearchResult> {
	const res = await api.get<ServerKeywordSearchResponse>(
		`/search/keyword?q=${encodeURIComponent(query)}`
	);
	return {
		nodes: res.nodes,
		edges: res.edges.map(mapEdge)
	};
}

export async function naturalSearch(query: string): Promise<NaturalSearchResult> {
	const res = await api.post<ServerNaturalSearchResponse>('/search/natural', { query });
	return {
		queryType: res.queryType,
		nodes: res.nodes,
		edges: res.edges.map(mapEdge)
	};
}
