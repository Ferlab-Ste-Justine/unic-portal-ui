/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitVariableEntity('warehouse', 'medical_imaging', 'sector');
});

describe('Page d\'une variable - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="page_titleHeader"] [data-icon="read"]').should('exist');
    cy.get('[class*="page_titleHeader"]').contains('warehouse').should('exist');
    cy.get('[class*="page_titleHeader"]').contains('medical_imaging').should('exist');
    cy.get('[class*="page_titleHeader"]').contains('sector').should('exist');
  });

  it('Panneau Summary - Name', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(0).contains('Name').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(0).contains('sector').should('exist');
  });

  it('Panneau Summary - Label', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(1).contains('Label').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(1).contains('Sector code').should('exist');
  });

  it('Panneau Summary - Resource', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(2).contains('Resource').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(2).contains('warehouse').should('exist');
  });

  it('Panneau Summary - Table', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(3).contains('Table').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(3).contains('medical_imaging').should('exist');
  });

  it('Panneau Summary - Type', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(4).contains('Type').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(4).contains('string').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(4).find('[class="ant-tag"]').should('exist');
  });

  it('Panneau Summary - Derivation Algorithm', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(5).contains('Derivation Algorithm').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(5).contains('AS IS (JOIN)').should('exist');
  });

  it('Panneau Summary - Notes', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(6).contains('Notes').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(6).contains('-').should('exist');
  });

  it('Panneau Categories - Headers', () => {
    cy.get('[id="categories"] thead th').eq(0).contains('Values').should('exist');
    cy.get('[id="categories"] thead th').eq(1).contains('Label').should('exist');
  });

  it('Panneau Categories - Data', () => {
    cy.get('[id="categories"] [data-row-key="CA"] td').eq(0).contains('CA').should('exist');
    cy.get('[id="categories"] [data-row-key="CA"] td').eq(1).contains('Cardiology').should('exist');
    cy.get('[id="categories"] [data-row-key="RA"] td').eq(0).contains('RA').should('exist');
    cy.get('[id="categories"] [data-row-key="RA"] td').eq(1).contains('Radiology').should('exist');
    cy.get('[id="categories"] [data-row-key="MN"] td').eq(0).contains('MN').should('exist');
    cy.get('[id="categories"] [data-row-key="MN"] td').eq(1).contains('Nuclear medicine').should('exist');
    cy.get('[id="categories"] [data-row-key="OG"] td').eq(0).contains('OG').should('exist');
    cy.get('[id="categories"] [data-row-key="OG"] td').eq(1).contains('Obstetric and gynecology').should('exist');
  });

  it('Panneau History - Created On', () => {
    cy.get('[id="history"] [class="ant-descriptions-item-label"]').eq(0).contains('Created On').should('exist');
    cy.get('[id="history"] [class="ant-descriptions-item-content"]').eq(0).contains('2024-08-16').should('exist');
  });

  it('Panneau History - Updated On', () => {
    cy.get('[id="history"] [class="ant-descriptions-item-label"]').eq(1).contains('Updated On').should('exist');
    cy.get('[id="history"] [class="ant-descriptions-item-content"]').eq(0).contains('2024-08-16').should('exist');
  });
});
