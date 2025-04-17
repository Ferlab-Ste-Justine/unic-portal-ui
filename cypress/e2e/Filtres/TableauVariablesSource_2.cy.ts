/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
  cy.inputDropdownSelectValue('panel-variables', 3/*Source*/, 'centro');
});

describe('Tableau Variables - Valider les liens du filtre Source', () => {
  it('Reset filters - Clear Input', () => {
    cy.get('[id*="panel-variables"] [class*="Header_clearFilterLink"]').clickAndWait();
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"] [title="centro"]').should('not.exist');
  });

  it('Reset filters - Results', () => {
    cy.get('[id*="panel-variables"] [class*="Header_clearFilterLink"]').clickAndWait();
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/(^13.8K Results$| of 13.8K$)/).should('not.exist');
  });

  it('Clear Input - Results', () => {
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"] [class="ant-select-clear"]').clickAndWait();
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/(^13.8K Results$| of 13.8K$)/).should('not.exist');
  });
});
