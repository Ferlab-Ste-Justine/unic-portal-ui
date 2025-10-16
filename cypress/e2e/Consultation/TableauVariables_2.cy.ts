/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcePage } from 'cypress/pom/pages/ResourcePage';
import { TablePage } from 'cypress/pom/pages/TablePage';
import { VariablePage } from 'cypress/pom/pages/VariablePage';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

describe('Tableau Variables - Valider les liens disponibles', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog('variables');
    VariablesTable.actions.showAllColumns();
  };

  it('Lien Name', () => {
    setupTest();
    VariablesTable.actions.clickTableCellLink(data.variableAdmittedCOVID, 'name');
    VariablePage.validations.shouldHaveTitle(data.variableAdmittedCOVID);
  });

  it('Lien Resource', () => {
    setupTest();
    VariablesTable.actions.clickTableCellLink(data.variableAdmittedCOVID, 'resource');
    ResourcePage.validations.shouldHaveTitle(data.resourceGermes);
  });

  it('Lien Table', () => {
    setupTest();
    VariablesTable.actions.clickTableCellLink(data.variableAdmittedCOVID, 'table');
    TablePage.validations.shouldHaveTitle(data.tableWeeklySummary);
  });
});
