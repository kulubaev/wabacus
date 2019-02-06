FROM cypress/browsers:chrome67-ff57

 
WORKDIR '/e2e'

COPY package.json .

RUN npm i -g wait-on

RUN  yarn install 

COPY cypress.json .
COPY index.js .

RUN npx cypress verify

CMD ["npm", "run", "ci"]




