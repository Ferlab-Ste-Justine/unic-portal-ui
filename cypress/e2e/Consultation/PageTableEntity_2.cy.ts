/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcePage } from 'cypress/pom/pages/ResourcePage';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';
import { TablePage } from 'cypress/pom/pages/TablePage';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

describe('Page d\'une table - Valider les liens disponibles', () => {
  const setupTest = () => {
    cy.login();
    cy.visitTableEntity(data.tablePathology);
  };

  it('Lien Title Catalog', () => {
    setupTest();
    TablePage.actions.clickTitleCatalogLink();
    ResourcesTable.validations.shouldShowPageTitle();
  });

  it('Lien Title Resource', () => {
    setupTest();
    TablePage.actions.clickTitleResourceLink();
    ResourcePage.validations.shouldHaveTitle(data.resourceWarehouse);
  });

  it('Lien Resource', () => {
    setupTest();
    TablePage.actions.clickResourceLink();
    ResourcePage.validations.shouldHaveTitle(data.resourceWarehouse);
  });

  it('Lien Variable Count', () => {
    setupTest();
    TablePage.actions.clickVariableCountLink();
    VariablesTable.validations.shouldRedirectAndValidateTable([data.tablePathology.resourceName, data.tablePathology.name], data.tablePathology.variableCount);
  });
});
