/// <reference types="cypress"/>
import { getDateTime } from '../../support/utils';
import { oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitVariableEntity('warehouse', 'medical_imaging', 'sector');  
  cy.get('[id="categories"] [data-icon="download"]').clickAndWait();
  cy.waitUntilFile(oneMinute);
});

describe('Page d\'une variable - Exporter les catégories en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('unic-sector-categories-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('PageVariableEntityCategories.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('PageVariableEntityCategories.json');
  });
});
