# Database Standards

This project uses PostgreSQL.

## 1. Core Rules
- Use explicit table names
- Use primary keys
- Use foreign keys
- Use timestamps where relevant
- Add indexes for frequent lookups
- Keep schema normalized first
- Use migrations

## 2. Example Table Shape
```sql
CREATE TABLE meal_entries (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  name VARCHAR(120) NOT NULL,
  calories INTEGER NOT NULL,
  protein NUMERIC(8,2) NOT NULL,
  carbs NUMERIC(8,2) NOT NULL,
  fat NUMERIC(8,2) NOT NULL,
  entry_date DATE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```
