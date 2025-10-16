/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { TablePage } from 'cypress/pom/pages/TablePage';

describe('Page d\'une table - Vérifier les informations affichées', () => {
  const setupTest = () => {
    cy.login();
    cy.visitTableEntity(data.tablePathology);
  };

  it('Titre', () => {
    setupTest();
    TablePage.validations.shouldHaveTitle(data.tablePathology);
  });

  it('Panneau Summary - Header', () => {
    setupTest();
    TablePage.validations.summary.shouldHaveHeader(data.tablePathology);
  });

  it('Panneau Summary - Resource', () => {
    setupTest();
    TablePage.validations.summary.shouldHaveResource(data.tablePathology);
  });

  it('Panneau Summary - Description', () => {
    setupTest();
    TablePage.validations.summary.shouldHaveDescription(data.tablePathology);
  });

  it('Panneau Summary - Entity', () => {
    setupTest();
    TablePage.validations.summary.shouldHaveEntity(data.tablePathology);
  });

  it('Panneau Summary - Domain', () => {
    setupTest();
    TablePage.validations.summary.shouldHaveDomain(data.tablePathology);
  });

  it('Panneau Summary - Row Filter', () => {
    setupTest();
    TablePage.validations.summary.shouldNotHaveRowFilter();
  });

  it('Panneau Variables - Variable Count', () => {
    setupTest();
    TablePage.validations.variables.shouldHaveVariableCount(data.tablePathology);
  });

  it('Panneau History - Created On', () => {
    setupTest();
    TablePage.validations.history.shouldHaveCreatedOn(data.tablePathology);
  });

  it('Panneau History - Updated On', () => {
    setupTest();
    TablePage.validations.history.shouldHaveUpdatedOn(data.tablePathology);
  });
});
