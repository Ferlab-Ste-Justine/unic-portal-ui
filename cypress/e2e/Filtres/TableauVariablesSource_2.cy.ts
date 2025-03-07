/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('Variables');
  cy.inputDropdownSelectValue('VariablesTable', 3/*Source*/, 'centro');
});

describe('Tableau Variables - Valider les liens du filtre Source', () => {
  it('Reset filters - Clear Input', () => {
    cy.get('[id*="VariablesTable"] [class*="Header_clearFilterLink"]').clickAndWait();
    cy.get('[id*="VariablesTable"] [class*="InputSelect_filter"] [title="centro"]').should('not.exist');
  });

  it('Reset filters - Results', () => {
    cy.get('[id*="VariablesTable"] [class*="Header_clearFilterLink"]').clickAndWait();
    cy.get('[id*="VariablesTable"] [class*="Header_ProTableHeader"]').contains(/(^13.7K Results$| of 13.7K$)/).should('not.exist');
  });

  it('Clear Input - Results', () => {
    cy.get('[id*="VariablesTable"] [class*="InputSelect_filter"] [class="ant-select-clear"]').clickAndWait();
    cy.get('[id*="VariablesTable"] [class*="Header_ProTableHeader"]').contains(/(^13.7K Results$| of 13.7K$)/).should('not.exist');
  });
});
