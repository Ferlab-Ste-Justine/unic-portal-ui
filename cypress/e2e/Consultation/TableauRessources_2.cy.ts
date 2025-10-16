/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcePage } from 'cypress/pom/pages/ResourcePage';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';
import { TablesTable } from 'cypress/pom/pages/TablesTable';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

describe('Tableau Ressources - Valider les liens disponibles', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog();
    ResourcesTable.actions.showAllColumns();
    ResourcesTable.actions.typeResourceSearchInput(data.resourceBronchiolite.code);
  };

  it('Lien Code', () => {
    setupTest();
    ResourcesTable.actions.clickTableCellLink(data.resourceBronchiolite, 'code');
    ResourcePage.validations.shouldHaveTitle(data.resourceBronchiolite);
  });

  it('Lien Name', () => {
    setupTest();
    ResourcesTable.actions.clickTableCellLink(data.resourceBronchiolite, 'name');
    ResourcePage.validations.shouldHaveTitle(data.resourceBronchiolite);
  });

  it('Lien Table (Research)', () => {
    setupTest();
    ResourcesTable.actions.clickTableCellLink(data.resourceBronchiolite, 'tables');
    TablesTable.validations.shouldRedirectAndValidateTable(data.resourceBronchiolite.name, data.resourceBronchiolite.tables);
  });

  it('Lien Table (Hospital System)', () => {
    setupTest();
    ResourcesTable.actions.clickTableCellLink(data.resourceCentro, 'tables');
    TablesTable.validations.shouldRedirectAndValidateTable(data.resourceCentro.name, data.resourceCentro.tables);
  });

  it('Lien Variable (Research)', () => {
    setupTest();
    ResourcesTable.actions.clickTableCellLink(data.resourceBronchiolite, 'variables');
    VariablesTable.validations.shouldRedirectAndValidateTable([data.resourceBronchiolite.name], data.resourceBronchiolite.variables.totalCount);
  });

  it('Lien Variable (Hospital System)', () => {
    setupTest();
    ResourcesTable.actions.clickTableCellLink(data.resourceCentro, 'variables');
    VariablesTable.validations.shouldRedirectAndValidateTable([data.resourceCentro.name], data.resourceCentro.variables.totalCount);
  });
});
