/// <reference types="cypress"/>
import 'cypress/support/commands';
import { TablesTable } from 'cypress/pom/pages/TablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('tables');
  TablesTable.actions.showAllColumns();
});

describe('Tableau Tables - Valider les fonctionnalités du tableau', () => {
  it('Valider les fonctionnalités du tableau - Tri Name', () => {
    TablesTable.validations.shouldSortColumn('name', false/*needIntercept*/);
  });

  it('Valider les fonctionnalités du tableau - Tri Resource', () => {
    TablesTable.validations.shouldSortColumn('resource');
  });

  it('Valider les fonctionnalités du tableau - Tri Entity', () => {
    TablesTable.validations.shouldSortColumn('entity');
  });

  it('Valider les fonctionnalités du tableau - Tri Domain', () => {
    TablesTable.validations.shouldSortColumn('domain');
  });

  it('Valider les fonctionnalités du tableau - Tri Created On', () => {
    TablesTable.validations.shouldSortColumn('createdOn');
  });

  it('Valider les fonctionnalités du tableau - Tri Updated On', () => {
    TablesTable.validations.shouldSortColumn('updatedOn');
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    TablesTable.actions.sortColumn('resource');
    TablesTable.actions.sortColumn('name', false/*needIntercept*/);
    TablesTable.actions.sortColumn('name', false/*needIntercept*/);
    TablesTable.validations.shouldHaveFirstRowValue(/^s/, 'name');
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    TablesTable.validations.shouldShowPaging('');
  });
});
