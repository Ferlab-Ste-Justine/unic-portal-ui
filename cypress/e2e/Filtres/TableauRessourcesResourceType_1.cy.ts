/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog();
});

describe('Tableau Ressources - Vérifier la fonctionnalité du filtre Resource type', () => {
  it('Dropdown tag', () => {
    cy.get('[id*="panel-resources"] [class*="InputSelect_filter"]').eq(0).type('warehouse');
    cy.get('[class*="ant-select-dropdown"] [label="Warehouse"] [class*="ant-tag-orange"]').should('exist');
  });

  it('Results', () => {
    cy.inputDropdownSelectValue('panel-resources', 0/*Resource type*/, 'Warehouse', true/*isMultiSelect*/);
    cy.get('[id*="panel-resources"] [class*="Header_ProTableHeader"]').contains(/^1 Result$/).should('exist');
  });

  it('Lien Reset filters', () => {
    cy.inputDropdownSelectValue('panel-resources', 0/*Resource type*/, 'Warehouse', true/*isMultiSelect*/);
    cy.get('[id*="panel-resources"] [class*="Header_ProTableHeader"]').contains('Reset filters').should('exist');
  });

  it('Input tag', () => {
    cy.inputDropdownSelectValue('panel-resources', 0/*Resource type*/, 'Warehouse', true/*isMultiSelect*/);
    cy.get('[id*="panel-resources"] [class*="InputSelect_filter"] [class*="ant-tag-orange"]').contains('Warehouse').should('exist');
  });

  it('Related Resource search', () => {
    cy.get('[id*="panel-resources"] [class*="InputSearch_filter"] input').type('bronchiolite');
    cy.get('[id*="panel-resources"] [class*="InputSelect_filter"]').eq(0).type('warehouse');
    cy.get('[class*="ant-select-dropdown"] [label="Warehouse"] [class*="ant-tag-orange"]').should('not.exist');
  });
});
