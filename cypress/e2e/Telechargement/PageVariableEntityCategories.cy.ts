/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { VariablePage } from 'cypress/pom/pages/VariablePage';

describe('Page d\'une variable - Exporter les catégories en TSV', () => {
  const setupTest = () => {
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));
    cy.login();
    cy.visitVariableEntity(data.variableSector);
    VariablePage.actions.clickCategoriesDownloadButton();
  };

  it('Valider le nom du fichier', () => {
    setupTest();
    VariablePage.validations.categories.shouldHaveExportedFileName(data.variableSector);
  });

  it('Valider les en-têtes du fichier', () => {
    setupTest();
    VariablePage.validations.categories.shouldHaveExportedFileHeaders();
  });

  it('Valider le contenu du fichier', () => {
    setupTest();
    VariablePage.validations.categories.shouldHaveExportedFileContent(data.variableSector);
  });
});
