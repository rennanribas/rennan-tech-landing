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

# --- Static NGINX Stage ---
FROM nginx:alpine AS static
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist/client .
RUN echo 'server { listen 80; root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
    