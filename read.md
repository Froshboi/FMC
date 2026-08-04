# FMC Site Guide

## Overview
This site is a Vite + React + TypeScript application.
The main content is driven by a JSON file so editors can update ranking data, chart text, news items, and featured media without changing React code.

## Key files
- `src/lib/content.json` — primary editable content source for the homepage, charts, news, awards, metrics, artists, songs, and albums.
- `src/lib/data.ts` — loads `content.json` and exposes typed exports to the app.
- `src/components/hero.tsx` — homepage hero section that uses JSON-driven hero image and song data.
- `src/components/chart-table.tsx` — chart listing component.
- `public/assets/` — folder for public image assets referenced by JSON.
- `src/routes/` — route pages for the site.

## Local setup
1. Install dependencies:
   - `npm install`
2. Run the site locally:
   - `npm run dev`
3. Preview a production build locally:
   - `npm run build`
   - `npm run preview`

## Editing content
The single source of truth for page data is `src/lib/content.json`.

### What can be updated there
- `HOME_CONTENT`: homepage titles, subtitles, live pulse labels, and live updates.
- `NEWS`: news cards shown in the sidebar.
- `AWARDS_2026`: awards categories and nominees.
- `CHART_METRICS`: chart metric names and values.
- `ARTISTS`: artist metadata.
- `SONGS`: chart song metadata, including title, artist, rank, streams, and image path.
- `ALBUMS`: album metadata, including release dates, labels, streams, and tracklists.

### Image assets
- Add image files to `public/assets/`.
- Reference public image paths from JSON using absolute public URLs, for example:
  - `/assets/hero-artist.jpg`
  - `/assets/artist-photo.png`
- Do not use local `src` import paths in the editable JSON data.

### JSON rules
- Must be valid JSON.
- No comments.
- Use double quotes for strings.
- Numeric group separators like `12_000_000` are not valid JSON; use `12000000`.

## Updating the homepage hero
The hero section picks the top song from `SONGS[0]`.
If that song includes an `image` field, it will be used.
Example:
```json
{
  "image": "/assets/hero-artist.jpg"
}
```

## Deployment
### Build
- Run `npm run build` to generate a production build.

### Preview
- Run `npm run preview` after build to open the static preview.

### Production deploy
- This repo may use Vercel or Nitro deployment.
- If Vercel is configured, deploy from the root with:
  - `vercel --prod`

## Developer checks
- `npm run lint` — run ESLint.
- `npm run format` — format files with Prettier.

## Helpful workflow
1. Update `src/lib/content.json`.
2. Add any new image files to `public/assets/`.
3. Test locally with `npm run dev`.
4. Build with `npm run build`.
5. Deploy with your chosen deployment command.

## Notes for new team members
- The app is built using React with TanStack router.
- Most content changes should be done in `src/lib/content.json`.
- If you need to change layout or page structure, edit components in `src/components` or routes in `src/routes`.
- If a data change does not appear, confirm the JSON is valid and that the referenced asset exists under `public/assets/`.
