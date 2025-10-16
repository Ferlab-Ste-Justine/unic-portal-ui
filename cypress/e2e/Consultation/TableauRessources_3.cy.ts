/// <reference types="cypress"/>
import 'cypress/support/commands';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';

describe('Tableau Ressources - Valider les fonctionnalités du tableau', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog();
    ResourcesTable.actions.showAllColumns();
  };

  it('Valider les fonctionnalités du tableau - Tri Code', () => {
    setupTest();
    ResourcesTable.validations.shouldSortColumn('code');
  });

  it('Valider les fonctionnalités du tableau - Tri Name', () => {
    setupTest();
    ResourcesTable.validations.shouldSortColumn('name', false/*needIntercept*/);
  });

  it('Valider les fonctionnalités du tableau - Tri Type', () => {
    setupTest();
    ResourcesTable.validations.shouldSortColumn('type');
  });

  it('Valider les fonctionnalités du tableau - Tri Updated On', () => {
    setupTest();
    ResourcesTable.validations.shouldSortColumn('updatedOn');
  });

  it('Valider les fonctionnalités du tableau - Tri Created On', () => {
    setupTest();
    ResourcesTable.validations.shouldSortColumn('createdOn');
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    setupTest();
    ResourcesTable.actions.sortColumn('type');
    ResourcesTable.actions.sortColumn('code');
    ResourcesTable.validations.shouldHaveFirstRowValue(/^f/, 'code');
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    setupTest();
    ResourcesTable.validations.shouldShowPaging(/\d{2}/);
  });
});
