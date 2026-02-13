<p align="center">
  <a href="#"><img src="static/favicon.svg" width="96" alt="Blending Room" /></a>
</p>

# Blending Room

*Blend AI-casked knowledge with human judgment.*

**[한국어](docs/README.ko.md)**

---

```
 Explore          Filter           Select           Edit
 ──────           ──────           ──────           ──────
 [ Graph ] ──→ [ Narrow ] ──→ [ Inspect ] ──→ [ Blend ]
```

Blending Room is a web dashboard for the **Distillery** knowledge graph. Like whisky blending, humans combine and refine the raw material — **knowledge nodes** and **relationships** — that AI has casked, using their own senses and judgment.

Browse the graph visually, filter by relationship type, inspect node details, and edit edges and content. Every human edit is recorded as `source: 'human'`.

---

## The Interface

### Graph Canvas

The main view renders the knowledge graph with **Cytoscape.js**. Nodes and edges are laid out using the cola force-directed algorithm.

| Interaction | Action |
|-------------|--------|
| **Click** | Open node/edge detail panel |
| **Double-click** | Expand subgraph around the node |
| **Right-click** | Context menu (add, edit, delete) |
| **Hover** | Highlight connected nodes |

### Edge Styles

| Relationship | Style |
|--------------|-------|
| `RELATED_TO` | Gray solid line |
| `SUPPORTS` | Green solid line |
| `CONFLICTS_WITH` | Red dashed line |
| `source: human` | Thicker stroke |

### Side Panel

Filter by relationship type or source, view node/edge details, and edit content — all without leaving the graph view.

---

## Tech Stack

```
Frontend   Svelte 5 (runes) · SvelteKit · TypeScript
Graph      Cytoscape.js · cytoscape-cola
Styling    Tailwind CSS 4 · DaisyUI 5
Backend    Elysia server (separate project, proxied via Vite)
Runtime    Bun
```

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (or Node.js)
- [Distillery server](https://github.com/Cognito-Distillery) running

### Install

```bash
bun install

cp .env.example .env
# Edit .env and set VITE_API_URL (default: http://localhost:8710)
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Distillery Elysia backend URL | `http://localhost:8710` |
| `VITE_USE_MOCK` | Use mock data instead of backend API | `false` |

### Develop

```bash
bun run dev
```

### Build

```bash
bun run build
bun run preview
```

### Type Check

```bash
bun run check
```

---

## Self-Hosting

Blending Room is a SvelteKit app. You can deploy it as a **Node.js server** or as **static files** behind any web server.

### Option 1: Node.js Server

Switch from `adapter-auto` to `adapter-node`:

```bash
bun add -d @sveltejs/adapter-node
```

Update `svelte.config.js`:

```js
import adapter from '@sveltejs/adapter-node';

const config = {
  kit: {
    adapter: adapter()
  }
};

export default config;
```

Build and run:

```bash
bun run build

# The output is in the build/ directory
VITE_API_URL=https://your-api.example.com node build
```

The server listens on port `8711` by default. Set the `PORT` environment variable to change it.

### Option 2: Static Site

If you don't need SSR, switch to `adapter-static`:

```bash
bun add -d @sveltejs/adapter-static
```

Update `svelte.config.js`:

```js
import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({ fallback: 'index.html' })
  }
};

export default config;
```

Build and serve with any web server (nginx, caddy, etc.):

```bash
bun run build

# The output is in the build/ directory
# Serve with your preferred web server
```

### Reverse Proxy

When running behind a reverse proxy, make sure to:

1. Set `VITE_API_URL` to your backend's public URL at **build time** (it's baked into the client bundle)
2. Proxy API requests or configure CORS on the Elysia backend

<details>
<summary>Nginx example</summary>

```nginx
server {
    listen 80;
    server_name blending.example.com;

    location / {
        proxy_pass http://localhost:8711;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

</details>

---

## API Endpoints

| Action | Method | Endpoint |
|--------|--------|----------|
| Fetch graph | `GET` | `/graph` |
| Node detail | `GET` | `/graph/node/:id` |
| Expand subgraph | `GET` | `/graph/node/:id/expand` |
| Update node | `PUT` | `/graph/node/:id` |
| Create edge | `POST` | `/graph/edge` |
| Update edge | `PUT` | `/graph/edge` |
| Delete edge | `DELETE` | `/graph/edge` |
| Keyword search | `GET` | `/search/keyword?q=...` |

---

## Project Structure

```
src/
├── routes/             # SvelteKit pages
├── lib/
│   ├── components/     # Svelte components (GraphCanvas, SidePanel, TopBar, ...)
│   ├── graph/          # Cytoscape config, styles, events, context menu
│   ├── stores/         # Svelte 5 runes stores (graph, ui, search, auth, toast)
│   ├── api/            # Fetch wrapper + endpoint modules (graph, node, edge, search)
│   ├── types/          # TypeScript type definitions
│   ├── mock/           # Mock data for development
│   └── utils/          # Utilities (edge-id, debounce)
```

---

## License

[MIT](LICENSE)

---

<p align="center"><sub>pitch black, amber-lit.</sub></p>
