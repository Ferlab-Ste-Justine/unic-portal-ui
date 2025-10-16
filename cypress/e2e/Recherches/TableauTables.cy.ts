/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { TablesTable } from 'cypress/pom/pages/TablesTable';
import { varSingleDigit } from 'cypress/pom/shared/Utils';

describe('Tableau Tables - Vérifier la fonctionnalité de la recherche Table', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog('tables');
  };

  it('Results by Description en', () => {
    setupTest();
    TablesTable.actions.typeTableSearchInput('family medical');
    TablesTable.validations.shouldShowResultsCount(varSingleDigit);
  });

  it('Results by Description fr', () => {
    setupTest();
    TablesTable.actions.typeTableSearchInput('antécédents médicaux');
    TablesTable.validations.shouldShowResultsCount(varSingleDigit);
  });

  it('Results by Name', () => {
    setupTest();
    TablesTable.actions.typeTableSearchInput('Maternal_Ultrasound');
    TablesTable.validations.shouldShowResultsCount('1');
  });

  it('Lien Reset filters', () => {
    setupTest();
    TablesTable.actions.typeTableSearchInput(data.tableAccouchement.name);
    TablesTable.validations.shouldShowResetFilterButton();
  });

  it('Related Resource type filter', () => {
    setupTest();
    TablesTable.actions.selectResourceTypeFilter(data.resourceBronchiolite);
    TablesTable.actions.typeTableSearchInput('consultation_complication');
    TablesTable.validations.shouldShowNoResultsMessage();
  });

  it('Related Resource filter', () => {
    setupTest();
    TablesTable.actions.selectResourceFilter(data.resourceBronchiolite);
    TablesTable.actions.typeTableSearchInput('consultation_complication');
    TablesTable.validations.shouldShowNoResultsMessage();
  });
});
