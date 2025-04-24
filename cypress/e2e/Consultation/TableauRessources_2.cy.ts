/// <reference types="cypress"/>
import { oneMinute } from 'cypress/support/utils';
import 'cypress/support/commands';
import { catalogVariableCount } from 'cypress/support/catalog/variables';

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
  cy.get('[id*="panel-resources"] [class*="InputSearch_filter"] input').type('bronchiolite');
  cy.waitWhileSpin(oneMinute);
});

describe('Tableau Ressources - Valider les liens disponibles', () => {
  it('Lien Code', () => {
    cy.get('[data-row-key="227"] [class="ant-table-cell"]').eq(0).find('[href]').clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('LVC-Bronchiolite-HSJ').should('exist');
  });

  it('Lien Name', () => {
    cy.get('[data-row-key="227"] [class="ant-table-cell"]').eq(1).find('[href]').clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('LVC-Bronchiolite-HSJ').should('exist');
  });

  it('Lien Table (Research)', () => {
    cy.get('[data-row-key="227"] [class="ant-table-cell"]').eq(6).find('a').clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
    cy.get('[data-node-key="tables"]').should('have.class', 'ant-tabs-tab-active');
    cy.get('[id*="panel-tables"] [class*="InputSelect_filter"] [title="LVC-Bronchiolite-HSJ"]').should('exist');
    cy.get('[id*="panel-tables"] [class*="Header_ProTableHeader"]').contains(/(^17 Results$| of 17$)/).should('exist');
  });

  it('Lien Table (Hospital System)', () => {
    cy.get('[data-row-key="181"] [class="ant-table-cell"]').eq(6).find('a').clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
    cy.get('[data-node-key="tables"]').should('have.class', 'ant-tabs-tab-active');
    cy.get('[id*="panel-tables"] [class*="InputSelect_filter"] [title="centro"]').should('exist');
    cy.get('[id*="panel-tables"] [class*="Header_ProTableHeader"]').contains(/(^419 Results$| of 419$)/).should('exist');
  });

  it('Lien Variable (Research)', () => {
    cy.get('[data-row-key="227"] [class="ant-table-cell"]').eq(7).find('a').clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
    cy.get('[data-node-key="variables"]').should('have.class', 'ant-tabs-tab-active');
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"] [title="LVC-Bronchiolite-HSJ"]').should('exist');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(new RegExp(`(^${catalogVariableCount.LVCBronchioliteHSJ} Results$| of ${catalogVariableCount.LVCBronchioliteHSJ}$)`)).should('exist');
  });

  it('Lien Variable (Hospital System)', () => {
    cy.get('[data-row-key="181"] [class="ant-table-cell"]').eq(7).find('a').clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
    cy.get('[data-node-key="variables"]').should('have.class', 'ant-tabs-tab-active');
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"] [title="centro"]').should('exist');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/(^13.7K Results$| of 13.7K$)/).should('exist');
  });
});
