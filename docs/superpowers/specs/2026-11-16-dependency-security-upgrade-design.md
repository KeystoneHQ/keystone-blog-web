# Dependency Security Upgrade Design

## Goal

Remove known production dependency vulnerabilities while preserving the blog's
current user-visible behavior. Each dependency should move to the latest stable
release that can pass the project's verification gates without disproportionate
application changes. When the latest stable release is not compatible, use the
lowest-risk maintained release with no known applicable CVE and document the
reason for holding it back.

## Current State

The project is a Next.js App Router blog with local Markdown content. The
dependency baseline is Next.js 14.1.3, React 18.2.0, pnpm 9.5.0, Jest 29, and
ESLint 8.

The 2026-11-16 production audit reports 40 known vulnerabilities:

- 4 critical
- 15 high
- 17 moderate
- 4 low

Most findings are reachable through Next.js 14.1.3. The audit includes remote
code execution, authorization bypass, denial-of-service, cache poisoning, and
information disclosure advisories. A vulnerable PostCSS version is also present
transitively.

The pre-upgrade verification baseline is:

- `pnpm exec tsc --noEmit`: passes.
- `pnpm lint`: passes with one existing `react-hooks/exhaustive-deps` warning in
  `src/hooks/useVisibleTransition.ts`.
- `pnpm build`: passes and statically generates 126 pages, with existing
  `metadataBase` warnings.
- `pnpm test -- --runInBand`: 24 tests pass and 4 Header tests fail because their
  expected shop URLs and one product name no longer match the current Header
  implementation. These are pre-existing functional-test drift, not dependency
  upgrade regressions.

The local shell uses Node.js 26.13.0, while the repository declares
`>=22.23.4 <23`. Verification must use a supported Node release selected by the
final framework version, and the repository's `.nvmrc`, `engines`, and README
must agree.

## Chosen Approach

Use staged, compatibility-gated upgrades. Within each stage, try the latest
stable mutually compatible versions first. Keep them only when the application
can be made compatible without changing its intended content, routes,
navigation targets, rendering, or interactions. Otherwise, select the newest
maintained secure compatibility line and record the constraint.

This approach is preferred over an all-at-once upgrade because Next.js 14 to 16,
React 18 to 19, Jest 29 to 30, and ESLint 8 to 10 each have breaking changes.
Separating them makes regressions attributable and rollback decisions explicit.
It is preferred over security-floor-only updates because packages that can move
safely to current stable releases should not remain unnecessarily old.

## Upgrade Stages

### 1. Establish a trustworthy test baseline

Update only stale Header assertions so they describe the behavior already
implemented on the current branch. Do not change Header links, product data, or
page behavior as part of this calibration. Re-run the complete suite to require
a green baseline before dependency changes.

### 2. Upgrade the framework as one compatibility unit

Upgrade `next`, `@next/third-parties`, `eslint-config-next`, `react`,
`react-dom`, `react-test-renderer`, and their React types together. Start with
the latest stable compatible set. Apply required framework migrations, but
preserve route URLs, static generation, image behavior, styled-components
support, metadata, and rendered content.

If the latest Next.js line cannot satisfy all gates without a broad application
rewrite, fall back to the newest maintained Next.js release that has no known
applicable production advisory. React and framework-owned packages must remain
on versions supported by that Next.js release.

### 3. Upgrade runtime libraries

Upgrade `marked`, `marked-alert`, `styled-components`, `react-share`,
`gardevoir`, and `reading-time` independently or in small compatibility groups.
For each package, retain the latest stable version when Markdown output,
sanitization assumptions, styles, sharing links, responsive behavior, and
reading-time values remain correct. Use a secure compatible version when a
breaking release would alter intended behavior.

### 4. Upgrade development tooling

Upgrade Testing Library, Jest, jsdom, ts-jest, TypeScript, ESLint,
eslint-config-prettier, Prettier, and Node types in compatible groups. Tooling
versions must be supported by the selected Next.js and Node versions. Replace
removed framework commands or configuration formats where required. Development
tool upgrades must not weaken lint, type, or test coverage.

### 5. Align the toolchain and lockfile

Select an active Node LTS release supported by the final Next.js version. Make
`.nvmrc`, `package.json#engines`, and README instructions consistent. Upgrade
pnpm to the latest stable version compatible with that Node release, regenerate
`pnpm-lock.yaml` from `package.json`, and ensure obsolete lockfile-only packages
are removed.

## Compatibility Rules

- Preserve the home page, six category pages, article pages, sitemap, and 404
  behavior.
- Preserve current Header and Footer navigation targets and interactions.
- Preserve local Markdown parsing, front matter validation, article ordering,
  static path generation, SEO metadata behavior, and image URLs.
- Preserve responsive layouts and styled-components server rendering.
- Do not introduce a new runtime dependency solely to work around an upgrade.
- Do not suppress new type, lint, test, build, or audit failures without a
  documented technical reason.
- Package versions must be explicit in `package.json`; the lockfile must resolve
  those declared versions reproducibly.

## Verification Gates

Every upgrade stage must pass the checks relevant to that stage. The final state
must pass all of the following on the selected supported Node version:

1. A clean `pnpm install --frozen-lockfile` after the lockfile is finalized.
2. `pnpm test -- --runInBand` with all tests passing.
3. `pnpm exec tsc --noEmit` with no errors.
4. The configured lint command with no errors. Existing warnings should be
   resolved when directly affected by a migration; unrelated cleanup is out of
   scope.
5. `pnpm build` with all expected static routes generated.
6. `pnpm audit --prod` with zero known production vulnerabilities.
7. Smoke checks against a production server for `/`, one category route, one
   article route, `/sitemap.xml`, and a missing route.
8. Browser checks at desktop and mobile widths for Header menus, Footer links,
   article rendering, share controls, and representative images.

A development-only advisory may remain only when no fixed compatible version
exists, the package is not shipped to production, and the residual risk and
mitigation are recorded. The production audit gate cannot be waived.

## Failure Handling and Rollback

Keep upgrade stages isolated in reviewable commits. If a latest-version attempt
fails, identify whether the problem is application code, ecosystem
compatibility, or a package regression. Make narrow compatibility changes when
they preserve behavior. If that would require broad product changes, revert the
stage and install the newest secure compatible release instead.

Any held-back package must be listed in the final report with:

- attempted latest version;
- selected version;
- failing verification gate or upstream incompatibility;
- confirmation that the selected production dependency has no known advisory
  at the time of the final audit.

## Deliverables

- Updated `package.json` and `pnpm-lock.yaml`.
- Required compatibility changes to configuration, tests, and application code.
- Consistent Node and pnpm version documentation.
- A final dependency comparison showing latest attempted and selected versions.
- Final test, type-check, lint, build, smoke-check, and audit results.

## Out of Scope

- Redesigning pages or changing editorial content.
- Changing business URLs, product catalog data, analytics behavior, or hosting
  architecture.
- Unrelated refactors or broad lint cleanup.
- Adding end-to-end test infrastructure when the required smoke checks can be
  completed with the existing application and browser tooling.

## Build Regression Repair

The dependency upgrade removes the legacy package path used by
`src/components/Layout/index.tsx`. The repository already contains the intended
replacement on `refactor/localize-header-footer` at commit `d6d29ad`: locally
owned Header/Footer components and their static assets.

Repair the regression by copying only `src/components/Layout` and
`public/layout` from that commit into the upgrade branch, then retain the
React 19 and ESLint compatibility adjustments already made in the upgrade
worktree. `Layout/index.tsx` must import `./Header` and `./Footer`; it must not
restore `@keystonehq/header-footer-components` or another runtime dependency.

The existing stash entries are read-only inputs during this repair. Do not pop,
apply, drop, clear, or rewrite them. Preserve all current dependency-upgrade
changes in the index and worktree. Verify the merged result with lint, tests,
type checking, production build, production audit, and representative page
smoke checks.
