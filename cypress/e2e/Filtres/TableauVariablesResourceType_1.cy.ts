/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
});

describe('Tableau Variables - Vérifier la fonctionnalité du filtre Resource type', () => {
  it('Dropdown tag', () => {
    VariablesTable.actions.typeResourceTypeFilter(data.resourceWarehouse);
    VariablesTable.validations.shouldShowResourceTypeTagInDropdown(data.resourceWarehouse);
  });

  it('Results', () => {
    VariablesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    VariablesTable.validations.shouldShowResultsCount(data.resourceWarehouse.variables.totalCount);
  });

  it('Lien Reset filters', () => {
    VariablesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    VariablesTable.validations.shouldShowResetFilterButton();
  });

  it('Input tag', () => {
    VariablesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    VariablesTable.validations.shouldShowResourceTypeTagInFilter(data.resourceWarehouse);
  });

  it('Related Variable search', () => {
    VariablesTable.actions.typeVariableSearchInput(data.variableAdmittedCOVID.name);
    VariablesTable.actions.typeResourceTypeFilter(data.resourceWarehouse);
    VariablesTable.validations.shouldShowResourceTypeTagInDropdown(data.resourceWarehouse, false/*shouldExist*/);
  });

  it('Related Table filter', () => {
    VariablesTable.actions.selectTableFilter(data.tableAccouchement);
    VariablesTable.actions.typeResourceTypeFilter(data.resourceWarehouse);
    VariablesTable.validations.shouldShowResourceTypeTagInDropdown(data.resourceWarehouse, false/*shouldExist*/);
  });

  it('Related Resource filter', () => {
    VariablesTable.actions.selectResourceFilter(data.resourceBronchiolite);
    VariablesTable.actions.typeResourceTypeFilter(data.resourceWarehouse);
    VariablesTable.validations.shouldShowResourceTypeTagInDropdown(data.resourceWarehouse, false/*shouldExist*/);
  });

  it('Related Source', () => {
    VariablesTable.actions.selectSourceFilter(data.resourceCentro);
    VariablesTable.actions.typeResourceTypeFilter(data.resourceWarehouse);
    VariablesTable.validations.shouldShowResourceTypeTagInDropdown(data.resourceWarehouse, false/*shouldExist*/);
  });
});
