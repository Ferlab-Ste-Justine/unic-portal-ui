/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
});

describe('Tableau Variables - Colonnes du tableau', () => {
  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    cy.get('thead[class="ant-table-thead"]').eq(1)
      .find('th[class*="ant-table-cell"]').eq(0)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Name').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .find('th[class*="ant-table-cell"]').eq(1)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Label').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Type').should('exist');
    
    cy.get('thead[class="ant-table-thead"]').eq(1)
      .contains('Source Name').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(4)
      .contains('Source Name').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .find('th[class*="ant-table-cell"]').eq(3)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Source').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .find('th[class*="ant-table-cell"]').eq(4)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Table').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .find('th[class*="ant-table-cell"]').eq(5)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Resource').should('exist');
    
    cy.get('thead[class="ant-table-thead"]').eq(1)
      .contains('Created On').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(8)
      .contains('Created On').should('exist');
  
    cy.get('thead[class="ant-table-thead"]').eq(1)
      .contains('Updated On').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(9)
      .contains('Updated On').should('exist');
  });

  it('Masquer une colonne affichée', () => {
    cy.get('thead[class="ant-table-thead"]').eq(1)
      .contains('Name').should('exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Name')
      .find('[type="checkbox"]').uncheck({force: true});

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .contains('Name').should('not.exist');
  });

  it('Afficher une colonne masquée', () => {
    cy.get('thead[class="ant-table-thead"]').eq(1)
      .contains('Source Name').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Source Name')
      .find('[type="checkbox"]').check({force: true});

    cy.get('thead[class="ant-table-thead"]').eq(1)
      .contains('Source Name').should('exist');
  });
});