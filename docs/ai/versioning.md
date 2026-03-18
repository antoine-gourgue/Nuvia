# Versioning and Feature Delivery Standards

This project must be developed feature by feature with clear versioning discipline.

---

## 1. Core Rules

- Work feature by feature
- One coherent feature or fix should lead to one coherent commit
- Do not mix unrelated changes in the same commit
- When a feature is complete, propose the appropriate branch name and commit message
- Keep commits small enough to stay reviewable
- Respect Conventional Commits
- Respect project branch naming conventions
- Do not mark a feature as complete if important parts are still missing
- If a feature requires tests, include them before considering the feature complete

---

## 2. Branch Naming

Use:
- `feature/<name>`
- `fix/<name>`
- `refactor/<name>`
- `chore/<name>`
- `docs/<name>`
- `test/<name>`
- `ci/<name>`

Good examples:
- `feature/onboarding-goal-step`
- `feature/daily-calorie-dashboard`
- `fix/remaining-calories-rounding`
- `refactor/extract-meal-form-composable`

Bad examples:
- `update`
- `branch1`
- `antoine`
- `test`
- `wip`

---

## 3. Commit Rules

Every finished feature should result in a clear commit.

Use Conventional Commits:
- `feat:`
- `fix:`
- `refactor:`
- `chore:`
- `docs:`
- `test:`
- `ci:`

Good examples:
- `feat: add onboarding goal selection step`
- `feat: create daily calorie summary card`
- `fix: correct remaining calories calculation`
- `refactor: extract journal totals composable`
- `test: add regression tests for meal total calculation`

Bad examples:
- `update`
- `fix bug`
- `stuff`
- `final`
- `wip`

---

## 4. Definition of Done Before Commit

A feature is considered ready to commit only if:
- the main scope is implemented
- the code follows project architecture
- the code is typed correctly
- there is no `any`
- loading / empty / error states are handled when relevant
- tests are added when relevant
- obvious dead code is removed
- the feature is coherent and reviewable

---

## 5. Claude Behavior Expectations

When Claude finishes a feature, it should provide:
1. a short summary of what was completed
2. the suggested branch name
3. the suggested commit message
4. any migration/test notes if relevant

Expected output example:
```md
Completed:
- added onboarding goal step UI
- connected it to onboarding store
- added validation for selected goal

Suggested branch:
`feature/onboarding-goal-step`

Suggested commit:
`feat: add onboarding goal selection step`
```

---

## 6. If the Work Is Not Finished

If the feature is only partially implemented:
- Claude must say so clearly
- Claude must not pretend the feature is complete
- Claude may suggest a partial commit only if it is still coherent and useful

Good:
- `feat: add meal form UI skeleton`

Bad:
- `feat: complete meal feature`
when backend, validation and tests are still missing

---

## 7. PR Expectations

When a feature is ready for PR, include:
- purpose
- scope
- screenshots if UI changed
- test notes
- migration notes if relevant

Good PR summary:
```md
## Purpose
Add the onboarding goal step.

## Scope
- add UI
- connect Pinia store
- add tests

## Tests
- unit tests added for onboarding store

## Notes
No DB changes
```

---

## 8. Anti-Patterns

Avoid:
- giant mixed commits
- unclear commit messages
- many unrelated fixes in one feature commit
- committing unfinished broken code as complete work
- skipping tests for important logic changes
