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
    ResourcesTable.validations.shouldSortColumn('code');
  });

  it('Valider les fonctionnalités du tableau - Tri Name', () => {
    ResourcesTable.validations.shouldSortColumn('name', false/*needIntercept*/);
  });

  it('Valider les fonctionnalités du tableau - Tri Type', () => {
    ResourcesTable.validations.shouldSortColumn('type');
  });

  it('Valider les fonctionnalités du tableau - Tri Updated On', () => {
    ResourcesTable.validations.shouldSortColumn('updatedOn');
  });

  it('Valider les fonctionnalités du tableau - Tri Created On', () => {
    ResourcesTable.validations.shouldSortColumn('createdOn');
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    ResourcesTable.actions.sortColumn('type');
    ResourcesTable.actions.sortColumn('code');
    ResourcesTable.validations.shouldHaveFirstRowValue(/^f/, 'code');
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    ResourcesTable.validations.shouldShowPaging(/\d{2}/);
  });
});
