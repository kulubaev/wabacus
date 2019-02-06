const { time } = require('../utils/time');

const {
  PRODUCT,
  DIVIDE,
  SUM,
  DEDUCT,
  FACTORIAL,
  CUBE_ROOT,
  SQUARE_ROOT,
  POWER
}  = require('../utils/constants');
 
describe ('calculator api', () => {

  beforeEach(()=> {
    cy.window().then(win => win.onbeforeunload = undefined);
  })
 
  const CHRONO_API = '/api/chrono';
  const API = 'api';

  const reset = () => cy.request('api/chrono/reset');


  describe ('rest api methods verification', () => {

    const initialItems = [];

    const getItems = () => { 
      cy.request(CHRONO_API) 
        .its(body);
    }

    const addItem = (item) => {
      cy.request('POST', API, item);
    }


    beforeEach(() => {
      reset();
    })


    it ('should return JSON', () => {

      cy.request(`${CHRONO_API}/all/`)
        .its('headers')
        .its('content-type')
        .should('include', 'application/json')
    });



    it ('should be able to correctly handle binary operations', () => {

      /**
       * verifying addition
       */

      const all = [];
      let  expected_outcome  = {
        date: new Date().shorten(),
        operation: SUM,
        result: 3,
        num1: '1',
        num2: '2',
        expression: '1 + 2'
      }

      cy.request(`${API}/add/1/2`)
        .its('body')
        .should('deep.eq', expected_outcome);

      all.push(expected_outcome);

      /**
       * verifying multiplication
       */

      expected_outcome  = {
        date: new Date().shorten(),
        operation: PRODUCT,
        result: 35,
        num1: '5',
        num2: '7',
        expression: '5 * 7'
      }

      cy.request(`${API}/multiply/5/7`)
        .its('body')
        .should('deep.eq', expected_outcome);

      all.push(expected_outcome);

      /*
       * verifying subtraction
      */

      expected_outcome  = {
        date: new Date().shorten(),
        operation: DEDUCT,
        result: -8,
        num1: '11',
        num2: '19',
        expression: '11 - 19'
      }

      cy.request(`${API}/subtract/11/19`)
        .its('body')
        .should('deep.eq', expected_outcome);


      all.push(expected_outcome);

      /*
       * verifying division
       */

      expected_outcome  = {
        date: new Date().shorten(),
        operation: DIVIDE,
        result: 9,
        num1: '45',
        num2: '5',
        expression: '45 / 5'
      }

      cy.request(`${API}/divide/45/5`)
        .its('body')
        .should('deep.eq', expected_outcome);

      all.push(expected_outcome);


      /*
       * verifying retrieving historical list of operations
       * enlisted so far
       */

      cy.request(`${CHRONO_API}/all/0`)
        .then((res) => {
          const data = res.body.map(({ operation, date, result, num1, num2, expression }) => ({date, operation, result, num1, num2, expression }));
          expect(data.length).to.equal(all.length);
          all.every(d => expect(all).include(d));

        })
    });


    it ('should be able to correctly handle unary operations', () => {

      /**
       * verifying squareroot
       */

      const all = [];

      let  expected_outcome  = {
        date: new Date().shorten(),
        operation: SQUARE_ROOT,
        result: 3,
        num1: '9',
        expression: '√ 9'
      }

      cy.request(`${API}/sqrt/9`)
        .its('body')
        .should('deep.eq', expected_outcome);

      all.push(expected_outcome);


      /**
       * verifying cubicroot
       */

      expected_outcome  = {
        date: new Date().shorten(),
        operation: CUBE_ROOT,
        result: 5,
        num1: '125',
        expression: '3√ 125'
      }

      cy.request(`${API}/cbrt/125`)
        .its('body')
        .should('deep.eq', expected_outcome);

      all.push(expected_outcome);

      /**
       * verifying factorial
       */

      expected_outcome  = {
        date: new Date().shorten(),
        operation: FACTORIAL,
        result: 120,
        num1: '5',
        expression: '5 !'
      }

      cy.request(`${API}/factorial/5`)
        .its('body')
        .should('deep.eq', expected_outcome);

      all.push(expected_outcome);

      /**
       * verifying factorial
       * limited to 30 
       * if num1 is greated than 20 restrict it
       * return 20! instead
       */

      expected_outcome  = {
        date: new Date().shorten(),
        operation: FACTORIAL,
        result: 2432902008176640000,
        num1: 20,
        expression: '20 !'
      }

      cy.request(`${API}/factorial/50`)
        .its('body')
        .should('deep.eq', expected_outcome);

      all.push(expected_outcome);

      /*
       * verifying retrieving historical list of operations
       * enlisted so far
       */

      cy.request(`${CHRONO_API}/all/0`)
        .then((res) => {
          const data = res.body.map(({ operation, date, result, num1, expression }) => ({date, operation, result, num1, expression }));
          expect(data.length).to.equal(all.length);
          all.every(d => expect(all).include(d));

        })


    })



  });
});
