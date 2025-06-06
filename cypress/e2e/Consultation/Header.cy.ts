/// <reference types="cypress"/>
import 'cypress/support/commands';
import { HomePage } from 'cypress/pom/pages/HomePage';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';

beforeEach(() => {
  cy.login();
  cy.visit('/');
});

describe('Header', () => {
  it('Vérifier les informations affichées', () => {
    HomePage.validations.header.shouldHaveHeaderElements();
  });

  it('Valider les liens disponibles - Logo', () => {
    cy.visitCatalog();
    HomePage.actions.clickLogo();
    HomePage.validations.shouldHaveTitle();
  });

  it('Valider les liens disponibles - Catalog', () => {
    HomePage.actions.clickCatalogButton();
    ResourcesTable.validations.shouldShowPageTitle();
  });

  it('Valider les liens disponibles - About', () => {
    HomePage.validations.header.shouldHaveAboutLink();
  });

  it('Valider les liens disponibles - FR', () => {
    HomePage.actions.clickLanguageButton();
    HomePage.validations.shouldHaveTitle(true/*isFR*/);
  });
});