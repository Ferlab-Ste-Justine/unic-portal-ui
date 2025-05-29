/// <reference types="cypress"/>
import 'cypress/support/commands';
import { TablesTable } from 'cypress/pom/pages/TablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('tables');
});

describe('Tableau Tables - Colonnes du tableau', () => {
  it('Valider l\'affichage par défaut', () => {
    TablesTable.validations.shouldMatchDefaultColumnVisibility();
  });

  it('Valider l\'ordre', () => {
    TablesTable.validations.shouldShowAllColumns();
  });

  it('Valider la propriété de tri', () => {
    TablesTable.validations.shouldShowSortableColumns();
  });

  it('Valider le tooltip', () => {
    TablesTable.validations.shouldShowColumnTooltips();
  });

  it('Masquer une colonne affichée', () => {
    TablesTable.validations.shouldDisplayColumn('name');
    TablesTable.actions.hideColumn('name');
    TablesTable.validations.shouldNotDisplayColumn('name');
  });

  it('Afficher une colonne masquée', () => {
    TablesTable.validations.shouldNotDisplayColumn('entity');
    TablesTable.actions.showColumn('entity');
    TablesTable.validations.shouldDisplayColumn('entity');
  });
});