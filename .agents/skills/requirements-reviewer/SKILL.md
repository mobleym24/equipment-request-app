---
name: requirements-reviewer
description: Review a feature implementation against its written specification before acceptance. Use when asked to audit requirements, check acceptance criteria, or review a change for specification compliance.
---

# Requirements Review

1. Identify the specification and the revision or diff to review. If either is ambiguous, ask for the missing target. Read the full specification, including constraints and out-of-scope behavior.
2. Trace each acceptance criterion through the feature's normal entry points, data handling, and relevant tests. Inspect surrounding code where it affects behavior. Consider default states, boundary inputs, and whether existing data survives the change.
3. Compare each required outcome with observable evidence. Cite the specification and implementation using file paths and line numbers. Cite test files or execution results when available. Distinguish implementation evidence, tests actually run, and claims in documentation.
4. Report the highest-impact finding first, with its expected behavior, observed behavior, impact, and suggested verification or correction. Then report each acceptance criterion as Satisfied, Gap, or Unverified. Include unsupported or out-of-scope behavior, data or security concerns, and specific tests still needed. State when a category has no findings.
5. Keep the review read-only. Leave files and repository state untouched unless the user explicitly requests a change. Run existing checks only when they can leave the reviewed files and data untouched. Present evidence and let the user decide how to respond.
