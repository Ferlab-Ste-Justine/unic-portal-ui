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

describe('Tableau Ressources - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
  });

  it('Onglet', () => {
    cy.get('[class*="ant-tabs-tab-active"]').contains('Resources').should('exist');
  });

  it('Tableau [UNICWEB-197]', () => {
    cy.get('[data-row-key="227"] [class="ant-table-cell"]').eq(0).contains('bronchiolite').should('exist');
    cy.get('[data-row-key="227"] [class="ant-table-cell"]').eq(1).contains('LVC-Bronchiolite-HSJ').should('exist');
    cy.get('[data-row-key="227"] [class="ant-table-cell"]').eq(2).contains('Research').should('exist');
    cy.get('[data-row-key="227"] [class="ant-table-cell"]').eq(2).find('[class*="ant-tag-cyan"]').should('exist');
    cy.get('[data-row-key="227"] [class="ant-table-cell"]').eq(3).contains('2024-10-31').should('exist');
    cy.get('[data-row-key="227"] [class="ant-table-cell"]').eq(4).contains(/^2023-03-(09|10)$/).should('exist');
    cy.get('[data-row-key="227"] [class="ant-table-cell"]').eq(5).contains(/^2022-10-(19|20)$/).should('exist');
    cy.get('[data-row-key="227"] [class="ant-table-cell"]').eq(6).contains('17').should('exist');
    cy.get('[data-row-key="227"] [class="ant-table-cell"]').eq(7).contains(catalogVariableCount.LVCBronchioliteHSJ).should('exist');
    cy.get('[data-row-key="227"] [class="ant-table-cell"]').eq(8).contains('Study aimed at').should('exist');
    cy.get('[data-row-key="227"] [class="ant-table-cell"]').eq(9).contains('-').should('exist');
    cy.get('[data-row-key="227"] [class="ant-table-cell"]').eq(10).contains('-').should('exist');
    cy.get('[data-row-key="227"] [class="ant-table-cell"]').eq(11).contains('MP-21-2023-4939').should('exist');
    cy.get('[data-row-key="227"] [class="ant-table-cell"]').eq(12).contains('Dr Olivier Drouin').should('exist');
  });

  it('Popover Description', () => {
    cy.get('[data-row-key="227"] [class="ant-table-cell"]').eq(8).contains('Study').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('[class*="ResourcesTable_popoverDescription"] [class="ant-popover-title"]').contains('LVC-Bronchiolite-HSJ').should('exist');
    cy.get('[class*="ResourcesTable_popoverDescription"] [class="ant-popover-inner-content"]').contains('Study aimed at evaluating practices surrounding the management of bronchiolitis at the CHU Sainte Justine.').should('exist');
  });
});
