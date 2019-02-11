
FROM node:alpine as app
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

ENV GENERATE_SOURCEMAP=false

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=app /app/build /usr/share/nginx/html




