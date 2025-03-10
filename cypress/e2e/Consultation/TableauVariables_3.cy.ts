/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('Variables');
  cy.showColumn('Source Name', 1);
  cy.showColumn('Created On', 1);
  cy.showColumn('Updated On', 1);
});

describe('Tableau Variables - Valider les fonctionnalités du tableau', () => {
  it('Valider les fonctionnalités du tableau - Tri Name', () => {
    cy.sortTableAndWait('Name', 1);
    cy.validateTableFirstRow('#_Admitted_COVID', 0, false, '[id="rc-tabs-0-panel-VariablesTable"]');
    cy.sortTableAndIntercept('Name', 1, 1);
    cy.validateTableFirstRow('ÉLÉMENT', 0, false, '[id="rc-tabs-0-panel-VariablesTable"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Type', () => {
    cy.sortTableAndIntercept('Type', 1, 1);
    cy.validateTableFirstRow('array', 2, false, '[id="rc-tabs-0-panel-VariablesTable"]');
    cy.sortTableAndIntercept('Type', 1, 1);
    cy.validateTableFirstRow('string', 2, false, '[id="rc-tabs-0-panel-VariablesTable"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Table', () => {
    cy.sortTableAndIntercept('Table', 1, 1);
    cy.validateTableFirstRow('accouchement', 5, false, '[id="rc-tabs-0-panel-VariablesTable"]');
    cy.sortTableAndIntercept('Table', 1, 1);
    cy.validateTableFirstRow('weekly_summary', 5, false, '[id="rc-tabs-0-panel-VariablesTable"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Resource', () => {
    cy.sortTableAndIntercept('Resource', 1, 1);
    cy.validateTableFirstRow('bronchiolite', 6, false, '[id="rc-tabs-0-panel-VariablesTable"]');
    cy.sortTableAndIntercept('Resource', 1, 1);
    cy.validateTableFirstRow('warehouse', 6, false, '[id="rc-tabs-0-panel-VariablesTable"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Created On', () => {
    cy.sortTableAndIntercept('Created On', 1, 1);
    cy.validateTableFirstRow('2024-08-16', 7, false, '[id="rc-tabs-0-panel-VariablesTable"]');
    cy.sortTableAndIntercept('Created On', 1, 1);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 7, false, '[id="rc-tabs-0-panel-VariablesTable"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Updated On', () => {
    cy.sortTableAndIntercept('Updated On', 1, 1);
    cy.validateTableFirstRow('2024-08-16', 8, false, '[id="rc-tabs-0-panel-VariablesTable"]');
    cy.sortTableAndIntercept('Updated On', 1, 1);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 8, false, '[id="rc-tabs-0-panel-VariablesTable"]');
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Type', 1, 1);
    cy.sortTableAndIntercept('Table', 1, 1);
    cy.validateTableFirstRow('newborn', 5, false, '[id="rc-tabs-0-panel-VariablesTable"]');
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validatePaging('39.1K', 1);
  });
});
