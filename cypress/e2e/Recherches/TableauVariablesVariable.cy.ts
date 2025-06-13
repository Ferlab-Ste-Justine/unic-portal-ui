/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
});

describe('Tableau Variables - Vérifier la fonctionnalité de la recherche Variable', () => {
  it('Results by Description en', () => {
    VariablesTable.actions.typeVariableSearchInput('Congenital Anomaly');
    VariablesTable.validations.shouldShowResultsCount('1');
  });

  it('Results by Description fr', () => {
    VariablesTable.actions.typeVariableSearchInput('Antécédent d\'Anomalie');
    VariablesTable.validations.shouldShowResultsCount(/\d{1}/);
  });

  it('Results by Name', () => {
    VariablesTable.actions.typeVariableSearchInput('familialantecedentcongenitalanomaliesrelative');
    VariablesTable.validations.shouldShowResultsCount('1');
  });

  it('Lien Reset filters', () => {
    VariablesTable.actions.typeVariableSearchInput('anomaly');
    VariablesTable.validations.shouldShowResetFilterButton();
  });

  it('Related Table filter', () => {
    VariablesTable.actions.selectTableFilter(data.tableAccouchement);
    VariablesTable.actions.typeVariableSearchInput('anomaly');
    VariablesTable.validations.shouldShowNoResultsMessage();
  });

  it('Related Resource filter', () => {
    VariablesTable.actions.selectResourceFilter(data.resourceBronchiolite);
    VariablesTable.actions.typeVariableSearchInput('anomaly');
    VariablesTable.validations.shouldShowNoResultsMessage();
  });

  it('Related Resource type filter', () => {
    VariablesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    VariablesTable.actions.typeVariableSearchInput('centro');
    VariablesTable.validations.shouldShowNoResultsMessage();
  });

  it('Related Source', () => {
    VariablesTable.actions.selectSourceFilter(data.resourceCentro)
    VariablesTable.actions.typeVariableSearchInput('anomaly');
    VariablesTable.validations.shouldShowNoResultsMessage();
  });
});
