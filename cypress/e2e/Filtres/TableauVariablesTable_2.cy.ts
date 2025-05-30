/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
  VariablesTable.actions.selectTableFilter(data.tableAccouchement);
});

describe('Tableau Variables - Valider les liens du filtre Table', () => {
  it('Reset filters - Clear Input', () => {
    VariablesTable.actions.clearFilters();
    VariablesTable.validations.shouldShowObjectInFilter(data.tableAccouchement, false/*shouldExist*/);
  });

  it('Reset filters - Results', () => {
    VariablesTable.actions.clearFilters();
    VariablesTable.validations.shouldShowResultsCount(data.tableAccouchement.variableCount, false/*shouldExist*/);
  });

  it('Clear Input - Results', () => {
    VariablesTable.actions.clearInputSelect();
    VariablesTable.validations.shouldShowResultsCount(data.tableAccouchement.variableCount, false/*shouldExist*/);
  });
});
