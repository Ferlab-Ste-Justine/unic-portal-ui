/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visit('/');
});

describe('Page d\'accueil - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Data Catalog').should('exist');
  });

  it('Sous-titre', () => {
    cy.get('[class*="PageLayout_subTitlePage"]').contains('Explore UnIC data dictionaries by resource type:').should('exist');
  });

  it('Carte Warehouse - Icône', () => {
    cy.get('[class*="WarehouseCard_homeCardHeader"] path[fill="#FFE7BA"]').should('exist');
  });

  it('Carte Warehouse - Titre', () => {
    cy.get('[class*="WarehouseCard_homeCardTitle"]').contains('Warehouse');
  });

  it('Carte Warehouse - Description', () => {
    cy.get('[class*="WarehouseCard_homeCardDescription"]').contains('Explore all data warehouse variables by domain');
  });

  it('Carte Warehouse - Statistiques', () => {
    cy.get('[class*="WarehouseCard_homeCardStats"] [class*="ant-tag-orange"]').eq(0).contains(/^\d{1}/);
    cy.get('[class*="WarehouseCard_homeCardStats"] [class*="ant-tag-orange"]').eq(0).contains('tables');
    cy.get('[class*="WarehouseCard_homeCardStats"] [class*="ant-tag-orange"]').eq(1).contains(/^\d{1}/);
    cy.get('[class*="WarehouseCard_homeCardStats"] [class*="ant-tag-orange"]').eq(1).contains('variables');
    cy.get('[class*="WarehouseCard_homeCardStats"] [class*="ant-tag-orange"]').eq(2).contains(/^\d{1}/);
    cy.get('[class*="WarehouseCard_homeCardStats"] [class*="ant-tag-orange"]').eq(2).contains('hospital systems');
    cy.get('[class*="WarehouseCard_homeCardStats"] [class*="ant-tag-orange"]').eq(3).contains(/^\d{1}/);
    cy.get('[class*="WarehouseCard_homeCardStats"] [class*="ant-tag-orange"]').eq(3).contains('domains');
  });

  it('Carte Warehouse - Bouton', () => {
    cy.get('[class*="WarehouseCard_homeCardContent"] button').contains('Explore');
  });

  it('Carte Projects - Icône', () => {
    cy.get('[class*="ResearchProjectsCard_homeCardHeader"] path[fill="#B5F5EC"]').should('exist');
  });

  it('Carte Projects - Titre', () => {
    cy.get('[class*="ResearchProjectsCard_homeCardTitle"]').contains('Research Projects');
  });

  it('Carte Projects - Description', () => {
    cy.get('[class*="ResearchProjectsCard_homeCardDescription"]').contains('Explore research project data dictionaries');
  });

  it('Carte Projects - Statistiques', () => {
    cy.get('[class*="ResearchProjectsCard_homeCardStats"] [class*="ant-tag-cyan"]').eq(0).contains(/^\d{1}/);
    cy.get('[class*="ResearchProjectsCard_homeCardStats"] [class*="ant-tag-cyan"]').eq(0).contains('projects');
    cy.get('[class*="ResearchProjectsCard_homeCardStats"] [class*="ant-tag-cyan"]').eq(1).contains(/^\d{1}/);
    cy.get('[class*="ResearchProjectsCard_homeCardStats"] [class*="ant-tag-cyan"]').eq(1).contains('variables');
  });

  it('Carte Projects - Bouton', () => {
    cy.get('[class*="ResearchProjectsCard_homeCardContent"] button').contains('Explore');
  });

  it('Carte EQP - Icône', () => {
    cy.get('[class*="EQPProjectsCard_homeCardHeader"] path[fill="#E0F2FE"]').should('exist');
  });

  it('Carte EQP - Titre', () => {
    cy.get('[class*="EQPProjectsCard_homeCardTitle"]').contains('EQP Projects');
  });

  it('Carte EQP - Description', () => {
    cy.get('[class*="EQPProjectsCard_homeCardDescription"]').contains('Explore data dictionaries from quality improvement projects');
  });

  it('Carte EQP - Statistiques', () => {
    cy.get('[class*="EQPProjectsCard_homeCardStats"] [class*="ant-tag-blue"]').eq(0).contains(/^\d{1}/);
    cy.get('[class*="EQPProjectsCard_homeCardStats"] [class*="ant-tag-blue"]').eq(0).contains('projects');
    cy.get('[class*="EQPProjectsCard_homeCardStats"] [class*="ant-tag-blue"]').eq(1).contains(/^\d{1}/);
    cy.get('[class*="EQPProjectsCard_homeCardStats"] [class*="ant-tag-blue"]').eq(1).contains('variables');
  });

  it('Carte EQP - Bouton', () => {
    cy.get('[class*="EQPProjectsCard_homeCardContent"] button').contains('Explore');
  });

  it('Carte Systems - Icône', () => {
    cy.get('[class*="HospitalSystemsCard_homeCardHeader"] path[fill="#EFDBFF"]').should('exist');
  });

  it('Carte Systems - Titre', () => {
    cy.get('[class*="HospitalSystemsCard_homeCardTitle"]').contains('Hospital Systems');
  });

  it('Carte Systems - Description', () => {
    cy.get('[class*="HospitalSystemsCard_homeCardDescription"]').contains('Explore the list of hospital system tables and variables');
  });

  it('Carte Systems - Statistiques', () => {
    cy.get('[class*="HospitalSystemsCard_homeCardStats"] [class*="ant-tag-purple"]').eq(0).contains(/^\d{1}/);
    cy.get('[class*="HospitalSystemsCard_homeCardStats"] [class*="ant-tag-purple"]').eq(0).contains('systems');
    cy.get('[class*="HospitalSystemsCard_homeCardStats"] [class*="ant-tag-purple"]').eq(1).contains(/^\d{1}/);
    cy.get('[class*="HospitalSystemsCard_homeCardStats"] [class*="ant-tag-purple"]').eq(1).contains('variables');
  });

  it('Carte Systems - Bouton', () => {
    cy.get('[class*="HospitalSystemsCard_homeCardContent"] button').contains('Explore');
  });
});
