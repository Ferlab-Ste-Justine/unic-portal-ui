/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcePage } from 'cypress/pom/pages/ResourcePage';

describe('Page d\'un projet - Vérifier les informations affichées', () => {
  const setupTest = () => {
    cy.login();
    cy.visitResourceEntity(data.resourceBronchiolite);
  };

  it('Titre', () => {
    setupTest();
    ResourcePage.validations.shouldHaveTitle(data.resourceBronchiolite);
  });

  it('Panneau Summary - Header', () => {
    setupTest();
    ResourcePage.validations.summary.shouldHaveHeader(data.resourceBronchiolite);
  });

  it('Panneau Summary - Title', () => {
    setupTest();
    ResourcePage.validations.summary.shouldHaveTitle(data.resourceBronchiolite);
  });

  it('Panneau Summary - Description', () => {
    setupTest();
    ResourcePage.validations.summary.shouldHaveDescription(data.resourceBronchiolite);
  });

  it('Panneau Summary - Investigator Owner', () => {
    setupTest();
    ResourcePage.validations.summary.shouldHavePrincipalInvestigator(data.resourceBronchiolite);
  });

  it('Panneau Summary - Nagano ID', () => {
    setupTest();
    ResourcePage.validations.summary.shouldHaveNaganoID(data.resourceBronchiolite);
  });

  it('Panneau Summary - Approved On', () => {
    setupTest();
    ResourcePage.validations.summary.shouldHaveApprovedOn(data.resourceBronchiolite);
  });

  it('Panneau Variables - Variable Count', () => {
    setupTest();
    ResourcePage.validations.variables.shouldHaveVariableCount(data.resourceBronchiolite);
  });

  it('Panneau Variables - Hospital Systems', () => {
    setupTest();
    ResourcePage.validations.variables.shouldHaveHospitalSystems(data.resourceBronchiolite);
  });

  it('Panneau Current version - Published On', () => {
    setupTest();
    ResourcePage.validations.currentVersion.shouldHavePublishedOn(data.resourceBronchiolite);
  });

  it('Panneau Current version - Version', () => {
    setupTest();
    ResourcePage.validations.currentVersion.shouldHaveVersion(data.resourceBronchiolite, true/*isTooltip*/);
  });
});
