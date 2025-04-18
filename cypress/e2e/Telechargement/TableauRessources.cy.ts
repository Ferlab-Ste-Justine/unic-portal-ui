/// <reference types="cypress"/>
import { getDateTime } from '../../support/utils';
import { oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitCatalog();
  cy.showColumn('Code');
  cy.showColumn('Created On');
  cy.showColumn('Approved On');
  cy.showColumn('Collection Starting Year');
  cy.showColumn('Version');
  cy.showColumn('Nagano ID');
  cy.showColumn('Principal Investigator');
  cy.get('[id*="panel-resources"] [class*="InputSearch_filter"] input').type('bronchiolite');
  cy.get('[id*="panel-resources"] [class*="Header_ProTableHeader"]').contains(/^1 Result$/).should('exist');
  
  cy.clickAndIntercept('[id*="panel-resources"] [class*="Header_ProTableHeader"] [data-icon="download"]', 'POST', '**/graphql', 2);
  cy.waitUntilFile(oneMinute);
});

describe('Tableau Ressources - Exporter les ressources en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('unic-resources-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauRessources.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauRessources.json');
  });
});
