/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { TablesTable } from 'cypress/pom/pages/TablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('tables');
  TablesTable.actions.showAllColumns();
});

describe('Tableau Tables - Vérifier les informations affichées', () => {
  it('Titre', () => {
    TablesTable.validations.shouldShowPageTitle();
  });

  it('Onglet', () => {
    TablesTable.validations.shouldShowPageTitle();
  });

  it('Tableau', () => {
    TablesTable.validations.shouldShowTableContent(data.tableAccouchement);
  });
});
