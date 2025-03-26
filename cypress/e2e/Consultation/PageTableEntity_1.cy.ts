/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitTableEntity('resppa', 'accouchement');
});

describe('Page d\'une table - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="page_titleHeader"] [data-icon="read"]').should('exist');
    cy.get('[class*="page_titleHeader"]').contains('RESPPA').should('exist');
    cy.get('[class*="page_titleHeader"]').contains('accouchement').should('exist');
  });

  it('Panneau Summary - Resource', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(0).contains('Resource').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(0).contains('RESPPA').should('exist');
  });

  it('Panneau Summary - Description', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(1).contains('Description').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(1).contains('Information regarding childbirth').should('exist');
  });

  it('Panneau Summary - Entity', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(2).contains('Entity').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(2).contains('delivery').should('exist');
  });

  it('Panneau Summary - Domain', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').contains('Domain').should('not.exist');
  });

  it('Panneau Summary - Row Filter', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').contains('Row Filter').should('not.exist');
  });

  it('Panneau Variables - Variable Count', () => {
    cy.get('[id="variables"] [class="ant-descriptions-item-label"]').eq(0).contains('Variable Count').should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(0).contains(/^11$/).should('exist');
  });

  it('Panneau History - Created On', () => {
    cy.get('[id="history"] [class="ant-descriptions-item-label"]').eq(0).contains('Created On').should('exist');
    cy.get('[id="history"] [class="ant-descriptions-item-content"]').eq(0).contains('2024-09-17').should('exist');
  });

  it('Panneau History - Updated On', () => {
    cy.get('[id="history"] [class="ant-descriptions-item-label"]').eq(1).contains('Updated On').should('exist');
    cy.get('[id="history"] [class="ant-descriptions-item-content"]').eq(1).contains('2024-09-17').should('exist');
  });
});
