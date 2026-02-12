const ko = {
	// Login
	'login.title': 'Cognito Distillery',
	'login.email': '이메일',
	'login.sendOtp': '출입 인증 요청',
	'login.otpSent': 'OTP가 발송되었습니다',
	'login.verify': '인증',
	'login.back': '뒤로',
	'login.otpPlaceholder': '000000',

	// TopBar
	'topbar.title': 'Blending Room',
	'topbar.search': '키워드 검색...',
	'topbar.searchNatural': '자연어로 질문...',

	// SidePanel
	'panel.filters': '필터',
	'panel.details': '상세',
	'panel.editNode': '노드 편집',
	'panel.editEdge': '엣지 편집',
	'panel.addEdge': '엣지 추가',
	'panel.back': '뒤로',
	'panel.clickToView': '노드 또는 엣지를 클릭하세요.',

	// FilterPanel
	'filter.relationType': '관계 유형',
	'filter.source': '소스',
	'filter.all': '전체',
	'filter.relatedTo': 'Related To',
	'filter.supports': 'Supports',
	'filter.conflictsWith': 'Conflicts With',
	'filter.nodes': '노드',
	'filter.edges': '엣지',

	// NodeDetail
	'node.context': '맥락',
	'node.memo': '메모',
	'node.edit': '편집',

	// NodeEditor
	'node.summary': '요약',
	'node.save': '저장',
	'node.cancel': '취소',

	// EdgeDetail
	'edge.from': '출발',
	'edge.to': '도착',
	'edge.source': '소스',
	'edge.confidence': '신뢰도',
	'edge.edit': '편집',
	'edge.delete': '삭제',

	// EdgeEditor
	'edge.relationType': '관계 유형',
	'edge.selectTarget': '그래프에서 대상 노드를 클릭하세요',
	'edge.create': '엣지 생성',
	'edge.update': '엣지 수정',

	// ContextMenu
	'ctx.viewDetail': '상세 보기',
	'ctx.editNode': '노드 편집',
	'ctx.addEdge': '엣지 추가',
	'ctx.expand': '서브그래프 확장',
	'ctx.editEdge': '관계 유형 변경',
	'ctx.deleteEdge': '엣지 삭제',
	'ctx.resetView': '뷰 초기화',

	// ConfirmDialog
	'confirm.title': '확인',
	'confirm.deleteEdge': '이 엣지를 삭제하시겠습니까?',
	'confirm.cancel': '취소',
	'confirm.delete': '삭제',

	// BottomBar
	'bottom.nodes': '노드',
	'bottom.edges': '엣지',
	'bottom.related': 'Related',
	'bottom.supports': 'Supports',
	'bottom.conflicts': 'Conflicts',

	// Settings
	'settings.title': '설정',
	'settings.account': '계정',
	'settings.language': '언어',
	'settings.logout': '로그아웃',

	// Errors
	'error.loadGraph': '그래프 데이터를 불러오지 못했습니다',
	'error.expandNode': '노드를 확장하지 못했습니다',
	'error.saveNode': '노드를 저장하지 못했습니다',
	'error.saveEdge': '엣지를 저장하지 못했습니다',
	'error.dismiss': '닫기'
} as const;

export type MessageKey = keyof typeof ko;
export type Messages = Record<MessageKey, string>;
export default ko;
