/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
});

describe('Tableau Variables - Vérifier la fonctionnalité du filtre Table', () => {
  it('Results', () => {
    VariablesTable.actions.selectTableFilter(data.tableAccouchement);
    VariablesTable.validations.shouldShowResultsCount(data.tableAccouchement.variableCount);
  });

  it('Lien Reset filters', () => {
    VariablesTable.actions.selectTableFilter(data.tableAccouchement);
    VariablesTable.validations.shouldShowResetFilterButton();
  });

  it('Related Variable search', () => {
    VariablesTable.actions.typeVariableSearchInput(data.variableAdmittedCOVID.name);
    VariablesTable.actions.typeTableFilter(data.tableAccouchement);
    VariablesTable.validations.shouldShowObjectInDropdown(data.tableAccouchement, false/*shouldExist*/);
  });

  it('Related Resource filter', () => {
    VariablesTable.actions.selectResourceFilter(data.resourceBronchiolite);
    VariablesTable.actions.typeTableFilter(data.tableAccouchement);
    VariablesTable.validations.shouldShowObjectInDropdown(data.tableAccouchement, false/*shouldExist*/);
  });

  it('Related Resource type filter', () => {
    VariablesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    VariablesTable.actions.typeTableFilter(data.tableAccouchement);
    VariablesTable.validations.shouldShowObjectInDropdown(data.tableAccouchement, false/*shouldExist*/);
  });

  it('Related Source', () => {
    VariablesTable.actions.selectSourceFilter(data.sourceCentro);
    VariablesTable.actions.typeTableFilter(data.tableAccouchement);
    VariablesTable.validations.shouldShowObjectInDropdown(data.tableAccouchement, false/*shouldExist*/);
  });
});
