/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('Tables');
});

describe('Tableau Tables - Vérifier la fonctionnalité du filtre Resource', () => {
  it('Results', () => {
    cy.inputDropdownSelectValue('TablesTable', 0/*Resource*/, 'LVC-Bronchiolite-HSJ');
    cy.get('[id*="TablesTable"] [class*="Header_ProTableHeader"]').contains(/(^13 Results$| of 13$)/).should('exist');
  });

  it('Lien Reset filters', () => {
    cy.inputDropdownSelectValue('TablesTable', 0/*Resource*/, 'LVC-Bronchiolite-HSJ');
    cy.get('[id*="TablesTable"] [class*="Header_ProTableHeader"]').contains('Reset filters').should('exist');
  });

  it('Related Table search', () => {
    cy.get('[id*="TablesTable"] [class*="InputSearch_filter"] input').type('accouchement');
    cy.get('[id*="TablesTable"] [class*="InputSelect_filter"]').eq(0).type('LVC-Bronchiolite-HSJ');
    cy.get('[class*="ant-select-dropdown"] [title="LVC-Bronchiolite-HSJ"]').should('not.exist');
  });

  it('Related Resource type filter', () => {
    cy.inputDropdownSelectValue('TablesTable', 1/*Resource type*/, 'Warehouse', true/*isMultiSelect*/);
    cy.get('[id*="TablesTable"] [class*="InputSelect_filter"]').eq(0).type('LVC-Bronchiolite-HSJ');
    cy.get('[class*="ant-select-dropdown"] [title="LVC-Bronchiolite-HSJ"]').should('not.exist');
  });
});
