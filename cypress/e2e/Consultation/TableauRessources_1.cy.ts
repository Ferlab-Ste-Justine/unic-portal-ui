/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';

describe('Tableau Ressources - Vérifier les informations affichées', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog();
    ResourcesTable.actions.showAllColumns();
    ResourcesTable.actions.typeResourceSearchInput(data.resourceBronchiolite.code);
  };

  it('Titre', () => {
    setupTest();
    ResourcesTable.validations.shouldShowPageTitle();
  });

  it('Onglet', () => {
    setupTest();
    ResourcesTable.validations.shouldHaveActiveTab();
  });

  it('Tableau', () => {
    setupTest();
    ResourcesTable.validations.shouldShowTableContent(data.resourceBronchiolite);
  });

  it('Popover Description', () => {
    setupTest();
    ResourcesTable.validations.shouldShowDescriptionPopover(data.resourceBronchiolite);
  });
});
