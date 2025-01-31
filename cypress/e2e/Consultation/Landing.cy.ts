/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.visit('/');
});

describe('Page Landing', () => {
  it('Vérifier les informations affichées', () => {
    cy.get('[class*="page_loginContainer"]').contains(/(Portail de données de l'Univers Informationnel du CHU Sainte-Justine.|Portal of the UNIC Data Hub.)/).should('exist');
    cy.get('[data-cy="Login"]').contains(/(Connexion|Login)/).should('exist');
    cy.get('[data-cy="Signup"]').contains(/(Créer compte|Sign up)/).should('exist');
  });
});
