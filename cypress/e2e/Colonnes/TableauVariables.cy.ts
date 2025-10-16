/// <reference types="cypress"/>
import 'cypress/support/commands';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

describe('Tableau Variables - Colonnes du tableau', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog('variables');
  };

  it('Valider l\'affichage par défaut', () => {
    setupTest();
    VariablesTable.validations.shouldMatchDefaultColumnVisibility();
  });

  it('Valider l\'ordre', () => {
    setupTest();
    VariablesTable.validations.shouldShowAllColumns();
  });

  it('Valider la propriété de tri', () => {
    setupTest();
    VariablesTable.validations.shouldShowSortableColumns();
  });

  it('Valider le tooltip', () => {
    setupTest();
    VariablesTable.validations.shouldShowColumnTooltips();
  });

  it('Masquer une colonne affichée', () => {
    setupTest();
    VariablesTable.validations.shouldDisplayColumn('name');
    VariablesTable.actions.hideColumn('name');
    VariablesTable.validations.shouldNotDisplayColumn('name');
  });

  it('Afficher une colonne masquée', () => {
    setupTest();
    VariablesTable.validations.shouldNotDisplayColumn('createdOn');
    VariablesTable.actions.showColumn('createdOn');
    VariablesTable.validations.shouldDisplayColumn('createdOn');
  });
});
