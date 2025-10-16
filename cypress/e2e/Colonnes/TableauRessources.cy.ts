/// <reference types="cypress"/>
import 'cypress/support/commands';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';

describe('Tableau Ressources - Colonnes du tableau', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog();
  };

  it('Valider l\'affichage par défaut', () => {
    setupTest();
    ResourcesTable.validations.shouldMatchDefaultColumnVisibility();
  });

  it('Valider l\'ordre', () => {
    setupTest();
    ResourcesTable.validations.shouldShowAllColumns();
  });

  it('Valider la propriété de tri', () => {
    setupTest();
    ResourcesTable.validations.shouldShowSortableColumns();
  });

  it('Valider le tooltip', () => {
    setupTest();
    ResourcesTable.validations.shouldShowColumnTooltips();
  });

  it('Masquer une colonne affichée', () => {
    setupTest();
    ResourcesTable.validations.shouldDisplayColumn('name');
    ResourcesTable.actions.hideColumn('name');
    ResourcesTable.validations.shouldNotDisplayColumn('name');
  });

  it('Afficher une colonne masquée', () => {
    setupTest();
    ResourcesTable.validations.shouldNotDisplayColumn('code');
    ResourcesTable.actions.showColumn('code');
    ResourcesTable.validations.shouldDisplayColumn('code');
  });
});