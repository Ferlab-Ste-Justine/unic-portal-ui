/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { HomePage } from 'cypress/pom/pages/HomePage';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';

beforeEach(() => {
  cy.login();
  cy.visit('/');
});

describe('Page d\'accueil - Valider les liens disponibles', () => {
  it('Carte Warehouse - Bouton', () => {
    HomePage.actions.clickWarehouseExploreButton();
    ResourcesTable.validations.shouldShowPageTitle();
    ResourcesTable.validations.shouldShowResourceTypeTagInFilter(data.resourceWarehouse);
  });

  it('Carte Projects - Bouton', () => {
    HomePage.actions.clickProjectsExploreButton();
    ResourcesTable.validations.shouldShowPageTitle();
    ResourcesTable.validations.shouldShowResourceTypeTagInFilter(data.resourceBronchiolite);
  });

  it('Carte EQP - Bouton', () => {
    HomePage.actions.clickEQPExploreButton();
    ResourcesTable.validations.shouldShowPageTitle();
    ResourcesTable.validations.shouldShowResourceTypeTagInFilter(data.resourceInhalateurs);
  });

  it('Carte Systems - Bouton', () => {
    HomePage.actions.clickHospitalSystemsExploreButton();
    ResourcesTable.validations.shouldShowPageTitle();
    ResourcesTable.validations.shouldShowResourceTypeTagInFilter(data.resourceCentro);
  });
});
