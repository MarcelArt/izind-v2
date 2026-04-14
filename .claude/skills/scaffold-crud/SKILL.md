---
name: scaffold-crud
description: Scaffolds complete CRUD operation files (types, repository, server functions, query options) for a database resource following the project's layered architecture pattern. Use this skill whenever the user asks to create CRUD operations, scaffold a resource, add a new resource with full CRUD functionality, or needs to generate the standard type/repo/function/query file set for a database table. This applies whether the user says "make crud for X", "scaffold education resource", "create full CRUD for experiences table", or any similar request.
---

# CRUD Scaffolding Skill

This skill scaffolds the complete layered architecture for CRUD operations on a database resource. It creates 4 files following the project's strict pattern:

1. **Type definitions** (`src/@types/{resource}.d.ts`)
2. **Repository** (`src/repositories/{resource}.repo.ts`)
3. **Server functions** (`src/functions/{resource}.fn.ts`)
4. **Query options** (`src/queries/{resource}.query.ts`)

And updates `src/queries/index.ts` with new QUERY_KEYS.

## Input Requirements

First, gather these inputs from the user:

1. **Resource name**: The singular form (e.g., "education", "experience", "skill")
2. **Table name**: The actual table name from `src/db/schema.ts` (e.g., "educations", "experiences", "skills")
3. **List field**: Which foreign key field to use for the "getBy..." list method (e.g., "profileId", "userId")

If the user doesn't specify the list field, ask them directly: "Which field should I use for listing records? (e.g., profileId, userId)"

## Read the Schema

Always read `src/db/schema.ts` to understand the table structure:

```bash
Read src/db/schema.ts
```

Identify:
- All columns in the table
- Which columns are auto-generated (id, createdAt, updatedAt) - exclude from InputSchema
- Foreign key relationships - these should be `number` type in InputSchema
- Array fields - should use `z.array(z.string())` or similar

## File Generation Patterns

### 1. Type Definitions (`src/@types/{resource}.d.ts`)

```typescript
import type { {table} } from "@/db/schema";
import z from "zod";

export type {Resource} = typeof {table}.$inferSelect;

export const {Resource}InputSchema = z.object({
    // Add all columns EXCEPT: id, createdAt, updatedAt
    // Foreign keys should be z.number()
    // String arrays should be z.array(z.string())
    // Required fields: use z.string(), z.number(), etc.
    // Optional fields: add .optional() or use z.nullable()
});
export type {Resource}Input = z.infer<typeof {Resource}InputSchema>;
```

**Example** (for `documents` table):
```typescript
export const DocumentInputSchema = z.object({
    filename: z.string(),
    path: z.string(),
    type: z.string(),
    tags: z.array(z.string()),
    profileId: z.number(),
});
```

### 2. Repository (`src/repositories/{resource}.repo.ts`)

```typescript
import type { {Resource}, {Resource}Input } from "@/@types/{resource}";
import { db } from "@/db";
import { {table} } from "@/db/schema";
import { eq } from "drizzle-orm";

async function create(input: {Resource}Input) {
    return await db.insert({table}).values(input);
}

async function getBy{ListField}({listField}: number): Promise<{Resource}[]> {
    const items = await db.select().from({table}).where(eq({table}.{listField}, {listField}));
    return items;
}

async function update(id: number, input: {Resource}Input) {
    return await db.update({table})
        .set(input)
        .where(eq({table}.id, id));
}

async function remove(id: number) {
    return await db.delete({table}).where(eq({table}.id, id));
}

async function getById(id: number): Promise<{Resource}> {
    const item = await db.select().from({table}).where(eq({table}.id, id)).limit(1);

    if (!item[0]) throw new Error('record not found');

    return item[0];
}

const {resource}Repo = {
    create,
    getBy{ListField},
    update,
    remove,
    getById
}
export default {resource}Repo;
```

**Note**: `{ListField}` should be properly capitalized (e.g., `ByProfileId`, `ByUserId`).

### 3. Server Functions (`src/functions/{resource}.fn.ts`)

```typescript
import type { {Resource}Input } from '@/@types/{resource}';
import {resource}Repo from '@/repositories/{resource}.repo';
import { createServerFn } from '@tanstack/react-start';

export const get{Resource}sBy{ListField} = createServerFn({ method: 'GET' })
  .inputValidator(({listField}: number) => {listField})
  .handler(async ({ data: {listField} }) => {
    const items = await {resource}Repo.getBy{ListField}({listField});
    return items;
  });

export const get{Resource}ById = createServerFn({ method: 'GET' })
  .inputValidator((id: number) => id)
  .handler(async ({ data: id }) => {
    const item = await {resource}Repo.getById(id);
    return item;
  });

export const create{Resource} = createServerFn({ method: 'POST' })
  .inputValidator((input: {Resource}Input) => input)
  .handler(async ({ data: input }) => {
    await {resource}Repo.create(input);
  });

export const update{Resource} = createServerFn({ method: 'POST' })
  .inputValidator((data: { id: number; input: {Resource}Input }) => data)
  .handler(async ({ data }) => {
    await {resource}Repo.update(data.id, data.input);
  });

export const delete{Resource} = createServerFn({ method: 'POST' })
  .inputValidator((id: number) => id)
  .handler(async ({ data: id }) => {
    await {resource}Repo.remove(id);
  });
```

### 4. Query Options (`src/queries/{resource}.query.ts`)

```typescript
import { get{Resource}sBy{ListField}, get{Resource}ById, create{Resource}, update{Resource}, delete{Resource} } from "@/functions/{resource}.fn";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { QUERY_KEYS, type MutationCallbacks } from ".";
import type { {Resource}Input } from "@/@types/{resource}";

export function get{Resource}sBy{ListField}Option({listField}: number) {
    return queryOptions({
        queryKey: [QUERY_KEYS.MY_{RESOURCE}S, {listField}],
        queryFn: () => get{Resource}sBy{ListField}({ data: {listField} }),
    });
}

export function get{Resource}ByIdOption(id: number) {
    return queryOptions({
        queryKey: [QUERY_KEYS.ONE_{RESOURCE}, id],
        queryFn: () => get{Resource}ById({ data: id }),
    });
}

export function create{Resource}Option({ onSuccess, onError }: MutationCallbacks<void>) {
    return mutationOptions({
        mutationFn: (input: {Resource}Input) => create{Resource}({ data: input }),
        onSuccess,
        onError,
    });
}

export function update{Resource}Option({ onSuccess, onError }: MutationCallbacks<void>) {
    return mutationOptions({
        mutationFn: (data: { id: number; input: {Resource}Input }) => update{Resource}({ data }),
        onSuccess,
        onError,
    });
}

export function delete{Resource}Option({ onSuccess, onError }: MutationCallbacks<void>) {
    return mutationOptions({
        mutationFn: (id: number) => delete{Resource}({ data: id }),
        onSuccess,
        onError,
    });
}
```

### 5. Update QUERY_KEYS (`src/queries/index.ts`)

Add two new constants and update the export:

```typescript
const MY_{RESOURCE}S = '{resources}-by-{list-field}';  // e.g., 'documents-by-profile-id'
const ONE_{RESOURCE} = '{resource}-by-id';             // e.g., 'document-by-id'

export const QUERY_KEYS = {
  MY_PROFILE,
  MY_DOCUMENTS,
  ONE_DOCUMENT,
  MY_{RESOURCE}S,
  ONE_{RESOURCE}
};
```

## Naming Conventions

| Element | Pattern | Example |
|---------|---------|---------|
| Resource (lowercase) | singular lowercase | `education`, `document` |
| Resource (PascalCase) | singular PascalCase | `Education`, `Document` |
| RESOURCE (SCREAMING) | singular SCREAMING | `EDUCATION`, `DOCUMENT` |
| Table | plural lowercase | `educations`, `documents` |
| File names | lowercase | `education.repo.ts`, `education.fn.ts` |
| Function names | PascalCase with action | `createEducation`, `getEducationById` |

## Field Type Mapping

| Drizzle Type | Zod Schema | TypeScript |
|--------------|------------|------------|
| `text()` | `z.string()` | `string` |
| `integer()` | `z.number()` | `number` |
| `timestamp()` | `z.string().datetime()` or omit | `Date` |
| `boolean()` | `z.boolean()` | `boolean` |
| `text('field').array()` | `z.array(z.string())` | `string[]` |
| Foreign key (`userId`) | `z.number()` | `number` (id is integer) |

## Handling Existing Files

Before creating each file, check if it exists:

```bash
Glob src/@types/{resource}.d.ts
Glob src/repositories/{resource}.repo.ts
Glob src/functions/{resource}.fn.ts
Glob src/queries/{resource}.query.ts
```

If a file exists, **skip it** and notify the user:
- "Skipping `src/@types/{resource}.d.ts` - file already exists"
- Continue with the remaining files

## Custom Operations

If the user requests custom operations beyond standard CRUD (e.g., "add a method to get all expired records"), follow the same layered pattern:

1. Add method to repository
2. Wrap in server function with `createServerFn`
3. Create query/mutation option wrapper

Example:
```typescript
// Repo
async function getExpired(): Promise<{Resource}[]> { ... }

// Server function
export const getExpired{Resource}s = createServerFn({ method: 'GET' })...

// Query option
export function getExpired{Resource}sOption() { ... }
```

## Summary of Actions

1. Ask for: resource name, table name, list field
2. Read `src/db/schema.ts` to get table structure
3. Check for existing files (skip if present)
4. Create type definitions with proper Zod schema
5. Create repository with CRUD methods
6. Create server functions
7. Create query options
8. Update `src/queries/index.ts` with QUERY_KEYS
9. Report back what was created and what was skipped
