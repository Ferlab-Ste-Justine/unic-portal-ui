/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
});

describe('Tableau Variables - Vérifier la fonctionnalité de la recherche Variable', () => {
  it('Results by Description en', () => {
    cy.get('[id*="panel-variables"] [class*="InputSearch_filter"] input').type('Congenital Anomaly');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/^1 Result$/).should('exist');
  });

  it('Results by Description fr', () => {
    cy.get('[id*="panel-variables"] [class*="InputSearch_filter"] input').type('Antécédent d\'Anomalie');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/^1 Result$/).should('exist');
  });

  it('Results by Name', () => {
    cy.get('[id*="panel-variables"] [class*="InputSearch_filter"] input').type('familialantecedentcongenitalanomaliesrelative');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/^1 Result$/).should('exist');
  });

  it('Lien Reset filters', () => {
    cy.get('[id*="panel-variables"] [class*="InputSearch_filter"] input').type('anomaly');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains('Reset filters').should('exist');
  });

  it('Related Table filter [UNICWEB-128]', () => {
    cy.inputDropdownSelectValue('panel-variables', 0/*Table*/, 'accouchement');
    cy.get('[id*="panel-variables"] [class*="InputSearch_filter"] input').type('anomaly');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/^No Results$/).should('exist');
  });

  it('Related Resource filter [UNICWEB-128]', () => {
    cy.inputDropdownSelectValue('panel-variables', 1/*Resource*/, 'LVC-Bronchiolite-HSJ');
    cy.get('[id*="panel-variables"] [class*="InputSearch_filter"] input').type('anomaly');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/^No Results$/).should('exist');
  });

  it('Related Resource type filter [UNICWEB-128]', () => {
    cy.inputDropdownSelectValue('panel-variables', 2/*Resource type*/, 'Warehouse', true/*isMultiSelect*/);
    cy.get('[id*="panel-variables"] [class*="InputSearch_filter"] input').type('centro');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/^No Results$/).should('exist');
  });

  it('Related Source [UNICWEB-128]', () => {
    cy.inputDropdownSelectValue('panel-variables', 3/*Source*/, 'centro');
    cy.get('[id*="panel-variables"] [class*="InputSearch_filter"] input').type('anomaly');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/^No Results$/).should('exist');
  });
});
