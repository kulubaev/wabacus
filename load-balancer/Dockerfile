
FROM shnoby/node-zeromq 
WORKDIR '/app'

COPY ./package.json ./
RUN  npm install 
COPY . .

ENV MQHOST=*
ENV MQPORT_CLIENT=5000
ENV MQPORT_WORKER=6000


EXPOSE 5000
EXPOSE 6000

CMD ["npm","run", "start"]

