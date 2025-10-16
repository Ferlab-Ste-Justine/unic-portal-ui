/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';

describe('Tableau Ressources - Exporter les ressources en TSV', () => {
  const setupTest = () => {
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));
    cy.login();
    cy.visitCatalog();
    ResourcesTable.actions.showAllColumns();
    ResourcesTable.actions.typeResourceSearchInput(data.resourceBronchiolite.code);
    ResourcesTable.validations.shouldShowResultsCount('1');
    ResourcesTable.actions.clickDownloadButton();
  };

  it('Valider le nom du fichier', () => {
    setupTest();
    ResourcesTable.validations.shouldHaveExportedFileName();
  });

  it('Valider les en-têtes du fichier', () => {
    setupTest();
    ResourcesTable.validations.shouldHaveExportedFileHeaders();
  });

  it('Valider le contenu du fichier', () => {
    setupTest();
    ResourcesTable.validations.shouldHaveExportedFileContent(data.resourceBronchiolite);
  });
});
