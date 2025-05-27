/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { formatResourceType } from 'cypress/pom/shared/Utils';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('tables');
});

describe('Tableau Tables - Vérifier la fonctionnalité de la recherche Table', () => {
  it('Results by Description en', () => {
    cy.get('[id*="panel-tables"] [class*="InputSearch_filter"] input').type('family medical');
    cy.get('[id*="panel-tables"] [class*="Header_ProTableHeader"]').contains(/^\d{1} Result/).should('exist');
  });

  it('Results by Description fr', () => {
    cy.get('[id*="panel-tables"] [class*="InputSearch_filter"] input').type('antécédents médicaux');
    cy.get('[id*="panel-tables"] [class*="Header_ProTableHeader"]').contains(/^\d{1} Result/).should('exist');
  });

  it('Results by Name', () => {
    cy.get('[id*="panel-tables"] [class*="InputSearch_filter"] input').type('Maternal_Family_Medical_History');
    cy.get('[id*="panel-tables"] [class*="Header_ProTableHeader"]').contains(/^1 Result$/).should('exist');
  });

  it('Lien Reset filters', () => {
    cy.get('[id*="panel-tables"] [class*="InputSearch_filter"] input').type('accouchement');
    cy.get('[id*="panel-tables"] [class*="Header_ProTableHeader"]').contains('Reset filters').should('exist');
  });

  it('Related Resource type filter', () => {
    cy.inputDropdownSelectValue('[id*="panel-tables"]', 0/*Resource type*/, formatResourceType(data.resourceBronchiolite.type));
    cy.get('[id*="panel-tables"] [class*="InputSearch_filter"] input').type('consultation_complication');
    cy.get('[id*="panel-tables"] [class*="Header_ProTableHeader"]').contains(/^No Results$/).should('exist');
  });

  it('Related Resource filter', () => {
    cy.inputDropdownSelectValue('[id*="panel-tables"]', 1/*Resource*/, data.resourceBronchiolite.name);
    cy.get('[id*="panel-tables"] [class*="InputSearch_filter"] input').type('consultation_complication');
    cy.get('[id*="panel-tables"] [class*="Header_ProTableHeader"]').contains(/^No Results$/).should('exist');
  });
});
