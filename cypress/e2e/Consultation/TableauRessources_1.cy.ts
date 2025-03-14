/// <reference types="cypress"/>
import { oneMinute } from 'cypress/support/utils';
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
  cy.waitWhileSpin(oneMinute);
});

describe('Tableau Ressources - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
  });

  it('Onglet', () => {
    cy.get('[class*="ant-tabs-tab-active"]').contains('Resources').should('exist');
  });

  it('Tableau', () => {
    cy.get('[data-row-key="59"] [class="ant-table-cell"]').eq(0).contains('bronchiolite').should('exist');
    cy.get('[data-row-key="59"] [class="ant-table-cell"]').eq(1).contains('LVC-Bronchiolite-HSJ').should('exist');
    cy.get('[data-row-key="59"] [class="ant-table-cell"]').eq(2).contains('Research').should('exist');
    cy.get('[data-row-key="59"] [class="ant-table-cell"]').eq(2).find('[class*="ant-tag-cyan"]').should('exist');
    cy.get('[data-row-key="59"] [class="ant-table-cell"]').eq(3).contains('2024-08-16').should('exist');
    cy.get('[data-row-key="59"] [class="ant-table-cell"]').eq(4).contains(/^2023-03-(09|10)$/).should('exist');
    cy.get('[data-row-key="59"] [class="ant-table-cell"]').eq(5).contains(/^2022-10-(19|20)$/).should('exist');
    cy.get('[data-row-key="59"] [class="ant-table-cell"]').eq(6).contains('13').should('exist');
    cy.get('[data-row-key="59"] [class="ant-table-cell"]').eq(7).contains('106').should('exist');
    cy.get('[data-row-key="59"] [class="ant-table-cell"]').eq(8).contains('Study aimed at').should('exist');
    cy.get('[data-row-key="59"] [class="ant-table-cell"]').eq(9).contains('-').should('exist');
    cy.get('[data-row-key="59"] [class="ant-table-cell"]').eq(10).contains(/^1$/).should('exist');
    cy.get('[data-row-key="59"] [class="ant-table-cell"]').eq(11).contains('-').should('exist');
    cy.get('[data-row-key="59"] [class="ant-table-cell"]').eq(12).contains('Dr Olivier Drouin').should('exist');
  });

  it('Popover Description', () => {
    cy.get('[data-row-key="59"] [class="ant-table-cell"]').eq(8).contains('Study').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('[class*="ResourcesTable_popoverDescription"] [class="ant-popover-title"]').contains('LVC-Bronchiolite-HSJ').should('exist');
    cy.get('[class*="ResourcesTable_popoverDescription"] [class="ant-popover-inner-content"]').contains('Study aimed at evaluating practices surrounding the management of bronchiolitis at the CHUSJ').should('exist');
  });
});
