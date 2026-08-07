# Elkhorn unified site — M1

Static, framework-neutral structural foundation for the future unified Elkhorn website.

M2 applies the approved “Modern California Clubhouse Hospitality” visual direction, verified-content and media models, structured empty states, and development-only adapter preparation. See `docs/staging.md` for the preview contract.

## Commands

- `npm run build` generates the complete site in `dist/`.
- `npm run lint` validates required page architecture and safe external-link handling.
- `npm run type-check` performs JavaScript syntax checks; TypeScript is not used.

Redirects in `config/redirects.draft.csv` are documentation only and are not active. Integration states in `config/integrations.json` must remain inactive until approved. The production LeadConnector endpoint and existing external tee-time path are preserved.
