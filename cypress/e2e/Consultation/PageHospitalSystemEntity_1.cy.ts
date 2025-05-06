/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcePage } from 'cypress/pom/pages/ResourcePage';

beforeEach(() => {
  cy.login();
  cy.visitResourceEntity('centro');
});

describe('Page d\'un Système hospitalier - Vérifier les informations affichées', () => {
  it('Titre', () => {
    ResourcePage.validations.title(data.resourceCentro.name);
  });

  it('Panneau Summary - Header', () => {
    ResourcePage.validations.summary.header(data.resourceCentro);
  });

  it('Panneau Summary - Description', () => {
    ResourcePage.validations.summary.description(data.resourceCentro.description);
  });

  it('Panneau Summary - Collection Starting Year', () => {
    ResourcePage.validations.summary.collectionStartingYear(data.resourceCentro.collectionStartingYear);
  });

  it('Panneau Variables - Variable Count', () => {
    ResourcePage.validations.variables.variableCount(data.resourceCentro);
  });

  it('Panneau Current version - Published On', () => {
    ResourcePage.validations.currentVersion.publishedOn(data.resourceCentro.updatedOn);
  });

  it('Panneau Current version - Version', () => {
    ResourcePage.validations.currentVersion.version(data.resourceCentro.version);
  });
});
