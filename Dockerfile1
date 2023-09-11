FROM node:alpine3.18


WORKDIR /app

COPY package.json pnpm-lock.yaml ./


RUN npm install pnpm -g; \
    pnpm install

COPY . ./

CMD ["npm","run","start"]