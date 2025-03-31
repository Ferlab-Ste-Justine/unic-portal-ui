/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visit('/');
});

describe('Header', () => {
  it('Vérifier les informations affichées', () => {
    cy.get('[class*="Header_logo"]').should('exist');
    cy.get('[class*="Header_headerBtn"] [data-icon="read"]').should('exist');
    cy.get('[class*="Header_headerBtn"]').contains('Catalog').should('exist');
    cy.get('[class*="Header_headerBtn"]').contains('About').should('exist');
    cy.get('[class*="Header_headerBtn"] [class="anticon"]').should('exist');
    cy.get('[class*="Header_userAvatar"]').contains('CN').should('exist');
    cy.get('[class*="Header_userName"]').contains('cypress').should('exist');
    cy.get('[class*="Header_langButton"]').contains('FR').should('exist');
  });

  it('Valider les liens disponibles - Logo', () => {
    cy.visitCatalog();
    cy.get('[class*="Header_logo"]').clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UniC Data Catalog').should('exist');
  });

  it('Valider les liens disponibles - Catalog', () => {
    cy.get('[class*="Header_headerBtn"]').eq(0).clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
  });

  it('Valider les liens disponibles - About', () => {
    cy.get('[class*="Header_mainHeader"] a').eq(2)
      .should('have.attr', 'href', 'https://recherche.chusj.org/fr/Plateformes-communes/Grandes-initiatives-institutionnelles/UnIC/Guichet-UnIC-pour-les-chercheurs/Accueil')
      .contains('About');
  });

  it('Valider les liens disponibles - FR', () => {
    cy.get('[class*="Header_langButton"]').contains('FR').clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('Catalogue de l\'UniC').should('exist');
  });
});