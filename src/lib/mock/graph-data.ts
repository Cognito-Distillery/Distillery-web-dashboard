import type { GraphNode, GraphEdge, GraphData, NodeDetailResponse } from '$lib/types/graph';

export const mockNodes: GraphNode[] = [
	{
		id: 'n1',
		summary: 'Onboarding best practices',
		context: 'HR 프로세스에서 신규 입사자의 적응을 돕는 방법론',
		memo: '',
		type: 'concept'
	},
	{
		id: 'n2',
		summary: 'Remote work challenges',
		context: '팬데믹 이후 원격 근무에서 발생하는 주요 문제점',
		memo: '2024 리서치 기반',
		type: 'observation'
	},
	{
		id: 'n3',
		summary: 'Team communication tools',
		context: 'Slack, Teams 등 팀 커뮤니케이션 도구 비교 분석',
		memo: '',
		type: 'resource'
	},
	{
		id: 'n4',
		summary: 'Psychological safety',
		context: '팀 내 심리적 안전감이 생산성에 미치는 영향',
		memo: 'Google Aristotle 프로젝트 참고',
		type: 'concept'
	},
	{
		id: 'n5',
		summary: 'Micromanagement pitfalls',
		context: '과도한 관리가 팀 사기와 자율성에 미치는 부정적 영향',
		memo: '',
		type: 'observation'
	},
	{
		id: 'n6',
		summary: 'Agile methodology',
		context: '애자일 방법론의 핵심 원칙과 실무 적용',
		memo: 'Scrum, Kanban 포함',
		type: 'framework'
	},
	{
		id: 'n7',
		summary: 'Knowledge sharing culture',
		context: '조직 내 지식 공유 문화 구축 전략',
		memo: '',
		type: 'concept'
	},
	{
		id: 'n8',
		summary: 'Burnout prevention',
		context: '개발자 번아웃 예방을 위한 조직 차원의 접근',
		memo: '',
		type: 'guideline'
	},
	{
		id: 'n9',
		summary: 'Code review best practices',
		context: '효과적인 코드 리뷰를 위한 가이드라인',
		memo: 'Google Engineering Practices 기반',
		type: 'guideline'
	},
	{
		id: 'n10',
		summary: 'Technical debt management',
		context: '기술 부채를 체계적으로 관리하고 상환하는 전략',
		memo: '',
		type: 'framework'
	},
	{
		id: 'n11',
		summary: 'Pair programming benefits',
		context: '페어 프로그래밍이 코드 품질과 지식 전파에 미치는 효과',
		memo: '',
		type: 'observation'
	},
	{
		id: 'n12',
		summary: 'Documentation standards',
		context: '프로젝트 문서화의 표준과 자동화 방안',
		memo: '',
		type: 'guideline'
	}
];

export const mockEdges: GraphEdge[] = [
	{ sourceId: 'n1', targetId: 'n2', relationType: 'RELATED_TO', source: 'ai', confidence: 0.85 },
	{ sourceId: 'n1', targetId: 'n7', relationType: 'SUPPORTS', source: 'ai', confidence: 0.9 },
	{ sourceId: 'n2', targetId: 'n3', relationType: 'RELATED_TO', source: 'human' },
	{ sourceId: 'n2', targetId: 'n8', relationType: 'SUPPORTS', source: 'ai', confidence: 0.75 },
	{
		sourceId: 'n4',
		targetId: 'n5',
		relationType: 'CONFLICTS_WITH',
		source: 'ai',
		confidence: 0.92
	},
	{ sourceId: 'n4', targetId: 'n7', relationType: 'SUPPORTS', source: 'human' },
	{ sourceId: 'n6', targetId: 'n9', relationType: 'RELATED_TO', source: 'ai', confidence: 0.8 },
	{ sourceId: 'n6', targetId: 'n10', relationType: 'RELATED_TO', source: 'ai', confidence: 0.78 },
	{ sourceId: 'n7', targetId: 'n11', relationType: 'SUPPORTS', source: 'human' },
	{ sourceId: 'n7', targetId: 'n12', relationType: 'SUPPORTS', source: 'ai', confidence: 0.88 },
	{
		sourceId: 'n8',
		targetId: 'n5',
		relationType: 'CONFLICTS_WITH',
		source: 'human'
	},
	{ sourceId: 'n9', targetId: 'n11', relationType: 'SUPPORTS', source: 'ai', confidence: 0.82 },
	{ sourceId: 'n10', targetId: 'n6', relationType: 'RELATED_TO', source: 'ai', confidence: 0.7 },
	{ sourceId: 'n3', targetId: 'n12', relationType: 'RELATED_TO', source: 'human' }
];

export const mockGraphData: GraphData = { nodes: mockNodes, edges: mockEdges };

export function mockFetchNodeDetail(id: string): NodeDetailResponse {
	const node = mockNodes.find((n) => n.id === id) ?? mockNodes[0];
	const connectedEdges = mockEdges.filter((e) => e.sourceId === id || e.targetId === id);
	const neighborIds = new Set(
		connectedEdges.flatMap((e) => [e.sourceId, e.targetId]).filter((nid) => nid !== id)
	);
	const neighbors = mockNodes.filter((n) => neighborIds.has(n.id));
	return { node, neighbors, edges: connectedEdges };
}
