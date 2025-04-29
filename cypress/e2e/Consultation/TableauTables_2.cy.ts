/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('tables');
  cy.showColumn('Entity', 1);
  cy.showColumn('Domain', 1);
  cy.showColumn('Created On', 1);
  cy.showColumn('Updated On', 1);
});

describe('Tableau Tables - Valider les liens disponibles', () => {
  it('Lien Name', () => {
    cy.get('[data-row-key="1188"] [class="ant-table-cell"]').eq(0).find('[href]').clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('accouchement').should('exist');
  });

  it('Lien Resource', () => {
    cy.get('[data-row-key="1188"] [class="ant-table-cell"]').eq(2).find('[href]').clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('RESPPA').should('exist');
  });

  it('Lien Variable Count', () => {
    cy.get('[data-row-key="1188"] [class="ant-table-cell"]').eq(5).find('a').clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
    cy.get('[data-node-key="variables"]').should('have.class', 'ant-tabs-tab-active');
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"] [title="accouchement"]').should('exist');
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"] [title="RESPPA"]').should('exist');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/(^11 Results$| of 11$)/).should('exist');
  });
});
