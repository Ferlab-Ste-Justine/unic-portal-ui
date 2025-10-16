/// <reference types="cypress"/>
import 'cypress/support/commands';
import { LandingPage } from 'cypress/pom/pages/LandingPage';

describe('Page Logout', () => {
  const setupTest = () => {
    cy.login();
    cy.visit('/');
  };

  it('Vérifier les informations affichées', () => {
    setupTest();
    cy.logout();
    LandingPage.validations.shouldHaveStats();
    LandingPage.validations.shouldHaveTitle();
    LandingPage.validations.shouldNotHaveSubtitle();
    LandingPage.validations.shouldHaveButtons();
  });
});
