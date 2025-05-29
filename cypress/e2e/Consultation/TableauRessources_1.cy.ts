/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog();
  ResourcesTable.actions.showAllColumns();
  ResourcesTable.actions.typeResourceSearchInput(data.resourceBronchiolite.code);
});

describe('Tableau Ressources - Vérifier les informations affichées', () => {
  it('Titre', () => {
    ResourcesTable.validations.shouldShowPageTitle();
  });

  it('Onglet', () => {
    ResourcesTable.validations.shouldHaveActiveTab();
  });

  it('Tableau', () => {
    ResourcesTable.validations.shouldShowTableContent(data.resourceBronchiolite);
  });

  it('Popover Description', () => {
    ResourcesTable.validations.shouldShowDescriptionPopover(data.resourceBronchiolite);
  });
});
