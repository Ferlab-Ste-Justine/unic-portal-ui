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

  it('Panneau Summary - Header', () => {
    cy.get('[id="summary"] [class*="EntityCardSummary"] [data-testid="keywording-tools-icon"]').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_title"]').contains('Variable').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_title"]').contains('sector').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_title"] [class="ant-tag"]').contains('string').should('exist');
  });

  it('Panneau Summary - Label', () => {
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(0).contains('Label').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(0).contains('Sector code').should('exist');
  });

  it('Panneau Summary - Resource', () => {
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(1).contains('Resource').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(1).contains('warehouse').should('exist');
  });

  it('Panneau Summary - Table', () => {
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(1).contains('Table').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(1).contains('medical_imaging').should('exist');
  });

  it('Panneau Summary - Notes', () => {
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"]').contains('Notes').should('not.exist');
  });

  it('Panneau Summary - Created On', () => {
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(2).contains('Created On').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(2).find('[class*="ant-col"]').eq(0).find('[class*="tooltipIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent'});
    cy.get('body').contains('Creation date of the dictionary for this variable').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(2).contains('2024-11-04').should('exist');
  });

  it('Panneau Summary - Updated On', () => {
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(2).contains('Updated On').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(2).find('[class*="ant-col"]').eq(1).find('[class*="tooltipIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent'});
    cy.get('body').contains('Date of the most recent update of the dictionary for this variable').should('exist');
    cy.get('[id="summary"] [class*="EntityCardSummary_headerContainerLeft"] [class*="ant-row"]').eq(2).contains('2025-04-24').should('exist');
  });

  it('Panneau Categories - Headers', () => {
    cy.get('[id="categories"] thead th').eq(0).contains('Value').should('exist');
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

  it('Panneau Derivation - Sources', () => {
    cy.get('[id="derivation"] [class="ant-descriptions-item-label"]').eq(0).contains('Sources').should('exist');
    cy.get('[id="derivation"] [class="ant-descriptions-item-content"]').eq(0).find('[class*="SourceLink"]').contains('radimage').should('exist');
    cy.get('[id="derivation"] [class="ant-descriptions-item-content"]').eq(0).find('[class*="SourceLink"]').contains('requete').should('exist');
    cy.get('[id="derivation"] [class="ant-descriptions-item-content"]').eq(0).find('[class*="SourceLink"]').contains('SECTEUR').should('exist');
    cy.get('[id="derivation"] [class="ant-descriptions-item-content"]').eq(0).find('[class*="SourceLink"] [class*="SourceLink_icon"]').eq(1).should('exist');
  });

  it('Panneau Derivation - Algorithm', () => {
    cy.get('[id="derivation"]').eq(1).should('not.exist');
  });
});
