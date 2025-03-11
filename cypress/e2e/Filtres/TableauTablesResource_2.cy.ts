/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('tables');
  cy.inputDropdownSelectValue('panel-tables', 0/*Resource*/, 'LVC-Bronchiolite-HSJ');
});

describe('Tableau Tables - Valider les liens du filtre Resource', () => {
  it('Reset filters - Clear Input', () => {
    cy.get('[id*="panel-tables"] [class*="Header_clearFilterLink"]').clickAndWait();
    cy.get('[id*="panel-tables"] [class*="InputSelect_filter"] [title="LVC-Bronchiolite-HSJ"]').should('not.exist');
  });

  it('Reset filters - Results', () => {
    cy.get('[id*="panel-tables"] [class*="Header_clearFilterLink"]').clickAndWait();
    cy.get('[id*="panel-tables"] [class*="Header_ProTableHeader"]').contains(/(^13 Results$| of 13$)/).should('not.exist');
  });

  it('Clear Input - Results', () => {
    cy.get('[id*="panel-tables"] [class*="InputSelect_filter"] [class="ant-select-clear"]').clickAndWait();
    cy.get('[id*="panel-tables"] [class*="Header_ProTableHeader"]').contains(/(^13 Results$| of 13$)/).should('not.exist');
  });
});
