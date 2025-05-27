/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcePage } from 'cypress/pom/pages/ResourcePage';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

beforeEach(() => {
  cy.login();
  cy.visitResourceEntity(data.resourceCentro.name);
});

describe('Page d\'un Système hospitalier - Valider les liens disponibles', () => {
  it('Lien Title', () => {
    ResourcePage.actions.clickTitleLink();
    ResourcesTable.validations.pageTitle();
  });

  it('Lien Variable Count', () => {
    ResourcePage.actions.clickVariableCountLink();
    VariablesTable.validations.redirectAndFilterTable(data.resourceCentro.name, data.resourceCentro.variables.totalCount);
  });
});
