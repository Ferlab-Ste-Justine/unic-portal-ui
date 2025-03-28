/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitResourceEntity('centro');
});

describe('Page d\'un Système hospitalier - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="page_titleHeader"] [class*="anticon-read"]').should('exist');
    cy.get('[class*="page_titleHeader"]').contains('centro').should('exist');
  });

  it('Panneau Summary - Header', () => {
    cy.get('[id="summary"] [class*="EntityCardHeader"] [data-testid="caduceus-medicine-icon"]').should('exist');
    cy.get('[id="summary"] [class*="EntityCardHeader"] [class*="EntityCardHeader_type"]').contains('Hospital System').should('exist');
    cy.get('[id="summary"] [class*="EntityCardHeader"] [class*="EntityCardHeader_name"]').contains('centro').should('exist');
  });

  it('Panneau Summary - Description', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(0).contains('Description').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(0).contains('Information system for the CHUSJ outpatient clinics. This source includes all electronic forms developed in the different hospital departments').should('exist');
  });

  it('Panneau Summary - Type', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(1).contains('Type').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(1).contains('Hospital System').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(1).find('[class*="ant-tag-purple"]').should('exist');
  });

  it('Panneau Summary - Collection Starting Year', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(2).contains('Collection Starting Year').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(2).contains('2012').should('exist');
  });

  it('Panneau Variables - Variable Count', () => {
    cy.get('[id="variables"] [class="ant-descriptions-item-label"]').eq(0).contains('Variable Count').should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(0).contains('13654').should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(0).contains(' (in 419 tables)').should('exist');
  });

  it('Panneau Current version - Published On', () => {
    cy.get('[id="currentVersion"] [class="ant-descriptions-item-label"]').eq(0).contains('Published On').should('exist');
    cy.get('[id="currentVersion"] [class="ant-descriptions-item-content"]').eq(0).contains('2024-08-16').should('exist');
  });

  it('Panneau Current version - Version', () => {
    cy.get('[id="currentVersion"] [class="ant-descriptions-item-label"]').eq(1).contains('Version').should('exist');
    cy.get('[id="currentVersion"] [class*="page_tooltipIcon"]').should('not.exist');
    cy.get('[id="currentVersion"] [class="ant-descriptions-item-content"]').eq(1).contains(/^1$/).should('exist');
  });
});
