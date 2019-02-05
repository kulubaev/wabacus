// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('press', (value) => {

  const pressed = value.toString().split('');
  for(const p of pressed) {
    console.log(p);
   cy.get(`button[value='${p}']`).click();
  }

})

Cypress.Commands.add('result', (num1, num2) => {
  cy.get(`button[value='=']`).click();
});

Cypress.Commands.add('clear', () => {
  cy.get('button.all-clear').click();
});



Cypress.Commands.add('binary', ( operands, operator) => {

  if(operands.length === 2) {

    cy.press(operands[0]);
    cy.get(`button[value='${operator}']`).click();
    cy.press(operands[1]);
  }

  if(operands.length === 1) {
    cy.get(`button[value='${operator}']`).click();
    cy.press(operands[0]);
  }
}); 


Cypress.Commands.add('unary', ( operator, operand) => {
  if(operand) {
    cy.press(operand);
  }
  cy.get(`button[value='${operator}']`).click();
});

Cypress.Commands.add('add', (...operands) => cy.binary(operands, '+'));
Cypress.Commands.add('subtract', (...operands) => cy.binary(operands, '-'));
Cypress.Commands.add('multiply', (...operands) => cy.binary(operands, '*'));
Cypress.Commands.add('divide', (...operands) => cy.binary(operands, '/'));
Cypress.Commands.add('power', (...operands) => cy.binary(operands, '^'));

Cypress.Commands.add('factorial', (operand) => cy.unary('!', operand));
Cypress.Commands.add('sqrt', (operand) => cy.unary('$', operand));
Cypress.Commands.add('cbrt', (operand) => cy.unary('#', operand));

Cypress.Commands.add('verify', (value) => {
  cy.get('input.calculator-screen')
    .should('have.value', `${value}`);
});


