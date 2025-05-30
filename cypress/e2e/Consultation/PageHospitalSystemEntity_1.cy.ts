/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcePage } from 'cypress/pom/pages/ResourcePage';

beforeEach(() => {
  cy.login();
  cy.visitResourceEntity(data.resourceCentro);
});

describe('Page d\'un Système hospitalier - Vérifier les informations affichées', () => {
  it('Titre', () => {
    ResourcePage.validations.shouldHaveTitle(data.resourceCentro);
  });

  it('Panneau Summary - Header', () => {
    ResourcePage.validations.summary.shouldHaveHeader(data.resourceCentro);
  });

  it('Panneau Summary - Description', () => {
    ResourcePage.validations.summary.shouldHaveDescription(data.resourceCentro);
  });

  it('Panneau Summary - Collection Starting Year', () => {
    ResourcePage.validations.summary.shouldHaveCollectionStartingYear(data.resourceCentro);
  });

  it('Panneau Variables - Variable Count', () => {
    ResourcePage.validations.variables.shouldHaveVariableCount(data.resourceCentro);
  });

  it('Panneau Current version - Published On', () => {
    ResourcePage.validations.currentVersion.shouldHavePublishedOn(data.resourceCentro);
  });

  it('Panneau Current version - Version', () => {
    ResourcePage.validations.currentVersion.shouldHaveVersion(data.resourceCentro);
  });
});
