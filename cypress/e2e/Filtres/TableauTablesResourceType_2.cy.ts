/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { TablesTable } from 'cypress/pom/pages/TablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('tables');
  TablesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
});

describe('Tableau Tables - Valider les liens du filtre Resource type', () => {
  it('Reset filters - Clear Input tag', () => {
    TablesTable.actions.clearFilters();
    TablesTable.validations.shouldShowResourceTypeTagInFilter(data.resourceWarehouse, false/*shouldExist*/)
  });

  it('Reset filters - Results', () => {
    TablesTable.actions.clearFilters();
    TablesTable.validations.shouldShowResultsCount(data.resourceWarehouse.tables, false/*shouldExist*/);
  });

  it('Delete Tag - Results', () => {
    TablesTable.actions.deleteResourceTypeTag(data.resourceWarehouse);
    TablesTable.validations.shouldShowResultsCount(data.resourceWarehouse.tables, false/*shouldExist*/);
  });

  it('Clear Input - Results', () => {
    TablesTable.actions.clearInputSelect();
    TablesTable.validations.shouldShowResultsCount(data.resourceWarehouse.tables, false/*shouldExist*/);
  });
});
