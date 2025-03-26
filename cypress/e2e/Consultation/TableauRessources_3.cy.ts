/// <reference types="cypress"/>
import { oneMinute } from 'cypress/support/utils';
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog();
  cy.showColumn('Code');
  cy.showColumn('Created On');
  cy.showColumn('Approved On');
  cy.showColumn('Collection Starting Year');
  cy.showColumn('Version');
  cy.showColumn('Nagano ID');
  cy.showColumn('Principal Investigator');
  cy.waitWhileSpin(oneMinute);
});

describe('Tableau Ressources - Valider les fonctionnalités du tableau', () => {
  it('Valider les fonctionnalités du tableau - Tri Code', () => {
    cy.sortTableAndIntercept('Code', 1);
    cy.validateTableFirstRow('bronchiolite', 0);
    cy.sortTableAndIntercept('Code', 1);
    cy.validateTableFirstRow('warehouse', 0);
  });

  it('Valider les fonctionnalités du tableau - Tri Name', () => {
    cy.sortTableAndWait('Name');
    cy.validateTableFirstRow('Biobank Respiratoire', 1);
    cy.sortTableAndIntercept('Name', 1);
    cy.validateTableFirstRow('warehouse', 1);
  });

  it('Valider les fonctionnalités du tableau - Tri Type', () => {
    cy.sortTableAndIntercept('Type', 1);
    cy.validateTableFirstRow('EQP', 2);
    cy.sortTableAndIntercept('Type', 1);
    cy.validateTableFirstRow('Warehouse', 2);
  });

  it('Valider les fonctionnalités du tableau - Tri Updated On', () => {
    cy.sortTableAndIntercept('Updated On', 1);
    cy.validateTableFirstRow('2024-08-16', 3);
    cy.sortTableAndIntercept('Updated On', 1);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 3);
  });

  it('Valider les fonctionnalités du tableau - Tri Created On', () => {
    cy.sortTableAndIntercept('Created On', 1);
    cy.validateTableFirstRow('-', 4);
    cy.sortTableAndIntercept('Created On', 1);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 4);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndWait('Code');
    cy.sortTableAndWait('Name');
    cy.sortTableAndIntercept('Name', 1);
    cy.validateTableFirstRow('bronchiolite', 0);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validatePaging(/\d{2}/, 0);
  });
});
