/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { TablesTable } from 'cypress/pom/pages/TablesTable';

describe('Tableau Tables - Vérifier les informations affichées', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog('tables');
    TablesTable.actions.showAllColumns();
  };

  it('Titre', () => {
    setupTest();
    TablesTable.validations.shouldShowPageTitle();
  });

  it('Onglet', () => {
    setupTest();
    TablesTable.validations.shouldShowPageTitle();
  });

  it('Tableau', () => {
    setupTest();
    TablesTable.validations.shouldShowTableContent(data.tableAccouchement);
  });
});
