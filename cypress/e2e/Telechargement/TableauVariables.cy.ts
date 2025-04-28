/// <reference types="cypress"/>
import { getDateTime } from '../../support/utils';
import { oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitCatalog('variables');
  cy.showColumn('Created On', 1);
  cy.showColumn('Updated On', 1);
  cy.get('[id*="panel-variables"] [class*="InputSearch_filter"] input').type('#_Admitted_COVID');
  cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/^1 Result$/).should('exist');
  
  cy.clickAndIntercept('[id*="panel-variables"] [class*="Header_ProTableHeader"] [data-icon="download"]', 'POST', '**/graphql', 2);
  cy.waitUntilFile(oneMinute);
});

describe('Tableau Variables - Exporter les variables en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('unic-variables-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauVariables.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauVariables.json');
  });
});
