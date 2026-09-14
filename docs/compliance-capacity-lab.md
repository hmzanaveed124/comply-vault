# ComplyVault Capacity Lab
Route: /tools/compliance-capacity-calculator

## What changed
A standalone interactive field guide with persona selection, explicit portfolio versus per-firm scope, editable workflow reductions, evidence coverage, adoption, ramp, implementation effort, extra oversight, quoted pricing, and labour cash realisation. Live SVG brush charts preserve exact data coordinates; the cumulative chart supports focus, click, hover, and a month slider. Tables and printed assumptions keep the model reconstructable.

Published Sanity blog images populate the reading cards using the existing getRecentPosts/getImageUrl helpers. These are linked images with a restrained hover effect. The original generated images were not available for direct inspection in this session; confirm that the desired three articles are among the latest published posts.

## Calculation
All defaults are illustrative. No industry performance benchmarks or regulatory savings claims are asserted.
- Review, meetings, retrieval: monthly hours × 12. Preparation: annual incremental hours.
- Per-firm workload scaling applies to workload only. Pricing, archive, setup and overhead are total portfolio figures.
- Gross full-adoption hours: baseline × reduction × coverage × adoption.
- Cautious/base/stretch: reduction multipliers 0.6/1/1.25; each workflow caps at 90%.
- Ramp: min(1, month / ramp months), or immediate for zero.
- Net hours: ramp-adjusted hours − additional overhead − internal setup hours.
- Economic net: net hours × loaded hourly cost + confirmed retired-tool spend − subscription − implementation fee.
- Cash balance applies the user's cash-realisation percentage to net labour value, then adds/subtracts actual cash costs.
- Archive costs stay unchanged. No avoided fines, presumed headcount reductions or new-client revenue.
- Preparation is spread evenly for planning. Break-even is economic and sustained through year end, not cash payback.
- Zero quote means unknown; net/ROI claims are withheld and results explicitly say before subscription.

## Lead flow
The explicit discussion form submits contact details and an assumption/result snapshot to the same Formspree endpoint already used by components/DemoForm.tsx.
When a real NEXT_PUBLIC_TURNSTILE_SITE_KEY is configured, the form uses the existing AJAX + Turnstile pattern. Without a real key it uses a native HTML POST to the same Formspree endpoint so the provider can handle hosted verification/confirmation; all contact fields, consent, a honeypot and the complete model snapshot are included. No fake email report success, newsletter signup, Attio integration or customer submission was performed.
Formspree acceptance and CAPTCHA verification need end-to-end staging verification. Client verification alone is not proof of server verification. Confirm Turnstile enforcement in the existing Formspree form configuration before publication; use its supported spam controls.
No new personal data goes to calculator analytics. Existing site-wide analytics and tracking remain as configured.

## Validation
Eight model checks executed successfully in the available JavaScript runtime using the exact model source and test bodies.
Run with Node: node --test tests/capacity-model.test.mjs
No local filesystem or browser runtime was available. Vercel successfully compiled, type-checked and generated the initial preview; an authenticated HTTP fetch returned 200 and confirmed calculator output plus three Sanity banners. The final revision is validated through Vercel before handoff. No real enquiry was sent and interactive browser/visual testing remains outstanding.
Before release: verify desktop/mobile/keyboard/print in a browser, hosted and AJAX form success/error, CAPTCHA enforcement, correct Sanity artwork, and actual pricing. The preview build uses the existing Vercel pipeline. Reproduce locally with npm ci and npm run build.
Review the existing /roi calculator separately: it retains its prior hard-coded 75% assumptions. This change does not rewrite that existing route.

## Release
Review branch: codex/compliance-capacity-model. No production merge is included.
Blog CTAs link to the new calculator. A draft PR preserves the full implementation for review.
