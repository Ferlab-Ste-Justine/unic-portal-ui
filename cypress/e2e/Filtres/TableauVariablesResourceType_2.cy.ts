/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('Variables');
  cy.inputDropdownSelectValue('VariablesTable', 2/*Resource type*/, 'Warehouse', true/*isMultiSelect*/);
});

describe('Tableau Variables - Valider les liens du filtre Resource type', () => {
  it('Reset filters - Clear Input tag', () => {
    cy.get('[id*="VariablesTable"] [class*="Header_clearFilterLink"]').clickAndWait();
    cy.get('[id*="VariablesTable"] [class*="InputSelect_filter"] [class*="ant-tag-orange"]').should('not.exist');
  });

  it('Reset filters - Results', () => {
    cy.get('[id*="VariablesTable"] [class*="Header_clearFilterLink"]').clickAndWait();
    cy.get('[id*="VariablesTable"] [class*="Header_ProTableHeader"]').contains(/(^457 Results$| of 457$)/).should('not.exist');
  });

  it('Delete Tag - Results', () => {
    cy.get('[id*="VariablesTable"] [class*="InputSelect_filter"] [class*="ant-tag-orange"] [data-icon="close"]').clickAndWait();
    cy.get('[id*="VariablesTable"] [class*="Header_ProTableHeader"]').contains(/(^457 Results$| of 457$)/).should('not.exist');
  });

  it('Clear Input - Results', () => {
    cy.get('[id*="VariablesTable"] [class*="InputSelect_filter"] [class="ant-select-clear"]').clickAndWait();
    cy.get('[id*="VariablesTable"] [class*="Header_ProTableHeader"]').contains(/(^457 Results$| of 457$)/).should('not.exist');
  });
});
