# --- Base Stage --- 
FROM node:22-alpine AS base
WORKDIR /app
# Install pnpm
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./

# --- Development Stage ---
FROM base AS development
RUN pnpm install
COPY . .
EXPOSE 5173
CMD ["pnpm", "run", "dev:ssr"]

# --- Build Stage ---
FROM base AS builder
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# --- SSR Server Stage ---
FROM node:22-alpine AS ssr
WORKDIR /app
RUN npm install -g pnpm

COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/server.ts ./
COPY --from=builder /app/index.html ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src
RUN pnpm install --frozen-lockfile

ENV NODE_ENV=production
EXPOSE 5173
CMD ["pnpm", "run", "dev:ssr"]
    