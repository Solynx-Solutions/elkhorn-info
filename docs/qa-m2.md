# M2 QA record

## Automated baseline

The initial M2 implementation at commit `ca802699392d85ae10bf3e82582f967e2a95a933` documented successful local build, lint, JavaScript syntax/type-check, and static QA. That pass covered 33 canonical routes and 35 HTML outputs, internal links, metadata, canonicals, JSON-LD syntax, sitemap inclusion, robots discovery, required empty states, core design tokens, shared header states, drawer keyboard hooks, reduced motion, touch targets, homepage sections, form labels/status/error paths, preserved LeadConnector routing, inactive adapters, and content-model families.

## Corrective review delta

A subsequent M2 review identified and corrected three specification gaps in source:

1. Added the complete semantic token set, including the approved blue focus token.
2. Reworked the shared footer architecture to `Explore`, `Visit`, `Contact`, and `Stay Connected`, including separate Golf, Grill, Events, and General contact pathways plus SOLYNX attribution.
3. Added contextual CTA rules and stronger representative Golf, Grill, Weddings, Event Spaces, and Contact journey composition.

The QA script now explicitly checks those requirements after generation.

## Validation status after corrective delta

The current chat runtime could not clone the repository for a fresh command-line validation because external DNS resolution for GitHub is unavailable in that runtime. Therefore the corrective source delta is **not claimed as freshly executed** through `npm run build`, `npm run lint`, `npm run type-check`, or `npm run qa` in this session.

Before M2 is merged or used for a preview, regenerate `dist/` and run:

```text
npm run build
npm run lint
npm run type-check
npm run qa
```

All four commands must exit with code 0.

## Vercel status

GitHub currently reports the Vercel check as failed on the development branch. This condition predates the corrective M2 changes: the accepted M1 commit `c2aa6b8b8c94fcdae734977d7e2a6665014a967f` also reports a failed Vercel status, while production `main` commit `6065134aec208e44c1d5d2af16c6ab1e890793dc` reports Vercel success. No Vercel configuration, production alias, deployment setting, or DNS setting was changed during M2.

## Responsive matrix

| Width | Layout rule exercised | Status |
|---:|---|---|
| 1440 | Full navigation, maximum container, multi-column stories | Static rules prepared |
| 1280 | Full navigation and desktop composition | Static rules prepared |
| 1024 | Drawer navigation and compact footer | Static rules prepared |
| 768 | Single-column content transition | Static rules prepared |
| 430 | Mobile hero, conversion rail, forms and footer | Static rules prepared |
| 390 | Mobile controls and content wrapping | Static rules prepared |
| 320 | Narrow-brand, cards and conversion controls | Static rules prepared |

## Browser availability

Live browser rendering could not be completed in the prior Codex environment because the in-app browser runtime was denied access to a required local Windows path. Chrome, Edge, Firefox, and WebKit visual results are therefore **not claimed**. Complete cross-browser visual, keyboard, zoom, contrast, and form QA on an authorized staging preview before merge.

The production form was not submitted during QA.
