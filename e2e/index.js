const cypress = require('cypress');
const waitOn = require('wait-on');

const opts = {

  resources: [
    'http://127.0.0.1:8080'
  ],
  delay: 1000,
  interval: 100,
  timeout: 10000,
  tcpTimeout: 1000,
  window: 1000
};


waitOn(opts)
  .then(() => {
    cypress.run({
      spec: 'cypress/integration/app.e2e.spec.js',
      noExit: true,
      reporter: 'junit'
    })
      .then()
      .catch()
  })


