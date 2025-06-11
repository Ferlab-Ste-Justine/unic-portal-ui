/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog();
  ResourcesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
});

describe('Tableau Ressources - Valider les liens du filtre Resource type', () => {
  it('Reset filters - Clear Input tag', () => {
    ResourcesTable.actions.clearFilters();
    ResourcesTable.validations.shouldShowResourceTypeTagInFilter(data.resourceWarehouse, false/*shouldExist*/);
  });

  it('Reset filters - Results', () => {
    ResourcesTable.actions.clearFilters();
    ResourcesTable.validations.shouldShowResultsCount('1', false/*shouldExist*/);
  });

  it('Delete Tag - Results', () => {
    ResourcesTable.actions.deleteResourceTypeTag(data.resourceWarehouse);
    ResourcesTable.validations.shouldShowResultsCount('1', false/*shouldExist*/);
  });

  it('Clear Input - Results', () => {
    ResourcesTable.actions.clearInputSelect();
    ResourcesTable.validations.shouldShowResultsCount('1', false/*shouldExist*/);
  });
});
