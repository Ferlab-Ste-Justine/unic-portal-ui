/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog();
  cy.inputDropdownSelectValue('panel-resources', 0/*Resource type*/, 'Warehouse', true/*isMultiSelect*/);
});

describe('Tableau Ressources - Valider les liens du filtre Resource type', () => {
  it('Reset filters - Clear Input tag', () => {
    cy.get('[id*="panel-resources"] [class*="Header_clearFilterLink"]').clickAndWait();
    cy.get('[id*="panel-resources"] [class*="InputSelect_filter"] [class*="ant-tag-orange"]').should('not.exist');
  });

  it('Reset filters - Results', () => {
    cy.get('[id*="panel-resources"] [class*="Header_clearFilterLink"]').clickAndWait();
    cy.get('[id*="panel-resources"] [class*="Header_ProTableHeader"]').contains(/^1 Result$/).should('not.exist');
  });

  it('Delete Tag - Results', () => {
    cy.get('[id*="panel-resources"] [class*="InputSelect_filter"] [class*="ant-tag-orange"] [data-icon="close"]').clickAndWait();
    cy.get('[id*="panel-resources"] [class*="Header_ProTableHeader"]').contains(/^1 Result$/).should('not.exist');
  });

  it('Clear Input - Results', () => {
    cy.get('[id*="panel-resources"] [class*="InputSelect_filter"] [class="ant-select-clear"]').clickAndWait();
    cy.get('[id*="panel-resources"] [class*="Header_ProTableHeader"]').contains(/^1 Result$/).should('not.exist');
  });
});
