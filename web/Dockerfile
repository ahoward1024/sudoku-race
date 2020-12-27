ARG TAG=14.15.3-alpine

FROM node:${TAG} as dependencies
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
