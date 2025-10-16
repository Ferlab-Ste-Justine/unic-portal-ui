/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { TablesTable } from 'cypress/pom/pages/TablesTable';

describe('Tableau Tables - Vérifier la fonctionnalité du filtre Resource type', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog('tables');
  };

  it('Dropdown tag', () => {
    setupTest();
    TablesTable.actions.typeResourceTypeFilter(data.resourceWarehouse);
    TablesTable.validations.shouldShowResourceTypeTagInDropdown(data.resourceWarehouse);
  });

  it('Results', () => {
    setupTest();
    TablesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    TablesTable.validations.shouldShowResultsCount(data.resourceWarehouse.tables);
  });

  it('Lien Reset filters', () => {
    setupTest();
    TablesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    TablesTable.validations.shouldShowResetFilterButton();
  });

  it('Input tag', () => {
    setupTest();
    TablesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    TablesTable.validations.shouldShowResourceTypeTagInFilter(data.resourceWarehouse);
  });

  it('Related Table search', () => {
    setupTest();
    TablesTable.actions.typeTableSearchInput(data.tableAccouchement.name);
    TablesTable.actions.typeResourceTypeFilter(data.resourceWarehouse);
    TablesTable.validations.shouldShowResourceTypeTagInDropdown(data.resourceWarehouse, false/*shouldExist*/);
  });

  it('Related Resource filter', () => {
    setupTest();
    TablesTable.actions.selectResourceFilter(data.resourceBronchiolite);
    TablesTable.actions.typeResourceTypeFilter(data.resourceWarehouse);
    TablesTable.validations.shouldShowResourceTypeTagInDropdown(data.resourceWarehouse, false/*shouldExist*/);
  });
});
