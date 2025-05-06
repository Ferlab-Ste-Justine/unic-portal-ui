/// <reference types="cypress"/>
import { getDateTime } from '../../support/utils';
import { oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitCatalog('tables');
  cy.showColumn('Entity', 1);
  cy.showColumn('Domain', 1);
  cy.showColumn('Created On', 1);
  cy.showColumn('Updated On', 1);
  cy.get('[id*="panel-tables"] [class*="InputSearch_filter"] input').type('complications_accouchement');
  cy.get('[id*="panel-tables"] [class*="Header_ProTableHeader"]').contains(/^1 Result$/).should('exist');
  
  cy.clickAndIntercept('[id*="panel-tables"] [class*="Header_ProTableHeader"] [data-icon="download"]', 'POST', '**/graphql', 2);
  cy.waitUntilFile(oneMinute);
});

describe('Tableau Tables - Exporter les tables en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('tables');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauTables.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauTables.json');
  });
});
