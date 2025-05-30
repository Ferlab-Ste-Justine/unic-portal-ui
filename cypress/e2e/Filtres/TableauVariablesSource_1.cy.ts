/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
});

describe('Tableau Variables - Vérifier la fonctionnalité du filtre Source', () => {
  it('Results', () => {
    VariablesTable.actions.selectSourceFilter(data.sourceCentro);
    VariablesTable.validations.shouldShowResultsCount(data.sourceCentro.variableCount);
  });

  it('Lien Reset filters', () => {
    VariablesTable.actions.selectSourceFilter(data.sourceCentro);
    VariablesTable.validations.shouldShowResetFilterButton();
  });

  it('Related Variable search', () => {
    VariablesTable.actions.typeVariableSearchInput(data.variableAdmittedCOVID.name);
    VariablesTable.actions.typeResourceFilter(data.sourceCentro);
    VariablesTable.validations.shouldShowObjectInDropdown(data.sourceCentro, false/*shouldExist*/);
  });

  it('Related Table filter', () => {
    VariablesTable.actions.selectTableFilter(data.tableAccouchement);
    VariablesTable.actions.typeResourceFilter(data.sourceCentro);
    VariablesTable.validations.shouldShowObjectInDropdown(data.sourceCentro, false/*shouldExist*/);
  });

  it('Related Resource filter', () => {
    VariablesTable.actions.selectResourceFilter(data.resourceBronchiolite);
    VariablesTable.actions.typeResourceFilter(data.sourceCentro);
    VariablesTable.validations.shouldShowObjectInDropdown(data.sourceCentro, false/*shouldExist*/);
  });

  it('Related Resource type filter', () => {
    VariablesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    VariablesTable.actions.typeResourceFilter(data.sourceCentro);
    VariablesTable.validations.shouldShowObjectInDropdown(data.sourceCentro, false/*shouldExist*/);
  });
});
