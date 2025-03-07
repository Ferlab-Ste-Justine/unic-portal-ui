/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('Variables');
  cy.inputDropdownSelectValue('VariablesTable', 0/*Table*/, 'accouchement');
});

describe('Tableau Variables - Valider les liens du filtre Table', () => {
  it('Reset filters - Clear Input', () => {
    cy.get('[id*="VariablesTable"] [class*="Header_clearFilterLink"]').clickAndWait();
    cy.get('[id*="VariablesTable"] [class*="InputSelect_filter"] [title="accouchement"]').should('not.exist');
  });

  it('Reset filters - Results', () => {
    cy.get('[id*="VariablesTable"] [class*="Header_clearFilterLink"]').clickAndWait();
    cy.get('[id*="VariablesTable"] [class*="Header_ProTableHeader"]').contains(/(^11 Results$| of 11$)/).should('not.exist');
  });

  it('Clear Input - Results', () => {
    cy.get('[id*="VariablesTable"] [class*="InputSelect_filter"] [class="ant-select-clear"]').clickAndWait();
    cy.get('[id*="VariablesTable"] [class*="Header_ProTableHeader"]').contains(/(^11 Results$| of 11$)/).should('not.exist');
  });
});
