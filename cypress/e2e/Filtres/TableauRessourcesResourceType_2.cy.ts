/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';

describe('Tableau Ressources - Valider les liens du filtre Resource type', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog();
    ResourcesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
  };

  it('Reset filters - Clear Input tag', () => {
    setupTest();
    ResourcesTable.actions.clearFilters();
    ResourcesTable.validations.shouldShowResourceTypeTagInFilter(data.resourceWarehouse, false/*shouldExist*/);
  });

  it('Reset filters - Results', () => {
    setupTest();
    ResourcesTable.actions.clearFilters();
    ResourcesTable.validations.shouldShowResultsCount('1', false/*shouldExist*/);
  });

  it('Delete Tag - Results', () => {
    setupTest();
    ResourcesTable.actions.deleteResourceTypeTag(data.resourceWarehouse);
    ResourcesTable.validations.shouldShowResultsCount('1', false/*shouldExist*/);
  });

  it('Clear Input - Results', () => {
    setupTest();
    ResourcesTable.actions.clearInputSelect();
    ResourcesTable.validations.shouldShowResultsCount('1', false/*shouldExist*/);
  });
});
