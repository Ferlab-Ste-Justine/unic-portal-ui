/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
});

describe('Tableau Variables - Vérifier la fonctionnalité de la recherche Table', () => {
  it('By Name', () => {
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"]').eq(2).type('Maternal_');
    cy.get('[class*="ant-select-dropdown"] [title="maternal_family_medical_history"]').should('exist');
    cy.get('[class*="ant-select-dropdown"] [title="maternal_ultrasound"]').should('exist');
    cy.get('[class*="ant-select-dropdown"] [title="accouchement"]').should('not.exist');
  });
});
