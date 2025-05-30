/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcePage } from 'cypress/pom/pages/ResourcePage';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';
import { TablePage } from 'cypress/pom/pages/TablePage';
import { VariablePage } from 'cypress/pom/pages/VariablePage';

beforeEach(() => {
  cy.login();
  cy.visitVariableEntity(data.variableAdmittedCOVID);
});

describe('Page d\'une variable - Valider les liens disponibles', () => {
  it('Lien Title Catalog', () => {
    VariablePage.actions.clickTitleCatalogLink();
    ResourcesTable.validations.shouldShowPageTitle();
  });

  it('Lien Title Resource', () => {
    VariablePage.actions.clickTitleResourceLink();
    ResourcePage.validations.shouldHaveTitle(data.resourceGermes);
  });

  it('Lien Title Table', () => {
    VariablePage.actions.clickTitleTableLink();
    TablePage.validations.shouldHaveTitle(data.tableWeeklySummary)
  });

  it('Lien Resource', () => {
    VariablePage.actions.clickResourceLink();
    ResourcePage.validations.shouldHaveTitle(data.resourceGermes);
  });

  it('Lien Table', () => {
    VariablePage.actions.clickTableLink();
    TablePage.validations.shouldHaveTitle(data.tableWeeklySummary);
  });

  it('Lien Derivation Resource', () => {
    VariablePage.actions.clickDerivationResourceLink(data.variableAdmittedCOVID);
    ResourcePage.validations.shouldHaveTitle(data.resourceGermes);
  });

  it('Lien Derivation Table', () => {
    VariablePage.actions.clickDerivationTableLink(data.variableAdmittedCOVID);
    TablePage.validations.shouldHaveTitle(data.tablePatient);
  });

  it('Lien Derivation Variable', () => {
    VariablePage.actions.clickDerivationVariableLink(data.variableAdmittedCOVID);
    VariablePage.validations.shouldHaveTitle(data.variableTestLabel);
  });
});
