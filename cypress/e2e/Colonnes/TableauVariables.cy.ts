/// <reference types="cypress"/>
import 'cypress/support/commands';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
});

describe('Tableau Ressources - Colonnes du tableau', () => {
  it('Valider l\'affichage par défaut', () => {
    VariablesTable.validations.shouldMatchDefaultColumnVisibility();
  });

  it('Valider l\'ordre', () => {
    VariablesTable.validations.shouldShowAllColumns();
  });

  it('Valider la propriété de tri', () => {
    VariablesTable.validations.shouldShowSortableColumns();
  });

  it('Valider le tooltip', () => {
    VariablesTable.validations.shouldShowColumnTooltips();
  });

  it('Masquer une colonne affichée', () => {
    VariablesTable.validations.shouldDisplayColumn('name');
    VariablesTable.actions.hideColumn('name');
    VariablesTable.validations.shouldNotDisplayColumn('name');
  });

  it('Afficher une colonne masquée', () => {
    VariablesTable.validations.shouldNotDisplayColumn('createdOn');
    VariablesTable.actions.showColumn('createdOn');
    VariablesTable.validations.shouldDisplayColumn('createdOn');
  });
});
