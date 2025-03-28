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
    cy.get('[id="summary"] [class*="EntityCardHeader"] [data-testid="pattern-system-icon"]').should('exist');
    cy.get('[id="summary"] [class*="EntityCardHeader"] [class*="EntityCardHeader_type"]').contains('Table').should('exist');
    cy.get('[id="summary"] [class*="EntityCardHeader"] [class*="EntityCardHeader_name"]').contains('pathology').should('exist');
  });

  it('Panneau Summary - Resource', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(0).contains('Resource').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(0).contains('warehouse').should('exist');
  });

  it('Panneau Summary - Description', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(1).contains('Description').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(1).contains('Pathology exams').should('exist');
  });

  it('Panneau Summary - Entity', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(2).contains('Entity').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(2).contains('observation').should('exist');
  });

  it('Panneau Summary - Domain', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(3).contains('Domain').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(3).contains('pathology').should('exist');
  });

  it('Panneau Summary - Row Filter', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').contains('Row Filter').should('not.exist');
  });

  it('Panneau Variables - Variable Count', () => {
    cy.get('[id="variables"] [class="ant-descriptions-item-label"]').eq(0).contains('Variable Count').should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(0).contains(/^47$/).should('exist');
  });

  it('Panneau History - Created On', () => {
    cy.get('[id="history"] [class="ant-descriptions-item-label"]').eq(0).contains('Created On').should('exist');
    cy.get('[id="history"] [class="ant-descriptions-item-content"]').eq(0).contains('2024-08-16').should('exist');
  });

  it('Panneau History - Updated On', () => {
    cy.get('[id="history"] [class="ant-descriptions-item-label"]').eq(1).contains('Updated On').should('exist');
    cy.get('[id="history"] [class="ant-descriptions-item-content"]').eq(1).contains('2024-08-16').should('exist');
  });
});
