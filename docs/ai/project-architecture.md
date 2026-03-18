# Project Architecture

## 1. Recommended Structure

```txt
components/
  ui/
  navigation/
  dashboard/
  journal/
  onboarding/
  forms/

composables/
layouts/
pages/
plugins/
public/

server/
  api/
  services/
  repositories/
  utils/
  db/

shared/
  constants/
  schemas/
  types/
  utils/

stores/

tests/
  unit/
```

## 2. Good Separation

- handler -> service -> repository
- shared types and schemas reused front/backend
