FROM node:18.12-alpine3.16 AS builder
WORKDIR /app
COPY . .
RUN npm install -g pnpm@8.6.0 \
	&& pnpm install --frozen-lockfile \
	&& pnpm run build

FROM node:18.12-alpine3.16 AS runner
RUN apk add --no-cache tini=0.19.0-r0
ENTRYPOINT ["/sbin/tini", "--"]
WORKDIR /home/node/app
COPY --from=builder /app/dist ./dist
COPY package.json pnpm-lock.yaml .npmrc ./
RUN npm install -g pnpm@8.6.0 \
	&& chown -R node /home/node \
	&& pnpm install --prod --frozen-lockfile \
	&& rm .npmrc

EXPOSE 3000
USER node

CMD ["npm", "start", "-s"]
