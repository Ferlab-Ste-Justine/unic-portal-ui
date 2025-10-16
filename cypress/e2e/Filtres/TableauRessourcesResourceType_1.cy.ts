/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';

describe('Tableau Ressources - Vérifier la fonctionnalité du filtre Resource type', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog();
  };

  it('Dropdown tag', () => {
    setupTest();
    ResourcesTable.actions.typeResourceTypeFilter(data.resourceWarehouse);
    ResourcesTable.validations.shouldShowResourceTypeTagInDropdown(data.resourceWarehouse);
  });

  it('Results', () => {
    setupTest();
    ResourcesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    ResourcesTable.validations.shouldShowResultsCount('1');
  });

  it('Lien Reset filters', () => {
    setupTest();
    ResourcesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    ResourcesTable.validations.shouldShowResetFilterButton();
  });

  it('Input tag', () => {
    setupTest();
    ResourcesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    ResourcesTable.validations.shouldShowResourceTypeTagInDropdown(data.resourceWarehouse);
  });

  it('Related Resource search', () => {
    setupTest();
    ResourcesTable.actions.typeResourceSearchInput(data.resourceBronchiolite.code);
    ResourcesTable.actions.typeResourceTypeFilter(data.resourceWarehouse);
    ResourcesTable.validations.shouldShowResourceTypeTagInDropdown(data.resourceWarehouse, false/*shouldExist*/);
  });
});
