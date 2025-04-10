/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitVariableEntity('warehouse', 'medical_imaging', 'sector');
});

describe('Page d\'une variable - Valider les liens disponibles', () => {
  it('Lien Title Catalog', () => {
    cy.get('[class*="page_titleHeader"]').find('[href]').eq(0).clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
  });

  it('Lien Title Resource', () => {
    cy.get('[class*="page_titleHeader"]').find('[href]').eq(1).clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('warehouse').should('exist');
  });

  it('Lien Title Table', () => {
    cy.get('[class*="page_titleHeader"]').find('[href]').eq(2).clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('medical_imaging').should('exist');
  });

  it('Lien Resource', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(1).find('[href]').clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('warehouse').should('exist');
  });

  it('Lien Table', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(2).find('[href]').clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('medical_imaging').should('exist');
  });

  it('Lien Derivation Resource', () => {
    cy.get('[id="derivation"] [class="ant-descriptions-item-content"]').eq(0).find('[class*="SourceLink"] [href="/resource/radimage"]').eq(0).clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('radimage').should('exist');
  });

  it('Lien Derivation Table', () => {
    cy.get('[id="derivation"] [class="ant-descriptions-item-content"]').eq(0).find('[class*="SourceLink"] [href="/table/radimage/requete"]').clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('requete').should('exist');
  });

  it('Lien Derivation Variable', () => {
    cy.get('[id="derivation"] [class="ant-descriptions-item-content"]').eq(0).find('[class*="SourceLink"] [href="/variable/radimage/requete/SECTEUR"]').clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('SECTEUR').should('exist');
  });
});
