/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
  VariablesTable.actions.showAllColumns();
});

describe('Tableau Variables - Vérifier les informations affichées', () => {
  it('Titre', () => {
    VariablesTable.validations.shouldShowPageTitle();
  });

  it('Onglet', () => {
    VariablesTable.validations.shouldHaveActiveTab();
  });

  it('Tableau', () => {
    VariablesTable.validations.shouldShowTableContent(data.variableAdmittedCOVID);
  });
});
