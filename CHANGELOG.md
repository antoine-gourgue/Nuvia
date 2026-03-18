# Changelog

All notable changes to Nuvia are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [0.11.0] — 2026-03-18

### Added

- `UBottomSheet` component — mobile-first bottom sheet (slides up on mobile, centered dialog on desktop)
- `AddMealSheet` component — add meal form as bottom sheet instead of separate page
- Add meal sheet opens directly from journal meal sections and dashboard quick actions

### Changed

- Journal page refactored with botanical design tokens
- Error state replaced with `UEmptyState` component
- Page header uses semantic tokens (`text-strong`, `text-muted`)
- Date picker styled with `border-soft`, `surface-card`, primary focus ring
- `MealSection`: emits `add` event to open sheet instead of navigating to `/add`
- `MealCard`: uses `surface-card`, `border-soft`, `surface-soft` hover, delete uses `error-bg` / `error-text`
- Journal skeleton refined to match new layout with header and section structure
- Dashboard "Add meal" opens sheet directly without page navigation

### Removed

- `add.vue` page — replaced by `AddMealSheet` bottom sheet

---

## [0.10.0] — 2026-03-18

### Changed

- Dashboard page refactored with botanical design tokens
- Calorie ring uses `stroke-surface-soft` track and `stroke-primary-500` / `stroke-coral-500` fill
- Macro rings use botanical accents: primary (protein), lime (carbs), coral (fat)
- All text uses semantic tokens (`text-strong`, `text-default`, `text-muted`)
- Quick actions use `soft` button variant instead of `secondary`
- Error state replaced with `UEmptyState` component
- Page header replaced with `UPageHeader` component
- Dashboard skeleton refined to match new card layout with section titles

---

## [0.9.0] — 2026-03-18

### Changed

- Complete CSS theme rewrite with botanical color palette (warm neutrals, botanical greens, coral/lime/peach accents)
- All UI primitives refactored to use semantic design tokens
- `UCard`: added `variant` prop (default, soft, featured)
- `UButton`: added `soft` variant, updated to botanical palette
- `UInput`: added `helper` prop, increased height to h-11, rounded-xl
- `UBadge`: added coral, lime, peach variants with border styling
- `UProgress`: added coral, lime colors, thinner default bar
- `UDialog`: updated to use surface-card and text-strong backdrop
- `UDivider`: uses border-soft token
- `USkeleton`: rounded-xl default, uses surface-200
- App layout uses warm `bg-background` base

### Added

- `UPageHeader` — reusable page header with title, subtitle and optional action slot
- `UMetricCard` — metric display with label, value, unit and optional trend badge
- `UEmptyState` — empty state with icon, message and CTA slot
- `USectionHeader` — section title with optional action slot
- Semantic color tokens: background, surface-soft, surface-card, text-strong, text-default, text-secondary, text-muted, border-soft
- State color tokens: success, warning, error, info with bg/text/border variants
- Accent color scales: coral, lime, peach (50–900)

### Technical

- Tailwind CSS 4 @theme block with 60+ custom design tokens
- Surface scale remapped to warm neutrals for backward compatibility

---

## [0.7.0] — 2026-03-18

### Added

- 83 new unit tests covering all Zod schemas and Pinia stores
- `aria-label` attributes on delete buttons and date input

### Improved

- Journal page error state now properly replaces content (v-if chain fix)
- `UInput` type union now includes `date`

### Fixed

- Journal page showed content and error message simultaneously

### Technical

- Test coverage: 94 tests across 8 test files
- Schema tests: auth, meal, user-profile, weight
- Store tests: auth, onboarding, weight

---

## [0.6.0] — 2026-03-18

### Added

- Weight progress page with SVG line chart, area fill and data points
- Weight stats cards (current, target, change)
- Weight log form with date and optional note
- Weight history list with delete
- Context-aware motivational feedback based on goal type and weight direction
- Profile page with account info, body stats, goals and logout
- `ProfileInfoItem` reusable component
- `useWeightStore` with history, logging (upsert on date) and deletion

### Technical

- SVG chart built without external dependencies
- Weight entries support upsert on same date via ON CONFLICT

---

## [0.5.0] — 2026-03-18

### Added

- Real dashboard with calorie ring chart (SVG), macro rings and quick actions
- Journal page with meal sections grouped by type
- Add meal page with form validation and meal type selector
- `DashboardSkeleton` and `JournalSkeleton` loading states
- `useDashboardStore` with daily summary fetching
- `useJournalStore` with entries, meal grouping and CRUD
- Date picker on journal for browsing history
- Motivational greeting on dashboard based on time of day

### Technical

- SVG ring charts for calories and macros without external charting library
- Macro targets derived from daily calorie target (30% protein, 45% carbs, 25% fat)

---

## [0.4.0] — 2026-03-18

### Added

- JWT authentication with jose (HS256, 7-day expiry)
- User registration and login with bcrypt (12 rounds)
- Auth middleware protecting all app routes
- Guest middleware redirecting authenticated users
- Multi-step onboarding (welcome, goal, body, activity, target)
- Automatic BMR/TDEE calculation with Mifflin-St Jeor formula
- Daily calorie target based on goal type (lose: TDEE-500, gain: TDEE+300)
- `useAuthStore` with token persistence in localStorage
- `useOnboardingStore` with step validation state machine
- `useAuth` composable for register/login/logout flows
- `useApiClient` composable with automatic Bearer token injection
- Auth restore plugin on page load

### Technical

- Bearer token auth across all 11 API handlers
- Profile creation auto-calculates daily calorie target

---

## [0.3.0] — 2026-03-18

### Added

- PostgreSQL database with Docker Compose
- SQL migration system with tracking table
- Initial schema: users, user_profiles, meal_entries, weight_entries
- Repository layer: user, meal, weight repositories
- Service layer: auth, user, meal, weight services
- API handlers: auth (register, login, me), meals (CRUD), weight (CRUD), profile (CRUD), daily summary
- Shared Zod validation schemas: auth, meal, user-profile, weight
- Shared TypeScript types: API result, auth, user, nutrition, weight

### Technical

- Repository → Service → Handler layered architecture
- Zod validation at API boundaries
- Consistent `ApiResult<T>` response shape across all endpoints
- Database env vars using `${VAR:?required}` syntax for safety

### Migration notes

- Run `npm run db:migrate` to create initial schema

---

## [0.2.0] — 2026-03-18

### Added

- Design system with 8 UI primitives (UButton, UInput, UCard, UBadge, USkeleton, UProgress, UAvatar, UDivider, UDialog)
- Floating glassmorphism pill navigation (TopBar desktop, BottomBar mobile)
- App layout with responsive navigation
- Husky pre-commit hooks with lint-staged
- ESLint flat config with Prettier integration

### Technical

- Tailwind CSS 4 with custom @theme (primary green, surface neutral)
- `@reference` directive for Tailwind 4 compatibility in scoped styles
- shadcn-like component composability

---

## [0.1.0] — 2026-03-18

### Added

- Nuxt 4 project initialization
- TypeScript strict mode
- Tailwind CSS 4 setup
- Pinia 3 state management
- Vitest with happy-dom environment
- Docker Compose configuration
- Shared layer structure (types, schemas, constants, utils)
- Nutrition utility functions (BMR, TDEE, macros, calories)
- 11 unit tests for nutrition helpers

### Technical

- Project structure following CLAUDE.md architecture rules
- Path aliases: `~`, `@`, `#shared`
- Inter font as default
