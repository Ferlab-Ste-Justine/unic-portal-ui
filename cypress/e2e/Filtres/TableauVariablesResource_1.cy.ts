/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
});

describe('Tableau Variables - Vérifier la fonctionnalité du filtre Resource', () => {
  it('Results', () => {
    VariablesTable.actions.selectResourceFilter(data.resourceBronchiolite);
    VariablesTable.validations.shouldShowResultsCount(data.resourceBronchiolite.variables.totalCount);
  });

  it('Lien Reset filters', () => {
    VariablesTable.actions.selectResourceFilter(data.resourceBronchiolite);
    VariablesTable.validations.shouldShowResetFilterButton();
  });

  it('Related Variable search', () => {
    VariablesTable.actions.typeVariableSearchInput(data.variableAdmittedCOVID.name);
    VariablesTable.actions.typeResourceFilter(data.resourceBronchiolite);
    VariablesTable.validations.shouldShowObjectInDropdown(data.resourceBronchiolite, false/*shouldExist*/);
  });

  it('Related Table filter', () => {
    VariablesTable.actions.selectTableFilter(data.tableAccouchement);
    VariablesTable.actions.typeResourceFilter(data.resourceBronchiolite);
    VariablesTable.validations.shouldShowObjectInDropdown(data.resourceBronchiolite, false/*shouldExist*/);
  });

  it('Related Resource type filter', () => {
    VariablesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    VariablesTable.actions.typeResourceFilter(data.resourceBronchiolite);
    VariablesTable.validations.shouldShowObjectInDropdown(data.resourceBronchiolite, false/*shouldExist*/);
  });

  it('Related Source', () => {
    VariablesTable.actions.selectSourceFilter(data.sourceCentro);
    VariablesTable.actions.typeResourceFilter(data.resourceBronchiolite);
    VariablesTable.validations.shouldShowObjectInDropdown(data.resourceBronchiolite, false/*shouldExist*/);
  });
});
