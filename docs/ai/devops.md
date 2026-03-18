# DevOps Standards

## 1. Core Principles

- local setup must be simple
- dev and prod concerns must be separated
- configuration must be explicit
- secrets must never be committed
- CI must block broken code

## 2. Example Dockerfile Pattern

```dockerfile
FROM node:22-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS build
COPY . .
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
COPY --from=build /app/.output ./.output
COPY package.json ./
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```
