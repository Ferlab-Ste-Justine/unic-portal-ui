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
    cy.get('[id="summary"] [class*="EntityCardSummary"] [data-testid="caduceus-medicine-icon"]').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_title"] [class*="EntityCardSummary_type"]').contains('Hospital System').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_title"]').contains('centro').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_title"] [class*="ant-tag-purple"]').contains('Hospital System').should('exist');
  });

  it('Panneau Summary - Description', () => {
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(1).contains('Description').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(1).contains('Information system for the CHU Sainte Justine outpatient clinics including all electronic forms developed in the different hospital departments.').should('exist');
  });

  it('Panneau Summary - Collection Starting Year', () => {
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(3).contains('Collection Starting Year').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(3).contains('2012').should('exist');
  });

  it('Panneau Variables - Variable Count', () => {
    cy.get('[id="variables"] [class="ant-descriptions-item-label"]').eq(0).contains('Variable Count').should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(0).contains('13677').should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(0).contains(' (in 419 tables)').should('exist');
  });

  it('Panneau Current version - Published On', () => {
    cy.get('[id="currentVersion"] [class="ant-descriptions-item-label"]').eq(0).contains('Published On').should('exist');
    cy.get('[id="currentVersion"] [class="ant-descriptions-item-content"]').eq(0).contains('2024-10-31').should('exist');
  });

  it('Panneau Current version - Version [UNICWEB-189]', () => {
    cy.get('[id="currentVersion"] [class="ant-descriptions-item-label"]').eq(1).contains('Version').should('exist');
    cy.get('[id="currentVersion"] [class*="page_tooltipIcon"]').should('not.exist');
    cy.get('[id="currentVersion"] [class="ant-descriptions-item-content"]').eq(1).contains(/^1$/).should('exist');
  });
});
