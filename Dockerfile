FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS build
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=build /app/.output ./.output
COPY package.json ./
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
