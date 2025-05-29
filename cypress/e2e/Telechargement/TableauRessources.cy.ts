/// <reference types="cypress"/>
import { data } from 'cypress/pom/shared/Data';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));
  cy.login();
  cy.visitCatalog();
  ResourcesTable.actions.showAllColumns();
  ResourcesTable.actions.typeResourceSearchInput(data.resourceBronchiolite.code);
  ResourcesTable.validations.shouldShowResultsCount('1');
  ResourcesTable.actions.clickDownloadButton();
});

describe('Tableau Ressources - Exporter les ressources en TSV', () => {
  it('Valider le nom du fichier', () => {
    ResourcesTable.validations.shouldHaveExportedFileName();
  });

  it('Valider les en-têtes du fichier', () => {
    ResourcesTable.validations.shouldHaveExportedFileHeaders();
  });

  it('Valider le contenu du fichier', () => {
    ResourcesTable.validations.shouldHaveExportedFileContent(data.resourceBronchiolite);
  });
});
