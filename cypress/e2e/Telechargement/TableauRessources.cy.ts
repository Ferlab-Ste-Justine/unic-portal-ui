/// <reference types="cypress"/>
import { data } from 'cypress/pom/shared/Data';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));
  cy.login();
  cy.visitCatalog();
  ResourcesTable.actions.showAllColumns();
  ResourcesTable.actions.searchResource(data.resourceBronchiolite.code);
  ResourcesTable.validations.tableHeader(/^1 Result$/);
  ResourcesTable.actions.clickDownloadButton();
});

describe('Tableau Ressources - Exporter les ressources en TSV', () => {
  it('Valider le nom du fichier', () => {
    ResourcesTable.validations.fileName();
  });

  it('Valider les en-têtes du fichier', () => {
    ResourcesTable.validations.fileHeaders();
  });

  it('Valider le contenu du fichier', () => {
    ResourcesTable.validations.fileContent(data.resourceBronchiolite);
  });
});
