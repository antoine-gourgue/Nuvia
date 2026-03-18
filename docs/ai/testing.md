# Testing Standards

## 1. Core Principles

- tests must be readable
- tests must be deterministic
- tests must verify behavior
- tests must be isolated
- a bug fix should include a regression test when relevant

## 2. Good Test Example

```ts
import { describe, expect, it } from 'vitest'
import { calculateRemainingCalories } from '~/shared/utils/nutrition'

describe('calculateRemainingCalories', () => {
  it('returns the remaining calories when target is higher than consumed', () => {
    expect(calculateRemainingCalories(2200, 1800)).toBe(400)
  })

  it('never returns a negative number', () => {
    expect(calculateRemainingCalories(1800, 2200)).toBe(0)
  })
})
```
