/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('tables');
  cy.showColumn('Entity', 1);
  cy.showColumn('Domain', 1);
  cy.showColumn('Created On', 1);
  cy.showColumn('Updated On', 1);
});

describe('Tableau Tables - Valider les fonctionnalités du tableau', () => {
  it('Valider les fonctionnalités du tableau - Tri Name', () => {
    cy.sortTableAndWait('Name', 1);
    cy.validateTableFirstRow('accouchement', 0, false, '[id*="panel-tables"]');
    cy.sortTableAndIntercept('Name', 1, 1);
    cy.validateTableFirstRow('weekly_summary', 0, false, '[id*="panel-tables"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Resource', () => {
    cy.sortTableAndIntercept('Resource', 1, 1);
    cy.validateTableFirstRow('CHORIO-BACT', 2, false, '[id*="panel-tables"]');
    cy.sortTableAndIntercept('Resource', 1, 1);
    cy.validateTableFirstRow('warehouse', 2, false, '[id*="panel-tables"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Entity', () => {
    cy.sortTableAndIntercept('Entity', 1, 1);
    cy.validateTableFirstRow('delivery', 3, false, '[id*="panel-tables"]');
    cy.sortTableAndIntercept('Entity', 1, 1);
    cy.validateTableFirstRow('procedure', 3, false, '[id*="panel-tables"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Domain', () => {
    cy.sortTableAndIntercept('Domain', 1, 1);
    cy.validateTableFirstRow('imaging', 4, false, '[id*="panel-tables"]');
    cy.sortTableAndIntercept('Domain', 1, 1);
    cy.validateTableFirstRow('transfusion', 4, false, '[id*="panel-tables"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Created On', () => {
    cy.sortTableAndIntercept('Created On', 1, 1);
    cy.validateTableFirstRow('2024-08-16', 6, false, '[id*="panel-tables"]');
    cy.sortTableAndIntercept('Created On', 1, 1);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 6, false, '[id*="panel-tables"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Updated On', () => {
    cy.sortTableAndIntercept('Updated On', 1, 1);
    cy.validateTableFirstRow('2024-08-16', 7, false, '[id*="panel-tables"]');
    cy.sortTableAndIntercept('Updated On', 1, 1);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 7, false, '[id*="panel-tables"]');
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Resource', 1, 1);
    cy.sortTableAndWait('Name', 1);
    cy.sortTableAndWait('Name', 1);
    cy.validateTableFirstRow('mother_culture_all', 0, false, '[id*="panel-tables"]');
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validatePaging('1,099', 1);
  });
});
