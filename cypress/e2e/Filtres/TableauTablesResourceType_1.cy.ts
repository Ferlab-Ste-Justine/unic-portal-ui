/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('tables');
});

describe('Tableau Tables - Vérifier la fonctionnalité du filtre Resource type', () => {
  it('Dropdown tag', () => {
    cy.get('[id*="panel-tables"] [class*="InputSelect_filter"]').eq(1).type('warehouse');
    cy.get('[class*="ant-select-dropdown"] [label="Warehouse"] [class*="ant-tag-orange"]').should('exist');
  });

  it('Results', () => {
    cy.inputDropdownSelectValue('panel-tables', 1/*Resource type*/, 'Warehouse', true/*isMultiSelect*/);
    cy.get('[id*="panel-tables"] [class*="Header_ProTableHeader"]').contains(/(^15 Results$| of 15$)/).should('exist');
  });

  it('Lien Reset filters', () => {
    cy.inputDropdownSelectValue('panel-tables', 1/*Resource type*/, 'Warehouse', true/*isMultiSelect*/);
    cy.get('[id*="panel-tables"] [class*="Header_ProTableHeader"]').contains('Reset filters').should('exist');
  });

  it('Input tag', () => {
    cy.inputDropdownSelectValue('panel-tables', 1/*Resource type*/, 'Warehouse', true/*isMultiSelect*/);
    cy.get('[id*="panel-tables"] [class*="InputSelect_filter"] [class*="ant-tag-orange"]').contains('Warehouse').should('exist');
  });

  it('Related Table search', () => {
    cy.get('[id*="panel-tables"] [class*="InputSearch_filter"] input').type('accouchement');
    cy.get('[id*="panel-tables"] [class*="InputSelect_filter"]').eq(1).type('warehouse');
    cy.get('[class*="ant-select-dropdown"] [label="Warehouse"] [class*="ant-tag-orange"]').should('not.exist');
  });

  it('Related Resource filter', () => {
    cy.inputDropdownSelectValue('panel-tables', 0/*Resource*/, 'LVC-Bronchiolite-HSJ');
    cy.get('[id*="panel-tables"] [class*="InputSelect_filter"]').eq(1).type('warehouse');
    cy.get('[class*="ant-select-dropdown"] [label="Warehouse"] [class*="ant-tag-orange"]').should('not.exist');
  });
});
