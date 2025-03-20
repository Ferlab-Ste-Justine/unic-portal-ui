/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitResourceEntity('centro');
});

describe('Page d\'un Système hospitalier - Valider les liens disponibles', () => {
  it('Lien Title', () => {
    cy.get('[class*="page_titleHeader"]').find('[href]').clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
  });

  it('Lien Variable Count', () => {
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(0).find('[href]').clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
    cy.get('[data-node-key="variables"]').should('have.class', 'ant-tabs-tab-active');
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"] [title="centro"]').should('exist');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/(^13.7K Results$| of 13.7K$)/).should('exist');
  });
});
