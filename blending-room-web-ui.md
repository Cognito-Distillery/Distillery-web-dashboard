# Blending Room — Web UI 기획서

## Overview

Distillery의 지식 그래프를 탐색하고, 인간이 직접 관계를 편집할 수 있는 웹 인터페이스.
위스키 블렌딩처럼, AI가 캐스킹한 원액(Knowledge 노드 + 관계)을 사람이 감각과 판단으로 조합·조정하는 공간.

- **프레임워크**: SvelteKit
- **그래프 시각화**: Cytoscape.js
- **API 통신**: Elysia 서버

---

## 핵심 기능

### 1. 그래프 탐색 (Graph Explorer)

Knowledge 노드와 관계를 시각적으로 탐색하는 메인 뷰.

- Cytoscape.js 기반 인터랙티브 그래프 렌더링 → `GET /graph`
- 노드 클릭 시 상세 정보 패널 표시 (summary, context, memo, type) → `GET /graph/node/:id`
- 엣지 클릭 시 관계 정보 표시 (relationType, source, confidence)
- 줌/패닝/노드 드래그
- 필터링: 관계 타입별 (RELATED_TO / SUPPORTS / CONFLICTS_WITH), source별 (ai / human) → `GET /graph` 파라미터
- 노드 검색: 키워드로 특정 노드 찾아서 포커스 → `GET /search/keyword`

### 2. 그래프 편집 (Blending)

인간이 직접 관계를 추가·수정·삭제하는 기능. 모든 인간 편집은 `source: 'human'`으로 기록.
엣지는 `sourceId + targetId` 복합키로 식별한다 (한 쌍에 관계 하나).

#### 엣지 추가
- 두 노드 선택 → 관계 타입 선택 (RELATED_TO / SUPPORTS / CONFLICTS_WITH) → 생성
- → `POST /graph/edge` 호출
- 향후 인간 전용 관계 타입 추가 예정: DERIVED_FROM, SUPERSEDES

#### 엣지 수정
- 기존 엣지의 관계 타입 변경 (예: RELATED_TO → CONFLICTS_WITH)
- → `PUT /graph/edge` 호출 (sourceId + targetId + 새 relationType)
- AI 생성 관계를 인간이 수정하면 `source`가 `human`으로 변경

#### 엣지 삭제
- 엣지 선택 → 삭제 확인 → 삭제
- → `DELETE /graph/edge` 호출 (sourceId + targetId)

#### 노드 내용 수정
- summary, context, memo 텍스트 편집
- → `PUT /graph/node/:id` 호출
- 노드 자체의 삭제는 MVP에서 제외 (데이터 보존 우선)

### 3. 자연어 검색 (Natural Language Query)

검색창에 자연어로 질문하면 관련 노드/관계를 찾아 그래프에 표시.

#### 구조적 질문 → Text-to-Cypher
- 예: "서로 충돌하는 노트 목록 보여줘"
- LLM이 Cypher 쿼리로 변환 → Neo4j 실행 → 결과를 그래프에 하이라이트

#### 탐색적 질문 → 임베딩 + 그래프 확장
- 예: "온보딩 관련해서 뭐가 있어?"
- 자연어 → 임베딩 → pgvector로 시작점 노드 검색 → Neo4j에서 연결 노드 확장 → 서브그래프 표시

#### 질문 유형 라우팅
- LLM이 질문 유형 판단 (구조적 vs 탐색적)
- gpt-4o-mini 사용

### 4. 대시보드

- 전체 노드/엣지 수
- 관계 타입별 분포 (RELATED_TO / SUPPORTS / CONFLICTS_WITH)
- 고립 노드 목록 (엣지 0개인 노드)
- 최근 생성/수정된 관계
- source별 비율 (ai vs human)

---

## UI 구조

```
┌─────────────────────────────────────────────────┐
│  Blending Room                    [검색창]       │
├──────────┬──────────────────────────────────────┤
│          │                                      │
│  사이드   │         그래프 캔버스                 │
│  패널     │         (Cytoscape.js)               │
│          │                                      │
│ - 필터   │                                      │
│ - 노드   │                                      │
│   상세   │                                      │
│ - 편집   │                                      │
│   도구   │                                      │
│          │                                      │
├──────────┴──────────────────────────────────────┤
│  하단 바: 대시보드 요약                          │
└─────────────────────────────────────────────────┘
```

---

## 시각적 구분

### 노드
- 색상: type별 구분 (추후 type 체계 확정 시 매핑)

### 엣지
- RELATED_TO: 회색 실선
- SUPPORTS: 녹색 실선
- CONFLICTS_WITH: 빨간색 점선
- source = 'human': 엣지 두께 강조 또는 아이콘 표시

### 인터랙션
- 호버: 노드/엣지 하이라이트 + 연결 노드 강조
- 클릭: 상세 정보 사이드 패널
- 더블클릭: 해당 노드 중심으로 서브그래프 확장
- 우클릭: 컨텍스트 메뉴 (관계 추가, 편집, 삭제)

---

## UI 동작 → API 매핑

| UI 동작 | API 엔드포인트 | 비고 |
|---------|---------------|------|
| 페이지 초기 로드 | `GET /graph` | limit=100, 필터 파라미터 선택 |
| 노드 클릭 → 상세 패널 | `GET /graph/node/:id` | 이웃 노드/엣지 포함 |
| 노드 더블클릭 → 서브그래프 확장 | `GET /graph/node/:id/expand` | depth=1~3 |
| 엣지 추가 | `POST /graph/edge` | { sourceId, targetId, relationType } |
| 엣지 타입 변경 | `PUT /graph/edge` | { sourceId, targetId, relationType } |
| 엣지 삭제 | `DELETE /graph/edge` | { sourceId, targetId } |
| 노드 내용 수정 | `PUT /graph/node/:id` | { summary, context, memo } |
| 키워드 검색 | `GET /search/keyword?q=...` | MVP |
| 자연어 검색 | `POST /search/natural` | MVP 이후 |
| 대시보드 로드 | `GET /dashboard/stats` | MVP 이후 |

### Cytoscape.js 엣지 ID 규칙

Cytoscape.js 내부에서 엣지를 식별할 때 `${sourceId}__${targetId}` 형태의 문자열을 엣지 ID로 사용한다. API 호출 시 이를 파싱하여 sourceId, targetId로 분리하여 전달한다.

---

## MVP 범위

### 포함
- 그래프 탐색 (Cytoscape.js 렌더링 + 필터)
- 엣지 CRUD (추가/수정/삭제, source: 'human' 기록)
- 기본 키워드 검색

### 제외 (이후 단계)
- 자연어 검색 (Text-to-Cypher, 임베딩 검색)
- 대시보드
- DERIVED_FROM, SUPERSEDES 관계 타입
- 노드 삭제
- 실시간 협업 (동시 편집)

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | SvelteKit |
| 그래프 시각화 | Cytoscape.js |
| API 통신 | fetch → Elysia 서버 |
| 스타일링 | TBD (Tailwind CSS 권장) |
| 상태 관리 | Svelte stores |
