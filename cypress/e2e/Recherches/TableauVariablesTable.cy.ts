/// <reference types="cypress"/>
import 'cypress/support/commands';
import { CommonSelectors } from 'cypress/pom/shared/Selectors';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
});

describe('Tableau Variables - Vérifier la fonctionnalité de la recherche Table', () => {
  it('By Name', () => {
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"]').eq(2).type('Maternal_');
    cy.get(`${CommonSelectors.dropdown} [title="maternal_family_medical_history"]`).should('exist');
    cy.get(`${CommonSelectors.dropdown} [title="maternal_ultrasound"]`).should('exist');
    cy.get(`${CommonSelectors.dropdown} [title="accouchement"]`).should('not.exist');
  });
});
