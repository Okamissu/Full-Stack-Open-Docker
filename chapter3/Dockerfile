FROM node:24

WORKDIR /usr/src/app

# 1. Copy lockfiles FIRST
COPY --chown=node:node package*.json ./

# 2. Install dependencies (cached unless package.json changes)
RUN npm ci --omit=dev

# 3. Copy remaining source code
COPY --chown=node:node . .

ENV DEBUG=chapter3:*

USER node

CMD [ "npm", "start" ]