/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
});

describe('Tableau Variables - Vérifier la fonctionnalité du filtre Table', () => {
  it('Results', () => {
    cy.inputDropdownSelectValue('panel-variables', 0/*Table*/, 'accouchement');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/(^11 Results$| of 11$)/).should('exist');
  });

  it('Lien Reset filters', () => {
    cy.inputDropdownSelectValue('panel-variables', 0/*Table*/, 'accouchement');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains('Reset filters').should('exist');
  });

  it('Related Variable search', () => {
    cy.get('[id*="panel-variables"] [class*="InputSearch_filter"] input').type('#_Admitted_COVID');
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"]').eq(0).type('accouchement');
    cy.get('[class*="ant-select-dropdown"] [title="accouchement"]').should('not.exist');
  });

  it('Related Resource filter', () => {
    cy.inputDropdownSelectValue('panel-variables', 1/*Resource*/, 'LVC-Bronchiolite-HSJ');
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"]').eq(0).type('accouchement');
    cy.get('[class*="ant-select-dropdown"] [title="accouchement"]').should('not.exist');
  });

  it('Related Resource type filter', () => {
    cy.inputDropdownSelectValue('panel-variables', 2/*Resource type*/, 'Warehouse', true/*isMultiSelect*/);
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"]').eq(0).type('accouchement');
    cy.get('[class*="ant-select-dropdown"] [title="accouchement"]').should('not.exist');
  });

  it('Related Source', () => {
    cy.inputDropdownSelectValue('panel-variables', 3/*Source*/, 'centro');
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"]').eq(0).type('accouchement');
    cy.get('[class*="ant-select-dropdown"] [title="accouchement"]').should('not.exist');
  });
});
