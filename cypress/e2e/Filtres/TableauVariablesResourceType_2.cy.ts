/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

describe('Tableau Variables - Valider les liens du filtre Resource type', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog('variables');
    VariablesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
  };

  it('Reset filters - Clear Input tag', () => {
    setupTest();
    VariablesTable.actions.clearFilters();
    VariablesTable.validations.shouldShowResourceTypeTagInFilter(data.resourceWarehouse, false/*shouldExist*/);
  });

  it('Reset filters - Results', () => {
    setupTest();
    VariablesTable.actions.clearFilters();
    VariablesTable.validations.shouldShowResultsCount(data.resourceWarehouse.variables.totalCount, false/*shouldExist*/);
  });

  it('Delete Tag - Results', () => {
    setupTest();
    VariablesTable.actions.deleteResourceTypeTag(data.resourceWarehouse);
    VariablesTable.validations.shouldShowResultsCount(data.resourceWarehouse.variables.totalCount, false/*shouldExist*/);
  });

  it('Clear Input - Results', () => {
    setupTest();
    VariablesTable.actions.clearInputSelect();
    VariablesTable.validations.shouldShowResultsCount(data.resourceWarehouse.variables.totalCount, false/*shouldExist*/);
  });
});
