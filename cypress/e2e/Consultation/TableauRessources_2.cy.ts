/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog();
  cy.showColumn('Code');
  cy.showColumn('Created On');
  cy.showColumn('Approved On');
  cy.showColumn('Collection Starting Year');
  cy.showColumn('Version');
  cy.showColumn('Nagano ID');
  cy.showColumn('Principal Investigator');
});

describe('Tableau Ressources - Valider les liens disponibles', () => {
  it('Lien Code', () => {
    cy.get('[data-row-key="59"] [class="ant-table-cell"]').eq(0).find('[href]').clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('LVC-Bronchiolite-HSJ').should('exist');
  });

  it('Lien Name', () => {
    cy.get('[data-row-key="59"] [class="ant-table-cell"]').eq(1).find('[href]').clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('LVC-Bronchiolite-HSJ').should('exist');
  });

  it('Lien Table', () => {
    cy.get('[data-row-key="59"] [class="ant-table-cell"]').eq(6).find('a').clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
  });

  it('Lien Variable', () => {
    cy.get('[data-row-key="59"] [class="ant-table-cell"]').eq(7).find('a').clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
  });
});
