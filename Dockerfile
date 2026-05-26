# Base stage for all services
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Dependencies stage
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Builder stage
FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY . .
ARG SERVICE_NAME
RUN npm run build ${SERVICE_NAME}

# Runner stage
FROM base AS runner
ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=deps --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist

ARG SERVICE_NAME
ARG PORT=3000
ENV SERVICE_NAME=${SERVICE_NAME}
ENV PORT=${PORT}

EXPOSE ${PORT}

CMD ["sh", "-c", "node dist/apps/${SERVICE_NAME}/main.js"]
