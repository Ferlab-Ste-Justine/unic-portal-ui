/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitVariableEntity('warehouse', 'transfusion', 'unicproduct');
});

describe('Page d\'une variable - Vérifier la fonctionnalité de la recherche Categories', () => {
  it('Table filtered by Value', () => {
    cy.get('[id="categories"] input').type('psl');
    cy.get('[id="categories"] [data-row-key="MDS"] td').should('not.exist');
    cy.get('[id="categories"] [data-row-key="PSL"] td').should('exist');
  });

  it('Table filtered by Label en', () => {
    cy.get('[id="categories"] input').type('Product');
    cy.get('[id="categories"] [data-row-key="MDS"] td').should('not.exist');
    cy.get('[id="categories"] [data-row-key="PSL"] td').should('exist');
  });

  it('Table filtered by Label fr', () => {
    cy.get('[id="categories"] input').type('produit');
    cy.get('[id="categories"] [data-row-key="MDS"] td').should('not.exist');
    cy.get('[id="categories"] [data-row-key="PSL"] td').should('exist');
  });
});
