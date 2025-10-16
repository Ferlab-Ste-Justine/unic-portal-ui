/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

describe('Tableau Variables - Vérifier la fonctionnalité du filtre Resource type', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog('variables');
  };

  it('Dropdown tag', () => {
    setupTest();
    VariablesTable.actions.typeResourceTypeFilter(data.resourceWarehouse);
    VariablesTable.validations.shouldShowResourceTypeTagInDropdown(data.resourceWarehouse);
  });

  it('Results', () => {
    setupTest();
    VariablesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    VariablesTable.validations.shouldShowResultsCount(data.resourceWarehouse.variables.totalCount);
  });

  it('Lien Reset filters', () => {
    setupTest();
    VariablesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    VariablesTable.validations.shouldShowResetFilterButton();
  });

  it('Input tag', () => {
    setupTest();
    VariablesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    VariablesTable.validations.shouldShowResourceTypeTagInFilter(data.resourceWarehouse);
  });

  it('Related Variable search', () => {
    setupTest();
    VariablesTable.actions.typeVariableSearchInput(data.variableAdmittedCOVID.name);
    VariablesTable.actions.typeResourceTypeFilter(data.resourceWarehouse);
    VariablesTable.validations.shouldShowResourceTypeTagInDropdown(data.resourceWarehouse, false/*shouldExist*/);
  });

  it('Related Table filter', () => {
    setupTest();
    VariablesTable.actions.selectTableFilter(data.tableAccouchement);
    VariablesTable.actions.typeResourceTypeFilter(data.resourceWarehouse);
    VariablesTable.validations.shouldShowResourceTypeTagInDropdown(data.resourceWarehouse, false/*shouldExist*/);
  });

  it('Related Resource filter', () => {
    setupTest();
    VariablesTable.actions.selectResourceFilter(data.resourceBronchiolite);
    VariablesTable.actions.typeResourceTypeFilter(data.resourceWarehouse);
    VariablesTable.validations.shouldShowResourceTypeTagInDropdown(data.resourceWarehouse, false/*shouldExist*/);
  });

  it('Related Source', () => {
    setupTest();
    VariablesTable.actions.selectSourceFilter(data.resourceCentro);
    VariablesTable.actions.typeResourceTypeFilter(data.resourceWarehouse);
    VariablesTable.validations.shouldShowResourceTypeTagInDropdown(data.resourceWarehouse, false/*shouldExist*/);
  });
});
