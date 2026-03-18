# Backend Standards

This project uses Nuxt server routes as the backend layer.

## 1. Backend Principles
- Handlers must stay thin
- Validate all external input at the boundary
- Services contain business logic
- Repositories contain database logic
- Keep response shapes consistent
- Never trust the client
- Never write SQL directly in route handlers

## 2. Layering Rules
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
  const result = await db.query('INSERT INTO meal_entries VALUES (...)')
  return result
})
```

## 3. Validation
Good:
```ts
import { z } from 'zod'

export const createMealSchema = z.object({
  name: z.string().min(1).max(120),
  calories: z.number().min(0),
  protein: z.number().min(0),
  carbs: z.number().min(0),
  fat: z.number().min(0),
})
```
