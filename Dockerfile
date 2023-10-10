FROM node:18.12-alpine3.16 AS builder
ARG NPM_TOKEN
WORKDIR /app
COPY . .
RUN npm install -g pnpm@8.6.0 \
	&& pnpm install --frozen-lockfile \
	&& pnpm run build

FROM node:18.12-alpine3.16 AS runner
RUN apk add --no-cache tini=0.19.0-r0
ENTRYPOINT ["/sbin/tini", "--"]
WORKDIR /home/node/app
ARG NPM_TOKEN
COPY --from=builder /app/dist ./dist
COPY package.json pnpm-lock.yaml .npmrc ./
RUN npm install -g pnpm@8.6.0 \
	&& chown -R node /home/node \
	&& pnpm install --prod --frozen-lockfile \
	&& rm .npmrc

EXPOSE 3000
USER node

ARG VCS_REF="96655a6"
ARG BUILD_ID="073fbe44-0546-4d9f-9e73-8db7eef9990a"
ARG VERSION="1.0.0"

ENV VCS_REF="$VCS_REF" \
	BUILD_ID="$BUILD_ID" \
	VERSION="$VERSION"

CMD ["npm", "start", "-s"]
