/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcePage } from 'cypress/pom/pages/ResourcePage';

beforeEach(() => {
  cy.login();
  cy.visitResourceEntity(data.resourceBronchiolite.code);
});

describe('Page d\'un projet - Vérifier les informations affichées', () => {
  it('Titre', () => {
    ResourcePage.validations.title(data.resourceBronchiolite.name);
  });

  it('Panneau Summary - Header', () => {
    ResourcePage.validations.summary.header(data.resourceBronchiolite);
  });

  it('Panneau Summary - Title', () => {
    ResourcePage.validations.summary.title(data.resourceBronchiolite.title);
  });

  it('Panneau Summary - Description', () => {
    ResourcePage.validations.summary.description(data.resourceBronchiolite.description);
  });

  it('Panneau Summary - Investigator Owner', () => {
    ResourcePage.validations.summary.principalInvestigator(data.resourceBronchiolite.principalInvestigator);
  });

  it('Panneau Summary - Nagano ID', () => {
    ResourcePage.validations.summary.naganoID(data.resourceBronchiolite.naganoID);
  });

  it('Panneau Summary - Approved On', () => {
    ResourcePage.validations.summary.approvedOn(data.resourceBronchiolite.approvedOn);
  });

  it('Panneau Variables - Variable Count', () => {
    ResourcePage.validations.variables.variableCount(data.resourceBronchiolite);
  });

  it('Panneau Variables - Hospital Systems', () => {
    ResourcePage.validations.variables.hostitalSystems(data.resourceBronchiolite.variables.hospitalSystems);
  });

  it('Panneau Current version - Published On', () => {
    ResourcePage.validations.currentVersion.publishedOn(data.resourceBronchiolite.updatedOn);
  });

  it('Panneau Current version - Version', () => {
    ResourcePage.validations.currentVersion.version(data.resourceBronchiolite.version, true/*isTooltip*/);
  });
});
