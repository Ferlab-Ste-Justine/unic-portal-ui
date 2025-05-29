/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { varSingleDigit } from 'cypress/pom/shared/Utils';
import { TablesTable } from 'cypress/pom/pages/TablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('tables');
});

describe('Tableau Tables - Vérifier la fonctionnalité de la recherche Table', () => {
  it('Results by Description en', () => {
    TablesTable.actions.typeTableSearchInput('family medical');
    TablesTable.validations.shouldShowResultsCount(varSingleDigit);
  });

  it('Results by Description fr', () => {
    TablesTable.actions.typeTableSearchInput('antécédents médicaux');
    TablesTable.validations.shouldShowResultsCount(varSingleDigit);
  });

  it('Results by Name', () => {
    TablesTable.actions.typeTableSearchInput('Maternal_Ultrasound');
    TablesTable.validations.shouldShowResultsCount('1');
  });

  it('Lien Reset filters', () => {
    TablesTable.actions.typeTableSearchInput(data.tableAccouchement.name);
    TablesTable.validations.shouldShowResetFilterButton();
  });

  it('Related Resource type filter', () => {
    TablesTable.actions.selectResourceTypeFilter(data.resourceBronchiolite);
    TablesTable.actions.typeTableSearchInput('consultation_complication');
    TablesTable.validations.shouldShowNoResultsMessage();
  });

  it('Related Resource filter', () => {
    TablesTable.actions.selectResourceFilter(data.resourceBronchiolite);
    TablesTable.actions.typeTableSearchInput('consultation_complication');
    TablesTable.validations.shouldShowNoResultsMessage();
  });
});
