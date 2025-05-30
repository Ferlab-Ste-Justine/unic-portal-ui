/// <reference types="cypress"/>
import 'cypress/support/commands';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
  VariablesTable.actions.showAllColumns();
});

describe('Tableau Variables - Valider les fonctionnalités du tableau', () => {
  it('Valider les fonctionnalités du tableau - Tri Name', () => {
    VariablesTable.validations.shouldSortColumn('name', false/*needIntercept*/);
  });

  it('Valider les fonctionnalités du tableau - Tri Resource', () => {
    VariablesTable.validations.shouldSortColumn('resource');
  });

  it('Valider les fonctionnalités du tableau - Tri Table', () => {
    VariablesTable.validations.shouldSortColumn('table');
  });

  it('Valider les fonctionnalités du tableau - Tri Type', () => {
    VariablesTable.validations.shouldSortColumn('type');
  });

  it('Valider les fonctionnalités du tableau - Tri Created On', () => {
    VariablesTable.validations.shouldSortColumn('createdOn');
  });

  it('Valider les fonctionnalités du tableau - Tri Updated On', () => {
    VariablesTable.validations.shouldSortColumn('updatedOn');
  });

  it('Valider les fonctionnalités du tableau - Tri multiple [UNICWEB-212]', () => {
    VariablesTable.actions.sortColumn('type');
    VariablesTable.actions.sortColumn('table');
    VariablesTable.validations.shouldHaveFirstRowValue(/^a/, 'table');
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    VariablesTable.validations.shouldShowPaging('');
  });
});
