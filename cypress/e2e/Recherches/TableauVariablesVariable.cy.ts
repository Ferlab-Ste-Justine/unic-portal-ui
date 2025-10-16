/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

describe('Tableau Variables - Vérifier la fonctionnalité de la recherche Variable', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog('variables');
  };

  it('Results by Description en', () => {
    setupTest();
    VariablesTable.actions.typeVariableSearchInput('Congenital Anomaly');
    VariablesTable.validations.shouldShowResultsCount('1');
  });

  it('Results by Description fr', () => {
    setupTest();
    VariablesTable.actions.typeVariableSearchInput('Antécédent d\'Anomalie');
    VariablesTable.validations.shouldShowResultsCount(/\d{1}/);
  });

  it('Results by Name', () => {
    setupTest();
    VariablesTable.actions.typeVariableSearchInput('familialantecedentcongenitalanomaliesrelative');
    VariablesTable.validations.shouldShowResultsCount('1');
  });

  it('Lien Reset filters', () => {
    setupTest();
    VariablesTable.actions.typeVariableSearchInput('anomaly');
    VariablesTable.validations.shouldShowResetFilterButton();
  });

  it('Related Table filter', () => {
    setupTest();
    VariablesTable.actions.selectTableFilter(data.tableAccouchement);
    VariablesTable.actions.typeVariableSearchInput('anomaly');
    VariablesTable.validations.shouldShowNoResultsMessage();
  });

  it('Related Resource filter', () => {
    setupTest();
    VariablesTable.actions.selectResourceFilter(data.resourceBronchiolite);
    VariablesTable.actions.typeVariableSearchInput('anomaly');
    VariablesTable.validations.shouldShowNoResultsMessage();
  });

  it('Related Resource type filter', () => {
    setupTest();
    VariablesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    VariablesTable.actions.typeVariableSearchInput(data.variableAdmittedCOVID.name);
    VariablesTable.validations.shouldShowNoResultsMessage();
  });

  it('Related Source', () => {
    setupTest();
    VariablesTable.actions.selectSourceFilter(data.resourceCentro)
    VariablesTable.actions.typeVariableSearchInput('anomaly');
    VariablesTable.validations.shouldShowNoResultsMessage();
  });
});
