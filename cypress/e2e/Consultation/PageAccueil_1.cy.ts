/// <reference types="cypress"/>
import 'cypress/support/commands';
import { HomePage } from 'cypress/pom/pages/HomePage';

beforeEach(() => {
  cy.login();
  cy.visit('/');
});

describe('Page d\'accueil - Vérifier les informations affichées', () => {
  it('Titre', () => {
    HomePage.validations.shouldHaveTitle();
  });

  it('Sous-titre', () => {
    HomePage.validations.shouldHaveSubtitle();
  });

  it('Carte Warehouse - Icône', () => {
    HomePage.validations.warehouse.shouldHaveIcon();
  });

  it('Carte Warehouse - Titre', () => {
    HomePage.validations.warehouse.shouldHaveTitle();
  });

  it('Carte Warehouse - Description', () => {
    HomePage.validations.warehouse.shouldHaveDescription();
  });

  it('Carte Warehouse - Statistiques', () => {
    HomePage.validations.warehouse.shouldHaveStats();
  });

  it('Carte Warehouse - Bouton', () => {
    HomePage.validations.warehouse.shouldHaveButton();
  });

  it('Carte Projects - Icône', () => {
    HomePage.validations.projects.shouldHaveIcon();
  });

  it('Carte Projects - Titre', () => {
    HomePage.validations.projects.shouldHaveTitle();
  });

  it('Carte Projects - Description', () => {
    HomePage.validations.projects.shouldHaveDescription();
  });

  it('Carte Projects - Statistiques', () => {
    HomePage.validations.projects.shouldHaveStats();
  });

  it('Carte Projects - Bouton', () => {
    HomePage.validations.projects.shouldHaveButton();
  });

  it('Carte EQP - Icône', () => {
    HomePage.validations.eqp.shouldHaveIcon();
  });

  it('Carte EQP - Titre', () => {
    HomePage.validations.eqp.shouldHaveTitle();
  });

  it('Carte EQP - Description', () => {
    HomePage.validations.eqp.shouldHaveDescription();
  });

  it('Carte EQP - Statistiques', () => {
    HomePage.validations.eqp.shouldHaveStats();
  });

  it('Carte EQP - Bouton', () => {
    HomePage.validations.eqp.shouldHaveButton();
  });

  it('Carte Systems - Icône', () => {
    HomePage.validations.hospitalSystems.shouldHaveIcon();
  });

  it('Carte Systems - Titre', () => {
    HomePage.validations.hospitalSystems.shouldHaveTitle();
  });

  it('Carte Systems - Description', () => {
    HomePage.validations.hospitalSystems.shouldHaveDescription();
  });

  it('Carte Systems - Statistiques', () => {
    HomePage.validations.hospitalSystems.shouldHaveStats();
  });

  it('Carte Systems - Bouton', () => {
    HomePage.validations.hospitalSystems.shouldHaveButton();
  });
});
