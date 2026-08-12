# Elkhorn unified site — development branch

Static, framework-neutral foundation for the future unified Elkhorn website.

M1 established the 33-route architecture and shared shell. M2 applied the approved “Modern California Clubhouse Hospitality” visual direction, verified-content and media models, structured empty states, and development-only adapter preparation. M3 extends the approved system across the remaining route families, adds controlled verified-content composition, breadcrumb structured-data preparation, and development-only conversion analytics.

## Commands

- `npm run build` generates the complete site in `dist/` and applies M3 route enhancement.
- `npm run lint` validates page architecture, internal links, metadata, canonicals, JSON-LD, sitemap, robots, and empty states.
- `npm run type-check` performs JavaScript syntax checks for the base and M3 development scripts; TypeScript is not used.
- `npm run qa` runs both M2 and M3 safety, accessibility, integration, responsive, content-model, analytics, and route-family assertions.

Redirects in `config/redirects.draft.csv` are documentation only and are not active. Integration states in `config/integrations.json` and `config/adapters.json` must remain inactive until approved. The production LeadConnector endpoint is preserved. EZLinks and Tripleseat use disabled connection holders until their approved direct URLs are supplied.

See `docs/staging.md`, `docs/qa-m2.md`, and `docs/qa-m3.md` for preview and validation status.
