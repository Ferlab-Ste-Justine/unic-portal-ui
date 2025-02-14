/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visit('/');
});

describe('Header', () => {
  it('Vérifier les informations affichées', () => {
    cy.get('[class*="Header_headerBtnActive"]').contains('Home').should('exist');
    cy.get('[class*="Header_headerBtn"]').eq(1).contains('Catalog').should('exist');
    cy.get('[class*="Header_userName"]').eq(0).contains('Resources').should('exist');
    cy.get('[class*="Header_userAvatar"]').contains('CN').should('exist');
    cy.get('[class*="Header_userName"]').eq(1).contains('cypress').should('exist');
    cy.get('[class*="Header_langButton"]').contains('FR').should('exist');
  });

  it('Valider les liens disponibles - Home', () => {
    cy.visitCatalog();
    cy.get('[class*="Header_headerBtn"]').eq(0).clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC data portal').should('exist');
  });

  it('Valider les liens disponibles - Catalog', () => {
    cy.get('[class*="Header_headerBtn"]').eq(1).clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
  });

  it('Valider les liens disponibles - Contact', () => {
    cy.get('[class*="Header_menuTrigger"] [class*="anticon-down"]').eq(0).clickAndWait();
    cy.get('[data-menu-id*="contact"]').find('a')
      .should('have.attr', 'href', 'mailto:support@unic.ca');
  });

  it('Valider les liens disponibles - FR', () => {
    cy.get('[class*="Header_langButton"]').contains('FR').clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('Portail de données de l\'UnIC').should('exist');
  });
});