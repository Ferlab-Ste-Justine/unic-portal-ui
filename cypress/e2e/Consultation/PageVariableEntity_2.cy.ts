/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcePage } from 'cypress/pom/pages/ResourcePage';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';
import { TablePage } from 'cypress/pom/pages/TablePage';
import { VariablePage } from 'cypress/pom/pages/VariablePage';

describe('Page d\'une variable - Valider les liens disponibles', () => {
  const setupTest = () => {
    cy.login();
    cy.visitVariableEntity(data.variableAdmittedCOVID);
  };

  it('Lien Title Catalog', () => {
    setupTest();
    VariablePage.actions.clickTitleCatalogLink();
    ResourcesTable.validations.shouldShowPageTitle();
  });

  it('Lien Title Resource', () => {
    setupTest();
    VariablePage.actions.clickTitleResourceLink();
    ResourcePage.validations.shouldHaveTitle(data.resourceGermes);
  });

  it('Lien Title Table', () => {
    setupTest();
    VariablePage.actions.clickTitleTableLink();
    TablePage.validations.shouldHaveTitle(data.tableWeeklySummary)
  });

  it('Lien Resource', () => {
    setupTest();
    VariablePage.actions.clickResourceLink();
    ResourcePage.validations.shouldHaveTitle(data.resourceGermes);
  });

  it('Lien Table', () => {
    setupTest();
    VariablePage.actions.clickTableLink();
    TablePage.validations.shouldHaveTitle(data.tableWeeklySummary);
  });

  it('Lien Derivation Resource', () => {
    setupTest();
    VariablePage.actions.clickDerivationResourceLink(data.variableAdmittedCOVID);
    ResourcePage.validations.shouldHaveTitle(data.resourceGermes);
  });

  it('Lien Derivation Table', () => {
    setupTest();
    VariablePage.actions.clickDerivationTableLink(data.variableAdmittedCOVID);
    TablePage.validations.shouldHaveTitle(data.tablePatient);
  });

  it('Lien Derivation Variable', () => {
    setupTest();
    VariablePage.actions.clickDerivationVariableLink(data.variableAdmittedCOVID);
    VariablePage.validations.shouldHaveTitle(data.variableTestLabel);
  });
});
