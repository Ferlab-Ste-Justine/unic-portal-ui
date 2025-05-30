/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcePage } from 'cypress/pom/pages/ResourcePage';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

beforeEach(() => {
  cy.login();
  cy.visitResourceEntity(data.resourceBronchiolite);
});

describe('Page d\'un projet - Valider les liens disponibles', () => {
  it('Lien Title', () => {
    ResourcePage.actions.clickTitleLink();
    ResourcesTable.validations.shouldShowPageTitle();
  });

  it('Lien Variable Count', () => {
    ResourcePage.actions.clickVariableCountLink();
    VariablesTable.validations.shouldRedirectAndValidateTable([data.resourceBronchiolite.name], data.resourceBronchiolite.variables.totalCount);
  });

  it('Lien Hospital System', () => {
    ResourcePage.actions.clickHospitalSystemLink('staturgence');
    VariablesTable.validations.shouldRedirectAndValidateTable([data.resourceBronchiolite.name], data.resourceBronchiolite.variables.hospitalSystems.staturgence.toString());
    VariablesTable.validations.shouldShowFilterTag('staturgence');
  });
});
