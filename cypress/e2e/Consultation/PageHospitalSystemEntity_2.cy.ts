/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcePage } from 'cypress/pom/pages/ResourcePage';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

describe('Page d\'un Système hospitalier - Valider les liens disponibles', () => {
  const setupTest = () => {
    cy.login();
    cy.visitResourceEntity(data.resourceCentro);
  };

  it('Lien Title', () => {
    setupTest();
    ResourcePage.actions.clickTitleLink();
    ResourcesTable.validations.shouldShowPageTitle();
  });

  it('Lien Variable Count', () => {
    setupTest();
    ResourcePage.actions.clickVariableCountLink();
    VariablesTable.validations.shouldRedirectAndValidateTable([data.resourceCentro.name], data.resourceCentro.variables.totalCount);
  });
});
