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

describe('Tableau Tables - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
  });

  it('Onglet', () => {
    cy.get('[class*="ant-tabs-tab-active"]').contains('Tables').should('exist');
  });

  it('Tableau', () => {
    cy.get('[data-row-key="1188"] [class="ant-table-cell"]').eq(0).contains('accouchement').should('exist');
    cy.get('[data-row-key="1188"] [class="ant-table-cell"]').eq(1).contains('Information regarding childbirth').should('exist');
    cy.get('[data-row-key="1188"] [class="ant-table-cell"]').eq(2).contains('RESPPA').should('exist');
    cy.get('[data-row-key="1188"] [class="ant-table-cell"]').eq(3).contains('delivery').should('exist');
    cy.get('[data-row-key="1188"] [class="ant-table-cell"]').eq(4).contains('-').should('exist');
    cy.get('[data-row-key="1188"] [class="ant-table-cell"]').eq(5).contains('11').should('exist');
    cy.get('[data-row-key="1188"] [class="ant-table-cell"]').eq(6).contains('2024-11-05').should('exist');
    cy.get('[data-row-key="1188"] [class="ant-table-cell"]').eq(7).contains('2024-11-05').should('exist');
  });
});
