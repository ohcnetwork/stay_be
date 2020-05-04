FROM node:12.14-alpine as development
RUN apk add python python3 make g++
WORKDIR /usr/src/app
COPY . ./
RUN npm install
RUN npm run build
RUN npm prune --production

FROM node:12.14-alpine as production
WORKDIR /usr/src/app
COPY . ./
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/node_modules ./node_modules
EXPOSE 4009
CMD ["node", "dist/main"]
