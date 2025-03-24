/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitResourceEntity('bronchiolite');
});

describe('Page d\'un projet - Valider les liens disponibles', () => {
  it('Lien Title', () => {
    cy.get('[class*="page_titleHeader"]').find('[href]').clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
  });

  it('Lien Variable Count', () => {
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(0).find('[href]').clickAndWait();
    cy.get('[data-node-key="variables"]').should('have.class', 'ant-tabs-tab-active');
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"] [title="LVC-Bronchiolite-HSJ"]').should('exist');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/(^106 Results$| of 106$)/).should('exist');
  });

  it('Lien Hospital System', () => {
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(1).find('[href]').eq(0).clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
    cy.get('[data-node-key="variables"]').should('have.class', 'ant-tabs-tab-active');
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"] [title="LVC-Bronchiolite-HSJ"]').should('exist');
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"] [class*="ant-tag"]').contains('pharmacie').should('exist');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/(^9 Results$| of 9$)/).should('exist');
  });
});
