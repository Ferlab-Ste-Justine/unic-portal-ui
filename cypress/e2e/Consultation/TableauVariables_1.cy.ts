/// <reference types="cypress"/>
import 'cypress/support/commands';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
  cy.showColumn('Created On', 1);
  cy.showColumn('Updated On', 1);
});

describe('Tableau Variables - Vérifier les informations affichées', () => {
  it('Titre', () => {
    ResourcesTable.validations.shouldShowPageTitle();
  });

  it('Onglet', () => {
    cy.get('[class*="ant-tabs-tab-active"]').contains('Variables').should('exist');
  });

  it('Tableau', () => {
    cy.get('[data-row-key="46063"] [class="ant-table-cell"]').eq(0).contains('#_Admitted_COVID').should('exist');
    cy.get('[data-row-key="46063"] [class="ant-table-cell"]').eq(1).contains('Number of patients positive COVID that was hospitalized').should('exist');
    cy.get('[data-row-key="46063"] [class="ant-table-cell"]').eq(2).contains('Germes').should('exist');
    cy.get('[data-row-key="46063"] [class="ant-table-cell"]').eq(3).contains('weekly_summary').should('exist');
    cy.get('[data-row-key="46063"] [class="ant-table-cell"]').eq(4).contains('integer').should('exist');
    cy.get('[data-row-key="46063"] [class="ant-table-cell"]').eq(4).find('[class="ant-tag"]').should('exist');
    cy.get('[data-row-key="46063"] [class="ant-table-cell"]').eq(5).contains('softlab, loinc').should('exist');
    cy.get('[data-row-key="46063"] [class="ant-table-cell"]').eq(6).contains('2024-11-05').should('exist');
    cy.get('[data-row-key="46063"] [class="ant-table-cell"]').eq(7).contains('2024-11-05').should('exist');
  });
});
