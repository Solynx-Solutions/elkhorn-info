# Staging preparation

M2 prepares static output in `dist/` for a future preview environment. It does not define or alter a production alias, DNS record, redirect, webhook, booking path, or live automation.

## Proposed preview contract

- Build command: bundled Node.js running `scripts/build.mjs`
- Output directory: `dist`
- Environment: `ELKHORN_ENV=staging`
- Access: private or protected preview URL
- Canonicals: production-domain values remain architectural placeholders until final canonical approval
- Integrations: only the preserved LeadConnector form destination is present; every new adapter remains disabled

Before creating staging, confirm hosting ownership, preview-access policy, environment-variable handling, and whether preview pages should emit `noindex` headers.
