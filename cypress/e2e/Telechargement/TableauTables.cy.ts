/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { TablesTable } from 'cypress/pom/pages/TablesTable';

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));
  cy.login();
  cy.visitCatalog('tables');
  TablesTable.actions.showAllColumns();
  TablesTable.actions.typeTableSearchInput(data.tableAccouchement.description);
  TablesTable.validations.shouldShowResultsCount('1');
  TablesTable.actions.clickDownloadButton();
});

describe('Tableau Tables - Exporter les tables en TSV', () => {
  it('Valider le nom du fichier', () => {
    TablesTable.validations.shouldHaveExportedFileName();
  });

  it('Valider les en-têtes du fichier', () => {
    TablesTable.validations.shouldHaveExportedFileHeaders();
  });

  it('Valider le contenu du fichier', () => {
    TablesTable.validations.shouldHaveExportedFileContent(data.tableAccouchement);
  });
});
