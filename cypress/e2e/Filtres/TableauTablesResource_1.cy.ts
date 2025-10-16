/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { TablesTable } from 'cypress/pom/pages/TablesTable';

describe('Tableau Tables - Vérifier la fonctionnalité du filtre Resource', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog('tables');
  };

  it('Results', () => {
    setupTest();
    TablesTable.actions.selectResourceFilter(data.resourceBronchiolite);
    TablesTable.validations.shouldShowResultsCount(data.resourceBronchiolite.tables);
  });

  it('Lien Reset filters', () => {
    setupTest();
    TablesTable.actions.selectResourceFilter(data.resourceBronchiolite);
    TablesTable.validations.shouldShowResetFilterButton();
  });

  it('Related Table search', () => {
    setupTest();
    TablesTable.actions.typeTableSearchInput(data.tableAccouchement.name);
    TablesTable.actions.typeResourceFilter(data.resourceBronchiolite);
    TablesTable.validations.shouldShowResourceInDropdown(data.resourceBronchiolite, false/*shouldExist*/);
  });

  it('Related Resource type filter', () => {
    setupTest();
    TablesTable.actions.typeResourceTypeFilter(data.resourceWarehouse);
    TablesTable.actions.typeResourceFilter(data.resourceBronchiolite);
    TablesTable.validations.shouldShowResourceInDropdown(data.resourceBronchiolite, false/*shouldExist*/);
  });
});
