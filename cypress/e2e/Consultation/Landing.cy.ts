/// <reference types="cypress"/>
import 'cypress/support/commands';
import { LandingPage } from 'cypress/pom/pages/LandingPage';

beforeEach(() => {
  cy.visit('/');
});

describe('Page Landing - Vérifier les informations affichées', () => {
  it('Logo', () => {
    LandingPage.validations.shouldHaveLogo();
  });

  it('Statistiques', () => {
    LandingPage.validations.shouldHaveStats();
  });

  it('Titre', () => {
    LandingPage.validations.shouldHaveTitle();
    LandingPage.validations.shouldNotHaveSubtitle();
  });

  it('Boutons', () => {
    LandingPage.validations.shouldHaveButtons();
  });
});
