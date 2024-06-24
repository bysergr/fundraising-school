FROM node:18-alpine as base

RUN apk add --no-cache g++ make py3-pip libc6-compat
RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-lock.yaml ./
COPY package*.json ./

RUN pnpm install

EXPOSE 3000

FROM base as builder
WORKDIR /app
COPY . .
RUN pnpm run build

FROM base as production
WORKDIR /app

ENV NODE_ENV=production
ENV LINKEDIN_CLIENT_ID=example
ENV LINKEDIN_CLIENT_SECRET=example
ENV NEXTAUTH_SECRET=example
ENV NEXTAUTH_URL=http://localhost:3000/
ENV BACKEND_GATEWAY_URL=http://localhost:8080
ENV GOOGLE_ANALYTICS_ID=example


RUN pnpm install --prod

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

CMD pnpm start
