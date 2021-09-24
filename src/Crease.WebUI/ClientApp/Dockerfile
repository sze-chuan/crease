FROM node:14-slim AS BUILD_IMAGE
EXPOSE 4200 19153
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .
RUN npm build
ENTRYPOINT ["npm", "run", "start:dev"]
