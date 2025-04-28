/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
  cy.showColumn('Created On', 1);
  cy.showColumn('Updated On', 1);
});

describe('Tableau Variables - Valider les fonctionnalités du tableau', () => {
  it('Valider les fonctionnalités du tableau - Tri Name', () => {
    cy.sortTableAndWait('Name', 1);
    cy.validateTableFirstRow(/^#/, 0, false, '[id*="panel-variables"]');
    cy.sortTableAndIntercept('Name', 1, 1);
    cy.validateTableFirstRow(/^É/, 0, false, '[id*="panel-variables"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Resource', () => {
    cy.sortTableAndIntercept('Resource', 1, 1);
    cy.validateTableFirstRow(/^A/, 2, false, '[id*="panel-variables"]');
    cy.sortTableAndIntercept('Resource', 1, 1);
    cy.validateTableFirstRow(/^w/, 2, false, '[id*="panel-variables"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Table [UNICWEB-188]', () => {
    cy.sortTableAndIntercept('Table', 1, 1);
    cy.validateTableFirstRow(/^a/, 3, false, '[id*="panel-variables"]');
    cy.sortTableAndIntercept('Table', 1, 1);
    cy.validateTableFirstRow(/^w/, 3, false, '[id*="panel-variables"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Type', () => {
    cy.sortTableAndIntercept('Type', 1, 1);
    cy.validateTableFirstRow('-', 4, false, '[id*="panel-variables"]');
    cy.sortTableAndIntercept('Type', 1, 1);
    cy.validateTableFirstRow('string', 4, false, '[id*="panel-variables"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Created On', () => {
    cy.sortTableAndIntercept('Created On', 1, 1);
    cy.validateTableFirstRow('2024', 6, false, '[id*="panel-variables"]');
    cy.sortTableAndIntercept('Created On', 1, 1);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 6, false, '[id*="panel-variables"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Updated On', () => {
    cy.sortTableAndIntercept('Updated On', 1, 1);
    cy.validateTableFirstRow('2024', 7, false, '[id*="panel-variables"]');
    cy.sortTableAndIntercept('Updated On', 1, 1);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 7, false, '[id*="panel-variables"]');
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Type', 1, 1);
    cy.sortTableAndIntercept('Table', 1, 1);
    cy.validateTableFirstRow(/^a/, 3, false, '[id*="panel-variables"]');
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validatePaging('', 1);
  });
});
