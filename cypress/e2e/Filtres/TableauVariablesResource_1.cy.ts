/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('Variables');
});

describe('Tableau Variables - Vérifier la fonctionnalité du filtre Resource', () => {
  it('Results', () => {
    cy.inputDropdownSelectValue('VariablesTable', 1/*Resource*/, 'LVC-Bronchiolite-HSJ');
    cy.get('[id*="VariablesTable"] [class*="Header_ProTableHeader"]').contains(/(^106 Results$| of 106$)/).should('exist');
  });

  it('Lien Reset filters', () => {
    cy.inputDropdownSelectValue('VariablesTable', 1/*Resource*/, 'LVC-Bronchiolite-HSJ');
    cy.get('[id*="VariablesTable"] [class*="Header_ProTableHeader"]').contains('Reset filters').should('exist');
  });

  it('Related Variable search', () => {
    cy.get('[id*="VariablesTable"] [class*="InputSearch_filter"] input').type('#_Admitted_COVID');
    cy.get('[id*="VariablesTable"] [class*="InputSelect_filter"]').eq(1).type('LVC-Bronchiolite-HSJ');
    cy.get('[class*="ant-select-dropdown"] [title="LVC-Bronchiolite-HSJ"]').should('not.exist');
  });

  it('Related Table filter', () => {
    cy.inputDropdownSelectValue('VariablesTable', 0/*Table*/, 'accouchement');
    cy.get('[id*="VariablesTable"] [class*="InputSelect_filter"]').eq(1).type('LVC-Bronchiolite-HSJ');
    cy.get('[class*="ant-select-dropdown"] [title="LVC-Bronchiolite-HSJ"]').should('not.exist');
  });

  it('Related Resource type filter', () => {
    cy.inputDropdownSelectValue('VariablesTable', 2/*Resource type*/, 'Warehouse', true/*isMultiSelect*/);
    cy.get('[id*="VariablesTable"] [class*="InputSelect_filter"]').eq(1).type('LVC-Bronchiolite-HSJ');
    cy.get('[class*="ant-select-dropdown"] [title="LVC-Bronchiolite-HSJ"]').should('not.exist');
  });

  it('Related Source', () => {
    cy.inputDropdownSelectValue('VariablesTable', 3/*Source*/, 'centro');
    cy.get('[id*="VariablesTable"] [class*="InputSelect_filter"]').eq(1).type('LVC-Bronchiolite-HSJ');
    cy.get('[class*="ant-select-dropdown"] [title="LVC-Bronchiolite-HSJ"]').should('not.exist');
  });
});
