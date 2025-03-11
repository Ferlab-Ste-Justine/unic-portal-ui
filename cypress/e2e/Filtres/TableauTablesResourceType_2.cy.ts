/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('tables');
  cy.inputDropdownSelectValue('panel-tables', 1/*Resource type*/, 'Warehouse', true/*isMultiSelect*/);
});

describe('Tableau Tables - Valider les liens du filtre Resource type', () => {
  it('Reset filters - Clear Input tag', () => {
    cy.get('[id*="panel-tables"] [class*="Header_clearFilterLink"]').clickAndWait();
    cy.get('[id*="panel-tables"] [class*="InputSelect_filter"] [class*="ant-tag-orange"]').should('not.exist');
  });

  it('Reset filters - Results', () => {
    cy.get('[id*="panel-tables"] [class*="Header_clearFilterLink"]').clickAndWait();
    cy.get('[id*="panel-tables"] [class*="Header_ProTableHeader"]').contains(/(^15 Results$| of 15$)/).should('not.exist');
  });

  it('Delete Tag - Results', () => {
    cy.get('[id*="panel-tables"] [class*="InputSelect_filter"] [class*="ant-tag-orange"] [data-icon="close"]').clickAndWait();
    cy.get('[id*="panel-tables"] [class*="Header_ProTableHeader"]').contains(/(^15 Results$| of 15$)/).should('not.exist');
  });

  it('Clear Input - Results', () => {
    cy.get('[id*="panel-tables"] [class*="InputSelect_filter"] [class="ant-select-clear"]').clickAndWait();
    cy.get('[id*="panel-tables"] [class*="Header_ProTableHeader"]').contains(/(^15 Results$| of 15$)/).should('not.exist');
  });
});
