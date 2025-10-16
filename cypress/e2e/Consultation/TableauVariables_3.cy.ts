/// <reference types="cypress"/>
import 'cypress/support/commands';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

describe('Tableau Variables - Valider les fonctionnalités du tableau', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog('variables');
    VariablesTable.actions.showAllColumns();
  };

  it('Valider les fonctionnalités du tableau - Tri Name', () => {
    setupTest();
    VariablesTable.validations.shouldSortColumn('name', false/*needIntercept*/);
  });

  it('Valider les fonctionnalités du tableau - Tri Resource', () => {
    setupTest();
    VariablesTable.validations.shouldSortColumn('resource');
  });

  it('Valider les fonctionnalités du tableau - Tri Table', () => {
    setupTest();
    VariablesTable.validations.shouldSortColumn('table');
  });

  it('Valider les fonctionnalités du tableau - Tri Type', () => {
    setupTest();
    VariablesTable.validations.shouldSortColumn('type');
  });

  it('Valider les fonctionnalités du tableau - Tri Created On', () => {
    setupTest();
    VariablesTable.validations.shouldSortColumn('createdOn');
  });

  it('Valider les fonctionnalités du tableau - Tri Updated On', () => {
    setupTest();
    VariablesTable.validations.shouldSortColumn('updatedOn');
  });

  it('Valider les fonctionnalités du tableau - Tri multiple [UNICWEB-212]', () => {
    setupTest();
    VariablesTable.actions.sortColumn('type');
    VariablesTable.actions.sortColumn('table');
    VariablesTable.validations.shouldHaveFirstRowValue(/^a/, 'table');
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    setupTest();
    VariablesTable.validations.shouldShowPaging('');
  });
});
