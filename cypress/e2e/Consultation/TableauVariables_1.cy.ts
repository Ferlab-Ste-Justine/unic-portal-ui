/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

describe('Tableau Variables - Vérifier les informations affichées', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog('variables');
    VariablesTable.actions.showAllColumns();
  };

  it('Titre', () => {
    setupTest();
    VariablesTable.validations.shouldShowPageTitle();
  });

  it('Onglet', () => {
    setupTest();
    VariablesTable.validations.shouldHaveActiveTab();
  });

  it('Tableau', () => {
    setupTest();
    VariablesTable.validations.shouldShowTableContent(data.variableAdmittedCOVID);
  });
});
