/// <reference types="cypress"/>
import 'cypress/support/commands';
import { TablesTable } from 'cypress/pom/pages/TablesTable';

describe('Tableau Tables - Colonnes du tableau', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog('tables');
  };

  it('Valider l\'affichage par défaut', () => {
    setupTest();
    TablesTable.validations.shouldMatchDefaultColumnVisibility();
  });

  it('Valider l\'ordre', () => {
    setupTest();
    TablesTable.validations.shouldShowAllColumns();
  });

  it('Valider la propriété de tri', () => {
    setupTest();
    TablesTable.validations.shouldShowSortableColumns();
  });

  it('Valider le tooltip', () => {
    setupTest();
    TablesTable.validations.shouldShowColumnTooltips();
  });

  it('Masquer une colonne affichée', () => {
    setupTest();
    TablesTable.validations.shouldDisplayColumn('name');
    TablesTable.actions.hideColumn('name');
    TablesTable.validations.shouldNotDisplayColumn('name');
  });

  it('Afficher une colonne masquée', () => {
    setupTest();
    TablesTable.validations.shouldNotDisplayColumn('entity');
    TablesTable.actions.showColumn('entity');
    TablesTable.validations.shouldDisplayColumn('entity');
  });
});