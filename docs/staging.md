# Staging preparation

M2 and M3 prepare static output in `dist/` for protected preview use. They do not define or alter a production alias, DNS record, redirect, webhook, booking path, or live automation.

## Current preview contract

- Build command: `npm run build && npm run lint && npm run type-check && npm run qa`
- Output directory: `dist`
- Environment: development / preview only
- Canonicals: production-domain values remain architectural placeholders until final canonical approval
- Integrations: preserved LeadConnector form destination and external tee-time path only; every new adapter remains disabled
- Analytics: local development event queue only; no provider and no network dispatch
- Structured data: WebPage/BreadcrumbList-safe development schemas only; business, offer, product, and event schemas deferred pending verification

## M3 preview status

The branch preview successfully builds all 33 canonical routes and passes M2 + M3 QA. Manual authenticated browser rendering remains required before any future merge to `main` because the available preview-fetch integration could not open the protected preview URL in this session.

Before production authorization, confirm final canonical domain, approved business/contact facts, asset rights, provider ownership for calendar/newsletter, cross-browser visual QA, accessibility review, performance review, redirect activation plan, and production integration ownership.
