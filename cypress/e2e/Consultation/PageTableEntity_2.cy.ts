/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitTableEntity('warehouse', 'pathology');
});

describe('Page d\'une table - Valider les liens disponibles', () => {
  it('Lien Title Catalog', () => {
    cy.get('[class*="page_titleHeader"]').find('[href]').eq(0).clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
  });

  it('Lien Title Resource', () => {
    cy.get('[class*="page_titleHeader"]').find('[href]').eq(1).clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('warehouse').should('exist');
  });

  it('Lien Resource', () => {
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(0).find('[href]').clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('warehouse').should('exist');
  });

  it('Lien Variable Count', () => {
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(0).find('[href]').eq(0).clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
    cy.get('[data-node-key="variables"]').should('have.class', 'ant-tabs-tab-active');
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"] [title="pathology"]').should('exist');
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"] [title="warehouse"]').should('exist');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/(^36 Results$| of 36$)/).should('exist');
  });
});
