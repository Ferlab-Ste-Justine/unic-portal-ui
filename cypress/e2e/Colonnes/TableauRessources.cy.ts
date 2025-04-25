/// <reference types="cypress"/>
import 'cypress/support/commands';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog();
});

describe('Tableau Ressources - Colonnes du tableau', () => {
  it('Valider l\'affichage par défaut', () => {
    ResourcesTable.validations.columnVisibility();
  });

  it('Valider l\'ordre', () => {
    ResourcesTable.validations.columnPositions();
  });

  it('Valider la propriété de tri', () => {
    ResourcesTable.validations.columnSortable();
  });

  it('Valider le tooltip', () => {
    ResourcesTable.validations.columnTooltips();
  });

  it('Masquer une colonne affichée', () => {
    ResourcesTable.validations.displayedColumn('Name');
    cy.hideColumn('Name');
    ResourcesTable.validations.hiddenColumn('Name');
  });

  it('Afficher une colonne masquée', () => {
    ResourcesTable.validations.hiddenColumn('Code');
    cy.showColumn('Code');
    ResourcesTable.validations.displayedColumn('Code');
  });
});