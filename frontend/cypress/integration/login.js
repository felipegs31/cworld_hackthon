const valid_email = Cypress.env('valid_email')
const valid_password = Cypress.env('valid_password')
const invalid_password = Cypress.env('invalid_password')

describe('Login Form adn error', () => {
  it('should type login form', () => {
    cy.visit("http://localhost:3000/");
    insertCredentials(valid_email, invalid_password)
  })

  it('should type login and get login error', () => {
    cy.visit("http://localhost:3000/");
    insertCredentials(valid_email, invalid_password)
    cy.get('[data-testid="signinButton"]').click();
    cy.contains('Invalid email or password');
  })

})

describe('Login', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    insertCredentials(valid_email, valid_password)
  })

  it('should type valid info and be redirected', () => {
    cy.get('[data-testid="signinButton"]').click();
    cy.url().should('not.include', '/login')
  })

})



function insertCredentials(email, password) {
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="password"]').type(password);
}

