/// <reference types="cypress"/>
import 'cypress/support/commands';
import { LandingPage } from 'cypress/pom/pages/LandingPage';

describe('Page Landing - Vérifier les informations affichées', () => {
  const setupTest = () => {
    cy.visit('/');
  };

  it('Logo', () => {
    setupTest();
    LandingPage.validations.shouldHaveLogo();
  });

  it('Statistiques', () => {
    setupTest();
    LandingPage.validations.shouldHaveStats();
  });

  it('Titre', () => {
    setupTest();
    LandingPage.validations.shouldHaveTitle();
    LandingPage.validations.shouldNotHaveSubtitle();
  });

  it('Boutons', () => {
    setupTest();
    LandingPage.validations.shouldHaveButtons();
  });
});
