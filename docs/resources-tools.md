# Resources planning tools roadmap

## v1 — Content (shipped via seed)

- Published **resources** in Payload (`planning`, `financials`, `location`, `funding`, `concepts`, etc.)
- Listed on `/resources` with category labels
- Run `npm run seed` after migrations to populate demo articles

## v2 — Interactive tools (planned)

| Tool | Route (proposed) | Purpose |
|------|------------------|---------|
| Startup budget band picker | `/resources/tools/budget` | Help founders map rough capital needs to concept tiers |
| Launch timeline checklist | `/resources/tools/timeline` | Week-by-week checklist from decision to opening |
| Concept fit quiz (light) | `/resources/tools/fit` | Suggest concept categories; link to `/concepts?category=…` |

### Implementation notes

- Client components with localStorage only (no PII) in v2.0
- Optional “email me results” later → creates a `leads` row with attribution
- Copy and disclaimers editable in Payload (new `resource-tools` global or hardcoded v2.0)

### Success metrics

- Time on tool pages, completion rate, clicks to `/book-a-call` and `/concepts`
