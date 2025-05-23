/// <reference types="cypress"/>
import 'cypress/support/commands';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog();
  ResourcesTable.actions.showAllColumns();
});

describe('Tableau Ressources - Valider les fonctionnalités du tableau', () => {
  it('Valider les fonctionnalités du tableau - Tri Code', () => {
    ResourcesTable.validations.columnSorting('code');
  });

  it('Valider les fonctionnalités du tableau - Tri Name', () => {
    ResourcesTable.validations.columnSorting('name', false/*needIntercept*/);
  });

  it('Valider les fonctionnalités du tableau - Tri Type', () => {
    ResourcesTable.validations.columnSorting('type');
  });

  it('Valider les fonctionnalités du tableau - Tri Updated On', () => {
    ResourcesTable.validations.columnSorting('updatedOn');
  });

  it('Valider les fonctionnalités du tableau - Tri Created On', () => {
    ResourcesTable.validations.columnSorting('createdOn');
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    ResourcesTable.actions.sortColumn('type');
    ResourcesTable.actions.sortColumn('code');
    ResourcesTable.validations.firstRowValue(/^i/, 'code');
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    ResourcesTable.validations.paging(/\d{2}/);
  });
});
