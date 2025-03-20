/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitTableEntity('resppa', 'accouchement');
});

describe('Page d\'une table - Valider les liens disponibles', () => {
  it('Lien Title Catalog', () => {
    cy.get('[class*="page_titleHeader"]').find('[href]').eq(0).clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
  });

  it('Lien Title Resource', () => {
    cy.get('[class*="page_titleHeader"]').find('[href]').eq(1).clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('RESPPA').should('exist');
  });

  it('Lien Resource', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(1).find('[href]').clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('RESPPA').should('exist');
  });

  it('Lien Variable Count', () => {
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(0).find('[href]').eq(0).clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
    cy.get('[data-node-key="variables"]').should('have.class', 'ant-tabs-tab-active');
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"] [title="accouchement"]').should('exist');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/(^11 Results$| of 11$)/).should('exist');
  });
});
