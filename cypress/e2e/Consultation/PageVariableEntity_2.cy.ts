/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitVariableEntity('warehouse', 'medical_imaging', 'sector');
});

describe('Page d\'une variable - Valider les liens disponibles', () => {
  it('Lien Title Catalog', () => {
    cy.get('[class*="page_titleHeader"]').find('[href]').eq(0).clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
  });

  it('Lien Title Resource', () => {
    cy.get('[class*="page_titleHeader"]').find('[href]').eq(1).clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('warehouse').should('exist');
  });

  it('Lien Title Table', () => {
    cy.get('[class*="page_titleHeader"]').find('[href]').eq(2).clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('medical_imaging').should('exist');
  });

  it('Lien Resource', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(1).find('[href]').clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('warehouse').should('exist');
  });

  it('Lien Table', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(2).find('[href]').clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('medical_imaging').should('exist');
  });
});
