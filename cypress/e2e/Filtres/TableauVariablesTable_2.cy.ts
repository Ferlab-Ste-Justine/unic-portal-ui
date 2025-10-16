/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

describe('Tableau Variables - Valider les liens du filtre Table', () => {
  const setupTest = () => {
  cy.login();
  cy.visitCatalog('variables');
  VariablesTable.actions.selectTableFilter(data.tableAccouchement);
  };

  it('Reset filters - Clear Input', () => {
    setupTest();
    VariablesTable.actions.clearFilters();
    VariablesTable.validations.shouldShowObjectInFilter(data.tableAccouchement, false/*shouldExist*/);
  });

  it('Reset filters - Results', () => {
    setupTest();
    VariablesTable.actions.clearFilters();
    VariablesTable.validations.shouldShowResultsCount(data.tableAccouchement.variableCount, false/*shouldExist*/);
  });

  it('Clear Input - Results', () => {
    setupTest();
    VariablesTable.actions.clearInputSelect();
    VariablesTable.validations.shouldShowResultsCount(data.tableAccouchement.variableCount, false/*shouldExist*/);
  });
});
