/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('tables');
});

describe('Tableau Tables - Vérifier la fonctionnalité du filtre Resource', () => {
  it('Results', () => {
    cy.inputDropdownSelectValue('panel-tables', 1/*Resource*/, 'LVC-Bronchiolite-HSJ');
    cy.get('[id*="panel-tables"] [class*="Header_ProTableHeader"]').contains(/(^17 Results$| of 17$)/).should('exist');
  });

  it('Lien Reset filters', () => {
    cy.inputDropdownSelectValue('panel-tables', 1/*Resource*/, 'LVC-Bronchiolite-HSJ');
    cy.get('[id*="panel-tables"] [class*="Header_ProTableHeader"]').contains('Reset filters').should('exist');
  });

  it('Related Table search', () => {
    cy.get('[id*="panel-tables"] [class*="InputSearch_filter"] input').type('accouchement');
    cy.get('[id*="panel-tables"] [class*="InputSelect_filter"]').eq(1).type('LVC-Bronchiolite-HSJ');
    cy.get('[class*="ant-select-dropdown"] [title="LVC-Bronchiolite-HSJ"]').should('not.exist');
  });

  it('Related Resource type filter', () => {
    cy.inputDropdownSelectValue('panel-tables', 0/*Resource type*/, 'Warehouse', true/*isMultiSelect*/);
    cy.get('[id*="panel-tables"] [class*="InputSelect_filter"]').eq(1).type('LVC-Bronchiolite-HSJ');
    cy.get('[class*="ant-select-dropdown"] [title="LVC-Bronchiolite-HSJ"]').should('not.exist');
  });
});
