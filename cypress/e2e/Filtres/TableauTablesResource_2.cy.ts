/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { TablesTable } from 'cypress/pom/pages/TablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('tables');
  TablesTable.actions.selectResourceFilter(data.resourceBronchiolite);
});

describe('Tableau Tables - Valider les liens du filtre Resource', () => {
  it('Reset filters - Clear Input', () => {
    TablesTable.actions.clearFilters();
    TablesTable.validations.shouldShowResourceInFilter(data.resourceBronchiolite.name, false/*shouldExist*/);
  });

  it('Reset filters - Results', () => {
    TablesTable.actions.clearFilters();
    TablesTable.validations.shouldShowResultsCount(data.resourceBronchiolite.tables, false/*shouldExist*/);
  });

  it('Clear Input - Results', () => {
    TablesTable.actions.clearInputSelect();
    TablesTable.validations.shouldShowResultsCount(data.resourceBronchiolite.tables, false/*shouldExist*/);
  });
});
