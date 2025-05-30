/// <reference types="cypress"/>
import { CommonSelectors } from 'cypress/pom/shared/Selectors';
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
});

describe('Tableau Variables - Colonnes du tableau', () => {
  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    cy.get(CommonSelectors.tableHead).eq(1)
      .find(CommonSelectors.tableCell).eq(0)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Name').should('exist');

    cy.get(CommonSelectors.tableHead).eq(1)
      .find(CommonSelectors.tableCell).eq(1)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Label').should('exist');

    cy.get(CommonSelectors.tableHead).eq(1)
      .find(CommonSelectors.tableCell).eq(2)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Resource').should('exist');

    cy.get(CommonSelectors.tableHead).eq(1)
      .find(CommonSelectors.tableCell).eq(3)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Table').should('exist');

    cy.get(CommonSelectors.tableHead).eq(1)
      .find(CommonSelectors.tableCell).eq(4)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Type').should('exist');

    cy.get(CommonSelectors.tableHead).eq(1)
      .find(CommonSelectors.tableCell).eq(5)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Source').should('exist');
    
    cy.get(CommonSelectors.tableHead).eq(1)
      .contains('Created On').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(7)
      .contains('Created On').should('exist');
  
    cy.get(CommonSelectors.tableHead).eq(1)
      .contains('Updated On').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(8)
      .contains('Updated On').should('exist');
  });

  it('Masquer une colonne affichée', () => {
    cy.get(CommonSelectors.tableHead).eq(1)
      .contains('Name').should('exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Name')
      .find('[type="checkbox"]').uncheck({force: true});

    cy.get(CommonSelectors.tableHead).eq(1)
      .contains('Name').should('not.exist');
  });

  it('Afficher une colonne masquée', () => {
    cy.get(CommonSelectors.tableHead).eq(1)
      .contains('Created On').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Created On')
      .find('[type="checkbox"]').check({force: true});

    cy.get(CommonSelectors.tableHead).eq(1)
      .contains('Created On').should('exist');
  });
});