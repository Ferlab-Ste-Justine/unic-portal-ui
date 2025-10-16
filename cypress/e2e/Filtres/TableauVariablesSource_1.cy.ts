/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

describe('Tableau Variables - Vérifier la fonctionnalité du filtre Source', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog('variables');
  };

  it('Results', () => {
    setupTest();
    VariablesTable.actions.selectSourceFilter(data.resourceCentro);
    VariablesTable.validations.shouldShowResultsCount(data.resourceCentro.variables.totalCountForSource);
  });

  it('Lien Reset filters', () => {
    setupTest();
    VariablesTable.actions.selectSourceFilter(data.resourceCentro);
    VariablesTable.validations.shouldShowResetFilterButton();
  });

  it('Related Variable search', () => {
    setupTest();
    VariablesTable.actions.typeVariableSearchInput(data.variableAdmittedCOVID.name);
    VariablesTable.actions.typeResourceFilter(data.resourceCentro);
    VariablesTable.validations.shouldShowObjectInDropdown(data.resourceCentro, false/*shouldExist*/);
  });

  it('Related Table filter', () => {
    setupTest();
    VariablesTable.actions.selectTableFilter(data.tableAccouchement);
    VariablesTable.actions.typeResourceFilter(data.resourceCentro);
    VariablesTable.validations.shouldShowObjectInDropdown(data.resourceCentro, false/*shouldExist*/);
  });

  it('Related Resource filter', () => {
    setupTest();
    VariablesTable.actions.selectResourceFilter(data.resourceBronchiolite);
    VariablesTable.actions.typeResourceFilter(data.resourceCentro);
    VariablesTable.validations.shouldShowObjectInDropdown(data.resourceCentro, false/*shouldExist*/);
  });

  it('Related Resource type filter', () => {
    setupTest();
    VariablesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    VariablesTable.actions.typeResourceFilter(data.resourceCentro);
    VariablesTable.validations.shouldShowObjectInDropdown(data.resourceCentro, false/*shouldExist*/);
  });
});
