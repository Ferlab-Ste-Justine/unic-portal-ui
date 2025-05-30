/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
  VariablesTable.actions.selectResourceFilter(data.resourceBronchiolite);
});

describe('Tableau Variables - Valider les liens du filtre Resource', () => {
  it('Reset filters - Clear Input', () => {
    VariablesTable.actions.clearFilters();
    VariablesTable.validations.shouldShowObjectInFilter(data.resourceBronchiolite, false/*shouldExist*/);
  });

  it('Reset filters - Results', () => {
    VariablesTable.actions.clearFilters();
    VariablesTable.validations.shouldShowResultsCount(data.resourceBronchiolite.variables.totalCount, false/*shouldExist*/);
  });

  it('Clear Input - Results', () => {
    VariablesTable.actions.clearInputSelect();
    VariablesTable.validations.shouldShowResultsCount(data.resourceBronchiolite.variables.totalCount, false/*shouldExist*/);
  });
});
