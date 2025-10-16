/// <reference types="cypress"/>
import 'cypress/support/commands';
import { data } from 'cypress/pom/shared/Data';
import { ResourcesTable } from 'cypress/pom/pages/ResourcesTable';
import { varSingleDigit } from 'cypress/pom/shared/Utils';

describe('Tableau Ressources - Vérifier la fonctionnalité de la recherche Resource', () => {
  const setupTest = () => {
    cy.login();
    cy.visitCatalog();
  };

  it('Results by Code', () => {
    setupTest();
    ResourcesTable.actions.typeResourceSearchInput('Choriobact');
    ResourcesTable.validations.shouldShowResultsCount(1);
  });

  it('Results by Description en', () => {
    setupTest();
    ResourcesTable.actions.typeResourceSearchInput('warehouse tables');
    ResourcesTable.validations.shouldShowResultsCount(1);
  });

  it('Results by Description fr', () => {
    setupTest();
    ResourcesTable.actions.typeResourceSearchInput('Tables d\'entrepôt');
    ResourcesTable.validations.shouldShowResultsCount(1);
  });

  it('Results by Name', () => {
    setupTest();
    ResourcesTable.actions.typeResourceSearchInput('chorio-bact');
    ResourcesTable.validations.shouldShowResultsCount(1);
  });

  it('Results by Project PI', () => {
    setupTest();
    ResourcesTable.actions.typeResourceSearchInput('boucoiran');
    ResourcesTable.validations.shouldShowResultsCount(varSingleDigit);
  });

  it('Results by Title', () => {
    setupTest();
    ResourcesTable.actions.typeResourceSearchInput('entrepôt de données');
    ResourcesTable.validations.shouldShowResultsCount(1);
  });

  it('Lien Reset filters', () => {
    setupTest();
    ResourcesTable.actions.typeResourceSearchInput(data.resourceBronchiolite.code);
    ResourcesTable.validations.shouldShowResetFilterButton();
  });

  it('Related Resource type filter', () => {
    setupTest();
    ResourcesTable.actions.selectResourceTypeFilter(data.resourceWarehouse);
    ResourcesTable.actions.typeResourceSearchInput(data.resourceBronchiolite.code);
    ResourcesTable.validations.shouldShowNoResultsMessage();
  });
});
