FROM node:24.0.2-alpine3.20 AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS production-deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS production
WORKDIR /app

COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/global-bundle.pem ./global-bundle.pem
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/src/database/migrations ./src/database/migrations
COPY --from=build /app/src/database/seeders ./src/database/seeders
COPY --from=build /app/src/config/sequelize.cjs ./src/config/sequelize.cjs
COPY --from=build /app/.sequelizerc ./.sequelizerc

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000
CMD ["npm", "run", "start:prod"]