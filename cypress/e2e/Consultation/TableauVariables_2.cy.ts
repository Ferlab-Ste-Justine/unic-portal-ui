/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
  cy.showColumn('Source Name', 1);
  cy.showColumn('Created On', 1);
  cy.showColumn('Updated On', 1);
});

describe('Tableau Variables - Valider les liens disponibles', () => {
  it('Lien Name', () => {
    cy.get('[data-row-key="46063"] [class="ant-table-cell"]').eq(0).find('[href]').clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('#_Admitted_COVID').should('exist');
  });

  it('Lien Table', () => {
    cy.get('[data-row-key="46063"] [class="ant-table-cell"]').eq(5).find('[href]').clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('weekly_summary').should('exist');
  });

  it('Lien Resource', () => {
    cy.get('[data-row-key="46063"] [class="ant-table-cell"]').eq(6).find('[href]').clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('Germes').should('exist');
  });
});
