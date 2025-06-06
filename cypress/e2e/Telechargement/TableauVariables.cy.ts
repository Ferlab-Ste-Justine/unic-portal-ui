/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));
  cy.login();
  cy.visitCatalog('variables');
  VariablesTable.actions.showAllColumns();
  VariablesTable.actions.typeVariableSearchInput(data.variableAdmittedCOVID.name);
  VariablesTable.validations.shouldShowResultsCount('1');
  VariablesTable.actions.clickDownloadButton();
});

describe('Tableau Variables - Exporter les variables en TSV', () => {
  it('Valider le nom du fichier', () => {
    VariablesTable.validations.shouldHaveExportedFileName();
  });

  it('Valider les en-têtes du fichier', () => {
    VariablesTable.validations.shouldHaveExportedFileHeaders();
  });

  it('Valider le contenu du fichier', () => {
    VariablesTable.validations.shouldHaveExportedFileContent(data.variableAdmittedCOVID);
  });
});
