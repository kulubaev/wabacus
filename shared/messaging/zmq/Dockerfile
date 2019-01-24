
FROM node:alpine
WORKDIR '/app'

RUN rm -rf node_modules && \ 
    apk add --no-cache --virtual build-dependencies make gcc g++ python git tzdata curl && \
    apk add --no-cache zeromq-dev

COPY ./package.json ./

RUN npm install

CMD ["node"]

