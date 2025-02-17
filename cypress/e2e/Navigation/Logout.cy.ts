/// <reference types="cypress"/>
import '../../support/commands';

describe('Page Logout', () => {

  beforeEach(() => {
    cy.login();
    cy.visit('/');
  });

  it('Vérifier les informations affichées', () => {
    cy.logout();

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
    cy.get('[class*="page_loginTitle"]').contains(/(Portail de données de l'Univers Informationnel du CHU Sainte-Justine.|Data portal of Univers Informationnel du CHU Sainte-Justine.)/).should('exist');
    cy.get('[class*="page_loginSubTitle"]').contains(/(Explorez le catalogue de données, gérez vos projets et accédez à vos jeux de données.|Explore the data catalog, manage your projects, and access your datasets.)/).should('exist');
    cy.get('[data-cy="Login"]').contains(/(Connexion|Login)/).should('exist');
    cy.get('[data-cy="Signup"]').contains(/(Créer un compte|Sign up)/).should('exist');
  });
});
