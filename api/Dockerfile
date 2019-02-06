
FROM shnoby/wabacus 
WORKDIR '/app'
COPY ./package.json ./
RUN  npm install 
COPY . .

ENV DBHOST=postgres
ENV DBUSER=postgres
ENV DBPASSWORD=postgres_password
ENV DBPORT=5432
ENV DBNAME=postgres
ENV MQHOST=tcp://worker
ENV MQPORT=5000


CMD ["npm","run", "start"]

EXPOSE 4000
EXPOSE 5000
