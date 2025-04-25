/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { formatToK } from 'cypress/pom/shared/Utils';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';
import { ResourcePage } from 'cypress/pom/pages/ResourcePage';
import { VariablesTable } from 'cypress/pom/pages/VariablesTable';

beforeEach(() => {
  cy.login();
  cy.visitCatalog();
  ResourcesTable.actions.showAllColumns();
  ResourcesTable.actions.searchResource(data.resourceBronchiolite.code);
});

describe('Tableau Ressources - Valider les liens disponibles', () => {
  it('Lien Code', () => {
    ResourcesTable.actions.clickTableCellLink(data.resourceBronchiolite, 'code');
    ResourcePage.validations.title(data.resourceBronchiolite.name);
  });

  it('Lien Name', () => {
    ResourcesTable.actions.clickTableCellLink(data.resourceBronchiolite, 'name');
    ResourcePage.validations.title(data.resourceBronchiolite.name);
  });

  it('Lien Table (Research)', () => {
    ResourcesTable.actions.clickTableCellLink(data.resourceBronchiolite, 'tables');
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
    cy.get('[data-node-key="tables"]').should('have.class', 'ant-tabs-tab-active');
    cy.get(`[id*="panel-tables"] [class*="InputSelect_filter"] [title=${data.resourceBronchiolite.name}]`).should('exist');
    cy.get('[id*="panel-tables"] [class*="Header_ProTableHeader"]').contains(/(^17 Results$| of 17$)/).should('exist');
  });

  it('Lien Table (Hospital System)', () => {
    ResourcesTable.actions.clickTableCellLink(data.resourceCentro, 'tables');
    cy.get('[class*="PageLayout_titlePage"]').contains('UnIC Catalog').should('exist');
    cy.get('[data-node-key="tables"]').should('have.class', 'ant-tabs-tab-active');
    cy.get('[id*="panel-tables"] [class*="InputSelect_filter"] [title="centro"]').should('exist');
    cy.get('[id*="panel-tables"] [class*="Header_ProTableHeader"]').contains(/(^419 Results$| of 419$)/).should('exist');
  });

  it('Lien Variable (Research)', () => {
    ResourcesTable.actions.clickTableCellLink(data.resourceBronchiolite, 'variables');
    VariablesTable.validations.pageTitle();
    VariablesTable.validations.tabActive();
    cy.get(`[id*="panel-variables"] [class*="InputSelect_filter"] [title=${data.resourceBronchiolite.name}]`).should('exist');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(new RegExp(`(^${formatToK(data.resourceBronchiolite.variables.totalCount)} Results$| of ${formatToK(data.resourceBronchiolite.variables.totalCount)}$)`)).should('exist');
  });

  it('Lien Variable (Hospital System)', () => {
    ResourcesTable.actions.clickTableCellLink(data.resourceCentro, 'variables');
    VariablesTable.validations.pageTitle();
    VariablesTable.validations.tabActive();
    cy.get('[id*="panel-variables"] [class*="InputSelect_filter"] [title="centro"]').should('exist');
    cy.get('[id*="panel-variables"] [class*="Header_ProTableHeader"]').contains(/(^13.7K Results$| of 13.7K$)/).should('exist');
  });
});
