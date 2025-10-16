/// <reference types="cypress"/>
import 'cypress/support/commands';
import { HomePage } from 'cypress/pom/pages/HomePage';

describe('Page d\'accueil - Vérifier les informations affichées', () => {
  const setupTest = () => {
    cy.login();
    cy.visit('/');
  };

  it('Titre', () => {
    setupTest();
    HomePage.validations.shouldHaveTitle();
  });

  it('Sous-titre', () => {
    setupTest();
    HomePage.validations.shouldHaveSubtitle();
  });

  it('Carte Warehouse - Icône', () => {
    setupTest();
    HomePage.validations.warehouse.shouldHaveIcon();
  });

  it('Carte Warehouse - Titre', () => {
    setupTest();
    HomePage.validations.warehouse.shouldHaveTitle();
  });

  it('Carte Warehouse - Description', () => {
    setupTest();
    HomePage.validations.warehouse.shouldHaveDescription();
  });

  it('Carte Warehouse - Statistiques', () => {
    setupTest();
    HomePage.validations.warehouse.shouldHaveStats();
  });

  it('Carte Warehouse - Bouton', () => {
    setupTest();
    HomePage.validations.warehouse.shouldHaveButton();
  });

  it('Carte Projects - Icône', () => {
    setupTest();
    HomePage.validations.projects.shouldHaveIcon();
  });

  it('Carte Projects - Titre', () => {
    setupTest();
    HomePage.validations.projects.shouldHaveTitle();
  });

  it('Carte Projects - Description', () => {
    setupTest();
    HomePage.validations.projects.shouldHaveDescription();
  });

  it('Carte Projects - Statistiques', () => {
    setupTest();
    HomePage.validations.projects.shouldHaveStats();
  });

  it('Carte Projects - Bouton', () => {
    setupTest();
    HomePage.validations.projects.shouldHaveButton();
  });

  it('Carte EQP - Icône', () => {
    setupTest();
    HomePage.validations.eqp.shouldHaveIcon();
  });

  it('Carte EQP - Titre', () => {
    setupTest();
    HomePage.validations.eqp.shouldHaveTitle();
  });

  it('Carte EQP - Description', () => {
    setupTest();
    HomePage.validations.eqp.shouldHaveDescription();
  });

  it('Carte EQP - Statistiques', () => {
    setupTest();
    HomePage.validations.eqp.shouldHaveStats();
  });

  it('Carte EQP - Bouton', () => {
    setupTest();
    HomePage.validations.eqp.shouldHaveButton();
  });

  it('Carte Systems - Icône', () => {
    setupTest();
    HomePage.validations.hospitalSystems.shouldHaveIcon();
  });

  it('Carte Systems - Titre', () => {
    setupTest();
    HomePage.validations.hospitalSystems.shouldHaveTitle();
  });

  it('Carte Systems - Description', () => {
    setupTest();
    HomePage.validations.hospitalSystems.shouldHaveDescription();
  });

  it('Carte Systems - Statistiques', () => {
    setupTest();
    HomePage.validations.hospitalSystems.shouldHaveStats();
  });

  it('Carte Systems - Bouton', () => {
    setupTest();
    HomePage.validations.hospitalSystems.shouldHaveButton();
  });
});
