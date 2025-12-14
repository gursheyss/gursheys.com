## Monorepo

Turborepo + bun workspaces. Apps in `apps/`, shared packages in `packages/`.
- Main app: `apps/web` (`@gursheys/web`)
- Run from root: `bun run dev`, `bun run build`, `bun run check`
- Add deps to app: `cd apps/web && bun add <pkg>`
- Internal deps: `"@gursheys/pkg": "workspace:*"`

---

Always use `bun` for package management:
- `bun install` (not npm/yarn/pnpm install)
- `bun run <script>` (not npm run/yarn/pnpm run)
- `bunx` (not npx)
- Prefer `bun typecheck` over running `tsc` directly as it uses TypeScript Go and is faster

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.

## btca

Trigger: user says "use btca" (for codebase/docs questions).

Run:
- btca ask -t <tech> -q "<question>"

Available <tech>: svelte, matterjs