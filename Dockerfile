# --- Build Stage ---
    FROM node:18-alpine AS builder
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm ci
    
    COPY . .
    RUN npm run build
    
    # --- SSR Server Stage ---
    FROM node:18-alpine AS ssr
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
    COPY nginx-proxy.conf /etc/nginx/nginx.conf
    COPY ssl /etc/nginx/ssl
    EXPOSE 80 443
    CMD ["nginx", "-g", "daemon off;"]
    