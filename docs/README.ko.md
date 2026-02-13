<p align="center">
  <a href="#"><img src="../static/favicon.svg" width="96" alt="Blending Room" /></a>
</p>

# Blending Room

*AI가 캐스킹한 지식을, 사람의 판단으로 블렌딩하다.*

**[English](../README.md)**

---

```
 탐색             필터             선택             편집
 ──────           ──────           ──────           ──────
 [ 그래프 ] ──→ [ 좁히기 ] ──→ [ 살펴보기 ] ──→ [ 블렌딩 ]
```

Blending Room은 **Distillery** 지식 그래프를 위한 웹 대시보드입니다. 위스키 블렌딩처럼, AI가 캐스킹한 원액 — **지식 노드**와 **관계** — 을 사람이 감각과 판단으로 조합하고 조정하는 공간입니다.

그래프를 시각적으로 탐색하고, 관계 타입별로 필터링하고, 노드 상세를 확인하고, 엣지와 내용을 편집하세요. 모든 인간 편집은 `source: 'human'`으로 기록됩니다.

---

## 인터페이스

### 그래프 캔버스

메인 뷰는 **Cytoscape.js**로 지식 그래프를 렌더링합니다. 노드와 엣지는 cola 포스 다이렉티드 알고리즘으로 배치됩니다.

| 인터랙션 | 동작 |
|----------|------|
| **클릭** | 노드/엣지 상세 패널 열기 |
| **더블클릭** | 해당 노드 중심으로 서브그래프 확장 |
| **우클릭** | 컨텍스트 메뉴 (추가, 편집, 삭제) |
| **호버** | 연결 노드 하이라이트 |

### 엣지 스타일

| 관계 타입 | 스타일 |
|-----------|--------|
| `RELATED_TO` | 회색 실선 |
| `SUPPORTS` | 녹색 실선 |
| `CONFLICTS_WITH` | 빨간색 점선 |
| `source: human` | 두께 강조 |

### 사이드 패널

관계 타입이나 소스별로 필터링하고, 노드/엣지 상세를 확인하고, 내용을 편집합니다 — 그래프 뷰를 벗어나지 않고.

---

## 기술 스택

```
프론트엔드   Svelte 5 (runes) · SvelteKit · TypeScript
그래프       Cytoscape.js · cytoscape-cola
스타일링     Tailwind CSS 4 · DaisyUI 5
백엔드       Elysia 서버 (별도 프로젝트, Vite 프록시)
런타임       Bun
```

---

## 시작하기

### 사전 요구사항

- [Bun](https://bun.sh) (또는 Node.js)
- Distillery Elysia 백엔드 서버 실행 중

### 설치

```bash
bun install

cp .env.sample .env
# .env 파일에서 VITE_API_URL 설정 (기본값: http://localhost:3000)
```

### 개발

```bash
bun run dev
```

### 빌드

```bash
bun run build
bun run preview
```

### 타입 체크

```bash
bun run check
```

---

## API 엔드포인트

| 동작 | Method | Endpoint |
|------|--------|----------|
| 그래프 조회 | `GET` | `/graph` |
| 노드 상세 | `GET` | `/graph/node/:id` |
| 서브그래프 확장 | `GET` | `/graph/node/:id/expand` |
| 노드 수정 | `PUT` | `/graph/node/:id` |
| 엣지 추가 | `POST` | `/graph/edge` |
| 엣지 수정 | `PUT` | `/graph/edge` |
| 엣지 삭제 | `DELETE` | `/graph/edge` |
| 키워드 검색 | `GET` | `/search/keyword?q=...` |

---

## 프로젝트 구조

```
src/
├── routes/             # SvelteKit 페이지
├── lib/
│   ├── components/     # Svelte 컴포넌트 (GraphCanvas, SidePanel, TopBar, ...)
│   ├── graph/          # Cytoscape 설정, 스타일, 이벤트, 컨텍스트 메뉴
│   ├── stores/         # Svelte 5 runes 스토어 (graph, ui, search, auth, toast)
│   ├── api/            # fetch wrapper + endpoint 모듈 (graph, node, edge, search)
│   ├── types/          # TypeScript 타입 정의
│   ├── mock/           # 개발용 목 데이터
│   └── utils/          # 유틸리티 (edge-id, debounce)
```

---

<p align="center"><sub>pitch black, amber-lit.</sub></p>
