FROM node:16.13.2-alpine3.15 as build

WORKDIR /app

# Executé seulement si modification de package.json
COPY package.json .
COPY package-lock.json .

#ENV NODE_ENV=production

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

ENV MONGO_HOST=db
ENV MONGO_APP_USER=laweb
ENV MONGO_PORT_EXT=27017
ENV MONGO_DB_NAME=lawebdb

RUN npm install --production --ignore-scripts

EXPOSE 3000
CMD ["node", "-r", "module-alias/register", "./build/index.js"]
