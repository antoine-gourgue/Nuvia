# CLAUDE.md

This project is a premium nutrition and calorie tracking application built with Nuxt 4, TypeScript strict, Tailwind CSS, Pinia, PostgreSQL, Docker and Nuxt server routes.

Claude must always follow the rules defined here and in `docs/ai/`.

---

# 1. Rule Priority

Claude must follow rules in this order of priority:
1. `CLAUDE.md`
2. files inside `docs/ai/`
3. existing project architecture and conventions
4. the current task requirements

If a generated solution conflicts with these rules, Claude must follow the project rules first.

---

# 2. Global Engineering Rules

## Mandatory stack
- Nuxt 4
- TypeScript strict
- Tailwind CSS
- Pinia
- PostgreSQL
- Docker / Docker Compose
- Nuxt server routes / Nitro for backend logic
- Shared contracts between frontend and backend

## Hard requirements
- Never use `any`
- Never write approximate code
- Never ignore loading / empty / error states
- Never put business logic directly inside page components
- Never mix data access with HTTP handlers
- Never introduce unnecessary dependencies
- Never bypass typing with unsafe casting when avoidable
- Never create giant components when smaller reusable ones make sense
- Never leave public functions weakly typed

## Project philosophy
- Prefer simple, maintainable solutions
- Keep code production-ready
- Keep code explicit and readable
- Think mobile-first
- Think SSR compatibility first
- Think user motivation and retention, not just technical delivery
- Favor composition over inheritance
- Favor consistency over cleverness

## Language and naming
- Use English for:
  - code
  - identifiers
  - file names
  - branch names
  - commit messages
  - comments
- Use domain-driven names
- Prefer explicit names over abbreviations

Good:
```ts
const remainingCalories = computed(() => targetCalories.value - consumedCalories.value)
```

Bad:
```ts
const rc = computed(() => t.value - c.value)
```

---

# 3. Architecture Rules

## Separation of concerns
- Pages orchestrate screens, they do not own core business logic
- Components render UI and emit events
- Composables encapsulate reusable client logic
- Stores manage shared client state
- Server handlers only receive, validate and delegate
- Services contain backend business rules
- Repositories contain data access logic
- Shared types and schemas live in shared folders

## Expected structure
- `components/ui`: generic reusable UI
- `components/navigation`: app shell and navigation
- `components/onboarding`: onboarding screens
- `components/dashboard`: dashboard widgets
- `components/journal`: meal logging components
- `composables`: reusable frontend logic
- `stores`: Pinia state containers
- `server/api`: HTTP handlers
- `server/services`: backend business logic
- `server/repositories`: database access
- `shared/types`: shared types
- `shared/schemas`: validation schemas
- `shared/constants`: shared constants

Good:
- meal creation validation in shared schema
- handler calls service
- service calls repository

Bad:
- page directly fetches SQL result
- handler writes SQL inline
- component computes all nutrition logic itself

---

# 4. TypeScript Rules

## Mandatory rules
- `strict: true`
- no `any`
- prefer `unknown` when input shape is not yet validated
- narrow external data after validation
- type all public APIs
- type all store state, getters and actions
- type all props and emits
- type all composable return values if inference is unclear

## `type` vs `interface`
Use `type` for:
- unions
- intersections
- tuples
- aliases
- utility compositions
- discriminated unions
- finite states

Use `interface` for:
- extensible object contracts
- domain entities that may be extended
- implementation-oriented object contracts

Good:
```ts
export interface UserProfile {
  id: string
  userId: string
  age: number
  heightCm: number
  weightKg: number
}

export type GoalType = 'lose' | 'maintain' | 'gain'

export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: string }
```

Bad:
```ts
export type UserProfile = any

export interface GoalType {
  value: string
}

export type ApiResult = {
  success: boolean
  data?: any
  error?: any
}
```

## Public function typing
Good:
```ts
export function calculateRemainingCalories(target: number, consumed: number): number {
  return Math.max(target - consumed, 0)
}
```

Bad:
```ts
export function calculateRemainingCalories(target, consumed) {
  return target - consumed
}
```

---

# 5. Nuxt Rules

## Frontend
- Use Composition API
- Use `<script setup lang="ts">`
- Keep pages thin
- Use composables for reusable logic
- Use stores for shared state
- Keep SSR-safe code paths
- Avoid direct browser-only APIs without guards

Good:
```ts
const { meals, isLoading, fetchMeals } = useJournalMeals()

onMounted(() => {
  void fetchMeals()
})
```

Bad:
```ts
onMounted(async () => {
  const response = await $fetch('/api/meals')
  meals.value = response as any
})
```

Recommended:
```ts
const response = await $fetch<ApiResult<MealEntry[]>>('/api/meals')

if (response.success) {
  meals.value = response.data
}
```

## Server routes
- Validate input at the boundary
- Keep handlers thin
- Delegate to service layer
- Use consistent response shapes

Good:
```ts
export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, createMealSchema.parse)
  const meal = await mealService.createMeal(body)

  return {
    success: true,
    data: meal,
  }
})
```

Bad:
```ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const result = await db.query('INSERT INTO meals VALUES (...)')
  return result
})
```

---

# 6. UI / UX Rules

## Product feeling
The product must feel:
- premium
- simple
- motivating
- calm
- modern
- delightful on mobile
- consistent on desktop

## UI rules
- one clear primary action per screen
- visible hierarchy
- consistent spacing
- accessible interactive areas
- minimal friction
- meaningful feedback

## Component philosophy
- shadcn-like composability
- clean base primitives
- reusable variants
- avoid over-designed effects
- subtle motion only

## Mandatory states
Every significant feature must define:
- loading state
- empty state
- error state
- success state
- disabled state when relevant

Good:
- dashboard card with skeleton state
- empty journal screen with CTA to add first meal

Bad:
- blank white screen while data loads
- error only visible in console

## UI state rule
For every important async screen or action, Claude must explicitly define:
- loading state
- empty state
- error state
- success feedback
- disabled state when relevant

Do not leave async UX undefined.

---

# 7. Testing Rules

## Required tests
- nutrition helpers
- stores
- composables
- validators
- services
- critical UI behavior
- regression tests for fixed bugs

Good:
```ts
it('calculates remaining calories correctly', () => {
  expect(calculateRemainingCalories(2200, 1850)).toBe(350)
})
```

Bad:
```ts
it('works', () => {
  expect(true).toBe(true)
})
```

## Test principles
- deterministic
- readable
- isolated
- behavior-driven
- no useless snapshots

---

# 8. Git Workflow Rules

## Branches
- `feature/<name>`
- `fix/<name>`
- `refactor/<name>`
- `chore/<name>`
- `docs/<name>`
- `test/<name>`
- `ci/<name>`

Good:
- `feature/onboarding-goal-step`
- `fix/daily-calories-rounding`
- `chore/docker-local-setup`

Bad:
- `test`
- `antoine`
- `update`
- `stuff`

## Commits
Use Conventional Commits.

Good:
- `feat: add onboarding goal selection step`
- `fix: correct remaining calories calculation`
- `refactor: extract daily target composable`
- `test: add regression tests for meal totals`

Bad:
- `update`
- `fix bug`
- `wip`
- `tmp`

---

# 9. Dependency Rule

Before introducing a new dependency, prefer:
- native Nuxt features
- Vue composables
- existing project utilities
- lightweight shared helpers

Do not add a package if the same result can be achieved simply with existing tools.

---

# 10. Database Change Rule

Any database schema change must include:
- a migration
- updated shared types if needed
- repository updates
- notes about data impact if relevant

Do not change persistence structure implicitly in unrelated files.

---

# 11. Delivery Rules

When asked for a feature:
1. briefly explain the chosen approach
2. list files to create or modify
3. provide complete code
4. keep it consistent with project rules
5. mention edge cases or trade-offs if relevant

When writing code:
- prefer maintainability
- prefer explicitness
- keep files cohesive
- never use `any`
- never skip validation on external input

## Expected response format
For implementation tasks, Claude should usually answer with:
1. short approach summary
2. files to create or modify
3. complete code
4. short explanation
5. completed work / branch / commit / test notes if the feature is complete

## Feature completion rule
When a coherent feature or fix is complete, always end the response with:
- Completed work
- Suggested branch name
- Suggested commit message
- Test notes
- Migration notes if relevant

Do not claim a feature is complete if critical parts are still missing.

---

# 12. Non-Negotiable Rules

- No `any`
- No weakly typed public APIs
- No business logic inside pages
- No inline SQL inside handlers
- No unvalidated external input
- No missing loading / empty / error states on important screens
- No giant mixed commits
- No unnecessary dependencies
