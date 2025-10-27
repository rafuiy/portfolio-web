# --- deps ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# --- build (TS -> JS) ---
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# kalau di package.json belum ada "build", pakai: npx tsc
RUN npm run build || npx --yes typescript tsc

# --- runtime ---
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
# asumsi hasil build ada di dist/
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm ci --omit=dev
# ganti ini kalau app-mu listen di port lain
ENV PORT=5001
EXPOSE 5001
CMD ["node","dist/index.js"]
