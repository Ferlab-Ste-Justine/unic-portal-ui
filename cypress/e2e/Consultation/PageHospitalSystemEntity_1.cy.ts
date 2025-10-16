/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcePage } from 'cypress/pom/pages/ResourcePage';

describe('Page d\'un Système hospitalier - Vérifier les informations affichées', () => {
  const setupTest = () => {
    cy.login();
    cy.visitResourceEntity(data.resourceCentro);
  };

  it('Titre', () => {
    setupTest();
    ResourcePage.validations.shouldHaveTitle(data.resourceCentro);
  });

  it('Panneau Summary - Header', () => {
    setupTest();
    ResourcePage.validations.summary.shouldHaveHeader(data.resourceCentro);
  });

  it('Panneau Summary - Description', () => {
    setupTest();
    ResourcePage.validations.summary.shouldHaveDescription(data.resourceCentro);
  });

  it('Panneau Summary - Collection Starting Year', () => {
    setupTest();
    ResourcePage.validations.summary.shouldHaveCollectionStartingYear(data.resourceCentro);
  });

  it('Panneau Variables - Variable Count', () => {
    setupTest();
    ResourcePage.validations.variables.shouldHaveVariableCount(data.resourceCentro);
  });

  it('Panneau Current version - Published On', () => {
    setupTest();
    ResourcePage.validations.currentVersion.shouldHavePublishedOn(data.resourceCentro);
  });

  it('Panneau Current version - Version', () => {
    setupTest();
    ResourcePage.validations.currentVersion.shouldHaveVersion(data.resourceCentro);
  });
});
