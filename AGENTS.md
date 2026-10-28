# AGENTS.md

Guidance for AI coding agents working in this repo.

## Project
Quizzy is a quiz REST API: topics contain multiple-choice questions (one answer plus distractors).
Stack: Node (ESM), Express 5, TypeScript, Prisma 6 + PostgreSQL, Zod 4.

## Commands
- `npm run dev` — start the server with `tsx watch` on port 6969
- `npm run build` — compile with `tsc` to `dist/`
- `npx tsc --noEmit` — type-check (there is no test suite or linter yet)
- `npm run seed` — seed sample topics and questions (re-runnable; resets the seeded topics' questions)
- `npx prisma migrate dev` — apply schema changes; `npx prisma generate` after editing `schema.prisma`

## Layout
```
src/
  app.ts, server.ts, routes.ts     app setup, port, route mounting (/api)
  lib/prisma.ts                    shared PrismaClient
  middlewares/                     error handler, validation middleware
  utils/AppError.ts                AppError(status, message)
  modules/<name>/                  one folder per resource:
    <name>.route.ts                routes + validation middleware
    <name>.controller.ts           reads req, calls service, sends response
    <name>.service.ts              Prisma queries and business rules
    <name>.validation.ts           Zod schemas
prisma/                            schema, migrations, seed.ts
```

## Conventions
- Keep the layering: routes -> controller -> service. Controllers do not touch Prisma; services do not touch `req`/`res`.
- Validate in the route with `validate(schema)` (body) and `router.param(...)` + `validateUuidParam` (ids). Controllers assume validated input.
- Throw `AppError(status, message)` for expected errors; `error.middleware.ts` turns it (and `ZodError`) into `{ error: "..." }`.
- Imports use the `.js` extension (ESM + `nodenext`), e.g. `from "./question.service.js"`.
- Ids are UUIDs. A malformed id must return 400, not reach Prisma.
- Match the surrounding code's style and comment density. Do not refactor beyond what was asked.

## API shape
- `/api/topics` — CRUD
- `/api/questions` — `GET /`, `GET|PUT|DELETE /:id`, `GET|POST /t/:topicId/q`
- Player routes: `GET /api/questions/t/:topicId/play` (shuffled options, never includes `answer`), `POST /api/questions/:id/answer`
- `GET /health`

## Gotchas
- Never return `answer` from player-facing endpoints.
- Updating a question cannot move it to another topic.
- `tsconfig` has `rootDir: ./src` and `include: ["src"]`, so files outside `src/` (like `prisma/seed.ts`) are run by `tsx`, not built by `tsc`.
- `DATABASE_URL` comes from `.env`; do not commit it.
