/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog();
});

describe('Tableau Ressources - Vérifier la fonctionnalité de la recherche Resource', () => {
  it('Results by Code', () => {
    cy.get('[id*="panel-resources"] [class*="InputSearch_filter"] input').type('Choriobact');
    cy.get('[id*="panel-resources"] [class*="Header_ProTableHeader"]').contains(/^1 Result$/).should('exist');
  });

  it('Results by Description en', () => {
    cy.get('[id*="panel-resources"] [class*="InputSearch_filter"] input').type('warehouse tables');
    cy.get('[id*="panel-resources"] [class*="Header_ProTableHeader"]').contains(/^1 Result$/).should('exist');
  });

  it('Results by Description fr', () => {
    cy.get('[id*="panel-resources"] [class*="InputSearch_filter"] input').type('les tables d\'entrepôt');
    cy.get('[id*="panel-resources"] [class*="Header_ProTableHeader"]').contains(/^1 Result$/).should('exist');
  });

  it('Results by Name', () => {
    cy.get('[id*="panel-resources"] [class*="InputSearch_filter"] input').type('chorio-bact');
    cy.get('[id*="panel-resources"] [class*="Header_ProTableHeader"]').contains(/^1 Result$/).should('exist');
  });

  it('Results by Project PI', () => {
    cy.get('[id*="panel-resources"] [class*="InputSearch_filter"] input').type('boucoiran');
    cy.get('[id*="panel-resources"] [class*="Header_ProTableHeader"]').contains(/\d{1} Results$/).should('exist');
  });

  it('Results by Title', () => {
    cy.get('[id*="panel-resources"] [class*="InputSearch_filter"] input').type('entrepôt de données');
    cy.get('[id*="panel-resources"] [class*="Header_ProTableHeader"]').contains(/^1 Result$/).should('exist');
  });

  it('Lien Reset filters', () => {
    cy.get('[id*="panel-resources"] [class*="InputSearch_filter"] input').type('warehouse');
    cy.get('[id*="panel-resources"] [class*="Header_ProTableHeader"]').contains('Reset filters').should('exist');
  });

  it('Related Resource type filter', () => {
    cy.inputDropdownSelectValue('panel-resources', 0/*Resource type*/, 'Warehouse', true/*isMultiSelect*/);
    cy.get('[id*="panel-resources"] [class*="InputSearch_filter"] input').type('bronchiolite');
    cy.get('[id*="panel-resources"] [class*="Header_ProTableHeader"]').contains(/^No Results$/).should('exist');
  });
});
