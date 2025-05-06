/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog();
  ResourcesTable.actions.showAllColumns();
  ResourcesTable.actions.searchResource(data.resourceBronchiolite.code);
});

describe('Tableau Ressources - Vérifier les informations affichées', () => {
  it('Titre', () => {
    ResourcesTable.validations.pageTitle();
  });

  it('Onglet', () => {
    ResourcesTable.validations.tabActive();
  });

  it('Tableau', () => {
    ResourcesTable.validations.tableContent(data.resourceBronchiolite);
  });

  it('Popover Description', () => {
    ResourcesTable.validations.popoverDescription(data.resourceBronchiolite);
  });
});
