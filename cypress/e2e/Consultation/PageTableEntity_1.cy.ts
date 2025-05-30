/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { TablePage } from 'cypress/pom/pages/TablePage';

beforeEach(() => {
  cy.login();
  cy.visitTableEntity(data.tablePathology);
});

describe('Page d\'une table - Vérifier les informations affichées', () => {
  it('Titre', () => {
    TablePage.validations.shouldHaveTitle(data.tablePathology);
  });

  it('Panneau Summary - Header', () => {
    TablePage.validations.summary.shouldHaveHeader(data.tablePathology);
  });

  it('Panneau Summary - Resource', () => {
    TablePage.validations.summary.shouldHaveResource(data.tablePathology);
  });

  it('Panneau Summary - Description', () => {
    TablePage.validations.summary.shouldHaveDescription(data.tablePathology);
  });

  it('Panneau Summary - Entity', () => {
    TablePage.validations.summary.shouldHaveEntity(data.tablePathology);
  });

  it('Panneau Summary - Domain', () => {
    TablePage.validations.summary.shouldHaveDomain(data.tablePathology);
  });

  it('Panneau Summary - Row Filter', () => {
    TablePage.validations.summary.shouldNotHaveRowFilter();
  });

  it('Panneau Variables - Variable Count', () => {
    TablePage.validations.variables.shouldHaveVariableCount(data.tablePathology);
  });

  it('Panneau History - Created On', () => {
    TablePage.validations.history.shouldHaveCreatedOn(data.tablePathology);
  });

  it('Panneau History - Updated On', () => {
    TablePage.validations.history.shouldHaveUpdatedOn(data.tablePathology);
  });
});
