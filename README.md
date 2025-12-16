# studiio — signed pop atelier

Premium, artist-first platform for “on-demand pop packages” with authenticated outputs. Universes (WORM / TARNS) define taste guardrails, fans pay to generate, collaborators list portfolios, and every official work is signed and anchored on a local blockchain registry.

## Quickstart

1) **Install & env**
```bash
pnpm install
cp .env.example .env.local
```
Populate `DATABASE_URL` if you aren’t using the provided Postgres container.

2) **Run services (Postgres + local chain)**
```bash
docker-compose up -d
```

3) **Database**
```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

4) **Chain deploy (writes address to `.env.local`)**
```bash
pnpm chain:deploy
```
If you prefer, run the node in another shell with `pnpm chain` (Hardhat/Anvil via docker-compose also exposes `8545`).

5) **App**
```bash
pnpm dev
```
Visit http://localhost:3000.

### Stripe & OpenAI
- Leave Stripe keys empty to enable **demo checkout**; orders still save.
- Add `STRIPE_SECRET_KEY` + `STRIPE_PUBLISHABLE_KEY` + `STRIPE_WEBHOOK_SECRET` for test mode payments.
- If `OPENAI_API_KEY` is missing, a deterministic local generator creates high-quality outputs.

### Demo accounts (password `demo1234`)
- Fan: `fan@studi.io`
- Collaborator: `collab@studi.io`
- Artist Admin: `artist@studi.io`
- Platform Admin: `admin@studi.io`

## Scripts
- `pnpm dev` — run Next.js
- `pnpm build` — production build
- `pnpm lint` — lint
- `pnpm typecheck` — TypeScript check
- `pnpm test` — Vitest component/unit tests
- `pnpm db:generate` — Prisma client
- `pnpm db:migrate` — apply migrations
- `pnpm db:seed` — seed demo universes, products, collaborators, users
- `pnpm chain` — Hardhat node (0.0.0.0:8545)
- `pnpm chain:deploy` — deploy UniverseRegistry + write `.env.local`
- `pnpm stripe:listen` — optional webhook forwarder to `/api/stripe/webhook`

## MVP features
- **Public site**: universes, drops, authenticity explainer, verification tool, collaborator program, pricing, about/contact.
- **App**: authenticated dashboard, generation flow with Stripe checkout or demo path, library of works and orders, collaborator requests, admin view for universes/leads, drop creation for artist/admin roles.
- **Blockchain authenticity**: work payloads hashed, signed with universe keys, registered on-chain when RPC + private keys are provided (demo signatures otherwise). `/verify` checks DB + chain.
- **Payments**: Stripe Checkout in test mode; if keys missing, demo checkout still records orders/works.

## File guide
- `app/` — Next.js routes (public + /app dashboard)
- `prisma/` — schema + seed data (WORM/TARNS universes, releases, products, collaborators, demo users)
- `contracts/UniverseRegistry.sol` — on-chain registry
- `scripts/deploy.ts` — deploy contract + persist address
- `lib/` — auth, prisma client, generator, blockchain + signing helpers, stripe helpers
- `tests/` — Vitest coverage for generator + UI components
- `docker-compose.yml` — Postgres + local chain (anvil)

## Flows to test
1. **Generate**: `/app/generate` → choose universe/package → (Stripe checkout or demo) → signed result with hash + signature + registry link → view in `/app/library`.
2. **Drops**: Browse `/drops` → product page → checkout (Stripe or demo) → confirmation + order visible in `/app/library` and `/app/orders`.
3. **Collaborators**: `/collaborate` public view → sign up as collaborator → browse in `/app/collaborators` → artist/admin can “request collab.”
4. **Authenticity**: `/authenticity` explains system → `/verify` accepts work ID or hash, checks registry, and renders verified seal.

## Troubleshooting
- Prisma errors: ensure Postgres is up (`docker-compose ps`) and `DATABASE_URL` matches.
- Offline / engine download issues: the app falls back to an in-memory Prisma mock so flows still work; on a connected machine run `pnpm db:generate && pnpm db:migrate && pnpm db:seed` to use the real database.
- Chain issues: restart `pnpm chain` or `docker-compose up chain`, then rerun `pnpm chain:deploy` to refresh the contract address.
- Stripe webhooks: run `pnpm stripe:listen --forward-to localhost:3000/api/stripe/webhook` with your secret in `.env.local`.

## Accessibility & design notes
- Editorial serif + clean sans + mono labels, restrained accent colors, focus-visible states, responsive grid, no autoplay media.
- Micro-interactions: archive-mode logo tap, signed stamp animation, hover placards, smooth drawers/cards.
