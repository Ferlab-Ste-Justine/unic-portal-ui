/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
  VariablesTable.actions.selectSourceFilter(data.resourceCentro);
});

describe('Tableau Variables - Valider les liens du filtre Source', () => {
  it('Reset filters - Clear Input', () => {
    VariablesTable.actions.clearFilters();
    VariablesTable.validations.shouldShowObjectInFilter(data.resourceCentro, false/*shouldExist*/);
  });

  it('Reset filters - Results', () => {
    VariablesTable.actions.clearFilters();
    VariablesTable.validations.shouldShowResultsCount(data.resourceCentro.variables.totalCount, false/*shouldExist*/);
  });

  it('Clear Input - Results', () => {
    VariablesTable.actions.clearInputSelect();
    VariablesTable.validations.shouldShowResultsCount(data.resourceCentro.variables.totalCount, false/*shouldExist*/);
  });
});
