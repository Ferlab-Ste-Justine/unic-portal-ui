/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcePage } from 'cypress/pom/pages/ResourcePage';
import { TablePage } from 'cypress/pom/pages/TablePage';
import { TablesTable } from 'cypress/pom/pages/TablesTable';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

describe('Tableau Tables - Valider les liens disponibles', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog('tables');
    TablesTable.actions.showAllColumns();
  };

  it('Lien Name', () => {
    setupTest();
    TablesTable.actions.clickTableCellLink(data.tableAccouchement, 'name');
    TablePage.validations.shouldHaveTitle(data.tableAccouchement);
  });

  it('Lien Resource', () => {
    setupTest();
    TablesTable.actions.clickTableCellLink(data.tableAccouchement, 'resource');
    ResourcePage.validations.shouldHaveTitle(data.resourceResppa);
  });

  it('Lien Variable Count', () => {
    setupTest();
    TablesTable.actions.clickTableCellLink(data.tableAccouchement, 'variableCount');
    VariablesTable.validations.shouldRedirectAndValidateTable([data.tableAccouchement.name, data.tableAccouchement.resourceName], data.tableAccouchement.variableCount);
  });
});
