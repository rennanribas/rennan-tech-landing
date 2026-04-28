FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

FROM caddy:2.10.2-alpine AS runtime
WORKDIR /srv

COPY Caddyfile.landing /etc/caddy/Caddyfile
COPY --from=builder /app/dist /srv

EXPOSE 80
    