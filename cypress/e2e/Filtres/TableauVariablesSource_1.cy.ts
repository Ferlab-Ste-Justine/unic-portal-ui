/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('Variables');
});

describe('Tableau Variables - Vérifier la fonctionnalité du filtre Source', () => {
  it('Results', () => {
    cy.inputDropdownSelectValue('VariablesTable', 3/*Source*/, 'centro');
    cy.get('[id*="VariablesTable"] [class*="Header_ProTableHeader"]').contains(/(^13.7K Results$| of 13.7K$)/).should('exist');
  });

  it('Lien Reset filters', () => {
    cy.inputDropdownSelectValue('VariablesTable', 3/*Source*/, 'centro');
    cy.get('[id*="VariablesTable"] [class*="Header_ProTableHeader"]').contains('Reset filters').should('exist');
  });

  it('Related Variable search', () => {
    cy.get('[id*="VariablesTable"] [class*="InputSearch_filter"] input').type('#_Admitted_COVID');
    cy.get('[id*="VariablesTable"] [class*="InputSelect_filter"]').eq(3).type('centro');
    cy.get('[class*="ant-select-dropdown"] [title="centro"]').should('not.exist');
  });

  it('Related Table filter', () => {
    cy.inputDropdownSelectValue('VariablesTable', 0/*Table*/, 'accouchement');
    cy.get('[id*="VariablesTable"] [class*="InputSelect_filter"]').eq(3).type('centro');
    cy.get('[class*="ant-select-dropdown"] [title="centro"]').should('not.exist');
  });

  it('Related Resource filter', () => {
    cy.inputDropdownSelectValue('VariablesTable', 1/*Resource*/, 'LVC-Bronchiolite-HSJ');
    cy.get('[id*="VariablesTable"] [class*="InputSelect_filter"]').eq(3).type('centro');
    cy.get('[class*="ant-select-dropdown"] [title="centro"]').should('not.exist');
  });

  it('Related Resource type filter', () => {
    cy.inputDropdownSelectValue('VariablesTable', 2/*Resource type*/, 'Warehouse', true/*isMultiSelect*/);
    cy.get('[id*="VariablesTable"] [class*="InputSelect_filter"]').eq(3).type('centro');
    cy.get('[class*="ant-select-dropdown"] [title="centro"]').should('not.exist');
  });
});
