# Out of scope (Phase 1)

Phase 1 is a public, read-only Ukrainian furniture catalog. The following are **out of scope**. If they appear in the draft, treat them as **deferred**, not as work to expand.

## Commerce and accounts

- Cart, checkout, payments, orders, invoices
- Customer accounts, login, registration, password reset
- Admin / back-office / product CMS
- Wishlist / favorites persistence (**UI removed**; no API)

## Content and marketing platforms

- SEO program (meta strategy, sitemaps, structured data as a project)
- Analytics / tags / A/B testing
- CMS for pages or products
- i18n beyond Ukrainian (no language switcher, no `/en`)
- Multi-currency

## Search / infra upgrades

- Elasticsearch / OpenSearch / Azure AI Search
- Redis cache, CDN design, image optimization pipeline
- Full-text search in SQL Server (noted as a **future** upgrade after `LIKE`)

## Schema we will not add

- Order, cart, customer, payment, session, role tables
- Redesign of generated/hand-written entities without an approved SQL script

## Present in the draft — defer, do not expand

| Item | Where | Action |
|------|-------|--------|
| `Users` table | `001`, `UserEntity` | Leave table; do not build auth; seed does not insert passwords |
| Favorite buttons | removed from `productCard.tsx`, `productInfoCard.tsx` | **Removed**; no wishlist API |
| Generic English categories | old seed `004` / live `MebelOnline` DB | **Replaced** in scripts; live `MebelOnline` DB still English until a human recreates it |
| Messenger buttons | product info + footer | Static placeholder URLs; no chat backend |
| Header “Контакти” / “Про нас” | removed from `header.tsx` | Footer static copy |
| `OldPrice` | product DTOs/UI | Keep as display-only sale price; no promo engine |
| `UseAuthorization()` | `Program.cs` | Harmless no-op without auth; do not add JWT |
| WeatherForecast `.http` file | `MebelOnline.Server.http` | Template leftover |
| Vite README / CHANGELOG | `mebelonline.client/` | Template leftover |
| `@mui/styles` | `package.json` | Unused; do not adopt |

## Reference site extras (visual only)

The preview landing includes hours, address, phone, email, and messenger brands. Using those as **static footer copy** is in scope only if the human architect supplies real business details. Building a contact form, map integration, or CMS for that content is out of scope.
