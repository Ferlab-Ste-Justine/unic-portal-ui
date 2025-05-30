/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcePage } from 'cypress/pom/pages/ResourcePage';
import { TablePage } from 'cypress/pom/pages/TablePage';
import { VariablePage } from 'cypress/pom/pages/VariablePage';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
  VariablesTable.actions.showAllColumns();
});

describe('Tableau Variables - Valider les liens disponibles', () => {
  it('Lien Name', () => {
    VariablesTable.actions.clickTableCellLink(data.variableAdmittedCOVID, 'name');
    VariablePage.validations.shouldHaveTitle(data.variableAdmittedCOVID);
  });

  it('Lien Resource', () => {
    VariablesTable.actions.clickTableCellLink(data.variableAdmittedCOVID, 'resource');
    ResourcePage.validations.shouldHaveTitle(data.resourceGermes);
  });

  it('Lien Table', () => {
    VariablesTable.actions.clickTableCellLink(data.variableAdmittedCOVID, 'table');
    TablePage.validations.shouldHaveTitle(data.tableWeeklySummary);
  });
});
