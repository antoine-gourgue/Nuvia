# TypeScript Standards

This document defines how TypeScript must be used in this project.

---

## 1. Core Principles

- Use TypeScript in strict mode
- Never use `any`
- Use `unknown` when data is not trusted yet
- Narrow types safely after validation
- Prefer explicit public types
- Do not weaken types to make code compile faster
- Avoid unsafe casting
- Model domain states precisely

Good:

```ts
function parseCalories(value: unknown): number | null {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return null
  }

  return value
}
```

Bad:

```ts
function parseCalories(value: any): any {
  return value
}
```

---

## 2. When to Use `type`

Use `type` for:

- unions
- intersections
- aliases
- tuples
- discriminated unions
- mapped types
- utility-based compositions
- finite UI states

Good:

```ts
export type GoalType = 'lose' | 'maintain' | 'gain'

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

export type ApiResult<T> = { success: true; data: T } | { success: false; error: string }

export type MealFormPayload = {
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
}
```

Bad:

```ts
export interface GoalType {
  value: string
}

export interface RequestStatus {
  status: string
}
```

## 3. When to Use `interface`

Use `interface` for:

- extensible object contracts
- domain entities
- public object contracts intended for extension or implementation

Good:

```ts
export interface UserProfile {
  id: string
  userId: string
  age: number
  heightCm: number
  weightKg: number
  targetWeightKg: number | null
}

export interface FoodItem {
  id: string
  name: string
  caloriesPer100g: number
  proteinPer100g: number
  carbsPer100g: number
  fatPer100g: number
}
```

## 4. Function Typing

All public functions must be fully typed.

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

## 5. API Result Types

Use discriminated unions for API result typing.

Good:

```ts
export type ApiSuccess<T> = {
  success: true
  data: T
}

export type ApiFailure = {
  success: false
  error: string
}

export type ApiResult<T> = ApiSuccess<T> | ApiFailure
```
