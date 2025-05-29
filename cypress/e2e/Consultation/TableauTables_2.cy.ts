/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcePage } from 'cypress/pom/pages/ResourcePage';
import { TablePage } from 'cypress/pom/pages/TablePage';
import { TablesTable } from 'cypress/pom/pages/TablesTable';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('tables');
  TablesTable.actions.showAllColumns();
});

describe('Tableau Tables - Valider les liens disponibles', () => {
  it('Lien Name', () => {
    TablesTable.actions.clickTableCellLink(data.tableAccouchement, 'name');
    TablePage.validations.shouldHaveTitle(data.tableAccouchement.name);
  });

  it('Lien Resource', () => {
    TablesTable.actions.clickTableCellLink(data.tableAccouchement, 'resource');
    ResourcePage.validations.shouldHaveTitle(data.tableAccouchement.resource);
  });

  it('Lien Variable Count', () => {
    TablesTable.actions.clickTableCellLink(data.tableAccouchement, 'variableCount');
    VariablesTable.validations.shouldRedirectAndValidateTable([data.tableAccouchement.name, data.tableAccouchement.resource], data.tableAccouchement.variableCount);
  });
});
