# Stage 1: Install dependencies
FROM node:20.11-alpine as dependencies
WORKDIR /app
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN npm install -g pnpm && pnpm install

# Stage 2: Build the application
FROM node:20.11-alpine as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm install -g pnpm && pnpm run build:production

# Stage 3: Setup the production environment
FROM node:20.11-alpine as runner
WORKDIR /app
ENV NODE_ENV production

# Устанавливаем pnpm в финальном этапе
RUN npm install -g pnpm

# Если вы используете файл next.config.js, разкомментируйте следующую строку
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["pnpm", "start"]
