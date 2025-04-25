/// <reference types="cypress"/>
import 'cypress/support/commands';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';

beforeEach(() => {
  cy.login();
  cy.visit('/');
});

describe('Page d\'accueil - Valider les liens disponibles', () => {
  it('Carte Warehouse - Bouton', () => {
    cy.get('[class*="WarehouseCard_homeCardContent"] button').clickAndWait();
    ResourcesTable.validations.pageTitle();
    cy.get('[id*="panel-resources"] [class*="InputSelect_filter"] [class*="ant-tag-orange"]').contains('Warehouse').should('exist');
  });

  it('Carte Projects - Bouton', () => {
    cy.get('[class*="ResearchProjectsCard_homeCardContent"] button').clickAndWait();
    ResourcesTable.validations.pageTitle();
    cy.get('[id*="panel-resources"] [class*="InputSelect_filter"] [class*="ant-tag-cyan"]').contains('Research').should('exist');
  });

  it('Carte EQP - Bouton', () => {
    cy.get('[class*="EQPProjectsCard_homeCardContent"] button').clickAndWait();
    ResourcesTable.validations.pageTitle();
    cy.get('[id*="panel-resources"] [class*="InputSelect_filter"] [class*="ant-tag-blue"]').contains('EQP').should('exist');
  });

  it('Carte Systems - Bouton', () => {
    cy.get('[class*="HospitalSystemsCard_homeCardContent"] button').clickAndWait();
    ResourcesTable.validations.pageTitle();
    cy.get('[id*="panel-resources"] [class*="InputSelect_filter"] [class*="ant-tag-purple"]').contains('Hospital System').should('exist');
  });
});
