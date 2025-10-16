/// <reference types="cypress"/>
import 'cypress/support/commands';
import { HomePage } from 'cypress/pom/pages/HomePage';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';

describe('Header', () => {
  const setupTest = () => {
    cy.login();
    cy.visit('/');
  };

  it('Vérifier les informations affichées', () => {
    setupTest();
    HomePage.validations.header.shouldHaveHeaderElements();
  });

  it('Valider les liens disponibles - Logo', () => {
    setupTest();
    cy.visitCatalog();
    HomePage.actions.clickLogo();
    HomePage.validations.shouldHaveTitle();
  });

  it('Valider les liens disponibles - Catalog', () => {
    setupTest();
    HomePage.actions.clickCatalogButton();
    ResourcesTable.validations.shouldShowPageTitle();
  });

  it('Valider les liens disponibles - About', () => {
    setupTest();
    HomePage.validations.header.shouldHaveAboutLink();
  });

  it('Valider les liens disponibles - FR', () => {
    setupTest();
    HomePage.actions.clickLanguageButton();
    HomePage.validations.shouldHaveTitle(true/*isFR*/);
  });
});