/// <reference types="cypress"/>
import 'cypress/support/commands';
import { CommonSelectors } from 'cypress/pom/shared/Selectors';
import { data } from 'cypress/pom/shared/Data';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
});

describe('Tableau Variables - Vérifier la fonctionnalité du filtre Table', () => {
  it('Results', () => {
    cy.inputDropdownSelectValue('[id*="panel-variables"]', 2/*Table*/, 'accouchement');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/(^11 Results$| of 11$)/).should('exist');
  });

  it('Lien Reset filters', () => {
    cy.inputDropdownSelectValue('[id*="panel-variables"]', 2/*Table*/, 'accouchement');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains('Reset filters').should('exist');
  });

  it('Related Variable search', () => {
    cy.get('[id*="panel-variables"] [class*="InputSearch_filter"] input').type('#_Admitted_COVID');
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"]').eq(2).type('accouchement');
    cy.get(`${CommonSelectors.dropdown} [title="accouchement"]`).should('not.exist');
  });

  it('Related Resource filter', () => {
    cy.inputDropdownSelectValue('[id*="panel-variables"]', 1/*Resource*/, data.resourceBronchiolite.name);
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"]').eq(2).type('accouchement');
    cy.get(`${CommonSelectors.dropdown} [title="accouchement"]`).should('not.exist');
  });

  it('Related Resource type filter', () => {
    cy.inputDropdownSelectValue('[id*="panel-variables"]', 0/*Resource type*/, 'Warehouse', true/*isMultiSelect*/);
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"]').eq(2).type('accouchement');
    cy.get(`${CommonSelectors.dropdown} [title="accouchement"]`).should('not.exist');
  });

  it('Related Source', () => {
    cy.inputDropdownSelectValue('[id*="panel-variables"]', 3/*Source*/, 'centro');
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"]').eq(2).type('accouchement');
    cy.get(`${CommonSelectors.dropdown} [title="accouchement"]`).should('not.exist');
  });
});
