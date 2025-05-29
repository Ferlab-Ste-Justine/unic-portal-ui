/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { TablesTable } from 'cypress/pom/pages/TablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('tables');
});

describe('Tableau Tables - Vérifier la fonctionnalité du filtre Resource type', () => {
  it('Dropdown tag', () => {
    TablesTable.actions.typeResourceTypeFilter(data.resourceWarehouse);
    TablesTable.validations.shouldShowResourceTypeTagInDropdown(data.resourceWarehouse);
  });

  it('Results', () => {
    TablesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    TablesTable.validations.shouldShowResultsCount(data.resourceWarehouse.tables);
  });

  it('Lien Reset filters', () => {
    TablesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    TablesTable.validations.shouldShowResetFilterButton();
  });

  it('Input tag', () => {
    TablesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    TablesTable.validations.shouldShowResourceTypeTagInFilter(data.resourceWarehouse);
  });

  it('Related Table search', () => {
    TablesTable.actions.typeTableSearchInput(data.tableAccouchement.name);
    TablesTable.actions.typeResourceTypeFilter(data.resourceWarehouse);
    TablesTable.validations.shouldShowResourceTypeTagInDropdown(data.resourceWarehouse, false/*shouldExist*/);
  });

  it('Related Resource filter', () => {
    TablesTable.actions.selectResourceFilter(data.resourceBronchiolite);
    TablesTable.actions.typeResourceTypeFilter(data.resourceWarehouse);
    TablesTable.validations.shouldShowResourceTypeTagInDropdown(data.resourceWarehouse, false/*shouldExist*/);
  });
});
