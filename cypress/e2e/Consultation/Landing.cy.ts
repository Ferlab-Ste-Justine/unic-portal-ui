/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.visit('/');
});

describe('Page Landing - Vérifier les informations affichées', () => {
  it('Logo', () => {
    cy.get('[class*="page_logoContainer"] [src="/unic-logo.svg"]').should('exist');
  });

  it('Statistiques', () => {
    cy.get('[class*="page_loginStats"]').contains(/(Données disponibles|Available data)/).should('exist');
    cy.get('[class*="DataRelease_colDataReleaseContainer"]').eq(0).find('[data-icon="read"]').should('exist');
    cy.get('[class*="DataRelease_colDataReleaseContainer"]').eq(0).contains(/\d{1}/).should('exist');
    cy.get('[class*="DataRelease_colDataReleaseContainer"]').eq(0).contains(/(Projets|Projects)/).should('exist');
    cy.get('[class*="DataRelease_colDataReleaseContainer"]').eq(1).find('[data-icon="user"]').should('exist');
    cy.get('[class*="DataRelease_colDataReleaseContainer"]').eq(1).contains('2.5M').should('exist');
    cy.get('[class*="DataRelease_colDataReleaseContainer"]').eq(1).contains('Participants').should('exist');
    cy.get('[class*="DataRelease_colDataReleaseContainer"]').eq(2).find('[data-icon="file-text"]').should('exist');
    cy.get('[class*="DataRelease_colDataReleaseContainer"]').eq(2).contains(/\d{1}/).should('exist');
    cy.get('[class*="DataRelease_colDataReleaseContainer"]').eq(2).contains(/(Systèmes hospitaliers|Hospital Systems)/).should('exist');
    cy.get('[class*="DataRelease_colDataReleaseContainer"]').eq(3).find('[data-icon="gold"]').should('exist');
    cy.get('[class*="DataRelease_colDataReleaseContainer"]').eq(3).contains(/\d{1}/).should('exist');
    cy.get('[class*="DataRelease_colDataReleaseContainer"]').eq(3).contains('Variables').should('exist');
  });

  it('Titre', () => {
    cy.get('[class*="page_loginTitle"]').contains(/(Portail de données de l'Univers Informationnel du CHU Sainte-Justine.|Data portal of Univers Informationnel du CHU Sainte-Justine.)/).should('exist');
    cy.get('[class*="page_loginSubTitle"]').should('not.exist');
  });

  it('Boutons', () => {
    cy.get('[data-cy="Login"]').contains(/(Connexion|Login)/).should('exist');
    cy.get('[data-cy="Signup"]').contains(/(Créer un compte|Sign up)/).should('exist');
  });
});
