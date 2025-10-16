/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { TablesTable } from 'cypress/pom/pages/TablesTable';

describe('Tableau Tables - Valider les liens du filtre Resource type', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog('tables');
    TablesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
  };

  it('Reset filters - Clear Input tag', () => {
    setupTest();
    TablesTable.actions.clearFilters();
    TablesTable.validations.shouldShowResourceTypeTagInFilter(data.resourceWarehouse, false/*shouldExist*/);
  });

  it('Reset filters - Results', () => {
    setupTest();
    TablesTable.actions.clearFilters();
    TablesTable.validations.shouldShowResultsCount(data.resourceWarehouse.tables, false/*shouldExist*/);
  });

  it('Delete Tag - Results', () => {
    setupTest();
    TablesTable.actions.deleteResourceTypeTag(data.resourceWarehouse);
    TablesTable.validations.shouldShowResultsCount(data.resourceWarehouse.tables, false/*shouldExist*/);
  });

  it('Clear Input - Results', () => {
    setupTest();
    TablesTable.actions.clearInputSelect();
    TablesTable.validations.shouldShowResultsCount(data.resourceWarehouse.tables, false/*shouldExist*/);
  });
});
