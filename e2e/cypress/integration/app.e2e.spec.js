describe('calculator web app', () => {

  const reset = () => cy.request('api/chrono/reset');


  before(() => reset());

  beforeEach(() => {
    cy.window().then(win => win.onbeforeunload = undefined);
  })

  context('visual aspects', () => {

    it('opening the application', () => {
      cy.visit('/');
      cy.get('.calculator').should('exist');
    });

  });


  context('behavioral aspects', () => {

    beforeEach(() => {
      cy.clear();
    });


    it ('operates arithmethic calculations correctly', () => {

      //  3√((((√ ((5!) - 56)) / 4) ^ 5) * 2) = 4  ;

      // 5! = 120
      cy.factorial(5);

      cy.verify(120);

      //√ (120 - 56) = 8
      cy.subtract(56);
      cy.sqrt()

      cy.verify(8);

      // 3√((((8 / 4) ^ 5) * 2) = 4
      cy.divide(4);
      cy.power(5);
      cy.multiply(2);
      cy.cbrt();

      cy.verify(4);


      // 0
      cy.clear();
      cy.verify(0);


      // √ ((5 ^ 3) - 11) = 11
      cy.power(5,3);
      cy.subtract(4);
      cy.sqrt();
      cy.verify(11);

      // ((0.5) * 3) = 1.5
      cy.press(0.5);
      cy.multiply(3);
      cy.result();
      cy.verify(1.5);
    })
  })

});


