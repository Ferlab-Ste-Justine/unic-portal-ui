/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
  VariablesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
});

describe('Tableau Variables - Valider les liens du filtre Resource type', () => {
  it('Reset filters - Clear Input tag', () => {
    VariablesTable.actions.clearFilters();
    VariablesTable.validations.shouldShowResourceTypeTagInFilter(data.resourceWarehouse, false/*shouldExist*/);
  });

  it('Reset filters - Results', () => {
    VariablesTable.actions.clearFilters();
    VariablesTable.validations.shouldShowResultsCount(data.resourceWarehouse.variables.totalCount, false/*shouldExist*/);
  });

  it('Delete Tag - Results', () => {
    VariablesTable.actions.deleteResourceTypeTag(data.resourceWarehouse);
    VariablesTable.validations.shouldShowResultsCount(data.resourceWarehouse.variables.totalCount, false/*shouldExist*/);
  });

  it('Clear Input - Results', () => {
    VariablesTable.actions.clearInputSelect();
    VariablesTable.validations.shouldShowResultsCount(data.resourceWarehouse.variables.totalCount, false/*shouldExist*/);
  });
});
