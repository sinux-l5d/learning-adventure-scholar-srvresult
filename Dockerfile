FROM node:16.13.2-alpine3.15 as build

WORKDIR /app

# Executé seulement si modification de package.json
COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .
RUN npm run build

FROM node:16.13.2-alpine3.15 as run

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json .

ENV HUSKY=0
ENV NODE_ENV=production

RUN npm install --production --ignore-scripts

CMD ["node", "-r", "module-alias/register", "./build/index.js"]
