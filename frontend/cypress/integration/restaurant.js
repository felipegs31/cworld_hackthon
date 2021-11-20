const valid_token = Cypress.env('valid_token')

describe('Search a restaurant', () => {
  it('should type in the search bar and a restaurant appear', () => {
    window.localStorage.setItem("token", valid_token);
    cy.visit("http://localhost:3000/");
    cy.get('[data-testid="searchInput"]').type('punch');
    cy.get('H5').should('contain', 'Punch');
    cy.get('p').should('contain', 'Hamburguer');
  })
})




