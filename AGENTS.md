# AGENTS.md

This file contains guidelines and commands for AI agents working on this codebase.

## Project Overview

This is a React application using TanStack Router, TanStack Query, and TanStack Start with TypeScript, Drizzle ORM (PostgreSQL), and Better Auth.

## Development Commands

### Building and Running

- `bun run dev` - Start development server on port 3000
- `bun run build` - Build for production
- `bun run preview` - Preview production build

### Testing

- `bun run test` - Run all tests using Vitest
- Running a single test: Use `vitest run <test-file-path>` or `vitest run --reporter=verbose <test-file-pattern>`

### Code Quality

- `bun run lint` - Run ESLint (uses @tanstack/eslint-config)
- `bun run format` - Format code with Prettier
- `bun run typecheck` - Run TypeScript type checking with `tsc --noEmit`

### Database

- `bun run generate` - Generate Drizzle migrations
- `bun run migrate` - Apply Drizzle migrations

## Code Style Guidelines

### Formatting

- **Indentation**: 2 spaces
- **Quotes**: Single quotes for all strings
- **Semicolons**: Required
- **Line width**: 180 characters max
- **Trailing commas**: ES5 style
- **End of line**: LF

### Imports

- Use absolute imports with `@/` alias for project files
- External imports go before project imports
- Type imports: Use `import type` when only importing types
- Group imports logically with blank lines between external and internal imports

```ts
// External imports
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';

// Internal imports
import { Button } from '@/components/ui/button';
import type { LoginInput } from '@/@types/user';
```

### Naming Conventions

- **Components**: PascalCase (e.g., `LoginForm`, `UserProfile`)
- **Functions**: camelCase (e.g., `getProfileByUserId`, `loginUser`)
- **Types/Interfaces**: PascalCase (e.g., `Profile`, `User`)
- **Constants**: camelCase or SCREAMING_SNAKE_CASE for enums
- **Files**: kebab-case (e.g., `login-form.tsx`, `profile.query.ts`)
- **Type definition files**: kebab-case with `.d.ts` extension (e.g., `user.d.ts`)

### File Organization

```
src/
├── routes/          # TanStack Router file-based routes
├── components/      # React components (ui/ subdirectory for shadcn)
├── functions/       # Server functions using createServerFn
├── queries/         # TanStack Query options (queryOptions, mutationOptions)
├── repositories/    # Data access layer (database operations)
├── @types/          # TypeScript type definitions
├── lib/             # Utility functions and configurations
├── middlewares/     # Route guards and authentication
├── context/         # React contexts
└── db/              # Database schema and connection
```

### Component Patterns

- Use functional components with TypeScript props interfaces
- Destructure props: `({ className, ...props }: React.ComponentProps<'div'>)`
- Use `cn()` utility for merging Tailwind classes from `@/lib/utils`
- Prefer named exports for components
- Use TanStack Form for form management with Zod validation
- Use TanStack Query for data fetching and mutations

### Type Definitions

- Define types in `src/@types/` directory with `.d.ts` extension
- Use Zod schemas for runtime validation: `export const LoginInputSchema = z.object({...})`
- Infer TypeScript types from Zod: `export type LoginInput = z.infer<typeof LoginInputSchema>`
- Export both schema and type for reusability

### Error Handling

- Use mutation `onError` callbacks for user feedback (e.g., toast notifications)
- Throw descriptive errors in repositories: `throw new Error('record not found')`
- Use route middleware for authentication/authorization checks
- Provide fallback/default values when appropriate (e.g., default profile object)

### Database (Drizzle ORM)

- Define tables using `pgTable` from `drizzle-orm/pg-core`
- Use `eq()` for where clauses
- Use `relations()` to define table relationships
- Repository pattern: Export object with named functions (e.g., `getByUserId`, `create`, `update`)

### Routes

- File-based routing with `createFileRoute()`
- Define route components with `component: RouteComponent`
- Use `beforeLoad` middleware for route guards
- Access router hooks: `useNavigate()`, `useParams()`, `useSearch()`

### React Query Options

- Define in `src/queries/` directory
- Use `queryOptions()` for data fetching: named `<Entity>Option()`
- Use `mutationOptions()` for mutations: named `<Action>Option()`
- Pass callbacks via `MutationCallbacks` type
- Query keys: Array format `['entity-name', identifier]`

### Testing

- No test files currently exist; follow Vitest conventions when adding
- Use `@testing-library/react` for component testing
- Place tests alongside source files or in `__tests__/` directories

### TypeScript Configuration

- Strict mode enabled
- No unused locals or parameters allowed
- No fallthrough cases in switch statements
- Module resolution: bundler mode
- Path alias: `@/*` maps to `./src/*`

## Key Libraries

- **Router**: @tanstack/react-router (file-based routing)
- **State/Queries**: @tanstack/react-query
- **Forms**: @tanstack/react-form-start
- **UI Components**: shadcn/ui, Radix UI primitives
- **Styling**: Tailwind CSS v4
- **Database**: Drizzle ORM with PostgreSQL
- **Auth**: better-auth
- **Date**: moment
- **Validation**: zod
- **Toast**: sonner
