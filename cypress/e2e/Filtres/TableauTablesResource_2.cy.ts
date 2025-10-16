/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { TablesTable } from 'cypress/pom/pages/TablesTable';

describe('Tableau Tables - Valider les liens du filtre Resource', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog('tables');
    TablesTable.actions.selectResourceFilter(data.resourceBronchiolite);
  };

  it('Reset filters - Clear Input', () => {
    setupTest();
    TablesTable.actions.clearFilters();
    TablesTable.validations.shouldShowResourceInFilter(data.resourceBronchiolite, false/*shouldExist*/);
  });

  it('Reset filters - Results', () => {
    setupTest();
    TablesTable.actions.clearFilters();
    TablesTable.validations.shouldShowResultsCount(data.resourceBronchiolite.tables, false/*shouldExist*/);
  });

  it('Clear Input - Results', () => {
    setupTest();
    TablesTable.actions.clearInputSelect();
    TablesTable.validations.shouldShowResultsCount(data.resourceBronchiolite.tables, false/*shouldExist*/);
  });
});
