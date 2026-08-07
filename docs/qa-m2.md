# M2 QA record

## Automated

The build validates 33 canonical routes and 35 HTML outputs. Automated checks cover internal links, metadata, canonicals, JSON-LD syntax, sitemap inclusion, robots discovery, required empty states, design tokens, shared header states, drawer keyboard hooks, reduced motion, touch targets, homepage sections, form labels/status/error paths, preserved LeadConnector routing, inactive adapters, and content-model families.

## Responsive matrix

| Width | Layout rule exercised | Status |
|---:|---|---|
| 1440 | Full navigation, maximum container, multi-column stories | Static validation passed |
| 1280 | Full navigation and desktop composition | Static validation passed |
| 1024 | Drawer navigation and compact footer | Static validation passed |
| 768 | Single-column content transition | Static validation passed |
| 430 | Mobile hero, conversion rail, forms and footer | Static validation passed |
| 390 | Mobile controls and content wrapping | Static validation passed |
| 320 | Narrow-brand, cards and conversion controls | Static validation passed |

## Browser availability

Live browser rendering could not be completed in the current Codex environment because the in-app browser runtime was denied access to a required local Windows path. Chrome, Edge, Firefox, and WebKit visual results are therefore **not claimed**. Complete cross-browser visual, keyboard, zoom, contrast, and form QA on an authorized staging preview before merge.

The production form was not submitted during QA.
