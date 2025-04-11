/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitTableEntity('warehouse', 'pathology');
});

describe('Page d\'une table - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="page_titleHeader"] [data-icon="read"]').should('exist');
    cy.get('[class*="page_titleHeader"]').contains('warehouse').should('exist');
    cy.get('[class*="page_titleHeader"]').contains('pathology').should('exist');
  });

  it('Panneau Summary - Header', () => {
    cy.get('[id="summary"] [class*="EntityCardSummary"] [data-testid="pattern-system-icon"]').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_title"]').contains('Table').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_title"]').contains('pathology').should('exist');
  });

  it('Panneau Summary - Resource', () => {
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(0).contains('Resource').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(0).contains('warehouse').should('exist');
  });

  it('Panneau Summary - Description', () => {
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(1).contains('Description').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(1).contains('Pathology exams').should('exist');
  });

  it('Panneau Summary - Entity', () => {
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(2).contains('Entity').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(2).find('[class*="ant-col"]').eq(0).find('[class*="tooltipIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent'});
    cy.get('body').contains('The entity refers to the object to which the variable is associated (e.g. the variable “age” is associated with “patient”). The entity describes the context or level to which the data pertains.').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(2).contains('observation').should('exist');
  });

  it('Panneau Summary - Domain', () => {
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(2).contains('Domain').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(2).find('[class*="ant-col"]').eq(1).find('[class*="tooltipIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent'});
    cy.get('body').contains('The domain refers to the specific thematic field in which the variables are collected or applied.').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(2).contains('pathology').should('exist');
  });

  it('Panneau Summary - Row Filter', () => {
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').contains('Row Filter').should('not.exist');
  });

  it('Panneau Variables - Variable Count', () => {
    cy.get('[id="variables"] [class="ant-descriptions-item-label"]').eq(0).contains('Variable Count').should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(0).contains(/^47$/).should('exist');
  });

  it('Panneau History - Created On', () => {
    cy.get('[id="history"] [class="ant-descriptions-item-label"]').eq(0).contains('Created On').should('exist');
    cy.get('[id="history"] [class="ant-descriptions-item-label"]').eq(0).find('[class*="tooltipIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent'});
    cy.get('body').contains('Creation date of the dictionary for this table').should('exist');
    cy.get('[id="history"] [class="ant-descriptions-item-content"]').eq(0).contains('2024-08-16').should('exist');
  });

  it('Panneau History - Updated On', () => {
    cy.get('[id="history"] [class="ant-descriptions-item-label"]').eq(1).contains('Updated On').should('exist');
    cy.get('[id="history"] [class="ant-descriptions-item-label"]').eq(1).find('[class*="tooltipIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent'});
    cy.get('body').contains('Date of the most recent update of the dictionary for this table').should('exist');
    cy.get('[id="history"] [class="ant-descriptions-item-content"]').eq(1).contains('2024-08-16').should('exist');
  });
});
