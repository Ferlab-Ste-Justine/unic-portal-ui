/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
  cy.showColumn('Source Name', 1);
  cy.showColumn('Created On', 1);
  cy.showColumn('Updated On', 1);
});

describe('Tableau Variables - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
  });

  it('Onglet', () => {
    cy.get('[class*="ant-tabs-tab-active"]').contains('Variables').should('exist');
  });

  it('Tableau', () => {
    cy.get('[data-row-key="76476"] [class="ant-table-cell"]').eq(0).contains('#_Admitted_COVID').should('exist');
    cy.get('[data-row-key="76476"] [class="ant-table-cell"]').eq(1).contains('Number of patients positive COVID that was hospitalized').should('exist');
    cy.get('[data-row-key="76476"] [class="ant-table-cell"]').eq(2).contains('integer').should('exist');
    cy.get('[data-row-key="76476"] [class="ant-table-cell"]').eq(2).find('[class="ant-tag"]').should('exist');
    cy.get('[data-row-key="76476"] [class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[data-row-key="76476"] [class="ant-table-cell"]').eq(4).contains('-').should('exist');
    cy.get('[data-row-key="76476"] [class="ant-table-cell"]').eq(5).contains('weekly_summary').should('exist');
    cy.get('[data-row-key="76476"] [class="ant-table-cell"]').eq(6).contains('surveillancegermes').should('exist');
    cy.get('[data-row-key="76476"] [class="ant-table-cell"]').eq(7).contains('2024-09-17').should('exist');
    cy.get('[data-row-key="76476"] [class="ant-table-cell"]').eq(8).contains('2024-09-17').should('exist');
  });
});
