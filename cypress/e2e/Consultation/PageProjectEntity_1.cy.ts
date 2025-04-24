/// <reference types="cypress"/>
import 'cypress/support/commands';
import { catalogVariableCount } from 'cypress/support/catalog/variables';
import { entityPageProjectCount } from 'cypress/support/entityPage/project';

beforeEach(() => {
  cy.login();
  cy.visitResourceEntity('bronchiolite');
});

describe('Page d\'un projet - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="page_titleHeader"] [class*="anticon-read"]').should('exist');
    cy.get('[class*="page_titleHeader"]').contains('LVC-Bronchiolite-HSJ').should('exist');
  });

  it('Panneau Summary - Header', () => {
    cy.get('[id="summary"] [class*="EntityCardSummary"] [id="study"]').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_title"] [class*="EntityCardSummary_type"]').contains('Research').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_title"]').contains('LVC-Bronchiolite-HSJ').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_title"] [class*="ant-tag-cyan"]').contains('Research').should('exist');
  });

  it('Panneau Summary - Title', () => {
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(0).contains('Title').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(0).contains('Low-value care; and variation in practice for children hospitalized with bronchiolitis at the CHU Sainte-Justine').should('exist');
  });

  it('Panneau Summary - Description', () => {
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(1).contains('Description').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(1).contains('Study aimed at evaluating practices surrounding the management of bronchiolitis at the CHU Sainte Justine.').should('exist');
  });

  it('Panneau Summary - Investigator Owner', () => {
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(2).contains('Investigator / Owner').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(2).contains('Drouin, Olivier').should('exist');
  });

  it('Panneau Summary - Nagano ID', () => {
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(3).contains('Nagano ID').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(3).contains('MP-21-2023-4939').should('exist');
  });

  it('Panneau Summary - Approved On', () => {
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(3).contains('Approved On').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(3).contains(/^2022-10-(19|20)$/).should('exist');
  });

  it('Panneau Variables - Variable Count', () => {
    cy.get('[id="variables"] [class="ant-descriptions-item-label"]').eq(0).contains('Variable Count').should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(0).contains(catalogVariableCount.LVCBronchioliteHSJ).should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(0).contains(' (in 17 tables)').should('exist');
  });

  it('Panneau Variables - Hospital Systems', () => {
    cy.get('[id="variables"] [class="ant-descriptions-item-label"]').eq(1).contains('Hospital Systems').should('exist');
    cy.get('[id="variables"] [class*="page_tooltipIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent'});
    cy.get('body').contains('Hospital systems used to generate variables for this project.').should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(1).contains('pharmacie (').should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(1).contains(entityPageProjectCount.LVCBronchioliteHSJ.pharmacie).should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(1).contains(/^\)$/).should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(1).contains('icca').should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(1).contains(entityPageProjectCount.LVCBronchioliteHSJ.icca).should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(1).contains('clinibaseci').should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(1).contains(entityPageProjectCount.LVCBronchioliteHSJ.clinibaseci).should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(1).contains('medecho').should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(1).contains(entityPageProjectCount.LVCBronchioliteHSJ.medecho).should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(1).contains('softlab').should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(1).contains(entityPageProjectCount.LVCBronchioliteHSJ.softlab).should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(1).contains('staturgence').should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(1).contains(entityPageProjectCount.LVCBronchioliteHSJ.staturgence).should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(1).contains('loinc').should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(1).contains(entityPageProjectCount.LVCBronchioliteHSJ.loinc).should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(1).contains('laboratoire_systeme').should('exist');
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(1).contains(entityPageProjectCount.LVCBronchioliteHSJ.laboratoire_systeme).should('exist');
  });

  it('Panneau Current version - Published On', () => {
    cy.get('[id="currentVersion"] [class="ant-descriptions-item-label"]').eq(0).contains('Published On').should('exist');
    cy.get('[id="currentVersion"] [class="ant-descriptions-item-content"]').eq(0).contains('2024-10-31').should('exist');
  });

  it('Panneau Current version - Version', () => {
    cy.get('[id="currentVersion"] [class="ant-descriptions-item-label"]').eq(1).contains('Version').should('exist');
    cy.get('[id="currentVersion"] [class*="page_tooltipIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent'});
    cy.get('body').contains('Dictionary version for this project').should('exist');
    cy.get('[id="currentVersion"] [class="ant-descriptions-item-content"]').eq(1).contains('-').should('exist');
  });
});
