/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitResourceEntity('bronchiolite');
});

describe('Page d\'un projet - Valider les liens disponibles', () => {
  it('Lien Title', () => {
    cy.get('[class*="page_titleHeader"]').find('[href]').clickAndWait();
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
  });

  it('Lien Variable Count', () => {
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(0).find('[href]').clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('LVC-Bronchiolite-HSJ').should('exist');
  });

  it('Lien Hospital System', () => {
    cy.get('[id="variables"] [class="ant-descriptions-item-content"]').eq(1).find('[href]').eq(0).clickAndWait();
    cy.get('[class*="page_titleHeader"]').contains('LVC-Bronchiolite-HSJ').should('exist');
  });
});
