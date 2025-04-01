/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
});

describe('Tableau Variables - Vérifier la fonctionnalité du filtre Source', () => {
  it('Results', () => {
    cy.inputDropdownSelectValue('panel-variables', 3/*Source*/, 'centro');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/(^13.7K Results$| of 13.7K$)/).should('exist');
  });

  it('Lien Reset filters', () => {
    cy.inputDropdownSelectValue('panel-variables', 3/*Source*/, 'centro');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains('Reset filters').should('exist');
  });

  it('Related Variable search', () => {
    cy.get('[id*="panel-variables"] [class*="InputSearch_filter"] input').type('#_Admitted_COVID');
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"]').eq(3).type('centro');
    cy.get('[class*="ant-select-dropdown"] [title="centro"]').should('not.exist');
  });

  it('Related Table filter', () => {
    cy.inputDropdownSelectValue('panel-variables', 2/*Table*/, 'accouchement');
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"]').eq(3).type('centro');
    cy.get('[class*="ant-select-dropdown"] [title="centro"]').should('not.exist');
  });

  it('Related Resource filter', () => {
    cy.inputDropdownSelectValue('panel-variables', 1/*Resource*/, 'LVC-Bronchiolite-HSJ');
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"]').eq(3).type('centro');
    cy.get('[class*="ant-select-dropdown"] [title="centro"]').should('not.exist');
  });

  it('Related Resource type filter', () => {
    cy.inputDropdownSelectValue('panel-variables', 0/*Resource type*/, 'Warehouse', true/*isMultiSelect*/);
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"]').eq(3).type('centro');
    cy.get('[class*="ant-select-dropdown"] [title="centro"]').should('not.exist');
  });
});
