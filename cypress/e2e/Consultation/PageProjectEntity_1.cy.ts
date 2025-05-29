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
    ResourcePage.validations.shouldHaveTitle(data.resourceBronchiolite.name);
  });

  it('Panneau Summary - Header', () => {
    ResourcePage.validations.summary.shouldHaveHeader(data.resourceBronchiolite);
  });

  it('Panneau Summary - Title', () => {
    ResourcePage.validations.summary.shouldHaveTitle(data.resourceBronchiolite.title);
  });

  it('Panneau Summary - Description', () => {
    ResourcePage.validations.summary.shouldHaveDescription(data.resourceBronchiolite.description);
  });

  it('Panneau Summary - Investigator Owner', () => {
    ResourcePage.validations.summary.shouldHavePrincipalInvestigator(data.resourceBronchiolite.principalInvestigator);
  });

  it('Panneau Summary - Nagano ID', () => {
    ResourcePage.validations.summary.shouldHaveNaganoID(data.resourceBronchiolite.naganoID);
  });

  it('Panneau Summary - Approved On', () => {
    ResourcePage.validations.summary.shouldHaveApprovedOn(data.resourceBronchiolite.approvedOn);
  });

  it('Panneau Variables - Variable Count', () => {
    ResourcePage.validations.variables.shouldHaveVariableCount(data.resourceBronchiolite);
  });

  it('Panneau Variables - Hospital Systems', () => {
    ResourcePage.validations.variables.shouldHaveHospitalSystems(data.resourceBronchiolite.variables.hospitalSystems);
  });

  it('Panneau Current version - Published On', () => {
    ResourcePage.validations.currentVersion.shouldHavePublishedOn(data.resourceBronchiolite.updatedOn);
  });

  it('Panneau Current version - Version', () => {
    ResourcePage.validations.currentVersion.shouldHaveVersion(data.resourceBronchiolite.version, true/*isTooltip*/);
  });
});
