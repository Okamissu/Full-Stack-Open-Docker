FROM node:24.21-bookworm-slim

ENV NODE_ENV=development

WORKDIR /usr/src/app

RUN apt-get update \
    && apt-get install -y --no-install-recommends dumb-init \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g nodemon

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

USER node

EXPOSE 3000

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD ["nodemon", "./bin/www"]
