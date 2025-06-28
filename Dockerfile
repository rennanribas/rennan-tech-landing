# --- Base Stage --- 
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

# --- Development Stage ---
FROM base AS development
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev:ssr"]

# --- Build Stage ---
FROM base AS builder
RUN npm ci
COPY . .
RUN npm run build

# --- SSR Server Stage ---
FROM node:22-alpine AS ssr
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./
COPY --from=builder /app/index.html ./

ENV NODE_ENV=production
EXPOSE 5173
CMD ["node", "server.js"]

# --- NGINX Proxy Stage ---
FROM nginx:alpine AS nginx
COPY nginx-proxy.conf/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
    