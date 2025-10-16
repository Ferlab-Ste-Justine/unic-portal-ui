/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { HomePage } from 'cypress/pom/pages/HomePage';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';

describe('Page d\'accueil - Valider les liens disponibles', () => {
  const setupTest = () => {
    cy.login();
    cy.visit('/');
  };

  it('Carte Warehouse - Bouton', () => {
    setupTest();
    HomePage.actions.clickWarehouseExploreButton();
    ResourcesTable.validations.shouldShowPageTitle();
    ResourcesTable.validations.shouldShowResourceTypeTagInFilter(data.resourceWarehouse);
  });

  it('Carte Projects - Bouton', () => {
    setupTest();
    HomePage.actions.clickProjectsExploreButton();
    ResourcesTable.validations.shouldShowPageTitle();
    ResourcesTable.validations.shouldShowResourceTypeTagInFilter(data.resourceBronchiolite);
  });

  it('Carte EQP - Bouton', () => {
    setupTest();
    HomePage.actions.clickEQPExploreButton();
    ResourcesTable.validations.shouldShowPageTitle();
    ResourcesTable.validations.shouldShowResourceTypeTagInFilter(data.resourceInhalateurs);
  });

  it('Carte Systems - Bouton', () => {
    setupTest();
    HomePage.actions.clickHospitalSystemsExploreButton();
    ResourcesTable.validations.shouldShowPageTitle();
    ResourcesTable.validations.shouldShowResourceTypeTagInFilter(data.resourceCentro);
  });
});
