Source: https://github.com/tayyab602/tictactoe-pro-ultimate
Source revision: a39a8c63c2f9027a9e05b24f98938a49a6aa227f

This is the original Flutter game, with its existing screens, styling, casual PvP/PvE, board sizes, move history, hints, and timer preserved. The portfolio adds optional ranked 3x3 PvE through the same game screen. Ranked games use server-managed moves, five rounds, alternating openers, no hints, and no turn timer. These differences keep leaderboard results comparable.

The ranked AI runs on the server. Casual play retains the original Dart game logic.

The embedded app sends a same-origin readiness message after Flutter starts. The portfolio checks both the origin and the iframe window before dismissing its loading panel.

Rebuild from the repository root:

```powershell
cd games/tictactoe
flutter pub get
flutter build web --release --base-href /games/tictactoe/ --no-web-resources-cdn
cd ../..
node scripts/copy-flutter.mjs
```

The compiled web files are committed under artifacts/portfolio/public/games/tictactoe so Vercel does not need to install Flutter during deployment. Run the copy command after every Flutter rebuild and include those files in your commit.
