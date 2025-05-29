/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';
import { ResourcePage } from 'cypress/pom/pages/ResourcePage';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';
import { TablesTable } from 'cypress/pom/pages/TablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog();
  ResourcesTable.actions.showAllColumns();
  ResourcesTable.actions.typeResourceSearchInput(data.resourceBronchiolite.code);
});

describe('Tableau Ressources - Valider les liens disponibles', () => {
  it('Lien Code', () => {
    ResourcesTable.actions.clickTableCellLink(data.resourceBronchiolite, 'code');
    ResourcePage.validations.shouldHaveTitle(data.resourceBronchiolite.name);
  });

  it('Lien Name', () => {
    ResourcesTable.actions.clickTableCellLink(data.resourceBronchiolite, 'name');
    ResourcePage.validations.shouldHaveTitle(data.resourceBronchiolite.name);
  });

  it('Lien Table (Research)', () => {
    ResourcesTable.actions.clickTableCellLink(data.resourceBronchiolite, 'tables');
    TablesTable.validations.shouldRedirectAndValidateTable(data.resourceBronchiolite.name, data.resourceBronchiolite.tables);
  });

  it('Lien Table (Hospital System)', () => {
    ResourcesTable.actions.clickTableCellLink(data.resourceCentro, 'tables');
    TablesTable.validations.shouldRedirectAndValidateTable(data.resourceCentro.name, data.resourceCentro.tables);
  });

  it('Lien Variable (Research)', () => {
    ResourcesTable.actions.clickTableCellLink(data.resourceBronchiolite, 'variables');
    VariablesTable.validations.shouldRedirectAndValidateTable([data.resourceBronchiolite.name], data.resourceBronchiolite.variables.totalCount);
  });

  it('Lien Variable (Hospital System)', () => {
    ResourcesTable.actions.clickTableCellLink(data.resourceCentro, 'variables');
    VariablesTable.validations.shouldRedirectAndValidateTable([data.resourceCentro.name], data.resourceCentro.variables.totalCount);
  });
});
