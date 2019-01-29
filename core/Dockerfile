FROM shnoby/node-zeromq 
WORKDIR '/app'

COPY ./package.json ./

RUN  npm install 

COPY . .
 
CMD ["npm", "run", "start"]

EXPOSE 5000
