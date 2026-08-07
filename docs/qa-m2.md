# M2 QA record

## Automated baseline

The initial M2 implementation at commit `ca802699392d85ae10bf3e82582f967e2a95a933` established the approved visual system, homepage composition, representative journey pages, content/media models, disabled adapters, and accessibility foundations.

## Corrective review delta

A later M2 review identified and corrected three specification gaps in source:

1. Added the complete semantic token set, including the approved blue focus token.
2. Reworked the shared footer architecture to `Explore`, `Visit`, `Contact`, and `Stay Connected`, including separate Golf, Grill, Events, and General contact pathways plus SOLYNX attribution.
3. Added contextual CTA rules and stronger representative Golf, Grill, Weddings, Event Spaces, and Contact journey composition.

The QA script explicitly checks those requirements after generation.

## Vercel preview configuration correction

Development-branch previews initially failed because the Vercel project expected an output directory named `public`, while the M1/M2 build intentionally writes the generated site to `dist`.

The development branch now contains `vercel.json` declaring `dist` as the output directory and requiring the full validation chain during preview builds:

```text
npm run build
npm run lint
npm run type-check
npm run qa
```

No production alias, DNS record, production deployment setting, or legacy site was changed.

## Final validation

Vercel preview deployment for commit `4937a47c13f67f78a783d3667baef1db2810b8aa` completed successfully on branch `agent/m1-unified-site-shell`.

Results:

- Build: PASS — 33 routes generated in `dist/`
- Lint: PASS — 35 HTML files validated, including internal links, metadata, canonicals, JSON-LD, sitemap, robots, and required empty states
- Type-check: PASS — JavaScript syntax check passed; TypeScript is not used
- QA: PASS

QA assertions passed for:

- Approved core color tokens
- Approved semantic color tokens
- Newsreader and Manrope typography
- Transparent and scrolled header states
- Mobile drawer controls
- Escape and focus-loop keyboard behavior
- Reduced-motion handling
- Touch targets
- Homepage Play / Gather / Celebrate composition
- Approved footer information architecture
- Golf / Grill / Events / General footer contact groups
- Golf contextual CTAs
- Grill contextual CTAs
- Wedding contextual CTAs
- Contact routing groups
- Event-form labels and status messaging
- Preserved LeadConnector endpoint
- Form response and error handling
- Disabled development adapters
- Content-model families
- Responsive breakpoint coverage

## Responsive matrix

| Width | Layout rule exercised | Status |
|---:|---|---|
| 1440 | Full navigation, maximum container, multi-column stories | Static QA passed |
| 1280 | Full navigation and desktop composition | Static QA passed |
| 1024 | Drawer navigation and compact footer | Static QA passed |
| 768 | Single-column content transition | Static QA passed |
| 430 | Mobile hero, conversion rail, forms and footer | Static QA passed |
| 390 | Mobile controls and content wrapping | Static QA passed |
| 320 | Narrow-brand, cards and conversion controls | Static QA passed |

## Browser availability

The resulting Vercel preview is READY, but the preview-access API available in this chat could not fetch the rendered deployment for direct visual inspection. Chrome, Edge, Firefox, and WebKit visual results are therefore not claimed here.

Complete cross-browser visual, keyboard, zoom, contrast, and form QA on the protected staging/preview URL before merge to `main`.

The production form was not submitted during QA.

## M2 closeout recommendation

M2 automated and deployment validation: **PASS**.

M2 may be accepted as complete for development purposes. Cross-browser rendered QA remains a pre-merge/staging requirement, not a blocker for beginning the next reversible milestone.
