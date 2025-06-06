/// <reference types="cypress"/>
import 'cypress/support/commands';
import { LandingPage } from 'cypress/pom/pages/LandingPage';

describe('Page Logout', () => {

  beforeEach(() => {
    cy.login();
    cy.visit('/');
  });

  it('Vérifier les informations affichées', () => {
    cy.logout();
    LandingPage.validations.shouldHaveStats();
    LandingPage.validations.shouldHaveTitle();
    LandingPage.validations.shouldNotHaveSubtitle();
    LandingPage.validations.shouldHaveButtons();
  });
});
