# Dependency Security Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade every dependency to its latest stable compatible version, fall back only where required to preserve behavior, and finish with zero known production dependency vulnerabilities.

**Architecture:** Upgrade in isolated compatibility groups: first repair the existing test baseline, then migrate the framework, runtime libraries, development tooling, and repository toolchain. Each group must pass targeted contracts plus the full test, type-check, build, and security gates before the next group starts.

**Tech Stack:** Next.js App Router, React, TypeScript, styled-components, Marked, Jest, Testing Library, ESLint, pnpm, Node.js.

**Spec:** `docs/superpowers/specs/2026-11-16-dependency-security-upgrade-design.md`

## Global Constraints

- Preserve the home page, six category pages, article pages, sitemap, 404 behavior, navigation targets, interactions, Markdown output, article ordering, SEO behavior, images, and responsive layout.
- Try the latest stable mutually compatible release first; hold a package back only when a verification gate fails or an upstream peer range excludes it.
- Final `pnpm audit --prod` result must contain zero known vulnerabilities.
- Do not introduce a new runtime dependency solely to work around an upgrade.
- Use Node.js `26.13.0` LTS and pnpm `12.21.0` unless a verified package engine constraint requires the newest compatible release on an active LTS line.
- Keep each upgrade stage independently reviewable and record any fallback in the final report.

---

## File Map

- `package.json`: dependency versions, scripts, Node engine, and package-manager pin.
- `pnpm-lock.yaml`: reproducible resolved dependency graph; regenerate only through pnpm.
- `.nvmrc`: exact local Node version.
- `README.md`: supported toolchain and verification commands.
- `src/components/Layout/Header/index.test.tsx`: current Header behavior baseline.
- `src/app/[post]/utils/markdown.test.ts`: Markdown and heading compatibility contracts.
- `src/app/[post]/utils/markdown.ts`: adapt only if Marked's latest renderer API requires it.
- `src/app/[post]/utils/postConverter.ts`: adapt only if marked-alert's latest plugin API requires it.
- `next.config.js`: Next.js 16 compatibility and preserved image/compiler behavior.
- `tsconfig.json` and `next-env.d.ts`: framework-generated TypeScript compatibility changes.
- `eslint.config.mjs`: ESLint flat configuration replacing `.eslintrc.json`.
- `.eslintrc.json`: delete after the flat configuration passes.
- `jest.config.js` and `jest.setup.ts`: Jest 30 and Testing Library compatibility.
- `docs/dependency-security-upgrade-report.md`: attempted versions, selected versions, fallbacks, CVE results, and validation evidence.

---

### Task 1: Repair and lock the pre-upgrade behavior baseline

**Files:**
- Modify: `src/components/Layout/Header/index.test.tsx:13-72,109-126`
- Create: `src/app/[post]/utils/markdown.test.ts`

**Interfaces:**
- Consumes: `headerLinks`, `productGroups`, and `partnershipGroups` behavior rendered by the current Header.
- Produces: a green 28-test existing suite plus Markdown contracts reusable after runtime-library upgrades.

- [ ] **Step 1: Update only the four stale Header expectations**

Change the expected BUY URL to `https://shop.keyst.one/collections`, the Keystone 3 Pro URL to `https://shop.keyst.one/products/keystone-3-pro`, the hover target name to `Keystone 3 Pro Customization`, and the partnership More URL to `https://shop.keyst.one/products/keystone-3-pro-co-branded-version`. Do not modify Header implementation or navigation data.

- [ ] **Step 2: Run the Header suite and verify the existing behavior is green**

Run:

```bash
corepack pnpm test -- src/components/Layout/Header/index.test.tsx --runInBand
```

Expected: the Header suite passes with no changes outside its test file.

- [ ] **Step 3: Add Markdown renderer contracts**

Create `src/app/[post]/utils/markdown.test.ts` with exact behavior checks:

```ts
import { getHeadings, getMarkDownParser } from './markdown'

describe('Markdown parser compatibility', () => {
  it('preserves heading ids and raises heading depth when the article has an h1', () => {
    const source = '# Article\n\n## **Security** guide'

    expect(getHeadings(source)).toEqual([
      { text: 'Article', depth: 2, slug: 'article' },
      { text: 'Security guide', depth: 3, slug: 'security-guide' },
    ])
    expect(getMarkDownParser(source).parse(source)).toContain(
      '<h2 id="article">Article</h2>'
    )
  })

  it('does not raise heading depth when no h1 exists', () => {
    const source = '## Setup'

    expect(getHeadings(source)).toEqual([
      { text: 'Setup', depth: 2, slug: 'setup' },
    ])
    expect(getMarkDownParser(source).parse(source)).toContain(
      '<h2 id="setup">Setup</h2>'
    )
  })
})
```

- [ ] **Step 4: Run the complete baseline gates**

Run:

```bash
corepack pnpm test -- --runInBand
corepack pnpm exec tsc --noEmit
corepack pnpm lint
corepack pnpm build
```

Expected: all tests, type checking, lint, and the production build pass; the previously recorded hook and metadata warnings may remain at this stage.

- [ ] **Step 5: Commit the baseline**

```bash
git add src/components/Layout/Header/index.test.tsx 'src/app/[post]/utils/markdown.test.ts'
git commit -m "test: establish dependency upgrade baseline"
```

---

### Task 2: Upgrade Next.js and React to the latest stable compatibility set

**Files:**
- Modify: `package.json:14-40`
- Modify: `pnpm-lock.yaml`
- Modify if required by compiler errors: `next.config.js`, `tsconfig.json`, `next-env.d.ts`, `src/lib/styled.tsx`, `src/app/layout.tsx`

**Interfaces:**
- Consumes: all Task 1 behavior contracts.
- Produces: Next.js `16.4.6`, `@next/third-parties` `16.4.6`, React/React DOM `19.3.1`, React types `19.3.0`, and a successful App Router production build.

- [ ] **Step 1: Install the exact latest framework set reported on 2026-11-16**

Run:

```bash
corepack pnpm add next@16.4.6 @next/third-parties@16.4.6 react@19.3.1 react-dom@19.3.1
corepack pnpm add -D eslint-config-next@16.4.6 @types/react@19.3.0 @types/react-dom@19.3.0 react-test-renderer@19.3.1
```

Before retaining `react-test-renderer`, search for imports with `rg -n "react-test-renderer" . -g '!pnpm-lock.yaml' -g '!package.json'`. If there are none, remove it with `corepack pnpm remove -D react-test-renderer` instead of shipping unused test infrastructure. Normalize every retained direct dependency specifier to the exact selected version without `^` or `~`.

- [ ] **Step 2: Apply only compiler-directed Next.js 16 compatibility changes**

Run `corepack pnpm exec tsc --noEmit` and `corepack pnpm build`. If Next.js updates `tsconfig.json` or `next-env.d.ts`, retain only required generated changes. Preserve the existing `compiler.styledComponents` and `images.remotePatterns` settings. Do not enable Cache Components, change route semantics, or rewrite data loading.

If Turbopack exposes an upstream incompatibility that does not occur under Webpack, verify with `corepack pnpm exec next build --webpack`; use `next build --webpack` only as a documented compatibility fallback, not as the first choice.

- [ ] **Step 3: Verify framework behavior**

Run:

```bash
corepack pnpm test -- --runInBand
corepack pnpm exec tsc --noEmit
corepack pnpm build
corepack pnpm audit --prod
```

Expected: tests, types, and build pass. The audit must no longer report the Next.js 14 advisories. If 16.4.6 fails due to an upstream regression after narrow compatibility fixes, test the newest secure 16.x release below 16.4.6 before considering 15.5.28 or newer; never select a Next.js version named vulnerable by the final audit.

- [ ] **Step 4: Commit the framework migration**

```bash
git add package.json pnpm-lock.yaml next.config.js tsconfig.json next-env.d.ts src/lib/styled.tsx src/app/layout.tsx
git commit -m "chore: upgrade Next.js and React"
```

Stage only files that actually changed.

---

### Task 3: Upgrade runtime libraries while preserving rendered output

**Files:**
- Modify: `package.json:14-25`
- Modify: `pnpm-lock.yaml`
- Modify if required by targeted failures: `src/app/[post]/utils/markdown.ts`, `src/app/[post]/utils/postConverter.ts`, `src/components/Media/index.tsx`, `src/lib/styled.tsx`
- Test: `src/app/[post]/utils/markdown.test.ts`, `src/app/[post]/index.test.tsx`

**Interfaces:**
- Consumes: Markdown and page behavior contracts from Task 1.
- Produces: latest compatible runtime libraries with unchanged article HTML, headings, sharing links, responsive behavior, and server-rendered styles.

- [ ] **Step 1: Upgrade the non-Markdown runtime packages**

Run:

```bash
corepack pnpm add styled-components@6.6.0 react-share@6.1.0 gardevoir@2.0.0 reading-time@1.5.0
```

Run the full tests, type check, and build. Fix only API/type changes that preserve current UI behavior. If a package fails, isolate it by returning that single declaration to its previous version and inspect candidates with `corepack pnpm view styled-components versions --json`, `corepack pnpm view react-share versions --json`, `corepack pnpm view gardevoir versions --json`, or `corepack pnpm view reading-time versions --json`. Select the newest candidate that passes the failed gate and has no production audit finding.

- [ ] **Step 2: Upgrade Marked and marked-alert together**

Run:

```bash
corepack pnpm add marked@18.2.0 marked-alert@2.1.2
corepack pnpm test -- 'src/app/[post]/utils/markdown.test.ts' 'src/app/[post]/index.test.tsx' --runInBand
```

If Marked 18 changes renderer callback arguments, adapt `renderer.heading` to its published token-based signature while keeping the exact HTML asserted in Task 1. Do not relax the assertions or remove heading IDs.

- [ ] **Step 3: Verify every runtime gate and production audit**

Run:

```bash
corepack pnpm test -- --runInBand
corepack pnpm exec tsc --noEmit
corepack pnpm build
corepack pnpm audit --prod
```

Expected: every command succeeds and the production audit reports zero vulnerabilities. Use the concrete package name from each remaining finding with `corepack pnpm why`, starting with `corepack pnpm why postcss`; prefer upgrading its parent package before adding an override.

- [ ] **Step 4: Commit the runtime upgrade**

```bash
git add package.json pnpm-lock.yaml 'src/app/[post]/utils/markdown.ts' 'src/app/[post]/utils/postConverter.ts' src/components/Media/index.tsx src/lib/styled.tsx
git commit -m "chore: upgrade runtime dependencies"
```

Stage only files that actually changed.

---

### Task 4: Upgrade Jest, Testing Library, TypeScript, Prettier, and ESLint

**Files:**
- Modify: `package.json:3-40`
- Modify: `pnpm-lock.yaml`
- Create: `eslint.config.mjs`
- Delete: `.eslintrc.json`
- Modify if required: `jest.config.js`, `jest.setup.ts`, `tsconfig.json`

**Interfaces:**
- Consumes: the complete application and test suite.
- Produces: Jest 30 tests, ESLint 10 flat configuration, current Testing Library, TypeScript 7 when compatible, and direct CLI linting.

- [ ] **Step 1: Remove unused ts-jest if Jest is transformed exclusively by next/jest**

Confirm with:

```bash
rg -n "ts-jest" . -g '!pnpm-lock.yaml' -g '!package.json'
```

When no configuration or import uses it, run `corepack pnpm remove -D ts-jest`.

- [ ] **Step 2: Install the latest test and formatting tools**

Run:

```bash
corepack pnpm add -D @testing-library/jest-dom@7.0.1 @testing-library/react@16.3.3 @types/jest@30.0.0 @types/node@26.6.6 jest@30.5.2 jest-environment-jsdom@30.5.2 prettier@3.10.1 eslint-config-prettier@10.1.8
```

Run `corepack pnpm test -- --runInBand` and fix Jest 30 configuration/API incompatibilities without reducing coverage.

- [ ] **Step 3: Attempt TypeScript 7.0.2 and retain it only if Next.js and all types pass**

Run:

```bash
corepack pnpm add -D typescript@7.0.2
corepack pnpm exec tsc --noEmit
corepack pnpm build
```

If Next.js 16.4.6 or another direct dependency declares an incompatible peer range, inspect the concrete ranges with `corepack pnpm view next@16.4.6 peerDependencies --json`, `corepack pnpm view eslint-config-next@16.4.6 peerDependencies --json`, and `corepack pnpm view jest@30.5.2 peerDependencies --json`. Select the highest stable TypeScript version inside every reported range, then rerun both commands and record the exact limiting range in the final report.

- [ ] **Step 4: Replace legacy ESLint configuration with flat config and direct CLI execution**

Install ESLint 10.15.0, then change `package.json#scripts.lint` from `next lint` to `eslint .` and create `eslint.config.mjs`:

```js
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  prettier,
  {
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      'no-unused-vars': [
        'warn',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', 'jest.setup.{js,ts}'],
    languageOptions: {
      globals: {
        afterEach: 'readonly',
        beforeEach: 'readonly',
        describe: 'readonly',
        expect: 'readonly',
        it: 'readonly',
        jest: 'readonly',
        test: 'readonly',
      },
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'next-env.d.ts',
  ]),
])
```

Delete `.eslintrc.json`. Run `corepack pnpm lint`. If ESLint 10.15.0 is outside `eslint-config-next@16.4.6`'s peer range, use the highest stable ESLint version allowed by that exact peer range and record the constraint.

- [ ] **Step 5: Run all tooling gates**

Run:

```bash
corepack pnpm test -- --runInBand
corepack pnpm exec tsc --noEmit
corepack pnpm lint
corepack pnpm build
```

Expected: all commands exit zero. Do not suppress new failures globally; scope any necessary rule exception to the smallest file and explain it in the report.

- [ ] **Step 6: Commit the tooling migration**

```bash
git add package.json pnpm-lock.yaml eslint.config.mjs .eslintrc.json jest.config.js jest.setup.ts tsconfig.json
git commit -m "chore: upgrade development tooling"
```

Stage only files that actually changed.

---

### Task 5: Align Node.js, pnpm, documentation, and the final lockfile

**Files:**
- Modify: `.nvmrc`
- Modify: `package.json:10-13`
- Modify: `pnpm-lock.yaml`
- Modify: `README.md:8-31`

**Interfaces:**
- Consumes: the final compatible dependency graph.
- Produces: a reproducible Node.js 26.13.0 / pnpm 12.21.0 environment with consistent documentation.

- [ ] **Step 1: Pin the active LTS toolchain**

Set `.nvmrc` to `26.13.0`, `package.json#engines.node` to `>=26.13.0 <27`, and `package.json#packageManager` to `pnpm@12.21.0`.

- [ ] **Step 2: Regenerate and verify the lockfile**

Run under Node.js 26.13.0:

```bash
corepack enable
corepack prepare pnpm@12.21.0 --activate
pnpm install
pnpm install --frozen-lockfile
pnpm list --depth 0
```

Expected: both installs succeed, package declarations and the lockfile agree, and no removed direct dependency remains in the importer.

- [ ] **Step 3: Update README commands and versions**

Document Node.js 26.13.0, pnpm 12.21.0, `pnpm lint`, `pnpm test -- --runInBand`, `pnpm exec tsc --noEmit`, `pnpm build`, and `pnpm audit --prod`. Remove the obsolete Node 22 wording.

- [ ] **Step 4: Commit toolchain alignment**

```bash
git add .nvmrc package.json pnpm-lock.yaml README.md
git commit -m "chore: align Node and pnpm toolchain"
```

---

### Task 6: Perform production smoke checks and publish the security report

**Files:**
- Create: `docs/dependency-security-upgrade-report.md`
- Do not modify application behavior during this task.

**Interfaces:**
- Consumes: final production build and dependency graph.
- Produces: audit evidence, route smoke results, browser verification, and a complete version/fallback record.

- [ ] **Step 1: Run the final automated gates from a clean install**

Run:

```bash
pnpm install --frozen-lockfile
pnpm test -- --runInBand
pnpm exec tsc --noEmit
pnpm lint
pnpm build
pnpm audit --prod
pnpm audit
```

Expected: every functional gate passes and `pnpm audit --prod` reports zero vulnerabilities. Record any development-only advisory separately with its path, impact, fix availability, and mitigation.

- [ ] **Step 2: Start the production server and check representative routes**

Run `pnpm start` and verify HTTP status and expected content for:

```text
GET /                                                          -> 200, Keystone Blog home content
GET /categories/hardware-wallet                                -> 200, category content
GET /how-to-choose-a-crypto-wallet                              -> 200, article content
GET /sitemap.xml                                                -> 200, XML sitemap
GET /this-route-must-not-exist                                  -> 404
```

Use a real slug returned by the final build if the representative article slug changes.

- [ ] **Step 3: Perform desktop and mobile browser smoke checks**

At desktop and mobile widths verify: home Hero cards, category navigation, one article's Markdown/headings/images, Header dropdowns and mobile drill-down, Footer links, and share controls. Confirm there are no console errors or failed first-party asset requests.

- [ ] **Step 4: Write the final report with exact results**

Create `docs/dependency-security-upgrade-report.md` containing:

- audit date and commands;
- baseline count `4 critical / 15 high / 17 moderate / 4 low`;
- one row per direct dependency with original version, latest attempted version, selected version, and status;
- every held-back package with the exact peer constraint or failing gate;
- final production and full audit counts;
- test, type-check, lint, build, route, and browser results;
- the supported Node.js and pnpm versions.

- [ ] **Step 5: Check the final diff and commit the report**

Run:

```bash
git diff --check
git status --short
git diff --stat
```

Ensure generated `.next` output and `tsconfig.tsbuildinfo` are not committed. Then run:

```bash
git add docs/dependency-security-upgrade-report.md
git commit -m "docs: record dependency security upgrade results"
```

The final handoff must list selected versions, any justified fallback, and the exact outputs of the final verification gates.

---

### Task 7: Repair the missing Header/Footer build dependency

**Files:**
- Import from `d6d29ad`: `public/layout/**`
- Import from `d6d29ad`: `src/components/Layout/**`
- Preserve upgrade adaptations in: `src/components/Layout/Header/index.tsx`
- Preserve upgrade tests in: `src/components/Layout/Header/index.test.tsx`
- Modify if required: `docs/dependency-security-upgrade-report.md`

**Interfaces:**
- Consumes: the local Header/Footer implementation from commit `d6d29ad` and the current React 19 / ESLint upgrade changes.
- Produces: `Layout({ children }: LayoutProps)` rendering local `<Header />`, `<Footer />`, `<main>`, and `GoogleTagManager` without `@keystonehq/header-footer-components`.

- [ ] **Step 1: Record the protected state**

Run:

```bash
git stash list
git status --short
git diff -- src/components/Layout/Header/index.tsx src/components/Layout/Header/index.test.tsx
git diff --cached -- src/components/Layout/Header/index.tsx src/components/Layout/Header/index.test.tsx
```

Expected: stash entries are recorded for comparison; no stash command that mutates state is used.

- [ ] **Step 2: Import the complete local implementation without touching the index or stash**

Run:

```bash
git restore --source=d6d29ad --worktree -- public/layout src/components/Layout
```

Expected: `src/components/Layout/index.tsx` imports `./Header` and `./Footer`, and all files referenced by those components exist locally.

- [ ] **Step 3: Reapply the upgrade-specific Header compatibility changes**

In `src/components/Layout/Header/index.tsx`, retain the narrow pathname-change effect exception required by the current ESLint configuration. Keep React 19-compatible refs and event types throughout the imported components. In `src/components/Layout/Header/index.test.tsx`, retain the current navigation assertions while adding the imported implementation's desktop and mobile interaction coverage.

- [ ] **Step 4: Verify local component resolution**

Run:

```bash
rg -n "@keystonehq/header-footer-components|gardevoir" src package.json
corepack pnpm exec tsc --noEmit
```

Expected: the search returns no runtime references and TypeScript passes.

- [ ] **Step 5: Run focused and full functional gates**

Run:

```bash
corepack pnpm test -- src/components/Layout/Header/index.test.tsx src/components/Layout/Footer/index.test.tsx
corepack pnpm lint
corepack pnpm test
corepack pnpm build
corepack pnpm audit --prod
```

Expected: all commands pass and the production audit reports no known vulnerabilities.

- [ ] **Step 6: Verify the protected state and report the repair**

Run:

```bash
git stash list
git status --short
git diff --check
```

Expected: the stash list is byte-for-byte unchanged from Step 1, existing upgrade files remain present, and only the local layout implementation/assets plus any report correction are newly changed. Do not commit, pop, apply, drop, clear, or rewrite a stash during this task.
