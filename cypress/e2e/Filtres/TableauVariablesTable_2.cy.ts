/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
  cy.inputDropdownSelectValue('panel-variables', 2/*Table*/, 'accouchement');
});

describe('Tableau Variables - Valider les liens du filtre Table', () => {
  it('Reset filters - Clear Input', () => {
    cy.get('[id*="panel-variables"] [class*="Header_clearFilterLink"]').clickAndWait();
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"] [title="accouchement"]').should('not.exist');
  });

  it('Reset filters - Results', () => {
    cy.get('[id*="panel-variables"] [class*="Header_clearFilterLink"]').clickAndWait();
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/(^11 Results$| of 11$)/).should('not.exist');
  });

  it('Clear Input - Results', () => {
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"] [class="ant-select-clear"]').clickAndWait();
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/(^11 Results$| of 11$)/).should('not.exist');
  });
});
