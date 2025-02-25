/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('Tables');
  cy.showColumn('Entity', 1);
  cy.showColumn('Domain', 1);
  cy.showColumn('Created On', 1);
  cy.showColumn('Updated On', 1);
});

describe('Tableau Tables - Valider les liens disponibles', () => {
  it('Lien Name', () => {
    cy.get('[data-row-key="2139"] [class="ant-table-cell"]').eq(0).find('[href]').clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('accouchement').should('exist');
  });

  it('Lien Variable Count', () => {
    cy.get('[data-row-key="2139"] [class="ant-table-cell"]').eq(5).find('a').clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
  });
});
