/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog();
});

describe('Tableau Ressources - Vérifier la fonctionnalité du filtre Resource type', () => {
  it('Dropdown tag', () => {
    ResourcesTable.actions.typeResourceTypeFilter(data.resourceWarehouse);
    ResourcesTable.validations.shouldShowResourceTypeTagInDropdown(data.resourceWarehouse);
  });

  it('Results', () => {
    ResourcesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    ResourcesTable.validations.shouldShowResultsCount('1');
  });

  it('Lien Reset filters', () => {
    ResourcesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    ResourcesTable.validations.shouldShowResetFilterButton();
  });

  it('Input tag', () => {
    ResourcesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    ResourcesTable.validations.shouldShowResourceTypeTagInDropdown(data.resourceWarehouse);
  });

  it('Related Resource search', () => {
    ResourcesTable.actions.typeResourceSearchInput(data.resourceBronchiolite.code);
    ResourcesTable.actions.typeResourceTypeFilter(data.resourceWarehouse);
    ResourcesTable.validations.shouldShowResourceTypeTagInDropdown(data.resourceWarehouse, false/*shouldExist*/);
  });
});
