# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `bun run dev` - Start development server on port 3000
- `bun run build` - Build for production
- `bun run test` - Run tests with vitest
- `bun run lint` - Run eslint
- `bun run format` - Format code with prettier
- `bun run typecheck` - Run TypeScript type checking
- `bun run generate` - Generate Drizzle migrations
- `bun run migrate` - Run Drizzle migrations

## Architecture

This is a **TanStack Start** (React SSR) application with **Vite**, using **PostgreSQL** and **Drizzle ORM**.

### Tech Stack
- **Framework**: TanStack Start (file-based routing, SSR)
- **UI**: shadcn/ui components with Radix UI primitives and Tailwind CSS v4
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: better-auth with custom username plugin
- **Data Fetching**: TanStack Query (React Query) via `@tanstack/react-query`

### Code Organization

```
src/
├── routes/           # File-based routes (TanStack Router)
│   ├── api/          # API endpoints (server-side handlers)
│   ├── auth/         # Auth pages (login, register)
│   └── me/           # Protected user pages
├── components/       # React components
│   └── ui/           # shadcn/ui components
├── db/
│   ├── index.ts      # Database connection
│   └── schema.ts     # Drizzle schema definitions
├── functions/        # Server functions (createServerFn)
├── queries/          # TanStack Query options/mutations
├── repositories/     # Database access layer
├── lib/              # Utilities and auth configuration
├── middlewares/      # Route middleware (auth guards)
└── @types/           # TypeScript type definitions
```

### Layered Architecture

The app follows a strict layered pattern:
1. **Routes** (`src/routes/`) - File-based routing with TanStack Router
2. **Server Functions** (`src/functions/`) - `createServerFn` for server-side logic
3. **Queries** (`src/queries/`) - TanStack Query options wrapping server functions
4. **Repositories** (`src/repositories/`) - Direct database access

**Always follow this pattern**: Route → Query → Server Function → Repository → Database

### API Routes

API routes use file-based routing under `src/routes/api/`. They are defined with `createFileRoute` and export a `Route` object with `server.handlers`:

```tsx
export const Route = createFileRoute('/api/endpoint')({
  server: {
    handlers: {
      GET: async ({ request }) => { /* handler */ },
      POST: async ({ request }) => { /* handler */ },
    },
  },
});
```

### Authentication

**better-auth** is configured with a custom username plugin. The auth handler is proxied through `/api/auth/$`:
- All auth requests go through `src/routes/api/auth/$.ts`
- Client-side: use `authClient` from `src/lib/auth-client.ts`
- Server-side: use `auth` from `src/lib/auth.ts`

**Route protection** uses middleware from `src/middlewares/auth.middleware.ts`:
- `requireAuth` - Redirects to login if not authenticated
- `authenticated` - Redirects to profile if already authenticated

### Database Schema

The schema is in `src/db/schema.ts`. Key tables:
- `user`, `session`, `account`, `verification` - better-auth tables
- `profiles` - User profile data linked to `user.id`
- `documents` - File uploads linked to `profiles.id`

### File Uploads

Uploaded files are saved to `public/uploads/` with sanitized filenames. The upload endpoint is at `/api/documents/upload`.

### Path Aliases

Import paths use `@/*` alias pointing to `./src/*` (configured in `tsconfig.json`).

### Component Library

Add shadcn/ui components using the MCP tool or CLI. Components are in `src/components/ui/`.
