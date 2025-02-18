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
    cy.get('[data-row-key="59"] [class="ant-table-cell"]').eq(4).contains('2023-03-09').should('exist');
    cy.get('[data-row-key="59"] [class="ant-table-cell"]').eq(5).contains('2022-10-19').should('exist');
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

describe('Tableau Ressources - Valider les liens disponibles', () => {
  it('Lien Code', () => {
    cy.get('[data-row-key="59"] [class="ant-table-cell"]').eq(0).find('[href]').clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC data portal').should('exist');
  });

  it('Lien Name', () => {
    cy.get('[data-row-key="59"] [class="ant-table-cell"]').eq(1).find('[href]').clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC data portal').should('exist');
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

describe('Tableau Ressources - Valider les fonctionnalités du tableau', () => {
  it('Valider les fonctionnalités du tableau - Tri Code', () => {
    cy.sortTableAndWait('Code');
    cy.validateTableFirstRow('bronchiolite', 0);
    cy.sortTableAndIntercept('Code', 1);
    cy.validateTableFirstRow('warehouse', 0);
  });

  it('Valider les fonctionnalités du tableau - Tri Name', () => {
    cy.sortTableAndIntercept('Name', 1);
    cy.validateTableFirstRow('Biobank Respiratoire', 1);
    cy.sortTableAndIntercept('Name', 1);
    cy.validateTableFirstRow('warehouse', 1);
  });

  it('Valider les fonctionnalités du tableau - Tri Type', () => {
    cy.sortTableAndIntercept('Type', 1);
    cy.validateTableFirstRow('EQP', 2);
    cy.sortTableAndIntercept('Type', 1);
    cy.validateTableFirstRow('Warehouse', 2);
  });

  it('Valider les fonctionnalités du tableau - Tri Updated On', () => {
    cy.sortTableAndIntercept('Updated On', 1);
    cy.validateTableFirstRow('2024-08-16', 3);
    cy.sortTableAndIntercept('Updated On', 1);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 3);
  });

  it('Valider les fonctionnalités du tableau - Tri Created On', () => {
    cy.sortTableAndIntercept('Created On', 1);
    cy.validateTableFirstRow('2022-02-14', 4);
    cy.sortTableAndIntercept('Created On', 1);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 4);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndWait('Code');
    cy.sortTableAndIntercept('Name', 1);
    cy.sortTableAndIntercept('Name', 1);
    cy.validateTableFirstRow('bronchiolite', 0);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validatePaging('51', 0);
  });
});
