# Release readiness (Phase 1)

**Verdict:** Phase 1 **catalog is implementation-complete** for a Ukrainian read-only demo against a scripted SQL database. It is **not** a production-launch sign-off.

Strict DoD from the original brief is met for catalog behavior, APIs, Ukrainian UI, and automated tests — with the residual risks below. Do not treat the English `MebelOnline` LocalDB instance as the Phase 1 catalog.

Date: 2026-08-14.

## Definition of done checklist

| Item | Status | Evidence |
|------|--------|----------|
| Public catalog: home, categories, search, PDP | **Met** | Routes + live GETs + mocked e2e |
| Ukrainian UI, UAH only (`грн`) | **Met** | Inspected copy; `uk-UA` formatter; `lang=uk` |
| ID-based routes (no `/uk` slugs) | **Met** | `App.tsx` |
| Database-first SQL 001–007; no EnsureCreated | **Met** | Scripts + Program.cs; test DB verified |
| GET-only catalog; ProblemDetails 400/404 | **Met** | Controllers; live 404/400/405 |
| `categoryId` + descendants; `GET /api/categories/{id}` | **Met** | Server.Tests + live smoke |
| page 0 / pageSize 12 max 48 / search ≤ 100 | **Met** | Validation + live 400s |
| Material filter `Матеріал` | **Met** | Seed + live `Велюр` search |
| Breadcrumbs `/catalog/{id}` | **Met** | Live breadcrumbs/25; frontend nested parents |
| No cart / checkout / orders / accounts / login | **Met** | No write APIs; UI grep; e2e |
| Favorites hidden or removed | **Met** | Removed |
| Automated tests (backend + frontend critical path) | **Met** | 29+30 xUnit, 37 Vitest, 7 Playwright |
| Production frontend build | **Met** | `npm run build` succeeded |
| Live SQL smoke | **Met (API)** | Host + `MebelOnline_PhaseBC_Test`; **not** SPA-in-browser |
| CI gate | **Not met** | No workflow files |
| Device-lab responsive matrix | **Partial** | Code review + one mobile Playwright viewport |
| Real business contacts | **Not met** | Placeholder Ivano-Frankivsk / +380 (12) … |
| Existing `MebelOnline` DB migrated | **Not done** | English EnsureCreated seed left untouched |

## How to run a demo

1. Prefer database `MebelOnline_PhaseBC_Test` (already scripted) **or** create a new DB and apply `Up/001`–`007` with `sqlcmd -f 65001` (`docs/database.md`).
2. Set `ConnectionStrings:DefaultConnection` via user secrets or `ConnectionStrings__DefaultConnection`. Do not commit it.
3. `dotnet run --project MebelOnline.Server` (Development enables `/swagger`).
4. Browse `/`, `/catalog`, `/search`, `/product/{id}`.

If you point the app at the old `MebelOnline` database you will see English categories. Recreate that database yourself if you need the Ukrainian seed under that name.

## Exit criteria for “Phase 1 done”

Call Phase 1 **done for catalog delivery** when:

- The items marked **Met** above stay green, and
- The human accepts QA-04 (which database name to use) and placeholder contacts (DEF-03).

Do **not** call it production-ready until CI exists, contacts are real, and a human has clicked through the SPA against the intended SQL database.
