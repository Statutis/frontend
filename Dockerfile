FROM node
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN yarn install

RUN yarn run build

COPY . .

CMD [ "yarn", "run", "preview" ]