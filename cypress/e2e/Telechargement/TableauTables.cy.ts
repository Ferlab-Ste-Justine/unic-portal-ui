/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { TablesTable } from 'cypress/pom/pages/TablesTable';

describe('Tableau Tables - Exporter les tables en TSV', () => {
  const setupTest = () => {
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));
    cy.login();
    cy.visitCatalog('tables');
    TablesTable.actions.showAllColumns();
    TablesTable.actions.typeTableSearchInput(data.tableAccouchement.description);
    TablesTable.validations.shouldShowResultsCount('1');
    TablesTable.actions.clickDownloadButton();
  };

  it('Valider le nom du fichier', () => {
    setupTest();
    TablesTable.validations.shouldHaveExportedFileName();
  });

  it('Valider les en-têtes du fichier', () => {
    setupTest();
    TablesTable.validations.shouldHaveExportedFileHeaders();
  });

  it('Valider le contenu du fichier', () => {
    setupTest();
    TablesTable.validations.shouldHaveExportedFileContent(data.tableAccouchement);
  });
});
