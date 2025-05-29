/// <reference types="cypress"/>
import 'cypress/support/commands';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog();
});

describe('Tableau Ressources - Colonnes du tableau', () => {
  it('Valider l\'affichage par défaut', () => {
    ResourcesTable.validations.shouldMatchDefaultColumnVisibility();
  });

  it('Valider l\'ordre', () => {
    ResourcesTable.validations.shouldShowAllColumns();
  });

  it('Valider la propriété de tri', () => {
    ResourcesTable.validations.shouldShowSortableColumns();
  });

  it('Valider le tooltip', () => {
    ResourcesTable.validations.shouldShowColumnTooltips();
  });

  it('Masquer une colonne affichée', () => {
    ResourcesTable.validations.shouldDisplayColumn('name');
    ResourcesTable.actions.hideColumn('name');
    ResourcesTable.validations.shouldNotDisplayColumn('name');
  });

  it('Afficher une colonne masquée', () => {
    ResourcesTable.validations.shouldNotDisplayColumn('code');
    ResourcesTable.actions.showColumn('code');
    ResourcesTable.validations.shouldDisplayColumn('code');
  });
});