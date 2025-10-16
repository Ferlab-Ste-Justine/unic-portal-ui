/// <reference types="cypress"/>
import 'cypress/support/commands';
import { TablesTable } from 'cypress/pom/pages/TablesTable';

describe('Tableau Tables - Valider les fonctionnalités du tableau', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog('tables');
    TablesTable.actions.showAllColumns();
  };

  it('Valider les fonctionnalités du tableau - Tri Name', () => {
    setupTest();
    TablesTable.validations.shouldSortColumn('name', false/*needIntercept*/);
  });

  it('Valider les fonctionnalités du tableau - Tri Resource', () => {
    setupTest();
    TablesTable.validations.shouldSortColumn('resource');
  });

  it('Valider les fonctionnalités du tableau - Tri Entity', () => {
    setupTest();
    TablesTable.validations.shouldSortColumn('entity');
  });

  it('Valider les fonctionnalités du tableau - Tri Domain', () => {
    setupTest();
    TablesTable.validations.shouldSortColumn('domain');
  });

  it('Valider les fonctionnalités du tableau - Tri Created On', () => {
    setupTest();
    TablesTable.validations.shouldSortColumn('createdOn');
  });

  it('Valider les fonctionnalités du tableau - Tri Updated On', () => {
    setupTest();
    TablesTable.validations.shouldSortColumn('updatedOn');
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    setupTest();
    TablesTable.actions.sortColumn('resource');
    TablesTable.actions.sortColumn('name', false/*needIntercept*/);
    TablesTable.actions.sortColumn('name', false/*needIntercept*/);
    TablesTable.validations.shouldHaveFirstRowValue(/^s/, 'name');
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    setupTest();
    TablesTable.validations.shouldShowPaging('');
  });
});
