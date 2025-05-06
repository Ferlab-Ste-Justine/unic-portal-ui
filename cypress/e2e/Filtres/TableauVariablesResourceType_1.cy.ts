/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { formatToK } from 'cypress/pom/shared/Utils';

beforeEach(() => {
  cy.login();
  cy.visitCatalog('variables');
});

describe('Tableau Variables - Vérifier la fonctionnalité du filtre Resource type', () => {
  it('Results', () => {
    cy.inputDropdownSelectValue('panel-variables', 0/*Resource type*/, 'Warehouse', true/*isMultiSelect*/);
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(new RegExp(`(^${formatToK(data.resourceWarehouse.variables.totalCount)} Results$| of ${formatToK(data.resourceWarehouse.variables.totalCount)}$)`)).should('exist');
  });

  it('Lien Reset filters', () => {
    cy.inputDropdownSelectValue('panel-variables', 0/*Resource type*/, 'Warehouse', true/*isMultiSelect*/);
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains('Reset filters').should('exist');
  });

  it('Related Variable search', () => {
    cy.get('[id*="panel-variables"] [class*="InputSearch_filter"] input').type('#_Admitted_COVID');
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"]').eq(0).type('Warehouse');
    cy.get('[class*="ant-select-dropdown"] [label="Warehouse"] [class*="ant-tag-orange"]').should('not.exist');
  });

  it('Related Table filter', () => {
    cy.inputDropdownSelectValue('panel-variables', 2/*Table*/, 'accouchement');
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"]').eq(0).type('Warehouse');
    cy.get('[class*="ant-select-dropdown"] [label="Warehouse"] [class*="ant-tag-orange"]').should('not.exist');
  });

  it('Related Resource filter', () => {
    cy.inputDropdownSelectValue('panel-variables', 1/*Resource*/, data.resourceBronchiolite.name);
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"]').eq(0).type('Warehouse');
    cy.get('[class*="ant-select-dropdown"] [label="Warehouse"] [class*="ant-tag-orange"]').should('not.exist');
  });

  it('Related Source', () => {
    cy.inputDropdownSelectValue('panel-variables', 3/*Source*/, 'centro');
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"]').eq(0).type('Warehouse');
    cy.get('[class*="ant-select-dropdown"] [label="Warehouse"] [class*="ant-tag-orange"]').should('not.exist');
  });
});
