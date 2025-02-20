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

describe('Tableau Ressources - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
  });

  it('Onglet', () => {
    cy.get('[class*="ant-tabs-tab-active"]').contains('Tables').should('exist');
  });

  it('Tableau', () => {
    cy.get('[data-row-key="2139"] [class="ant-table-cell"]').eq(0).contains('accouchement').should('exist');
    cy.get('[data-row-key="2139"] [class="ant-table-cell"]').eq(1).contains('Information regarding childbirth').should('exist');
    cy.get('[data-row-key="2139"] [class="ant-table-cell"]').eq(2).contains('resppa').should('exist');
    cy.get('[data-row-key="2139"] [class="ant-table-cell"]').eq(3).contains('delivery').should('exist');
    cy.get('[data-row-key="2139"] [class="ant-table-cell"]').eq(4).contains('-').should('exist');
    cy.get('[data-row-key="2139"] [class="ant-table-cell"]').eq(5).contains('11').should('exist');
    cy.get('[data-row-key="2139"] [class="ant-table-cell"]').eq(6).contains('2024-09-17').should('exist');
    cy.get('[data-row-key="2139"] [class="ant-table-cell"]').eq(7).contains('2024-09-17').should('exist');
  });
});

describe('Tableau Ressources - Valider les liens disponibles', () => {
  it('Lien Name', () => {
    cy.get('[data-row-key="2139"] [class="ant-table-cell"]').eq(0).find('[href]').clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC data portal').should('exist');
  });

  it('Lien Variable Count', () => {
    cy.get('[data-row-key="2139"] [class="ant-table-cell"]').eq(5).find('a').clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
  });
});

describe('Tableau Ressources - Valider les fonctionnalités du tableau', () => {
  it('Valider les fonctionnalités du tableau - Tri Name', () => {
    cy.sortTableAndWait('Name', 1);
    cy.validateTableFirstRow('accouchement', 0, false, '[id="rc-tabs-0-panel-TablesTable"]');
    cy.sortTableAndIntercept('Name', 1, 1);
    cy.validateTableFirstRow('weekly_summary', 0, false, '[id="rc-tabs-0-panel-TablesTable"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Resource', () => {
    cy.sortTableAndIntercept('Resource', 1, 1);
    cy.validateTableFirstRow('bronchiolite', 2, false, '[id="rc-tabs-0-panel-TablesTable"]');
    cy.sortTableAndIntercept('Resource', 1, 1);
    cy.validateTableFirstRow('warehouse', 2, false, '[id="rc-tabs-0-panel-TablesTable"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Entity', () => {
    cy.sortTableAndIntercept('Entity', 1, 1);
    cy.validateTableFirstRow('delivery', 3, false, '[id="rc-tabs-0-panel-TablesTable"]');
    cy.sortTableAndIntercept('Entity', 1, 1);
    cy.validateTableFirstRow('procedure', 3, false, '[id="rc-tabs-0-panel-TablesTable"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Domain', () => {
    cy.sortTableAndIntercept('Domain', 1, 1);
    cy.validateTableFirstRow('imaging', 4, false, '[id="rc-tabs-0-panel-TablesTable"]');
    cy.sortTableAndIntercept('Domain', 1, 1);
    cy.validateTableFirstRow('transfusion', 4, false, '[id="rc-tabs-0-panel-TablesTable"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Created On', () => {
    cy.sortTableAndIntercept('Created On', 1, 1);
    cy.validateTableFirstRow('2024-08-16', 6, false, '[id="rc-tabs-0-panel-TablesTable"]');
    cy.sortTableAndIntercept('Created On', 1, 1);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 6, false, '[id="rc-tabs-0-panel-TablesTable"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Updated On', () => {
    cy.sortTableAndIntercept('Updated On', 1, 1);
    cy.validateTableFirstRow('2024-08-16', 7, false, '[id="rc-tabs-0-panel-TablesTable"]');
    cy.sortTableAndIntercept('Updated On', 1, 1);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 7, false, '[id="rc-tabs-0-panel-TablesTable"]');
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Resource', 1, 1);
    cy.sortTableAndIntercept('Name', 1, 1);
    cy.validateTableFirstRow('consultation_complication', 0, false, '[id="rc-tabs-0-panel-TablesTable"]');
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validatePaging('1,099', 1);
  });
});
