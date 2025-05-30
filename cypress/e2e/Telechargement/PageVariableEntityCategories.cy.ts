/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablePage } from 'cypress/pom/pages/VariablePage';

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));
  cy.login();
  cy.visitVariableEntity(data.variableSector);
  VariablePage.actions.clickCategoriesDownloadButton();
});

describe('Page d\'une variable - Exporter les catégories en TSV', () => {
  it('Valider le nom du fichier', () => {
    VariablePage.validations.categories.shouldHaveExportedFileName(data.variableSector);
  });

  it('Valider les en-têtes du fichier', () => {
    VariablePage.validations.categories.shouldHaveExportedFileHeaders();
  });

  it('Valider le contenu du fichier', () => {
    VariablePage.validations.categories.shouldHaveExportedFileContent(data.variableSector);
  });
});
