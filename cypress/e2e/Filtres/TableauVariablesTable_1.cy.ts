/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

describe('Tableau Variables - Vérifier la fonctionnalité du filtre Table', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog('variables');
  };

  it('Results', () => {
    setupTest();
    VariablesTable.actions.selectTableFilter(data.tableAccouchement);
    VariablesTable.validations.shouldShowResultsCount(data.tableAccouchement.variableCount);
  });

  it('Lien Reset filters', () => {
    setupTest();
    VariablesTable.actions.selectTableFilter(data.tableAccouchement);
    VariablesTable.validations.shouldShowResetFilterButton();
  });

  it('Related Variable search', () => {
    setupTest();
    VariablesTable.actions.typeVariableSearchInput(data.variableAdmittedCOVID.name);
    VariablesTable.actions.typeTableFilter(data.tableAccouchement);
    VariablesTable.validations.shouldShowObjectInDropdown(data.tableAccouchement, false/*shouldExist*/);
  });

  it('Related Resource filter', () => {
    setupTest();
    VariablesTable.actions.selectResourceFilter(data.resourceBronchiolite);
    VariablesTable.actions.typeTableFilter(data.tableAccouchement);
    VariablesTable.validations.shouldShowObjectInDropdown(data.tableAccouchement, false/*shouldExist*/);
  });

  it('Related Resource type filter', () => {
    setupTest();
    VariablesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    VariablesTable.actions.typeTableFilter(data.tableAccouchement);
    VariablesTable.validations.shouldShowObjectInDropdown(data.tableAccouchement, false/*shouldExist*/);
  });

  it('Related Source', () => {
    setupTest();
    VariablesTable.actions.selectSourceFilter(data.resourceCentro);
    VariablesTable.actions.typeTableFilter(data.tableAccouchement);
    VariablesTable.validations.shouldShowObjectInDropdown(data.tableAccouchement, false/*shouldExist*/);
  });
});
