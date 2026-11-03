# Harbor Kim — portfolio case studies

One folder per project. Each folder is its own small web app (Vite + React + Tailwind),
copied from the "Harbor Kim Portfolio" Magic Patterns design.

| Folder | Project | Status |
| --- | --- | --- |
| `trust-bank/` | Trust Bank (Singapore) — rewards UX case study | done |
| `gamecove/` | GameCove | to do |
| `utrada/` | UTrada | to do |
| `eto-markets/` | ETO Markets | to do |

## Online address (GitHub Pages)

- Trust Bank: https://harbor-k.github.io/landing_page/trust-bank/

Every push to `main` rebuilds the pages (`.github/workflows/deploy-pages.yml`).
One-time setup: repo **Settings → Pages → Source: GitHub Actions**.

## Run a project on your computer

```bash
cd trust-bank
npm install
npm run dev      # opens a local preview
npm run build    # makes the finished site in trust-bank/dist
```

## Notes

- Images and videos used by the Trust Bank page load from `Harbor-K/harbor-pf/assets/trust-bank/`.
  The image files already sitting in `trust-bank/` (`*.webp`, `v12-8/`) are older exports kept so existing links don't break.
- The Back button and the "next project" button go to the Magic Patterns site for now.
  Change the links in `trust-bank/src/site.ts` once the other project folders are online.
- Fonts: Helvetica Neue everywhere (never Inter).
