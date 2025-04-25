/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
  cy.inputDropdownSelectValue('panel-variables', 1/*Resource*/, data.resourceBronchiolite.name);
});

describe('Tableau Variables - Valider les liens du filtre Resource', () => {
  it('Reset filters - Clear Input', () => {
    cy.get('[id*="panel-variables"] [class*="Header_clearFilterLink"]').clickAndWait();
    cy.get(`[id*="panel-variables"] [class*="InputSelect_filter"] [title=${data.resourceBronchiolite.name}]`).should('not.exist');
  });

  it('Reset filters - Results', () => {
    cy.get('[id*="panel-variables"] [class*="Header_clearFilterLink"]').clickAndWait();
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/(^106 Results$| of 106$)/).should('not.exist');
  });

  it('Clear Input - Results', () => {
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"] [class="ant-select-clear"]').clickAndWait();
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/(^106 Results$| of 106$)/).should('not.exist');
  });
});
