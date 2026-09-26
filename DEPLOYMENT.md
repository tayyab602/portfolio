# Portfolio redesign and original Flutter game

## What is included

- A project-first homepage, real screenshots of AUCIS and YPDC, a prominent Inventory System feature, and individual project pages.
- The actual Flutter source from `tayyab602/tictactoe-pro-ultimate`, pinned to revision `a39a8c63c2f9027a9e05b24f98938a49a6aa227f`.
- A compiled web build embedded at `/play`, with the original casual PvP/PvE and optional ranked play added inside the Flutter app.
- A server-managed five-round challenge and Postgres leaderboard. Client-supplied point totals are never trusted. Submissions are idempotent, challenges expire after two hours, and challenge starts are limited to 20 per address per hour.
- Numzoo is described only as an Android game because its repository is private and no gameplay details or screenshots were supplied. The Inventory System graphic illustrates its architecture; it is not an application screenshot.

## Connect the shared leaderboard through Vercel

1. Open the existing portfolio project in Vercel, then **Storage**. Add **Neon Postgres** through the Marketplace and connect it to this project. Select a plan appropriate for your usage and review its displayed costs before creating it.
2. In Neon, open the SQL editor for the database attached to this deployment. Run the complete contents of `artifacts/portfolio/server/schema.sql` once. It creates only the private `portfolio_game` schema and its tables/indexes. It does not alter your existing tables.
3. In Vercel's project environment settings, confirm `DATABASE_URL` contains Neon's **pooled** connection URL with TLS. `POSTGRES_URL` is also supported. These must be server-only variables, never `VITE_` variables.
4. Add `GAME_SECRET`, a random secret of at least 32 characters. Generate it locally with:

   ```powershell
   node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
   ```

   Paste the output directly into Vercel. Do not commit it or send it in chat.
5. Keep production and preview databases separate if using preview deployments. Run the schema in each database that will support ranked play, and scope environment variables accordingly.
6. Redeploy the portfolio after adding the environment variables. Visit `/play`, choose PvE and a difficulty, select **RANKED CHALLENGE**, finish five rounds, and choose **Save score**. Refresh scores to see the result.

Without the database connection, casual play still works. The leaderboard shows an honest unavailable state; it does not invent scores or store a pretend global leaderboard in browser storage.

Vercel now offers Postgres through Marketplace providers such as Neon: https://vercel.com/docs/postgres

## Vercel build settings

If your Vercel root directory is the repository root, the root `vercel.json` builds `@workspace/portfolio` and serves `artifacts/portfolio/dist`. Its `api/game.mjs` wraps the server handler.

If your existing Vercel root directory is `artifacts/portfolio`, the nested `vercel.json` and `api/game.mjs` support that arrangement too. Keep access to files outside the root enabled for the existing workspace dependencies/assets. The compiled Flutter game is inside the portfolio's public directory in either arrangement.

The explicit rewrites preserve `/play` and `/projects/:slug` on refresh without rewriting `/api/game` or the Flutter assets.

## Apply and push with Git (PowerShell)

Use the `portfolio-redesign-updates.zip` archive. It contains files to overlay at the **repository root**, including the compiled Flutter web files; it does not contain node_modules or Flutter caches.

```powershell
git clone https://github.com/tayyab602/portfolio.git portfolio-redesign
cd portfolio-redesign
git switch main
git status --short
```

Extract the archive into this folder, replacing matching files. If applying to an existing clone, first commit or otherwise preserve any local edits and review overlaps; the archive is based on the source downloaded in this task.

```powershell
pnpm install
pnpm --filter @workspace/portfolio typecheck
pnpm --filter @workspace/portfolio build
pnpm test:game
git status --short
git diff --stat
git add .gitignore .env.example package.json pnpm-lock.yaml pnpm-workspace.yaml vercel.json DEPLOYMENT.md api artifacts/portfolio games/tictactoe scripts/check-package-manager.mjs scripts/copy-flutter.mjs
git diff --cached --stat
git commit -m "Redesign portfolio and embed original Flutter game with ranked leaderboard"
git push origin main
```

Review the staged files before committing. Do not stage real `.env` files or credentials. If you already applied the earlier content-only updates, the new archive supersedes those files.

## Development and rebuilding the game

`pnpm --filter @workspace/portfolio dev` starts the portfolio UI. To exercise server functions locally, use `vercel dev` with the appropriate project root and local environment configuration. Casual Flutter play needs no database.

See `games/tictactoe/PORTFOLIO-INTEGRATION.md` for the Flutter rebuild commands. Vercel serves the included compiled game, so its build does not need a Flutter SDK. After changing Dart code, rebuild and run `node scripts/copy-flutter.mjs`, then commit the updated public files too.

## Leaderboard limits

This is a friendly portfolio leaderboard, not a verified tournament. Display names are unverified and optional. Server-side moves prevent forged point submissions; they do not prove a player is human or prevent someone using an external solver. Only completed five-round challenges can be submitted. Equal scores use earliest submission as a tie-breaker.

Expired challenge state is cleaned up on later challenge starts; submitted scores remain. To remove an abusive display name, delete its score row using the private Neon SQL editor. Do not expose database credentials or direct write access to browsers.
