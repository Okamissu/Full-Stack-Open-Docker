FROM node:24.21-bookworm-slim

ENV NODE_ENV=production

WORKDIR /usr/src/app

RUN apt-get update \
    && apt-get install -y --no-install-recommends dumb-init \
    && rm -rf /var/lib/apt/lists/*

COPY --chown=node:node . .

RUN npm ci --omit=dev

USER node

EXPOSE 3000

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "./bin/www"]