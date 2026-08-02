---
phase: 01-static-foundation-content-truth
plan: 01
subsystem: infra
tags: [astro, static-site, content-truth, node-test]

# Dependency graph
requires:
  - phase: none
    provides: greenfield repository and approved café content constraints
provides:
  - pinned Astro 7.1.6 static toolchain with Node 22.12+ support
  - one typed café content object containing all approved copy and explicit unknown placeholders
  - source-level assertions preventing empty placeholders and actionable unknown destinations
affects: [01-02 semantic shell, Phase 2 content sections]

# Tech tracking
tech-stack:
  added: [Astro 7.1.6, Node built-in test runner]
  patterns: [static Astro output, single typed content boundary, source-level placeholder guards]

key-files:
  created: [package.json, package-lock.json, astro.config.mjs, tsconfig.json, .gitignore, src/data/cafe.ts, tests/content-truth.test.mjs]
  modified: []

key-decisions:
  - "Pin Astro 7.1.6 with no adapter, runtime framework, or extra dependency."
  - "Keep every unverified café fact as an exact bracketed string in one exported object."

patterns-established:
  - "Business facts live only in src/data/cafe.ts and later page templates import the named cafe export."
  - "Node's built-in test runner guards placeholder presence and non-actionability without browser tooling."

requirements-completed: [VIS-05, ABOUT-03]

coverage:
  - id: D1
    description: "Pinned static Astro manifest, build scripts, static output config, and strict TypeScript baseline"
    requirement: VIS-05
    verification:
      - kind: unit
        ref: "node --input-type=module manifest/config contract assertion"
        status: pass
    human_judgment: false
  - id: D2
    description: "Typed cafe content boundary with explicit placeholders and no actionable unknown URLs"
    requirement: ABOUT-03
    verification:
      - kind: unit
        ref: "tests/content-truth.test.mjs"
        status: pass
    human_judgment: false

# Metrics
duration: 4min
completed: 2026-08-02
status: complete
---

# Phase 1 Plan 1: Static Toolchain and Content Truth Summary

**Pinned Astro static foundation with a single typed café content boundary and non-actionable placeholder guards**

## Performance

- **Duration:** 4 min
- **Started:** 2026-08-02T17:06:38Z
- **Completed:** 2026-08-02T17:10:37Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments

- Added a reproducible Astro 7.1.6 static toolchain with Node 22.12+ engine requirements, build/test scripts, static output, and Astro strict TypeScript settings.
- Added the sole typed `cafe` content object with the approved identity, empty-state copy, and exact placeholders for every unresolved business fact.
- Added fast Node built-in tests that detect removed/empty placeholders and accidental actionable destination schemes.

## Task Commits

Each task was committed atomically:

1. **Task 1: Bootstrap the static Astro toolchain** - `0c27d55` (feat)
2. **Task 2: Define and guard the explicit café content boundary** - `3fdf3d0` (feat)

## Files Created/Modified

- `package.json` - ESM package manifest with Astro-only dependency, Node engine, and static scripts.
- `package-lock.json` - npm 10 lockfile for the pinned Astro toolchain.
- `astro.config.mjs` - Explicit `output: 'static'` configuration with no adapter or integrations.
- `tsconfig.json` - Astro strict baseline extension.
- `.gitignore` - Keeps generated dependency/build directories out of source commits.
- `src/data/cafe.ts` - Typed single source of café identity, structural copy, and unresolved fields.
- `tests/content-truth.test.mjs` - File-local placeholder and actionability assertions using Node's built-in runner.

## Decisions Made

- Pin Astro 7.1.6 and keep the dependency set to Astro only, matching the static deployment contract.
- Use exact bracketed placeholders until café-provided values are verified; no URLs or inferred business claims are emitted.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Ignore generated dependency/build directories**

- **Found during:** Task 1 (Bootstrap the static Astro toolchain)
- **Issue:** The required install verification generated an untracked `node_modules/` tree in the greenfield repository.
- **Fix:** Added a minimal `.gitignore` for `node_modules/`, `dist/`, and `.astro/` so verification output cannot pollute task commits.
- **Files modified:** `.gitignore`
- **Verification:** `git status --short` leaves only the pre-existing `.planning/` and `.superpowers/` changes untracked/modified.
- **Committed in:** `0c27d55`

**2. [Rule 1 - Bug] Prevent URI guard false positive on field names**

- **Found during:** Task 2 (Define and guard the explicit café content boundary)
- **Issue:** The source-level forbidden-scheme regex matched the `whatsapp` property name rather than a URI string.
- **Fix:** Scoped the assertion to quoted string literals so field names cannot trigger a false failure.
- **Files modified:** `tests/content-truth.test.mjs`
- **Verification:** `npm test` passes all three tests.
- **Committed in:** `3fdf3d0`

---

**Total deviations:** 2 auto-fixed (1 Rule 1 bug, 1 Rule 3 blocking hygiene issue)
**Impact on plan:** Both changes protect deterministic execution and do not add runtime scope.

## Issues Encountered

- No unresolved issues. The full Node test script passes; the production page build is intentionally deferred to Plan 01-02 until a page entry exists.

## Known Stubs

- `src/data/cafe.ts` intentionally contains `[FULL ADDRESS]`, `[PHONE NUMBER]`, `[WHATSAPP NUMBER]`, `[OPENING HOURS]`, `[SOCIAL LINKS]`, `[CAFÉ DESCRIPTION]`, `[GOOGLE MAPS LINK]`, and `[CAFÉ IMAGES]`. These are required content-truth placeholders and should be replaced only with café-verified values in a later content update.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Ready for Plan 01-02 to import `cafe`, render the semantic shell, and verify the static artifact.
- Café business details remain intentionally unavailable; do not activate contact, map, social, or image actions until verified values are supplied.

---
*Phase: 01-static-foundation-content-truth*
*Completed: 2026-08-02*

## Self-Check: PASSED

- Summary and all seven planned implementation/test artifacts exist.
- Task commits `0c27d55` and `3fdf3d0` are present in git history.
